import Jumbotron from "../../components/cards/Jumbotron";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt, FaClock } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="">
      <Jumbotron title="Contact" subTitle="Welcome to React E-commerce" />
      <div className="container">
        <div className="d-flex flex-column text-center justify-content-center mb-4 mt-4 ">
          <h3>Get In Touch With Us</h3>
          <p className="text-secondary">
            For More Information About Our Product & Services. Please Feel Free
            To
            <br />
            Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not
            Hesitate!
          </p>
        </div>

        <div className="row">
          <div className="col-sm-12 col-md-6 d-flex flex-column align-items-center justify-content-center">
            <div>
              <div className="d-flex align-content-center">
                <FaLocationDot size={20} className="align-self-center" />
                <div className="ms-3">
                  <h5 className="mb-0">Address</h5>
                  <p>4 no. ward, 3 union, Dumuria, Khulna, Bangladesh</p>
                </div>
              </div>
              <div className="d-flex">
                <FaPhoneAlt size={20} className="align-self-center" />
                <div className="ms-3">
                  <h5 className="mb-0">Phone</h5>
                  <p>Mobile: +880 1960 112 281</p>
                </div>
              </div>
              <div className="d-flex">
                <FaClock size={20} className="align-self-center" />
                <div className="ms-3">
                  <h5 className="mb-0">Working Time</h5>
                  <p>Sunday-tuesday: 9:00 - 17:00</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 ">
            <form>
              <div className="form-gorup mt-3 ">
                <h6>
                  <label className="mb-2" htmlFor="name">
                    Your name:
                  </label>
                </h6>
                <input
                  type="text"
                  className="form-control w-100"
                  id="name"
                  placeholder="Enter your name"
                />
              </div>
              <div className="form-gorup mt-3">
                <h6>
                  <label htmlFor="email" className="mb-2">
                    Your Email:
                  </label>
                </h6>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="form-gorup mt-3">
                <h6>
                  <label htmlFor="subject" className="mb-2">
                    Subject:
                  </label>
                </h6>
                <input
                  type="text"
                  className="form-control"
                  id="subject"
                  placeholder="Enter the subject"
                />
              </div>
              <div className="form-gorup mt-3">
                <h6>
                  <label htmlFor="message" className="mb-2">
                    Message:
                  </label>
                </h6>
                <textarea
                  className="form-control"
                  id="message"
                  placeholder="Write your message"
                ></textarea>
              </div>
              <input
                type="button"
                style={{ background: "#b88e2f ", color: "white" }}
                className="btn mt-3"
                value="Submit"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
