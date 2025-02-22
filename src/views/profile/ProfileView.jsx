/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect, useContext } from "react";
import profileService from "../../services/profileService";
import lineupService from "../../services/lineupService";
import likeService from "../../services/likeService";
import { Link, useNavigate } from "react-router-dom";
import getYouTubeVideoId from "../../utils/getYoutubeVideoId";
import { AuthContext } from "../../context/AuthContext";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import getAgentImage from "../../utils/getAgentImage";
import getMapImage from "../../utils/getMapImage";
import Loading from "../../components/Loading";
import { ImEyePlus } from "react-icons/im";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { IoMdArrowRoundBack } from "react-icons/io";
import ErrorPage from "../ErrorPage";

export default function ProfileView() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [lineups, setLineups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const getProfile = async () => {
    try {
      const response = await profileService.getProfile();
      setProfile(response.user);
      setLineups(response.lineupLikes);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleLikes = async (lineupId) => {
    if (!user) {
      navigate("/login");
    }
    try {
      await likeService.createLike(lineupId);
      getProfile();
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const handleDelete = async (lineupId) => {
    setIsLoading(true);
    try {
      await lineupService.deleteLineUp(lineupId);
      setLineups(lineups.filter((lineup) => lineup._id !== lineupId));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-user">
      <button className="goback-btn" onClick={() => navigate(-1)}>
        <IoMdArrowRoundBack size={30} color="white" />
      </button>
      {isLoading && <Loading />}
      {error && <ErrorPage />}
      {profile && (
        <div className="user">
          <div className="user-1">
            <img src={profile.image} alt={profile.username} />
            <h3>{profile.username}</h3>
          </div>
          <div className="user-2">
            <Link className="user-2-1" to="/profile/edit">
              <GrEdit /> Profile
            </Link>
            <Link className="user-2-1" to="/profile/liked">
              <AiFillHeart size={20} color="red" />
              LineUps
            </Link>
          </div>
        </div>
      )}

      <div className="lineup-view">
        {lineups &&
          !isLoading &&
          lineups.map((elem) => {
            return (
              <div className="lineup-card" key={elem._id}>
                <h1>{elem.title}</h1>
                <div className="lineup-agent">
                  <img src={getAgentImage(elem.agent)} alt={elem.agent} />
                  <h4>{elem.agent}</h4>
                </div>
                <div className="lineup-map">
                  <img src={getMapImage(elem.map)} alt={elem.map} />
                  <h4>{elem.map}</h4>
                </div>
                <div className="iframe-container">
                  <iframe
                    className="video-iframe"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                      elem.video
                    )}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="lineup-info">
                  <Link
                    className="lineup-user"
                    to={`/profile/${elem.author._id}`}
                  >
                    <img src={elem.author.image} alt={elem.author.username} />
                    <p>{elem.author.username}</p>
                  </Link>
                  <div className="lineup-like">
                    <div className="lineup-like-1">
                      <form onClick={() => handleLikes(elem._id)}>
                        {elem.isLiked ? (
                          <AiFillHeart size={20} color="red" />
                        ) : (
                          <AiOutlineHeart size={20} />
                        )}
                      </form>
                      <p>{elem.numberOfLikes}</p>
                    </div>
                    <Link to={`/lineup/${elem._id}`}>
                      <ImEyePlus color="white" />
                    </Link>
                  </div>
                </div>
                {user && user._id === elem.author._id && (
                  <div className="lineup-user-actions">
                    <Link to={`/lineup/${elem._id}/edit`}>
                      <GrEdit />
                    </Link>
                    <button onClick={() => handleDelete(elem._id)}>
                      <RiDeleteBin5Line />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
      </div>
      {user && (
        <div className="create">
          {" "}
          <Link className="create-lineup" to={"/lineup/create"}>
            <MdOutlineAddCircleOutline size={50} color="white" />
          </Link>{" "}
        </div>
      )}
    </div>
  );
}
