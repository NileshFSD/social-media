import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userDp from "../Assets/user-dp.png";
import Sidebar from "./Sidebar";
// import { FaRegComment } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import jwtDecode from "jwt-decode";
import Spinner from "./Spinner";
import Trending from "./Trending";
import {
  AiOutlineLike,
  AiFillLike,
  AiFillDelete,
  AiFillEdit,
} from "react-icons/ai";
import EditPost from "./EditPost";

import noCover from "../Assets/no-cover.jpg";
import { toast, ToastContainer } from "react-toastify";

const Profile = () => {
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState([]);
  const [like, setLike] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editPostDetails, setEditPostDetails] = useState({
    picture: "",
    id: "",
    description: "",
  });
  const [postMenu, setPostMenu] = useState(true);
  const [dp, setDp] = useState("");
  const token = localStorage.getItem("hey-token");
  const currentUserId = jwtDecode(token).id;

  useEffect(() => {
    async function findUserPost() {
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
      setProfile(res?.data);
      if (res.success === true) {
        setDp(profile?.dp);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    }

    findUserPost();
  }, [token, profile]);

  useEffect(() => {
    async function getPost() {
      const req = await fetch(
        `https://rich-gold-pangolin-kilt.cyclic.app/api/hey/get-post/${currentUserId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await req.json();
      setPost(res?.data);
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }

    getPost();
  }, [post, currentUserId]);

  const deletePost = async (e, id) => {
    e.preventDefault();
    const response = await fetch(
      `https://rich-gold-pangolin-kilt.cyclic.app/api/hey/delete-post/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUserId,
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

  const likeDislike = async (id) => {
    if (!like.includes(id)) {
      setLike((prevLike) => [...prevLike, id]);
    } else {
      const dislike = like.filter((i) => {
        return i !== id;
      });
      setLike(dislike);
    }

    const response = await fetch(
      `https://rich-gold-pangolin-kilt.cyclic.app/api/hey/post/like-dislike/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUserId,
        }),
      }
    );
    const data = await response.json();
    if (data.success === false) {
      toast.error(data.msg);
    }
  };

  useEffect(() => {
    const likes = [];
    post.map((p) => {
      if (p.likes.includes(currentUserId)) {
        likes.push(p?._id);
        setLike(likes);
        return like;
      }
    });
  }, [post, currentUserId]);

  const showMenu = () => {
    setPostMenu(false);
    setTimeout(() => {
      setPostMenu(true);
    }, 10000);
  };

  const HandleEditPost = (id, description, image) => {
    setEditPostDetails({
      ...editPostDetails,
      id: id,
      description: description,
      picture: image,
    });
    setEditMode(true);
  };

  return (
    <div>
      <ToastContainer position="top-left" />
      {loading ? (
        <Spinner />
      ) : (
        <>
          {editMode ? (
            <EditPost
              editPostDetails={editPostDetails}
              userId={currentUserId}
              setEditMode={setEditMode}
            />
          ) : (
            <div className="profile-page-container">
              <Sidebar />
              <div className="container" style={{ overflowY: "scroll" }}>
                <div className="profile-page">
                  <div className="profile-dp-cover">
                    <div className="profile-cover">
                      <img src={profile?.cover || noCover} alt="cover" />
                    </div>
                    <div className="profile-dp-container">
                      <div className="profile-dp">
                        <img src={dp || userDp} alt="dp" className="user-dp" />
                      </div>
                      <div className="username">{profile?.username}</div>
                    </div>
                  </div>
                  <div className="following-followers">
                    <div className="following">
                      <Link to={"/profile/following"} className="link">
                        Following
                      </Link>
                    </div>
                    <div className="followers">
                      <Link to={"/profile/followers"} className="link">
                        Followers
                      </Link>
                    </div>
                  </div>
                  <div className="profile-post-container">
                    {post.map((p) => {
                      return (
                        <div key={p._id} className="profile-post">
                          <div className="post-menu">
                            {postMenu ? (
                              <BsThreeDotsVertical
                                className="three-dot"
                                onClick={showMenu}
                              />
                            ) : (
                              <div
                                style={{
                                  fontSize: "1.5rem",
                                  float: "right",
                                  marginTop: "-1rem",
                                }}
                              >
                                <AiFillDelete
                                  className="delete-post"
                                  onClick={(e) => deletePost(e, p?._id)}
                                />
                                <AiFillEdit
                                  className="edit-post"
                                  onClick={() => {
                                    HandleEditPost(
                                      p?._id,
                                      p.description,
                                      p?.image
                                    );
                                  }}
                                />
                              </div>
                            )}
                          </div>
                          <div
                            className={!p?.image.length > 0 && "manage-order"}
                          >
                            {p?.image.length > 0 && (
                              <div className="post-pic ">
                                <img src={p?.image} alt="post" />
                              </div>
                            )}
                            <div className="post-like-comment">
                              <div>
                                {like.includes(p?._id) ||
                                p?.likes.includes(currentUserId) ? (
                                  <AiFillLike
                                    name="like"
                                    className="like"
                                    onClick={() => likeDislike(p?._id)}
                                  />
                                ) : (
                                  <AiOutlineLike
                                    name="dislike"
                                    className="dislike"
                                    onClick={() => likeDislike(p?._id)}
                                  />
                                )}
                              </div>
                              <div>{/* <FaRegComment /> */}</div>
                            </div>
                            <div>{p?.description}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="profile-trends adjust">
                <Trending />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
