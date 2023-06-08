import "../Home.css";
import React, { FormEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState({} as any);

  const token = localStorage.getItem("JWT_token");
  const _id = localStorage.getItem("_id");

  type CreateUserResponse = {
    firstName: string;
    lastName: string;
    email: string;
    data: any;
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    const user = axios
      .get<CreateUserResponse>(
        `https://user-auth-backend-bwux.onrender.com/user/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setUser(res.data.data.user);
      });
  }, [token, navigate, _id]);

  return (
    <div className="body">
      <div className="user-div">
        <h1>
          Welcome Back!
          <strong>
            {" "}
            {user.firstName} {user.lastName}
          </strong>
        </h1>
        <div className="user-details">
          <label>Your email:</label>
          <input type="text" placeholder={user.email} disabled={true} />
        </div>
        <button
          className="logout-button"
          onClick={() => {
            localStorage.removeItem("JWT_token");
            localStorage.removeItem("_id");
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
