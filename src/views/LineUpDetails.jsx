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
  const navigate = useNavigate();

  const getOneLineup = async () => {
    try {
      const response = await lineupService.getLineUp(lineupId);
      setLineup(response.lineup);
      setReviews(response.reviews);
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
      navigate(`/lineup/${lineupId}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      {lineup && (
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
      <div>
        {reviews &&
          reviews.map((review) => {
            return (
              <div key={review._id}>
                <p>{review.content}</p>
                <Link to={`/profile/${review.userId._id}`}>
                  {review.userId.username}
                </Link>
                {user._id === review.userId && <button onClick={() => handleDeleteReview(review._id, review.lineupId)}>Delete</button>}
              </div>
            );
          })}
      </div>
    </div>
  );
}
