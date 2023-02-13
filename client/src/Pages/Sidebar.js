import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineHome, AiOutlineEdit, AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import EditProfile from "./EditProfile";
import { ToastContainer, toast } from "react-toastify";

const Sidebar = () => {
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [show, setShow] = useState(true);
  const token = localStorage.getItem("hey-token");

  useEffect(() => {
    async function findLoggedInUser() {
      const req = await fetch(
        "https://rich-gold-pangolin-kilt.cyclic.app/api/hey/user",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "user-access-token": token,
          },
        }
      );

      const res = await req.json();
      setCurrentUser(res?.data);
    }

    findLoggedInUser();
  }, [token, currentUser]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("hey-token");
    toast.success("Sign-out successfully");
    navigate("/login");
  };
  return (
    <>
      <ToastContainer position="top-left" />
      {!editMode ? (
        <div className={show ? "sidebar-hide" : "sidebar-container"}>
          <div className=" sidebar">
            <div className="menu">
              <GiHamburgerMenu
                className="sidebar-btn"
                onClick={() =>
                  !show === true ? setShow(true) : setShow(false)
                }
              />
            </div>
            <ul>
              <li onClick={() => navigate("/dashboard")}>
                <AiOutlineHome className="sidebar-icons" /> Home
              </li>
              <li onClick={() => setEditMode(true)}>
                <AiOutlineEdit className="sidebar-icons" /> Edit Profile
              </li>

              <li onClick={handleLogout}>
                <AiOutlineLogout className="sidebar-icons" /> Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="edit-profile">
          <EditProfile
            passwordRef={currentUser?.password}
            id={currentUser?._id}
            currentUser={currentUser}
            setEditMode={setEditMode}
            usernameRef={currentUser?.username}
            firstnameRef={currentUser?.firstname}
            lastnameRef={currentUser?.lastname}
            emailRef={currentUser?.email}
            dpRef={currentUser?.dp}
            coverRef={currentUser?.cover}
          />
        </div>
      )}
    </>
  );
};

export default Sidebar;
