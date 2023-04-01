/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect } from "react";
import lineupService from "../services/lineupService";
import { Link, useParams } from "react-router-dom";
import getYouTubeVideoId from '../utils/getYoutubeVideoId';

export default function LineUpDetails() {
  const { lineupId } = useParams();
  const [lineup, setLineup] = useState({});
  const [reviews, setReviews] = useState([]);

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
              </div>
            );
          })}
      </div>
    </div>
  );
}
