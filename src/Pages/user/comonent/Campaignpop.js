import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const Campaignpop = ({ closePopup, onCampaignAdded }) => {
  const [sitename, setSitename] = useState("");
  const [site, setSite] = useState("");
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [siteId, setSiteId] = useState("");
  const [popid, setPopid] = useState("");

  const [campaignName, setCampaignName] = useState("");

  const activeSiteId = useSelector((state) => state.site.activeSiteId);


  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("token");
    const userId = Cookies.get("userId");
    setToken(token);
    setUserId(userId);
  }, [navigate]);



  const generateRandomString = (length) => {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789"; // Characters for random part
    let result = "";
    const charactersLength = characters.length;
  
    // Generate random string of specified length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    // Get current date components (formatted as MMDDYYYYSS)
    const currentDate = new Date();
    const dateString = (currentDate.getMonth() + 1).toString().padStart(2, '0') + // Month (MM)
                       currentDate.getDate().toString().padStart(2, '0') +         // Date (DD)
                       currentDate.getFullYear() +                                 // Year (YYYY)
                       currentDate.getSeconds().toString().padStart(2, '0');       // Seconds (SS)
  
    // Insert the date string into the random string at a random position
    const randomPosition = Math.floor(Math.random() * (result.length + 1));
    const finalResult = result.slice(0, randomPosition) + dateString + result.slice(randomPosition);
  
    return finalResult;
  };
  
  useEffect(() => {
    setPopid(generateRandomString(15)); // Generate a 20-character string

    setSiteId()
  }, []);


  const handleCreatesModal = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:9000/api/modal/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ campaignName, popid, siteId: activeSiteId, userId }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);

        onCampaignAdded({campaignName, popid, siteId: activeSiteId, userId});
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
        <h4>Name your campaign</h4>
      </div>
      <div className="content-po">
        {message && <p>{message}</p>}
        <form onSubmit={handleCreatesModal}>

          <input type="text" className="form-control d-none" value={popid}/>

          <div className="form-group ">
            <label htmlFor="SiteName" className="col-form-label">
            What do you want to call your popup campaign?
            </label>
            <div className="">
              <input
                type="text"
                className="form-control"
                id="SiteName"
                placeholder="Name your campaign"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group d-none">
            <label htmlFor="Domain" className="col-form-label">
            Which website(s) do you want to load this campaign on?
            </label>
            <div className="">
              <input
                type="text"
                className="form-control"
                value={activeSiteId}
              />
            </div>
          </div>

          <div className="">
            <button type="submit" className="btn btn-primary">Start Building</button>
            <button onClick={closePopup} className="btn btn-link">Cancel</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Campaignpop;
