import React, { useState, useEffect } from "react";
import styles from "./BubbleModal.module.css";
import { ref, set, push, remove } from "firebase/database";
import { database } from "@/util/firebase";

const REACTION_EMOJI_MAP = {
  "🌸": "flower",
  "💧": "water",
  "☀️": "sun",
  "💩": "poop",
};

export const BubbleModal = ({ onClose, seedlingData, userId, seedlingKey }) => {
  const [comment, setComment] = useState("");

  const comments = seedlingData?.comments || [];
  const reactions = seedlingData?.reactions || {};

  const { title = "", url = "" } = seedlingData || {};

  const handleReaction = (reaction, invert) => {
    if (!userId) return; // prevent reactions if no user id

    // Save reaction to database
    const reactionListRef = ref(
      database,
      `seedlings/${seedlingKey}/reactions/${reaction}`
    );
    if (invert) {
      const newReactionRef = push(reactionListRef);
      set(newReactionRef, userId);
    } else {
      // remove user id from reaction
      const userReactionKey = Object.entries(reactions[reaction] || {}).find(([, value]) => value === userId)?.[0];
      const userReactionRef = ref(database, `seedlings/${seedlingKey}/reactions/${reaction}/${userReactionKey}`);
      remove(userReactionRef);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim() || !userId) return;

    const newComment = {
      id: Date.now(),
      text: comment,
      userId,
      timestamp: new Date().toISOString(),
    };

    // Save comment to Firebase
    const commentListRef = ref(database, `seedlings/${seedlingKey}/comments`);
    const newCommentRef = push(commentListRef);
    set(newCommentRef, newComment);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <h2>{title}</h2>
        <div className={styles.linkPreviewContainer}>
          <div className={styles.linkPreview}>
            {/* Link preview image goes here */}
          </div>
          <div className={styles.linkContainer}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
          </div>
        </div>

        <div className={styles.reactionsSection}>
          {/* <h3>Reactions</h3> */}
          <div className={styles.reactionButtons}>
            {Object.entries(REACTION_EMOJI_MAP).map(([emoji, reaction]) => {
              const selected = Object.values(
                reactions[reaction] || {}
              )?.includes(userId);
              return (
                <button
                  key={emoji}
                  className={`${styles.reactionButton} ${
                    selected ? styles.reacted : ""
                  }`}
                  onClick={() => handleReaction(reaction, !selected)}
                  title={
                    selected ? "You've already reacted to this link" : "React!"
                  }
                >
                  <span className={styles.emoji}>{emoji}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={styles.commentsSection}>
          <h3>Comments</h3>
          <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className={styles.commentInput}
            />
            <button
              type="submit"
              className={styles.commentSubmitButton}
              disabled={!comment.trim()}
            >
              Submit
            </button>
          </form>
          <div className={styles.commentsList}>
            {[...Object.values(comments)].reverse().map((comment) => (
              <div key={comment.id} className={styles.commentItem}>
                {/* <span className={styles.commentUser}>
                  User {comment.userId}
                </span> */}
                <p className={styles.commentText}>{comment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
