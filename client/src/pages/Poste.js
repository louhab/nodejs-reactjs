import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import "../App.css";

function Poste() {
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:10/posts/${id}`)
      .then((response) => {
        setPost(response.data);       
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
      });
    axios.get(`http://localhost:10/comments/${id}`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  }, [id]);     
  const addComment = (data) => {
    axios
      .post(
        "http://localhost:10/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: { 
            accessToken : sessionStorage.getItem("accessToken")
          }
        }
      )
      .then((response) => {
        if (response.data.error) {
          if (response.data.error === "User not logged in")
          {
            toast.error("The Post was not created successuflly ")
          } 
          else {
            toast.success("The Post was  created successuflly ")
          setTimeout(function() {
              window.location.reload();
          }, 2000);
            }
        }
      }).catch((error) => { 
        console.log(error)
        toast.error("The Post was not created successuflly ")
      })
  };
  
  return (
    <div className="container">
      <Toaster />
      <div className="row justify-content-center">
        <div className='post'>
          <div className='title'>{post.title}</div>
          <div className='body'>{post.postText}</div>
          <div className='footer'>{post.username}</div>    
        </div> 
        <div className='ml-2'>
          <div className="addCommentContainer">
            <input type="text" placeholder="Comment...." autoComplete="off" onChange={(event) => {
              setNewComment(event.target.value);
            }} />
            <button onClick={addComment}>Add new Comment</button>
          </div>
          <div className="listOfComments">
            {comments.length > 0 && comments.map((comment, key) => (
              <div className="comment" key={key}>
                {comment.CommentBody} 
              </div>
            ))}
          </div>
        </div> 
      </div>
    </div>
  );
}
export default Poste;
