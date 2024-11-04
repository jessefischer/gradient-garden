import React, { useState, useEffect } from "react";
import styles from "./BubbleModal.module.css";

export const BubbleModal = ({ isOpen, onClose, seedlingData, userId }) => {
  const [reactions, setReactions] = useState({
    "🌸": { count: 0, users: [] },
    "💧": { count: 0, users: [] },
    "☀️": { count: 0, users: [] },
    "💩": { count: 0, users: [] },
  });
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // load saved reactions when modal opens
  useEffect(() => {
    if (isOpen && seedlingData?.url) {
      const savedReactions = localStorage.getItem(
        `reactions_${seedlingData.url}`
      );
      if (savedReactions) {
        setReactions(JSON.parse(savedReactions));
      } else {
        // reset reactions when opening a new link
        setReactions({
          "🌸": { count: 0, users: [] },
          "💧": { count: 0, users: [] },
          "☀️": { count: 0, users: [] },
          "💩": { count: 0, users: [] },
        });
      }

      const savedComments = localStorage.getItem(
        `comments_${seedlingData.url}`
      );
      if (savedComments) {
        setComments(JSON.parse(savedComments));
      } else {
        setComments([]);
      }
    }
  }, [isOpen, seedlingData?.url]);

  if (!isOpen) return null;

  const { title = "", url = "" } = seedlingData || {};

  // check if user has already reacted to this link
  const hasUserReactedToLink = () => {
    return Object.values(reactions).some(({ users }) => users.includes(userId));
  };

  const handleReaction = (emoji) => {
    if (!userId) return; // prevent reactions if no user id
    if (hasUserReactedToLink()) return; // prevent multiple reactions to same link

    setReactions((prev) => {
      // create new reaction state
      const newReactions = {
        ...prev,
        [emoji]: {
          count: prev[emoji].count + 1,
          users: [...prev[emoji].users, userId],
        },
      };

      // save to localStorage
      if (url) {
        localStorage.setItem(`reactions_${url}`, JSON.stringify(newReactions));
      }

      return newReactions;
    });
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

    setComments((prev) => {
      const updatedComments = [...prev, newComment];
      // save to localStorage
      if (seedlingData?.url) {
        localStorage.setItem(
          `comments_${seedlingData.url}`,
          JSON.stringify(updatedComments)
        );
      }
      return updatedComments;
    });

    setComment("");
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
            {Object.entries(reactions).map(([emoji, { users }]) => (
              <button
                key={emoji}
                className={`${styles.reactionButton} ${
                  users.includes(userId) ? styles.reacted : ""
                }`}
                onClick={() => handleReaction(emoji)}
                disabled={hasUserReactedToLink()}
                title={
                  hasUserReactedToLink()
                    ? "You've already reacted to this link"
                    : "React!"
                }
              >
                <span className={styles.emoji}>{emoji}</span>
              </button>
            ))}
          </div>
          {hasUserReactedToLink() && (
            <p className={styles.reactionMessage}>
              You&apos;ve already reacted to this link
            </p>
          )}
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
            {[...comments].reverse().map((comment) => (
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
