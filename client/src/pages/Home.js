import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import "../App.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch posts
    axios.get("http://localhost:10/posts", {
      headers: {
        Authorization: sessionStorage.getItem("accessToken")
      }
    })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Function to navigate to a post's details page
  const handleNavigation = (id) => {
    navigate("/post/" + id);
  };

  return (
    <div className="App">
      {/* Render posts if available */}
      {posts && posts.length > 0 ? (
        posts.map((value, key) => (
          <div className='post' key={key} onClick={() => handleNavigation(value.id)}>
            <div className='title'>{value.title}</div>
            <div className='body'>{value.postText}</div>
            <div className='footer'>{value.username}</div>
          </div>
        ))
      ) : (
        // Render a message if no posts available
        <div>No posts to show</div>
      )}
    </div>
  );
}

export default Home;
