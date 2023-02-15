import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import socialMediaPoster from "../Assets/social-media.png";
import { BiHide, BiShow } from "react-icons/bi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/hey/auth/login", {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const data = await response.json();
    if (data.success === true) {
      localStorage.setItem("hey-token", data.token);
      toast.success(data.msg);
      navigate("/dashboard");
    } else {
      toast.error(data.msg);
    }

    e.target.reset();
  };
  return (
    <div className="login-page">
      <div className="login-poster">
        <img src={socialMediaPoster} alt="signup-poster" />
      </div>
      <div>
        <ToastContainer position="top-left" />
        <div className="form-container">
          <div className="login-title">Login</div>
          <form onSubmit={handleLogin} className="form">
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
            <div>
              <button type="submit" className="login-btn">
                {" "}
                Log-In
              </button>
            </div>
          </form>
          <div>
            Yet not Registered?{" "}
            <Link className="link" to="/">
              Click here to Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
