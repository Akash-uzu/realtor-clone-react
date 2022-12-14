import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const onSubmit=async(e)=>{
    e.preventDefault();
    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth,email)
      toast.success("Email was sent")
      navigate('/')
    } catch (error) {
      toast.error("Could not send reset password")
    }
    
  }
  
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Forgot Password</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=773&q=80"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>

        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form>
            <div>
              <input
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6"
                type="email"
                id="email"
                value={email}
                onChange={emailChangeHandler}
                placeholder="Email Address"
              />
            </div>

            
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">Don't have a account? <Link to="/sign-up" className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out"> Register</Link></p>
              <p className="mb-6">or <Link to="/sign-in" className="text-blue-600 ml-1 hover:text-blue-700 transition duration-200 ease-in-out"> Sign in instead</Link></p>
              
            </div>
          </form>
          <button onClick={onSubmit} className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-200 ease-in-out hover:shadow-lg active:bg-blue-800" type="submit">Send Password Reset Link </button>
          <div className="my-4">
            <p className="text-center font-semibold mx-4 text-gray-500">OR</p>
          </div>
          <OAuth/>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
