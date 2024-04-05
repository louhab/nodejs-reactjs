import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // assuming you're using react-router-dom
import "../App.css";
import axios from "axios";
import "../App.css"


function Poste() {
  const [post, setPost] = useState([]);
    const id = useParams();
    useEffect(() => {
    axios.get(`http://localhost:10/posts/${id.id}`)
      .then((response) => {
          setPost(response.data)        
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
      });
  }, [id]);     

  return (
    <div className="App">
            {post ? (
       <div className='post'>
                    <div className='title'>  { post.title  } </div>
                    <div className='body'>  { post.postText  } </div>
                    <div className='footer'>  { post.username  } </div>    
              </div>    
      ) : (
        <p>Loading...</p>
      )} 
    </div>
  );
}

export default Poste;
