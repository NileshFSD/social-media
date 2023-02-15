import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import profileUpload from "../Assets/user-dp.png";
import noCover from "../Assets/no-cover.jpg";
import { IoMdClose } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";

const EditProfile = ({
  id,
  passwordRef,
  firstnameRef,
  lastnameRef,
  usernameRef,
  dpRef,
  coverRef,
  emailRef,
  setEditMode,
}) => {
  const [username, setUsername] = useState(usernameRef);
  const [firstname, setFirstname] = useState(firstnameRef);
  const [lastname, setLastname] = useState(lastnameRef);
  const [email, setEmail] = useState(emailRef);
  const [password, setPassword] = useState(passwordRef);
  const [dp, setDp] = useState(dpRef);
  const [cover, setCover] = useState(coverRef);

  const token = localStorage.getItem("hey-token");
  const currentUserId = jwtDecode(token).id;

  const navigate = useNavigate();

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleCover = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setCover(base64);
  };

  const handleDp = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setDp(base64);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    const req = await fetch(`http://localhost:5000/api/hey/user/update/${id}`, {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        currentUserId: currentUserId,
        username: username,
        firstname: firstname,
        lastname: lastname,
        password: password,
        email: email,
        dp: dp,
        cover: cover,
      }),
    });

    const data = await req.json();
    if (data.success === true) {
      toast.success(data.msg);
      setEditMode(false);
    } else {
      toast.error(data.msg);
    }
  };

  return (
    <div className="edit-profile-container">
      <ToastContainer position="top-left" />
      <div>
        <IoMdClose className="close" onClick={() => setEditMode(false)} />
      </div>
      <div className="form-container">
        <form onSubmit={updateUser} className="form">
          <div className="add-cover-container">
            <label htmlFor="add-cover">
              <div className="add-cover">
                <img src={cover || noCover} alt="user" />
              </div>
            </label>
            <input
              type="file"
              name="dp"
              id="add-cover"
              onChange={handleCover}
            />
          </div>
          <div className="add-dp-container">
            <label htmlFor="add-dp">
              <div className="add-dp">
                <img src={dp || profileUpload} alt="user" />
              </div>
            </label>
            <input type="file" name="dp" id="add-dp" onChange={handleDp} />
          </div>
          <div>
            <input
              type="text"
              value={username}
              placeholder="Username"
              autoComplete="off"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              value={firstname}
              autoComplete="off"
              placeholder="First Name"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              value={lastname}
              autoComplete="off"
              placeholder="Last Name"
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              placeholder="Email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* <div>
            <input
              type="password"
              value={oldPassword}
              placeholder="OldPassword"
              autoComplete="off"
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div> */}
          <div>
            <input
              type="password"
              value={password}
              placeholder="Password"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* <div>
            <input
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              autoComplete="off"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div> */}

          <div>
            <button type="submit" className="save-btn">
              {" "}
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
