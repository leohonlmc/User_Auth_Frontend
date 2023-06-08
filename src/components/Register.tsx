import "../Login.css";
import React, { FormEvent, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const { REACT_APP_API_ENDPOINT } = process.env;

function Register() {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("JWT_token");

  type CreateUserResponse = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ ...values });

    try {
      const { data } = await axios.post<CreateUserResponse>(
        "https://user-auth-backend-bwux.onrender.com/register",
        {
          ...values,
        },
        {
          withCredentials: true,
        }
      );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/Home");
    }
  }, [token, navigate]);

  const [showPasswordRequirements, setShowPasswordRequirements] =
    useState(false);

  const handleFocus = () => {
    setShowPasswordRequirements(true);
  };

  const handleBlur = () => {
    setShowPasswordRequirements(false);
  };

  return (
    <div className="body">
      <div className="login-div">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="back-btn-div">
            <Link className="back-btn" to="/">
              {" "}
              Back{" "}
            </Link>
          </div>
          <h1>Register</h1>
          <div className="info">
            <label htmlFor="email">First Name</label>
            <br />
            <input
              className="login-input"
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
            />
            <br />
            <br />
            <label htmlFor="email">Last Name</label>
            <br />
            <input
              className="login-input"
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
            />
            <br />
            <br />
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
              pattern="^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
              onChange={(e) => {
                setValues({ ...values, [e.target.name]: e.target.value });
              }}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            {showPasswordRequirements && (
              <p className="pwd-requirement">
                Password must be at least <strong> 8 characters</strong>,{" "}
                <strong>one uppercase letter</strong> and{" "}
                <strong>one number</strong> .
              </p>
            )}
          </div>

          <button className="submit-login" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
