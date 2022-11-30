import styles from "./EditPost.module.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../Components/Context/AuthContext";
import { useInsertDocument } from "../../Hooks/useInsertDocument";
import { useFetchDocument } from "../../Hooks/useFetchDocument";
import { useUpdateDocument } from "../../Hooks/useUpdateDocument";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);

      const textTags = post.tags.join(",");
      setTags(textTags);
    }
  }, [post]);

  const { user } = useAuthValue();

  const { updateDocument, response } = useUpdateDocument("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    try {
      new URL(image);
    } catch (error) {
      setFormError("image must be an URL !");
    }

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    if (!title || !image || !tags || !body) {
      setFormError("Please make sure all fields are filled in correctly.");
    }

    if (formError) return;

    const data = {
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };

    updateDocument(id, data);

    navigate("/dashboard");
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editar Post : {post.title}</h2>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Title: </span>
              <input
                type="text"
                name="title"
                required
                placeholder="Insert a title..."
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>
            <label>
              <span>Image URL: </span>
              <input
                type="text"
                name="image"
                required
                placeholder="Insert an image in your post."
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>
            <label>
              <span>Content: </span>
              <textarea
                name="body"
                required
                placeholder="Speak up your mind "
                onChange={(e) => setBody(e.target.value)}
                value={body}
              />
            </label>
            <label>
              <span>Tags: </span>
              <input
                type="text"
                name="tags"
                required
                placeholder="Enter tags separated by a comma."
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label>

            {!response.loading && <button className="btn">Editar</button>}
            {response.loading && (
              <button className="btn" disabled>
                Aguarde...
              </button>
            )}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
