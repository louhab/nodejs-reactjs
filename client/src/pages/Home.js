import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

function Home() {
  // State variables
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(""); 

  // Hooks
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  // API endpoints
  const Posts_Url = "http://localhost:10/posts";
  const Get_the_Current_user_url = "http://localhost:10/users/validate/Token";
  const Post_the_like_url = "http://localhost:10/likes";
  const Post_url = "post";

  useEffect(() => {
    // Fetch posts and current user on component mount
    const fetchData = async () => {
      let accessToken = sessionStorage.getItem("accessToken");
      if (accessToken) {
        authContext.setAuthState(true);
      }

      try {
        // Fetch posts
        const postsResponse = await axios.get(Posts_Url, { headers: { Authorization: accessToken }});
        setPosts(postsResponse.data);
        
        // Fetch the current user
        const currentUserResponse = await axios.get(Get_the_Current_user_url, { headers: { Authorization: accessToken }});
        setUserId(currentUserResponse.data.id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to handle post navigation
  const handleNavigation = (value) => {
    navigate(Post_url + "/" + value.Id);
  };

  // Function to handle liking a post
  const handleLike = (value) => {
    let accessToken = sessionStorage.getItem("accessToken");
    const data = { PostId: value.Id };

    axios.post(Post_the_like_url, data, { headers: { Authorization: accessToken }})
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="App">
      <h1>Bonjour sur votre Blog</h1>
      <div className="post-container">
        {posts && posts.length > 0 ? (
          posts.map((value, key) => (
            <div className='post' key={key}>
              <div className='title'>{value.title}</div>
              <div className='body' onClick={() => handleNavigation(value)}>{value.postText}</div>
              <div className='footer'>
                {value.username}  
                {value.Likes.length > 0 ? (
                  <>
                    {/* Like the poste */}
                    <FontAwesomeIcon onClick={() => handleLike(value)} icon={faThumbsDown} className="like-icon" />
                    {value.Likes.length}
                  </>
                ) : (
                    <>
                      {/* Deslike the poste */}
                    <FontAwesomeIcon onClick={() => handleLike(value)} icon={faThumbsUp} className="like-icon" />
                    {value.Likes.length}
                  </>
                )}
              </div>
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
