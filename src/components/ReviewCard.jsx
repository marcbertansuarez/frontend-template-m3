import React, {useContext} from 'react';
import { AuthContext } from "../context/AuthContext";
import { Link } from 'react-router-dom';

export default function ReviewCard({review, handleDeleteReview}) {
    const { user } = useContext(AuthContext);
    return (
        <div>
                <p>{review.content}</p>
                <Link to={`/profile/${review.userId._id}`}>
                  {review.userId.username}
                </Link>
                {user._id === review.userId._id && <button onClick={() => handleDeleteReview(review._id, review.lineupId)}>Delete</button>}
              </div>
    )
}