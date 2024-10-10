import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Addsite = ({ closePopup }) => {
  const [sitename, setSitename] = useState("");
  const [domain, setDomain] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [siteId, setSiteId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    const userId = Cookies.get("userId");
    setToken(token);
    setUserId(userId);
  }, [navigate]);




  function hashDomain(domain) {
    let hash = 0;
    for (let i = 0; i < domain.length; i++) {
      const char = domain.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; 
    }
    return Math.abs(hash);
  }

  // Function to extract only the root domain
  const extractRootDomain = (url) => {
    let hostname;

    // Remove protocol (http, https, etc.)
    if (url.indexOf("//") > -1) {
      hostname = url.split("/")[2];
    } else {
      hostname = url.split("/")[0];
    }

    // Remove port number and parameters
    hostname = hostname.split(":")[0].split("?")[0];

    // Remove 'www.' if it exists
    if (hostname.startsWith("www.")) {
      hostname = hostname.substring(4);
    }

    return hostname;
  };

  const handleWebsitesubmit = async (event) => {
    event.preventDefault();
    const formattedDomain = extractRootDomain(domain); // Extract root domain

    const websiteIdNumber = hashDomain(formattedDomain); 


    try {
      const response = await fetch("http://localhost:9000/api/website", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sitename, domain: formattedDomain, token, userId, siteId: websiteIdNumber }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <div className="header">
        <h4>Add New Site</h4>
      </div>
      <div className="content">
        {message && <p>{message}</p>}
        <form onSubmit={handleWebsitesubmit}>
          <div className="form-group row">
            <label htmlFor="SiteName" className="col-sm-2 col-form-label">
              Site Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="SiteName"
                placeholder="Google"
                value={sitename}
                onChange={(e) => setSitename(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="Domain" className="col-sm-2 col-form-label">
              Domain
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id="Domain"
                placeholder="https://example.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
            </div>
          </div>

          <div className="">
            <button type="submit" className="btn btn-primary">Create Site</button>
            <button onClick={closePopup} className="btn btn-link">Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Addsite;
