import React, { useEffect, useState } from "react";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FcAddImage } from "react-icons/fc";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "./Spinner";

const Post = ({ currentUserId }) => {
  const [post, setPost] = useState([]);
  const [like, setLike] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPost() {
      const req = await fetch(
        `http://localhost:5000/api/hey/connection-post/${currentUserId}`,
        {
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );
      const res = await req.json();
      setPost(res);
      setLoading(false);
    }
    getPost();
  }, [post, currentUserId]);

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
      `http://localhost:5000/api/hey/post/like-dislike/${id}`,
      {
        method: "PUT",
        headers: {
          "Access-Control-Allow-Origin": "*",
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

  return (
    <>
      <div className="create-post">
        <ToastContainer position="top-left" />
        <div className="create-post-desc">
          <Link to="/createpost" className="post-Link">
            <div>Write something...</div>
          </Link>
        </div>
        <Link to="/createpost">
          <div className="add-post-pic">
            <FcAddImage />
          </div>
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {post.map((post) => {
            return (
              <div key={post._id} className="container post">
                {post?.image === "" ? (
                  <div>
                    <div className="post-desc">{post?.description}</div>
                    <div className="post-like-comment">
                      <div>
                        {like.includes(post?._id) ||
                        post?.likes.includes(currentUserId) ? (
                          <AiFillLike
                            name="like"
                            className="like"
                            onClick={() => likeDislike(post?._id)}
                          />
                        ) : (
                          <AiOutlineLike
                            name="dislike"
                            className="dislike"
                            onClick={() => likeDislike(post?._id)}
                          />
                        )}
                      </div>
                      <div>{/* <FaRegComment /> */}</div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="post-pic">
                      <img src={post?.image} alt="post-pic" />
                    </div>
                    <div className="post-like-comment">
                      <div>
                        {like.includes(post?._id) ||
                        post?.likes.includes(currentUserId) ? (
                          <AiFillLike
                            name="like"
                            className="like"
                            onClick={() => likeDislike(post?._id)}
                          />
                        ) : (
                          <AiOutlineLike
                            name="dislike"
                            className="dislike"
                            onClick={() => likeDislike(post?._id)}
                          />
                        )}
                      </div>
                      <div>{/* <FaRegComment /> */}</div>
                    </div>
                    <div className="post-desc">{post?.description}</div>
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}
    </>
  );
};

export default Post;
