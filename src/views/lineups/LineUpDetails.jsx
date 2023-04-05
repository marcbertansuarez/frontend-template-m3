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

export default function LineUpDetails() {
  const { user } = useContext(AuthContext);
  const { lineupId } = useParams();
  const [lineup, setLineup] = useState({});
  const [reviews, setReviews] = useState([]);
  const initialState = {
    content: ''
  }
  const [newReview, setNewReview] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate();

  const getOneLineup = async () => {
    try {
      const response = await lineupService.getLineUp(lineupId);
      setLineup(response.lineupLike);
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

  const handleLikes = async (lineupId) => {
    if (!user) {
      navigate('/login');
    }
    try {
      await likeService.createLike(lineupId);
      getOneLineup();
    } catch (error) {
      console.log(error)
    }
  };

  const handleDeleteReview = async (reviewId) => {
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
    setNewReview(initialState)
  } catch (error) {
    console.log(error)
  }
}

const handleSaveReview = async (reviewId, content) => {
  try {
    await reviewService.editReview(reviewId, content);
    setReviews((prev) => {
      return prev.map((review) => {
        return (
          review._id === reviewId ? {...review, content: content} : review
        )
      })
    })
  } catch (error) {
    
  }
}

  return (
    <div>
      {isLoading && <div>LOADING...</div>}
      {lineup && !isLoading && (
        <div>
          <LineUpCard key={lineup._id} lineup={lineup} handleDeleteLineup={handleDeleteLineup} handleLikes={handleLikes}/>
        </div>
      )}
      {user && <div>
        <form onSubmit={handleReviewSubmit}>
          <label>Add a new review for this lineup</label>
          <input type="text" name="content" value={newReview.content} onChange={handleNewReview}/>
          <button type="submit">New review</button>
        </form>
      </div>}
      <div>
      {reviews.length === 0 && <div>No reviews for this post yet</div>}
        {reviews &&
          reviews.map((review) => {
            return (
              <ReviewCard key={review._id} review={review} handleDeleteReview={handleDeleteReview} handleSaveReview={handleSaveReview}/>
            );
          })}
      </div>
    </div>
  );
}
