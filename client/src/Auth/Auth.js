import React, {useEffect, useState} from "react";
import {BiShowAlt, BiHide} from "react-icons/bi";
import {GoogleLogin} from "react-google-login";
import {gapi} from "gapi-script";
import {useDispatch} from "react-redux";
import {login, signin, signup} from "../actions/auth";
import {useHistory} from "react-router-dom";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Auth = () => {
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "907908703070-qso7tmobpeg0k29oesj68m5ugqhl19m7.apps.googleusercontent.com",
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);
  const handleSubmit = e => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(
        signin({email: formData.email, password: formData.password}, history)
      );
    }
  };
  const handleTextFieldChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const switchMode = () => {
    setIsSignup(!isSignup);
  };

  const googleSuccess = async res => {
    const resulte = res?.profileObj;
    const token = res?.tokenId;
    try {
      if (isSignup) {
        dispatch(login(resulte, token));
        history.push("/");
      } else {
        dispatch(login(resulte, token));
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = error => {
    console.log(error);
    console.log("error in Sign In with google, Try Again Later");
  };

  return (
    <React.Fragment>
      <div className="flex min-h-full items-center justify-center mt-12 py-8 px-4 sm:px-6 lg:px-8 bg-white w-[600px] rounded">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              {isSignup ? "Sign-Up" : "Sign in to your account"}
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <a
                href="#"
                className="font-medium text-[#214252] hover:text-[#214252]"
              >
                start your 14-day free trial
              </a>
            </p>
          </div>
          <form
            className="mt-8 space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className=" rounded-md shadow-sm">
              {isSignup && (
                <div>
                  <label htmlFor="fullName" className="">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="First Name"
                    onChange={handleTextFieldChange}
                  />
                </div>
              )}
              <div>
                <label htmlFor="email" className="">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                  onChange={handleTextFieldChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="">
                  Password
                </label>
                <div className="flex gap-2 items-center appearance-none rounded-none rounded-b-md border border-gray-300">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    placeholder="Password"
                    onChange={handleTextFieldChange}
                  />
                  {!showPassword ? (
                    <BiShowAlt
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer "
                      size={20}
                    />
                  ) : (
                    <BiHide
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer "
                      size={20}
                    />
                  )}
                </div>
                {isSignup && (
                  <div className="flex gap-2 items-center appearance-none rounded-none rounded-b-md border border-gray-300">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                      placeholder="Confirm Password"
                      onChange={handleTextFieldChange}
                    />
                    {!showPassword ? (
                      <BiShowAlt
                        onClick={() => setShowPassword(!showPassword)}
                        className="cursor-pointer "
                        size={20}
                      />
                    ) : (
                      <BiHide
                        onClick={() => setShowPassword(!showPassword)}
                        className="cursor-pointer "
                        size={20}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-[#214252] hover:text-[#214252]"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#214252] py-2 px-4 text-sm font-medium text-white hover:bg-[#214252] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {isSignup ? "Sign Up" : "Sign In"}
              </button>
            </div>

            <div className="group relative flex w-full justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-[#214252]">
              {isSignup ? (
                <div>
                  Already have an account?{" "}
                  <button onClick={switchMode} className="font-bold">
                    Sign In
                  </button>
                </div>
              ) : (
                <div>
                  Don't have an account?{" "}
                  <button onClick={switchMode} className="font-bold">
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Auth;
/* 
<LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />

 <GoogleLogin
              clientId="907908703070-qso7tmobpeg0k29oesj68m5ugqhl19m7.apps.googleusercontent.com"
              className="w-full flex justify-center"
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
              disabled={false}
            />
*/
