/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect, useContext } from "react";
import lineupService from "../../services/lineupService";
import reviewService from "../../services/reviewService";
import likeService from "../../services/likeService";
import { useParams, useNavigate } from "react-router-dom";
// import getYouTubeVideoId from '../utils/getYoutubeVideoId';
import { AuthContext } from "../../context/AuthContext";
import LineUpCard from "../../components/LineUpCard";
import ReviewCard from "../../components/ReviewCard";
import Loading from "../../components/Loading";
import { IoMdArrowRoundBack } from "react-icons/io";
import ErrorPage from "../ErrorPage";

export default function LineUpDetails() {
  const { user } = useContext(AuthContext);
  const { lineupId } = useParams();
  const [lineup, setLineup] = useState({});
  const [reviews, setReviews] = useState([]);
  const initialState = {
    content: "",
  };
  const [newReview, setNewReview] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const getOneLineup = async () => {
    try {
      const response = await lineupService.getLineUp(lineupId);
      setLineup(response.lineupLike);
      setReviews(response.reviews);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOneLineup();
    // eslint-disable-next-line
  }, [lineupId]);

  const handleDeleteLineup = async (lineupId) => {
    try {
      await lineupService.deleteLineUp(lineupId);
      navigate(user ? "/lineup" : "/lineups");
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const handleLikes = async (lineupId) => {
    if (!user) {
      navigate("/login");
    }
    try {
      await likeService.createLike(lineupId);
      getOneLineup();
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      await reviewService.deleteReview(reviewId);
      getOneLineup();
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const handleNewReview = (e) => {
    setNewReview({
      [e.target.name]: e.target.value,
    });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      await reviewService.createReview(lineupId, newReview);
      getOneLineup();
      setNewReview(initialState);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const handleSaveReview = async (reviewId, content) => {
    try {
      await reviewService.editReview(reviewId, content);
      setReviews((prev) => {
        return prev.map((review) => {
          return review._id === reviewId
            ? { ...review, content: content }
            : review;
        });
      });
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <div>
      <button className="goback-btn" onClick={() => navigate(-1)}>
        <IoMdArrowRoundBack size={30} color="white" />
      </button>
      {isLoading && <Loading />}
      {error && <ErrorPage />}
      {lineup && !isLoading && (
        <div>
          <LineUpCard
            key={lineup._id}
            lineup={lineup}
            handleDeleteLineup={handleDeleteLineup}
            handleLikes={handleLikes}
          />
        </div>
      )}
      <div className="review">
        <div className="reviews">
          {reviews.length === 0 && lineup && !isLoading && (
            <div>No reviews for this post yet</div>
          )}
          {reviews &&
            reviews.map((review) => {
              return (
                <ReviewCard
                  key={review._id}
                  review={review}
                  handleDeleteReview={handleDeleteReview}
                  handleSaveReview={handleSaveReview}
                />
              );
            })}
        </div>
        {user && lineup && !isLoading && (
          <form className="new-review" onSubmit={handleReviewSubmit}>
            <label>Add a new review</label>
            <input
              type="text"
              name="content"
              value={newReview.content}
              onChange={handleNewReview}
            />
            <button type="submit">New review</button>
          </form>
        )}
      </div>
    </div>
  );
}
