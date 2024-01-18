const transporter = require("../config/nodemailer");

const verifyEmail = async (email, uname, link) => {
  return await transporter.sendMail({
    from: '"Thyroid" testing7988@gmail.com',
    to: email,
    subject: "Confirm your email address",
    html: `
      <div>
        <p>Dear ${uname},</p>
        <p>Thank you for signing up for an account....</p>
        <p>To complete your registration, please click on the link below....</p>
        <a href="${link}">Click to confirm</a>
      </div>
    `,
  });
};

module.exports = { verifyEmail };
