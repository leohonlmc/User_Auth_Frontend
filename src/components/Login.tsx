import "../Login.css";
import React, { FormEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
const { REACT_APP_API_ENDPOINT } = process.env;

function Login() {
  const [values, setValues] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const token = localStorage.getItem("JWT_token");

  type CreateUserResponse = {
    email: string;
    password: string;
    token: string;
    _id: string;
    data: any;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await axios.post<CreateUserResponse>(
        REACT_APP_API_ENDPOINT + "/login",
        {
          ...values,
        },
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("JWT_token", data.token);
      localStorage.setItem("_id", data.data.user._id);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/Home");
    }
  }, [token, navigate]);

  return (
    <div className="body">
      <div className="login-div">
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1>Login</h1>
          <div className="info">
            <label htmlFor="email">Email</label>
            <br />
            <input
              className="login-input"
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
            />
            <br />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input
              className="login-input"
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
            />
          </div>

          <button className="submit-login" type="submit">
            Submit
          </button>
          <br />
          <br />
          <span>
            Don't have an account ?<Link to="/register"> Register </Link>
          </span>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
