const bcrypt = require("bcrypt");
const statusEnum = require("../enums/status");
const User = require("../models/user.model");
const { randomString } = require("../utils/random");
const { verifyEmail } = require("../utils/sendEmail");
const jwtUtils = require("../utils/jwt");
const openai = require("../utils/chatgpt");
const { spawn } = require("child_process");
const fs = require("fs").promises;
const { sendEmail } = require("../utils/sendPlan");
const { sendOtp } = require("../utils/sendOtp");
const { OTP } = require("../utils/otp");
const { sendFeedback } = require("../utils/sendFeedback");

let logged_user = "Dhruv Vayugundla";
let otp = "";

const authController = {
  register: async (req, res) => {
    try {
      const { email, password, uname } = req.body;
      const check = await User.findOne({ email });

      if (check)
        return res
          .status(400)
          .json({ success: false, msg: "Email already exists" });

      const hash = await bcrypt.hash(password, 10);

      const code = randomString(20);

      const user = new User({
        email,
        password: hash,
        uname,
        verificationCode: code,
      });

      const data = await user.save();

      const link = `http://localhost:8080/api/v1/auth/verify?code=${code}`;

      verifyEmail(email, uname, link);

      const { password: pw, ...response } = data?._doc;

      return res.json({ success: true, data: response });
    } catch (error) {
      return res.status(500).json({ success: false, msg: error?.message });
    }
  },

  verify: async (req, res) => {
    try {
      const { code } = req.query;
      const user = await User.findOne({ verificationCode: code });

      if (!user)
        return res.status(400).json({ success: false, msg: "Code is invalid" });

      user.status = statusEnum.ACTIVE;
      user.verificationCode = "";

      const data = await user.save();

      const { password: pw, ...response } = data?._doc;

      return res.json({ success: true, data: response });
    } catch (error) {
      return res.status(500).json({ success: false, msg: error?.message });
    }
  },

  login: async (req, res) => {
    try {
      const { uname, password } = req.body;
      const user = await User.findOne({ uname });

      if (!user)
        return res.status(400).json({ success: false, msg: "User not found" });

      const match = await bcrypt.compare(password, user?.password);

      if (!match)
        return res
          .status(400)
          .json({ success: false, msg: "Wrong username or password" });

      if (user?.status !== statusEnum.ACTIVE) {
        return res
          .status(400)
          .json({ success: false, msg: "Account not active" });
      }

      const { password: pw, ...userData } = user?._doc;

      const accessToken = jwtUtils.generateToken({ userId: user?._id });

      logged_user = userData?.uname;

      return res.json({
        check: userData?.gender,
        success: true,
        data: { accessToken, user: userData },
      });
    } catch (error) {
      return res.status(500).json({ success: false, msg: error?.message });
    }
  },

  profile: async (req, res) => {
    try {
      const { gender, age, height, weight } = req.body;

      const result = await User.updateOne(
        { uname: logged_user },
        { $set: { gender, age, height, weight } }
      );

      if (result.nModified === 0) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      return res.json({
        success: true,
        data: { message: "User details updated successfully" },
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  disp: async (req, res) => {
    try {
      const user = await User.findOne({ uname: logged_user });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      return res.json({ user });
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },

  update: async (req, res) => {
    try {
      const { age, email, weight, height } = req.body;

      const user = User.findOne({ uname: logged_user });

      if (!user) {
        return res
          .status(404)
          .json({ succes: false, message: "User not found" });
      }

      const result = await User.updateOne(
        { uname: logged_user },
        { $set: { email, age, height, weight } }
      );

      if (result.nModified === 0) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      return res.json({
        success: true,
        data: { message: "User details updated successfully" },
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  gpt: async (req, res) => {
    try {
      const userPrompt = req.body.user_prompt;

      const user = await User.findOne({ uname: logged_user });

      if (!userPrompt) {
        return res.status(400).json({
          success: false,
          error: "User prompt is missing in the request body.",
        });
      }

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: userPrompt,
          },
        ],
        max_tokens: 750,
      });

      if (
        response.choices &&
        response.choices[0] &&
        response.choices[0].message &&
        response.choices[0].message.content
      ) {
        sendEmail(
          logged_user,
          user?.email,
          response.choices[0].message.content
        );

        return res.json({
          success: true,
          data: response.choices[0].message.content,
        });
      } else if (response.error) {
        return res.status(500).json({
          success: false,
          error: response.error.message,
        });
      } else {
        return res.status(500).json({
          success: false,
          error: "Failed to retrieve a valid response from OpenAI.",
        });
      }
    } catch (error) {
      console.error("Error:", error);

      return res.status(500).json({
        success: false,
        error: "An internal server error occurred.",
      });
    }
  },

  report: async (req, res) => {
    try {
      const report_data = req.body;
      let condition = "";

      const pythonScript = "ML-model\\predictor.py";
      const inputDataJson = JSON.stringify(report_data);

      const pythonProcess = spawn("python", [pythonScript, inputDataJson]);

      pythonProcess.stdout.on("data", (data) => {
        const outputFromPython = JSON.parse(data.toString());
        condition = outputFromPython?.condition;
        User.updateOne({ uname: logged_user }, { $set: { condition } });
        res.json({
          success: true,
          data: { message: "yes finally", condition: outputFromPython },
        });
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        data: { message: "nee abba ra" },
      });
    }
  },

  learn: async (req, res) => {
    const { fileName } = req.body;
    try {
      const fileContent = await fs.readFile(
        `D:/Thyroid-r/Learn_mores/${fileName}.txt`,
        "utf-8"
      );
      res.json({ content: fileContent });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error reading file content." });
    }
  },

  logout: async (req, res) => {
    try {
      logged_user = "";
      res.json({
        success: true,
        data: logged_user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "error" });
    }
  },

  otp: async (req, res) => {
    try {
      if (otp === "") {
        otp = OTP();
        const user = await User.findOne({ uname: logged_user });
        sendOtp(user?.uname, user?.email, otp);
      }
      res.json({
        success: true,
        otp: otp,
      });
    } catch (error) {
      console.error("Error in otp endpoint:", error);
      res.json({
        success: false,
        problem: error,
      });
    }
  },

  reset: async (req, res) => {
    try {
      const { password } = req.body;

      const user = await User.findOne({ uname: logged_user });

      if (!user) {
        return res.json({
          success: false,
          message: "User not found",
        });
      }

      const hash = await bcrypt.hash(password, 10);

      const updatedUser = await User.findOneAndUpdate(
        { uname: logged_user },
        { $set: { hash } },
        { new: true }
      );

      return res.json({
        success: true,
        body: { message: "Update successful", data: updatedUser },
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  feedback: async (req, res) => {
    try {
      const { feedback } = req.body;

      const user = await User.findOne({ uname: logged_user });

      if (!user) {
        return res.json({
          success: false,
          message: "User not found",
        });
      }

      sendFeedback(user?.uname, feedback);

      return res.json({
        success: true,
        message: "finally",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },

  googlesignup: async (req, res) => {
    try {
      const { displayName, uid, email } = req.body;
      const check = await User.findOne({ email });

      if (check)
        return res
          .status(400)
          .json({ success: false, msg: "Email already exists" });

      const hash = await bcrypt.hash(uid, 10);

      const code = "";

      const user = new User({
        email,
        status: statusEnum.ACTIVE,
        verificationCode: code,
        uname: displayName,
        password: hash,
      });

      await user.save();

      return res.json({ success: true, msg: "new user made" });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, msg: "failure" });
    }
  },

  googlesignin: async (req, res) => {
    try {
      const { displayName, email } = req.body;
      logged_user = displayName;

      const user = await User.findOne({ email });
      if (!user) return res.json({ success: false, msg: "user not found" });

      const { password: pw, ...userData } = user?._doc;

      return res.json({
        success: true,
        msg: "finally",
        data: { user: userData },
      });
    } catch (error) {
      console.log(error);
      return res.json({ success: false, msg: "failure" });
    }
  },
};

module.exports = authController;
