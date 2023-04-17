import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";

export default function ReviewCard({
  review,
  handleDeleteReview,
  handleSaveReview,
}) {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedReview, setEditedReview] = useState(review.content);

  return (
    <div className="review-card">
      {isEditing && (
        <div>
          <input
            className="review-card-input"
            type="text"
            value={editedReview}
            onChange={(e) => setEditedReview(e.target.value)}
          />
        </div>
      )}
      <p className={`review-card-p ${isEditing ? "hidden" : ""}`}>
        {review.content}
      </p>
      <div className="review-info">
        <Link className="review-user" to={`/profile/${review.userId._id}`}>
          <img src={review.userId.image} alt={review.userId.username} />
          <p>{review.userId.username}</p>
        </Link>
        {user._id === review.userId._id && (
          <div className="review-user-actions">
            {isEditing ? (
              <button
                onClick={() => {
                  handleSaveReview(review._id, editedReview);
                  setIsEditing(false);
                }}
              >
                Save
              </button>
            ) : (
              <button onClick={() => setIsEditing(true)}>
                <GrEdit />
              </button>
            )}
            <button
              onClick={() => handleDeleteReview(review._id, review.lineupId)}
            >
              <RiDeleteBin5Line />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
