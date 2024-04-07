import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";
import "../App.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    let accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      authContext.setAuthState(true);
    }
    
    // Fetch posts
    axios.get("http://localhost:10/posts", {
      headers: {
        Authorization: accessToken
      }
    })
    .then((response) => {
      setPosts(response.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
  }, []);

  const handleNavigation = (id) => {
    navigate("/post/" + id);
  };

  return (
    <div className="App">
      <h1>Bonjour sur votre Blog </h1>
      <div className="post-container">
        {posts && posts.length > 0 ? (
          posts.map((value, key) => (
            <div className='post' key={key} onClick={() => handleNavigation(value.id)}>
              <div className='title'>{value.title}</div>
              <div className='body'>{value.postText}</div>
              <div className='footer'>{value.username}</div>
            </div>
          ))
        ) : (
          sessionStorage.getItem("accessToken") ? (
            <div>No posts to show</div>
          ) : (
            <div>Vous devez être connecté</div>
          )
        )}
      </div>
    </div>
  );
}

export default Home;
