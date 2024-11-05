import React, { useState } from "react";
import styles from "./NewPost.module.css";
import { randomColorFromPalette } from "@/util/color";

const NewPost = ({ isOpen, onClose, onSubmit, mousePosition }) => {
  const [title, setTitle] = useState("");
  const [url, setURL] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Get the Open Graph image data for the URL if it exists.
    const ogResponse = await fetch(`/api/open-graph?url=${url}`);
    const ogData = await ogResponse.json();
    const ogImageData = ogData.ogImage;
    const imgSrc = Array.isArray(ogImageData)
      ? ogImageData?.[0].url
      : ogImageData?.url;
    console.log({ ogImageData, imgSrc });
    const newSeedling = {
      x: mousePosition.x,
      y: mousePosition.y,
      title,
      url,
      size: 200, //default size
      color: randomColorFromPalette(),
      imgSrc,
    };
    onSubmit(newSeedling); // Call the onSubmit function passed from App.js
    setTitle("");
    setURL("");
  };

  return (
    <div className={styles.newPostOverlay} onClick={onClose}>
      <div
        className={styles.newPostContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>Plant a Seedling</h2>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Seedling Title"
              required
            />
            <input
              type="text"
              value={url}
              onChange={(e) => setURL(e.target.value)}
              placeholder="Paste Link URL"
            />
            <button type="submit">Plant</button>
          </form>
        </div>
        <p className={styles.caption}>
          No idea what to plant? Share your most recent open tab!
        </p>
      </div>
    </div>
  );
};

export default NewPost;
