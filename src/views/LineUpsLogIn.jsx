/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect, useContext } from "react";
import lineupService from "../services/lineupService";
import likeService from "../services/likeService";
import { Link, useNavigate } from "react-router-dom";
import getYouTubeVideoId from "../utils/getYoutubeVideoId";
import { AuthContext } from "../context/AuthContext";
import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import getAgentImage from "../utils/getAgentImage";
import getMapImage from "../utils/getMapImage";
import { MdOutlineAddCircleOutline } from "react-icons/md";
import { ImEyePlus } from "react-icons/im";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import Loading from "../components/Loading";
import { FaSearch } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import ErrorPage from "../views/ErrorPage";

export default function LineUpsLogIn() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [lineups, setLineups] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const getLineups = async () => {
    try {
      const response = await lineupService.getLineUps();
      setLineups(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLineups();
  }, []);

  const handleLikes = async (lineupId) => {
    if (!user) {
      navigate("/login");
    }
    try {
      await likeService.createLike(lineupId);
      getLineups();
    } catch (error) {
      console.log(error);
      setError(true);
      setIsLoading(false);
    }
  };

  const handleDelete = async (lineupId) => {
    try {
      await lineupService.deleteLineUp(lineupId);
      setLineups(lineups.filter((lineup) => lineup._id !== lineupId));
    } catch (error) {
      console.log(error);
      setError(true);
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmitSearch = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await lineupService.searchLineUp(search);
      setLineups(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setIsLoading(false);
    }
  };

  const handleClearSearch = async () => {
    try {
      setSearch("");
      getLineups();
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  const handleSubmitPopularity = async (e) => {
    e.preventDefault();
    try {
      const response = await lineupService.getPopularity();
      setLineups(response);
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <div>
      {isLoading && <Loading />}
      {error && <ErrorPage />}
      <div>
        {!isLoading && (
          <div>
            <button className="goback-btn" onClick={() => navigate(-1)}>
              <IoMdArrowRoundBack size={30} color="white" />
            </button>
            <h1 className="lineup-h1">Find LineUps</h1>
            <div className="form-search-general">
              <form className="form-search" onSubmit={handleSubmitSearch}>
                <div className="form-search-input">
                  <div className="form-search-1">
                    <input
                      type="text"
                      name="agent"
                      onChange={handleChange}
                      placeholder="Search for agent..."
                    />
                    <button type="submit">
                      <FaSearch />
                    </button>
                  </div>
                  <button
                    className="form-search-btn2"
                    type="button"
                    onClick={handleClearSearch}
                  >
                    Clear
                  </button>
                </div>
              </form>
              <form onSubmit={handleSubmitPopularity}>
                <button className="popularity-btn" type="submit">
                  Filter by popularity
                </button>
              </form>
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
                      to={user ? `/profile/${elem.author._id}` : "/login"}
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
                        <ImEyePlus size={20} color="white" />
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
