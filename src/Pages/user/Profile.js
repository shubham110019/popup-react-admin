// src/Profile.js
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Sidemenu from './comonent/Sidemenu';
import Topbar from './comonent/Topbar';
import '../../css/user/content.css';

const Profile = () => {
    const navigate = useNavigate();

    const [tokenkey, setTokenkey] = useState();
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState();


    useEffect(() => {
        const token = Cookies.get('token');
        setTokenkey(token);
        if (!token) {
            navigate('/login');
        } else {
            userApi(token); // Call userApi with token
        }
    }, [navigate]);

    const logout = () => {
        Cookies.remove('token');
        navigate('/login');
    };

    const scriptContent = `
        <script>(function(d, u, w) {var s = d.createElement('script');s.type = 'text/javascript';s.src = 'https://cdn.jsdelivr.net/gh/shubham110019/popup-html/script.js';s.async = true;s.dataset.user = u;s.dataset.website = w;d.getElementsByTagName('head')[0].appendChild(s);})(document, ${userId}, 200);</script>
    `;

    const userApi = async (token) => {
        try {
            const response = await fetch("http://localhost:9000/api/auth/user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`, 
                },
            });

            // Check if the response is okay
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }

            const data = await response.json();

            // Check if user exists in data
            if (data.user) {

                console.log(data.user)
                setUserId(data.user.userId)
                setName(data.user.name);
                setLastname(data.user.lastname);
                setEmail(data.user.email);
            } else {
                console.error("User data not found");
                // Optionally handle the case where user data is not found
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            // Optionally navigate to login or show an error message
            navigate('/login');
        }
    }

    return (
        <div>


<div className='main__content'>

<Topbar/>
         

<div class="container-fluid g-0">




            <h1>Hi, {name ? `${name} ${lastname}` : email}!</h1>
            <p></p>
            <p>This page is protected and only accessible if you're logged in.</p>


            <textarea className="form-control" rows="3" readOnly value={scriptContent.trim()} />


            <button onClick={logout}>Logout</button>

            </div>
            </div>
         
        </div>
    );
};

export default Profile;
