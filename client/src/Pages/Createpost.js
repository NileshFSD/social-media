import React, { useEffect, useState } from "react";
import addPost from "../Assets/add-post.png";
import jwtdecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { toast, ToastContainer } from "react-toastify";

const Createpost = () => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("hey-token");
  const userId = jwtdecode(token).id;
  const navigate = useNavigate();

  const [postPic, setPostPic] = useState("");
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

  const handlePic = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setPostPic(base64);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://rich-gold-pangolin-kilt.cyclic.app/api/hey/create-post",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          image: postPic,
          description: description,
        }),
      }
    );
    const data = await response.json();
    if (data.success) {
      toast.success(data.msg);
      navigate("/dashboard");
    } else {
      toast.error(data.msg);
    }
  };

  return (
    <>
      <ToastContainer position="top-left" />
      {loading ? (
        <Spinner />
      ) : (
        <div className="createpost-container">
          <form className="create-post" onSubmit={handlePost}>
            <div className="picture-container">
              <label htmlFor="post-picture">
                <img src={postPic || addPost} alt="" />
              </label>
              <input
                type="file"
                name="post-picture"
                id="post-picture"
                onChange={handlePic}
              />
            </div>
            <div>
              <textarea
                name="post-description"
                id="post-description"
                placeholder="Post description"
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <button type="submit" className="post-btn">
                Post
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Createpost;
