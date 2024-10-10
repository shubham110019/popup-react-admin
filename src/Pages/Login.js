import React from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import "../css/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [otp, setOpt] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handlelogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:9000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        Cookies.set("token", data.token);
        navigate("/dashboard");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  };
  return (
    <>
     <section className="container-form forms">
    

      <div class="form login">

        <div className="alert alert-warning">
            email: admin@testing.com<br/> pass: 123
        </div>
        <div class="form-content">
          <header>Login</header>
          {message && <p>{message}</p>}
          <form onSubmit={handlelogin}>
            <div class="field input-field">
              <input
                type="email"
                placeholder="Email"
                className="input"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>

            <div class="field input-field">
              <input
                type="password"
                placeholder="Password"
                className="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <i class="bx bx-hide eye-icon"></i>
            </div>

            <div class="field button-field">
              <button type="submit">Login</button>
            </div>
          </form>

          <div class="form-link">
            <span>
              Don't have an account?{" "}
              <Link to="/register" className="link signup-link">
                Signup
              </Link>
            </span>
          </div>
        </div>
      </div>
      </section>
    </>
  );
};

export default Login;
