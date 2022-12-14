import React from "react";
import { useState } from "react";
import { RiEyeCloseFill, RiEyeFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import {createUserWithEmailAndPassword, getAuth,updateProfile} from "firebase/auth"
import { db } from "../firebase";
import { serverTimestamp, setDoc,doc } from "firebase/firestore";
import {toast} from "react-toastify"
const SignUp = () => {
  const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()
  const nameChangeHandler=(e)=>{
    setName(e.target.value)
  }
  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  async function onSubmitHandler(e) {
    e.preventDefault();
    try {
      const auth = getAuth()
      console.log(auth)
      const userCredential = await createUserWithEmailAndPassword(
        auth,email,password
      )
      updateProfile(auth.currentUser,{
        displayName: name
      })
      const user= userCredential.user
      const formData = {
        name,email,password
      }
      delete formData.password
      formData.timestamp= serverTimestamp();

      await setDoc(doc(db, "users", user.uid),formData)
      toast.success("Sign was successful")      
      navigate('/')
    } catch (error) {
      toast.error('Something went wrong')
    }



  }
  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign up</h1>
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
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white focus:border-blue-600 rounded transition ease-in-out mb-6"
                type="name"
                id="name"
                value={name}
                onChange={nameChangeHandler}
                placeholder="Full name"
              />
              <input
                className="w-full px-4 py-2 text-xl text-gray-700 focus:border-blue-600 bg-white border-gray-300 rounded transition ease-in-out mb-6"
                type="email"
                id="email"
                value={email}
                onChange={emailChangeHandler}
                placeholder="Email Address"
              />
            </div>

            <div className="relative">
              <input
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-6"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={passwordChangeHandler}
                placeholder="Password"
              />
              {!showPassword ? (
                <RiEyeCloseFill className="absolute right-3 top-3 text-xl cursor-pointer" onClick={()=>setShowPassword((prevState)=>!prevState)} />
              ) : (
                <RiEyeFill className="absolute right-3 top-3 text-xl cursor-pointer" onClick={()=>setShowPassword((prevState)=>!prevState)} />
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
              <p className="mb-6">Have an Account? <Link to="/sign-in" className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out"> Sign in</Link></p>
              <p>
                <Link to="/forgot-password" className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out">Forgot password</Link>
              </p>
            </div>
          </form>
          <button className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-200 ease-in-out hover:shadow-lg active:bg-blue-800" onClick={onSubmitHandler}>Sign up </button>
          <div className="my-4">
            <p className="text-center font-semibold mx-4 text-gray-500">OR</p>
          </div>
          <OAuth/>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
