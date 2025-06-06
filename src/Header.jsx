import { useState } from "react";
import defaultAvatar from "../public/assets/images/avatar.png";


function Header() {
  const [modal, useModal] = useState(false);
  const [post, setPost] = useState(false);
  const [error, setError] = useState("");
  const [profileText, setProfileText] = useState("");
  const [profileImage, setProfileImage] = useState(false);
  const [descriptionText, setDescriptionText] = useState("");
  const [removeText, setRemoveText] = useState(true);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(defaultAvatar);

  // Form segment
  const [form, setForm] = useState({
    profileName: "",
    text: "",
  });

  // display Profile modal
  function EditProfile() {
    useModal(true);
  }

  // when the close button is clicked, it closes the modal
  function closeModal() {
    useModal(false);
  }

  // This function is in charge of previewing profile image
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;
    setImage(file);

    //For preview

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Hnadles input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));

    // Clear error if input becomes valid
    if (name === "profileName" && value.length >= 2) {
      setError("");
    } else if (name === "text" && value.length >= 2) {
      setError("");
    }
  }

  // Handles submitting the data of the form
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form value:", form);

    // Form verification
    if (form.profileName.length < 2) {
      setError("Name must be at least 2 characters long");
      return;
    }

    if (form.text.length < 2) {
      setError("Text must be at least 2 characters long");
      return;
    }

    // If all validations pass
    setError(""); // clear previous error
    console.log("Form is valid!");
    
    // to append the value of the for to the profile
    setRemoveText(false); // it removes the previous description text
    setDescriptionText(form.text);
    setProfileText("true"); // it removes the previous profile text
    setProfileText(form.profileName);
    closeModal(false)
    // image upload
    setProfileImage(true);
  }

  return (
    <div>
      <header role="banner">
        <div className="logo-container" aria-label="Logo container">
          <a href="#" className="logo" aria-label="Go to homepage">
            <img
              src="./public/assets/icons/spot-logo.svg"
              alt="Insta-spot logo and home-page link"
            />
            <span className="logo-text">SPOTS</span>
          </a>
        </div>

        {/* the news column  */}
        <div className="banner" aria-label="User profile banner">
          <div
            className="avatar-section"
            role="group"
            aria-label="User information"
          >
            {removeText && (
              <img
                className="avatar-img"
                id="profileImage"
                src="./public/assets/images/avatar.png"
                alt="Profile image of Bessie Coleman"
                loading="lazy"
              />
            )}

            {profileImage && preview && (
              <img src={preview} alt="Preview" width="100px" />
            )}
            <div className="properties">
              <div className="details">
                {removeText && (
                  <h3 className="name" id="profileName">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Voluptatibus nam repellat sint laborum ratione, porro
                    molestias minima ad tempora! Dolorem inventore ipsum
                    corrupti alias sapiente at, atque quidem nemo fuga.
                  </h3>
                )}

                {profileText && (
                  <h3 className="name" id="profileName">
                    {profileText}
                  </h3>
                )}

                {removeText && (
                  <p className="description" id="profileTitle">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab,
                    maiores rem velit minus accusantium voluptas officiis totam
                    praesentium eaque ipsum! Sed is tempore doloribus ipsa quasi
                    reiciendis labore, neque dicta!
                  </p>
                )}

                {descriptionText && (
                  <p className="description" id="profileTitle">
                    {descriptionText}
                  </p>
                )}
              </div>

              <button
                className="btn btn-light"
                id="editBtn"
                type="button"
                aria-label="Edit profile"
                onClick={EditProfile}
              >
                <img src="./public/assets/icons/edit.svg" alt="edit icon" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </header>

      {modal && (
        <dialog className="modal" id="editModal" aria-label="modal-section">
          <button
            className="btn btn-close btn-light"
            id="cancelBtn"
            onClick={closeModal}
          >
            X
          </button>
          <form
            noValidate
            className="modal-form"
            id="editForm"
            onSubmit={handleSubmit}
          >
            {/* The profile name  */}

            <div className="name-edit form-content">
              <div className="form-label">
                <label htmlFor="editName">Name:</label>
                <span className="error hidden" id="name-error">
                  Field cannot be empty
                </span>
              </div>
              <input
                type="text"
                name="profileName"
                id="editName"
                value={form.profileName}
                placeholder="Enter your name"
                required
                minLength={2}
                onChange={handleChange}
              />

              {error && <p className="error">{error}</p>}
            </div>

            {/* The description  */}
            <div className="form-content description-edit">
              <div className="form-label">
                <label htmlFor="editDesc">Description:</label>
                <span className="error hidden" id="description-error">
                  Field cannot be empty
                </span>
              </div>
              <input
                type="text"
                name="text"
                id="editDesc"
                placeholder="Enter your description"
                required
                minLength={2}
                onChange={handleChange}
                value={form.text}
              />
              <p className="error">{error}</p>
            </div>

            {/* For image upload  */}

            <div className="form-content avatar-upload">
              <label>Profile Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                name="file"
                id="editImage"
              />
            </div>
            <button
              type="submit"
              className="btn btn-dark"
              id="saveBtn"
              onSubmit={handleSubmit}
            >
              Save
            </button>
          </form>
        </dialog>
      )}

      
    </div>
  );
}

export default Header;
