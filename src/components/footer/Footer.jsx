import toast from "react-hot-toast";
import style from "./footer.module.css";

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    toast.success("Subscribed");
  };

  return (
    <section className={style.footerbg}>
      <div className="container  p-3 pt-5">
        <div className="row g-3 ">
          <div className="col-6 col-md-3">
            <img
              className="mb-5"
              src="https://i.ibb.co/NxczK88/Funiro.png"
              alt=""
            />
            <p className={style.commonColor}>
              400 University Drive Suite 200 Coral Gables, FL 33134 USA
            </p>
          </div>
          <div className="col-6 col-md-3 ">
            <p className={style.commonColor}>Links</p>
            <a className={style.aDesign} href="#">
              Home
            </a>
            <a className={style.aDesign} href="#">
              Shop
            </a>
            <a className={style.aDesign} href="#">
              About
            </a>
            <a className={style.aDesign} href="#">
              Contact
            </a>
          </div>
          <div className="col-6 col-md-3 ">
            <p className={style.commonColor}>Help</p>
            <a className={style.aDesign} href="#">
              Payment Options
            </a>
            <a className={style.aDesign} href="#">
              Returns
            </a>
            <a className={style.aDesign} href="#">
              Privacy Policies
            </a>
          </div>
          <div className="col-6 col-md-3 ">
            <p className={style.commonColor}>Newsletter</p>
            <form onSubmit={handleSubscribe}>
              <input
                className={style.mail}
                type="email"
                placeholder="Email "
                required
              />
              <input className={style.subBtn} type="submit" value="Subscribe" />
            </form>
          </div>
        </div>
      </div>
      <div className="text-center p-3">
        <small>2024 furino. All rights reverved</small>
      </div>
    </section>
  );
};

export default Footer;
