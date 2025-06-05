import { useState } from "react";

const NewPost = ({ setPost, cards, setCards }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState({ postTitle: "", file: "" });

  // Handles image post
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

//   Handles input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setName((prev) => ({ ...prev, [name]: value }));
  };

  // handle post functionalities
  const handlePost = (e) => {
    e.preventDefault();
    if (!preview || !name.postTitle.trim()) return;

    const newCard = {
      title: name.postTitle,
      imgSrc: preview,
      imgAlt: name.postTitle,
    };

    setCards((prev) => [newCard, ...prev]); // Add to top
    setName({ postTitle: "", file: "" });
    setPreview(null);
    setImage(null);
    setPost(false); // Close modal
  };

  return (
    <dialog open className="modal">
      <button className="btn btn-close" onClick={() => setPost(false)}>X</button>
      <form onSubmit={handlePost} className="modal-form">
        <label>Photo:</label>
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
          id="postImage"
        />
        <div className="custom-upload" onClick={() => document.getElementById("postImage").click()}>
          {preview ? <img src={preview} alt="Preview" className="upload-preview" /> : "Click to upload image"}
        </div>

        <label htmlFor="post-title">Title:</label>
        <input
          type="text"
          name="postTitle"
          id="post-title"
          value={name.postTitle}
          onChange={handleChange}
          required
          minLength="2"
        />

        <button type="submit" className="btn btn-dark">Post</button>
      </form>
    </dialog>
    
  );
};
export default NewPost;


