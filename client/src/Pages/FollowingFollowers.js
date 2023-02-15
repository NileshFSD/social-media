import React, { useEffect, useState } from "react";
import userDp from "../Assets/user-dp.png";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";

const FollowingFollowers = () => {
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);
  const params = useParams();
  const id = params.id;
  const [currentState, setCurrentState] = useState(id);

  const token = localStorage.getItem("hey-token");
  const currentUserId = jwtDecode(token)?.id;

  useEffect(() => {
    async function findFollowingFollowers() {
      const req = await fetch(
        "http://localhost:5000/api/hey/user/get-following-followers-list",
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "user-access-token": token,
          },
        }
      );

      const res = await req.json();
      setFollowing(res?.following);
      setFollowers(res?.followers);
    }
    findFollowingFollowers();
  }, [token]);

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
    <div className="container following_followers">
      <ToastContainer position="top-left" />
      <div className="following_followers_container">
        <div className="following-box">
          <label htmlFor="following">FOLLOWING</label>
          <input
            type="radio"
            name="usersList"
            id="following"
            value="following"
            checked={currentState === "following" ? true : false}
            onChange={(e) => setCurrentState(e.target.value)}
          />
        </div>
        <div className="followers-box">
          <label htmlFor="followers">FOLLOWERS</label>
          <input
            type="radio"
            name="usersList"
            id="followers"
            value="followers"
            checked={currentState === "followers" ? true : false}
            onChange={(e) => setCurrentState(e.target.value)}
          />
        </div>
      </div>
      {currentState === "following" ? (
        <>
          {" "}
          {following.map((user, index) => {
            return (
              <div className="followingList" key={index}>
                <div className="followingList-first-child">
                  <div className="listDp">
                    <img src={userDp} alt="" />
                  </div>
                  <div className="username">{user.username}</div>
                </div>

                <div className="followingList-second-child">
                  <button
                    className="follow-btn"
                    onClick={() => followUnfollow(user._id)}
                  >
                    Unfollow
                  </button>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>
          {followers.map((user, index) => {
            return (
              <div className="followingList" key={index}>
                <div className="followingList-first-child">
                  <div className="listDp">
                    <img src={userDp} alt="" />
                  </div>
                  <div className="username">{user.username}</div>
                </div>

                <div className="followingList-second-child">
                  <button
                    className="follow-btn"
                    onClick={() => followUnfollow(user._id)}
                  >
                    {user.followers.includes(currentUserId)
                      ? "Following"
                      : "Followback"}
                  </button>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default FollowingFollowers;
