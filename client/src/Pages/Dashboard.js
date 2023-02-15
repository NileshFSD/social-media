import React, { useEffect } from "react";
import { useState } from "react";
import Post from "./Post";
import userDp from "../Assets/user-dp.png";
import userdp from "../Assets/user.png";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { IoMdClose } from "react-icons/io";
import Trending from "./Trending";
import { toast, ToastContainer } from "react-toastify";

const Dashboard = () => {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [seeAll, setSeeAll] = useState(false);
  const token = localStorage.getItem("hey-token");
  const currentUserId = jwtDecode(token).id;

  useEffect(() => {
    async function findLoggedInUser() {
      const req = await fetch("http://localhost:5000/api/hey/user", {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "user-access-token": token,
        },
      });

      const res = await req.json();
      setLoggedInUser(res?.data);
    }

    findLoggedInUser();
  }, [token]);

  useEffect(() => {
    async function findLoggedInUser() {
      const req = await fetch(
        `http://localhost:5000/api/hey/user-suggestions/${currentUserId}`,
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );

      const res = await req.json();
      setSuggestions(res?.data);
    }

    findLoggedInUser();
  }, [currentUserId]);

  const followUnfollow = async (id) => {
    const response = await fetch(
      `http://localhost:5000/api/hey/user/follow-unfollow/${id}`,
      {
        method: "PUT",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentUserId: currentUserId,
        }),
      }
    );
    const data = await response.json();
    if (data.success) {
      toast.success(data.msg);
    } else {
      toast.error(data.msg);
    }
  };

  return (
    <div className="dashboard">
      <ToastContainer position="top-left" />
      <div className="profile-container">
        <div>
          <div className="profile">
            <div className="profile-pic">
              <Link to="/profile">
                <img
                  src={loggedInUser?.dp || userDp}
                  alt="dp"
                  className="user-dp"
                />
              </Link>
            </div>
            <div style={{ textTransform: "capitalize" }} className="username">
              {loggedInUser?.username}
            </div>
          </div>
          <Trending />
        </div>
      </div>
      <div className="child">
        <div className="post-container">
          <Post currentUserId={currentUserId} />
        </div>
        <div className="suggestions-container">
          {(suggestions.length < 1
            ? suggestions.slice(0, 1)
            : suggestions.slice(0, 2)
          ).map((user, index) => {
            return (
              <div className="suggestions" key={index}>
                <div className="suggestions-dp">
                  <img src={user.dp || userdp} alt="dp" />
                </div>
                <div className="suggestions-username">{user.username}</div>
                <div>
                  <button
                    className="follow-btn"
                    onClick={() => followUnfollow(user._id)}
                  >
                    Follow
                  </button>
                </div>
              </div>
            );
          })}
          <div className="see-all">
            <div style={{ cursor: "pointer" }} onClick={() => setSeeAll(true)}>
              {" "}
              See All
            </div>
          </div>
        </div>
        <div className={seeAll ? "suggestions-page" : "hide"}>
          <div>
            <IoMdClose className="close" onClick={() => setSeeAll(false)} />
          </div>
          <div className="suggestions-page-container">
            {suggestions.map((user, index) => {
              return (
                <div className="suggestion" key={index}>
                  <div className="suggestions-dp">
                    <img src={user.dp || userdp} alt="dp" />
                  </div>
                  <div className="suggestions-username">{user.username}</div>
                  <div>
                    <button
                      className="follow-btn"
                      onClick={() => followUnfollow(user._id)}
                    >
                      Follow
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
