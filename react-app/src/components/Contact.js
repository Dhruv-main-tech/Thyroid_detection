import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="footer_wrapper wrapper">
      {
        <div className="container pb-3">
          <div className="row">
            <div className="col-lg-3 col-md-6 mb-4">
              <h5>Contact</h5>
              <div className="contact-info">
                <ul className="list-unstyled p-0">
                  <li>
                    <a href="#">
                      <i className="fa fa-phone me-3"></i>+1 222 3333
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="fa fa-envelope me-3"></i>info@example.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mb-4">
              <h5>Feedback</h5>
              <div className="form-group mb-4">
                <input
                  className="form-control bg-transparent"
                  placeholder="Type Here"
                />
                <button
                  type="submit"
                  className="main-btn rounded-2 mt-3 border-white text-white"
                >
                  Send
                </button>
              </div>
              <h5>Stay Connected</h5>
              <ul className="social-network d-flex align-items-center p-0">
                <li>
                  <a href="#">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-google-plus-g"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-vimeo-v"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      }
    </section>
  );
};

export default Contact;
