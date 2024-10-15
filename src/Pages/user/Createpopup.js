// src/Profile.js
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Sidemenu from "./comonent/Sidemenu";
import "../../css/user/content.css";
import Topbar from "./comonent/Topbar";
import "../../css/user/createPop.css";



const Createpopup = () => {
  const navigate = useNavigate();

  const [htmlfrm, setHtmlfrm] = useState(""); // For user input HTML
  const [html, setHtml] = useState(""); // Full HTML with #popid
  const [js, setJs] = useState("");
  const [css, setCss] = useState("");
  const [message, setMessage] = useState("");

  const [userId, setUserId] = useState("");
  const [popid, setPopid] = useState("");

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
    } else {
      userApi(token);
    }
  }, [navigate]);

  const logout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  const userApi = async (token) => {
    try {
      const response = await fetch("http://localhost:9000/api/auth/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();

      if (data.user) {
        setUserId(data.user.userId);
        setName(data.user.name);
        setLastname(data.user.lastname);
        setEmail(data.user.email);
      } else {
        console.error("User data not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      navigate("/login");
    }
  };

  const popupSubmit = async (e) => {
    e.preventDefault();

    // Minify CSS by appending the popid to each rule
    const minifiedCss = minifyCss(css, popid);

    // Wrap the form HTML inside a new div with the unique #popid
    const finalHtml = `<div class="Campaign CampaignType--popup" id="om-canva-${popid}"><div class="mendon-c-canvas Campaign__canvas" id="om-${popid}-optin"><span class="close-btn" id="closePopup">×</span> ${htmlfrm}</div></div>`;
    setHtml(finalHtml);

    try {
      const response = await fetch("http://localhost:9000/api/modal/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          html: finalHtml,
          css: minifiedCss,
          js,
          popid,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Popup successfully submitted!");
        // Clear form inputs after successful submission
        setHtmlfrm("");
        setCss("");
        setJs("");
      } else {
        setMessage(data.message || "Failed to submit popup.");
      }
    } catch (error) {
      setMessage("An error occurred during submission. Please try again.");
    }
  };

  const minifyCss = (css, popid) => {
    // Prepend `div#${popid}` to each rule in the CSS
    return css
      .split("}")
      .map((rule) => {
        if (rule.trim()) {
          return ` div#om-${popid} ${rule.trim()}}`;
        }
        return "";
      })
      .join("")
      .replace(/\s+/g, " ") // Replace multiple spaces with a single space
      .trim(); // Remove leading/trailing spaces
  };


  return (
    <div>
      <div className="main__content">
        <Topbar />
        <div className="container-fluid g-0">

          <div className="row page_full">
        
            <div className="PageSidebar col-md-3">
              {message && <p>{message}</p>}
              <form onSubmit={popupSubmit}>
                <div className="form-group d-none">
                  <input
                    type="type"
                    className="form-control"
                    value={userId}
                    readOnly
                  />
                </div>

                <div className="form-group">
                  <label>Html Content</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={htmlfrm}
                    onChange={(e) => setHtmlfrm(e.target.value)}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>CSS</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={css}
                    onChange={(e) => setCss(e.target.value)}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label>Javascript</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    value={js}
                    onChange={(e) => setJs(e.target.value)}
                  ></textarea>
                </div>

                <button type="submit">Submit</button>
              </form>
            </div>

            <div className="PageBodyContent col-md-9">

            


            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Createpopup;
