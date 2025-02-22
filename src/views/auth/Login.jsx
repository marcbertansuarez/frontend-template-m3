import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import authService from "../../services/authService";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

export default function Login() {
  const { storeToken, authenticateUser, isLoggedIn } = useAuth();
  const [user, setUser] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(user);
      if (response.authToken) {
        storeToken(response.authToken);
        authenticateUser();
        navigate("/");
        toast.success("Welcome back!");
      } else {
        setErrorMessage("Unable to authenticate user");
      }
    } catch (error) {
      setErrorMessage("Unable to authenticate user");
    }
  };

  useEffect(() => {
    // When the component first renders, check if user is already logged in and redirects
    if (isLoggedIn) {
      navigate("/");
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="new-lineup">
      <form onSubmit={handleSubmit}>
        <label>Username or Email</label>
        <input
          required
          type="text"
          name="usernameOrEmail"
          value={user.usernameOrEmail}
          onChange={handleChange}
        />
        <label>Password</label>
        <div className="password-div">
          <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          {showPassword ? (
            <AiOutlineEye onClick={handlePassword} size={"30px"} />
          ) : (
            <AiOutlineEyeInvisible onClick={handlePassword} size={"30px"} />
          )}
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit">Log in </button>
      </form>
      <Link to="/signup">Don't have an account?</Link>
    </div>
  );
}
