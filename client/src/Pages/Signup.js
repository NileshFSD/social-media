import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import signUpPoster from "../Assets/signUp.png";
import { ToastContainer, toast } from "react-toastify";
import { BiHide, BiShow } from "react-icons/bi";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const response = await axios.post(
        "https://rich-gold-pangolin-kilt.cyclic.app/api/hey/auth/registration",
        {
          username: username,
          email: email,
          firstname: firstname,
          lastname: lastname,
          password: password,
        }
      );

      const result = await response.data;
      if (result.success === true) {
        toast.success(result.msg);
        navigate("/login");
      } else {
        toast.info(result.msg);
      }
    } else {
      toast.warn("Password does not matching");
    }
  };
  return (
    <div className="signup-page">
      <ToastContainer position="top-left" />
      <div className="signup-poster">
        <img src={signUpPoster} alt="signup-poster" />
      </div>
      <div className="signup-container">
        <div className="form-container">
          <div className="signup-title">Sign-up</div>
          <form onSubmit={registerUser} className="form">
            <div>
              <input
                type="text"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                value={firstname}
                placeholder="First Name"
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                value={lastname}
                placeholder="Last Name"
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div>
              <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="pass-container">
              <div className="icon-show">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                {!showPassword ? (
                  <BiShow
                    className="pass"
                    onClick={() => setShowPassword(true)}
                  />
                ) : (
                  <BiHide
                    className="pass"
                    onClick={() => setShowPassword(false)}
                  />
                )}
              </div>
            </div>
            <div className="pass-container">
              <div className="icon-show">
                <input
                  type={showConfirmPass ? "text" : "password"}
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div>
                {!showConfirmPass ? (
                  <BiShow
                    className="pass"
                    onClick={() => setShowConfirmPass(true)}
                  />
                ) : (
                  <BiHide
                    className="pass"
                    onClick={() => setShowConfirmPass(false)}
                  />
                )}
              </div>
            </div>

            <div>
              <button type="submit" className="register-btn">
                {" "}
                Sign-Up
              </button>
            </div>
          </form>
          <p>
            Already Registered?{" "}
            <Link className="link" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
