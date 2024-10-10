import { useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
const [name, setName] = useState("");
const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [optcheck, setOtpcheck] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:9000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, lastname, email, password }),
      });

      const data = await response.json();

      console.log("register" + data);
      if (response.ok) {
        setOtpcheck(true);
        setMessage("OTP sent to your email. Please verify.");
      } else {
        setMessage(data.message || "Registration failed.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:9000/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp }),
        }
      );

      const data = await response.json();
      // console.log('otp' + data);

      // console.log('otp' + data.token);
      if (response.ok) {
        Cookies.set("token", data.token);

        navigate("/dashboard");
        setMessage("OTP verified successfully! You are now registered.");
      } else {
        setMessage(data.message || "OTP verification failed.");
      }
    } catch (error) {
      setMessage(
        "An error occurred during OTP verification. Please try again later."
      );
    }
  };

  return (
    <>
      <section className="container-form forms">
        <div class="form signup">
          <div class="form-content">
            <header>Signup</header>
            {message && <p>{message}</p>}
            {!optcheck ? (<>
              <form onSubmit={handleRegister}>

              <div class="field input-field">
            <input type="text" placeholder="First Name" class="input" value={name}
                    onChange={(e) => setName(e.target.value)} />
          </div>

          <div class="field input-field">
            <input type="text" placeholder="Last Name" class="input" value={lastname}
                    onChange={(e) => setLastname(e.target.value)} />
          </div>


<div class="field input-field">
            <input type="email" placeholder="Email" class="input" value={email}
                    onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div class="field input-field">
            <input type="password" placeholder="Create password" class="password" value={password}
                    onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div class="field button-field">
                <button type="submit">Signup</button>

                </div>

              </form>


        <div class="form-link">
        <span>Already have an account? <Link to="/login" class="link login-link">Login</Link></span>
      </div>

      </> ) : (
              <form onSubmit={handleVerifyOtp}>

<div class="field input-field">
            <input type="text" placeholder="OTP" class="input" value={otp}
                    onChange={(e) => setOtp(e.target.value)} />
          </div>

          <div class="field button-field">
                <button type="submit">submit</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
