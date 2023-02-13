import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
const EditPost = ({ editPostDetails, userId, setEditMode }) => {
  const [description, setDescription] = useState(editPostDetails?.description);

  const handleEdit = async () => {
    const req = await fetch(
      `https://rich-gold-pangolin-kilt.cyclic.app/api/hey/update-post/${editPostDetails?.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: description,
          userId: userId,
        }),
      }
    );

    const data = await req.json();
    if (data.success === true) {
      toast.success(data.msg);
      setEditMode(false);
    } else {
      toast.error(data.msg);
    }
  };
  return (
    <div className="createpost-container">
      <ToastContainer position="top-left" />
      <div>
        <IoMdClose className="close" onClick={() => setEditMode(false)} />
      </div>
      <form className="create-post" onSubmit={handleEdit}>
        <div className="picture-container">
          <img src={editPostDetails?.picture} alt="post-pic" />
        </div>
        <div>
          <textarea
            name="post-description"
            id="post-description"
            placeholder="Post description"
            value={description}
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
  );
};

export default EditPost;
