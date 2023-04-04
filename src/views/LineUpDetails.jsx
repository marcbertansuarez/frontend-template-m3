/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect, useContext } from "react";
import lineupService from "../services/lineupService";
import reviewService from "../services/review.Service";
import { Link, useParams, useNavigate } from "react-router-dom";
import getYouTubeVideoId from '../utils/getYoutubeVideoId';
import { AuthContext } from "../context/AuthContext";

export default function LineUpDetails() {
  const { user } = useContext(AuthContext);
  const { lineupId } = useParams();
  const [lineup, setLineup] = useState({});
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({});
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate();

  const getOneLineup = async () => {
    try {
      const response = await lineupService.getLineUp(lineupId);
      setLineup(response.lineup);
      setReviews(response.reviews);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getOneLineup();
    // eslint-disable-next-line
  }, [lineupId]);

  const handleDeleteLineup = async (lineupId) => {
    try {
      await lineupService.deleteLineUp(lineupId);
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteReview = async (reviewId, lineupId) => {
    try {
      await reviewService.deleteReview(reviewId);
      getOneLineup();
    } catch (error) {
      console.log(error)
    }
  }

  const handleNewReview = (e) => {
    setNewReview({
          [e.target.name]: e.target.value
  })
};

const handleReviewSubmit = async (e) => {
  e.preventDefault()
  try {
    await reviewService.createReview(lineupId, newReview);
    getOneLineup();
  } catch (error) {
    console.log(error)
  }
}

  return (
    <div>
      {isLoading && <div>LOADING...</div>}
      {lineup && !isLoading && (
        <div key={lineup._id}>
          <h1>{lineup.title}</h1>
          <h4>{lineup.agent}</h4>
          <h4>{lineup.map}</h4>
          <iframe
            src={`https://www.youtube.com/embed/${getYouTubeVideoId(
              lineup.video
            )}`}
          ></iframe>
          {lineup.author && (
            <Link to={`/profile/${lineup.author._id}`}>
              {lineup.author.username}
            </Link>
          )}
          {user && user._id === lineup.author._id && <div>
          <button onClick={() => handleDeleteLineup(lineup._id)}>Delete</button>
          <Link to={`/lineup/${lineup._id}/edit`}>Edit</Link>
          </div>}
        </div>
      )}
      {user && <div>
        <form onSubmit={handleReviewSubmit}>
          <label>Add a new review for this lineup</label>
          <input type="text" name="content" value={newReview.value} onChange={handleNewReview}/>
          <button type="submit">New review</button>
        </form>
      </div>}
      <div>
        {reviews &&
          reviews.map((review) => {
            return (
              <div key={review._id}>
                <p>{review.content}</p>
                <Link to={`/profile/${review.userId._id}`}>
                  {review.userId.username}
                </Link>
                {user._id === review.userId._id && <button onClick={() => handleDeleteReview(review._id, review.lineupId)}>Delete</button>}
              </div>
            );
          })}
      </div>
    </div>
  );
}
