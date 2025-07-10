import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { goBack } from "../../helpers";

const ForgotPasswordPage = () => {
  return (
    <>
      <button
        className="text-pri-color bg-white font-medium p-0 hover:text-sec-color"
        onClick={goBack}
      >
        Back
      </button>
      <div className="flex flex-col items-center h-full w-full ">
        <img src={Logo} alt="logo" className="w-44 lg:mt-4 mt-8" />
        <h4 className="font-semibold text-xl"> Recover your password</h4>
        <p className="text-center mt-4 text-sm">
          {" "}
          <span className="font-semibold">Enter the email </span>
          that you used when registering to recover your password. You will
          receive a <span className="font-semibold">password reset link.</span>
        </p>
        <form
          action=""
          className="w-full pt-14 flex flex-col gap-6 max-w-[300px]"
        >
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="John@gmail.com"
              className="py-3 px-2 shadow outline-none border-none"
            />
          </div>

          <button className="text-white bg-[#2D2D2D] hover:bg-brown w-full text-center py-3 rounded-full font-bold">
            Send link
          </button>
        </form>
        <p className="font-bold text-center my-6">
          If you need further assistance <br />
          <Link
            to="/contact-us"
            className="text-pri-color hover:text-sec-color"
          >
            contact our support team
          </Link>
        </p>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
