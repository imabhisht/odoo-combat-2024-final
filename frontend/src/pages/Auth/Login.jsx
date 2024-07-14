import React, { useState, useContext, useEffect } from "react";
import SimpleNotification from "../../components/Notification/Simple";
import { AuthAPI } from "../../api";
import { useNavigate , Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import LoadingSpinner from "../../components/Loading";
import img from "../../images/images-removebg-preview.png";

export default () => {
  const { loading, currentUser } = useContext(AuthContext);

  if (loading) {
    return <LoadingSpinner />
  }

  if (currentUser) {
    return <Navigate to="/" replace />;
  }
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [stage, setStage] = useState("email");
  const [show, setShow] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (stage === "email") {
        // Request OTP
        const data = await AuthAPI.requestLoginOTP({ email });
        if (data.error) {
          console.log(data.error);
          return;
        }
        console.log(data);
        // localStorage.setItem("")
        setStage("otp");
        setShow(true);
      } else {
        // Verify OTP
        const data = await AuthAPI.verifyLoginOTP({
          email,
          otp
        })
        // Login user
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        navigate("/");
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <SimpleNotification
          title={"Verification Code Sent Sucessfully"}
          message={"We have sent you Verification Code on your Email!"}
          setNotification={setShow}
          notification={show}
        />
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src={img}
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <a
              href="#"
              style={{ color: '#a4448b' }}
              className="font-medium hover:text-[#a4448b]"
            >
              start your 14-day free trial
            </a>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#a4448b] focus:outline-none focus:ring-[#a4448b] sm:text-sm"
                  />
                </div>
              </div>

              {stage === "otp" ? (
                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Verification Code
                  </label>
                  <div className="mt-1">
                    <input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      id="otp"
                      name="otp"
                      type="text"
                      //   autoComplete="current-password"
                      required
                      maxLength={6}
                      style={{ letterSpacing: "10px" }}
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#a4448b] focus:outline-none focus:ring-[#a4448b] sm:text-sm"
                    />
                  </div>
                </div>
              ) : null}

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-[#a4448b] focus:ring-[#a4448b]"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-[#a4448b] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#a4448b] focus:outline-none focus:ring-2 focus:ring-[#a4448b] focus:ring-offset-2"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
