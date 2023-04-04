import React, {useContext, useState} from 'react';
import { AuthContext } from "../context/AuthContext";
import { Link } from 'react-router-dom';

export default function ReviewCard({review, handleDeleteReview, handleSaveReview}) {
    const { user } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editedReview, setEditedReview] = useState(review.content)
    console.log(isEditing)

    return (
        <div>
        {isEditing && <div>
            <input type="text" value={editedReview} onChange={(e) => setEditedReview(e.target.value)} />
        </div>}
                <p>{review.content}</p>
                <Link to={`/profile/${review.userId._id}`}>
                  {review.userId.username}
                </Link>
                {user._id === review.userId._id && <div>
                <button onClick={() => handleDeleteReview(review._id, review.lineupId)}>Delete</button>
                {isEditing ? (
                    <button onClick={() => {
                        handleSaveReview(review._id, editedReview);
                        setIsEditing(false);
                    }}>Save</button>
                ) : (
                    <button onClick={() => setIsEditing(true)}>Edit</button>
                )
                }
                </div>}
              </div>
    )
}