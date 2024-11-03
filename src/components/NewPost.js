import React, { useState } from "react";
import styles from "./NewPost.module.css";

export const NewPost = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, link });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <input
        type="url"
        placeholder="Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        required
      />

      <div className={styles.buttons}>
        <button type="submit">Create</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};
