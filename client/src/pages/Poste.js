import React, { useEffect, useState , useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from "../helpers/AuthContext";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import "../App.css";
function Poste() {
  const authContext = useContext(AuthContext);
     useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
     if (accessToken) {
        authContext.setAuthState(true);
    }
  }, []);
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();
  const COMMENT_URL = "http://localhost:10/comments";
  const POST_URL = "http://localhost:10/posts";
  const USER_NOT_LOGGED_IN_ERROR = "User not logged in";
  const Success_Created_Comment = "Le commentaire a été créé avec succès";
  const Error_Comment = "Une erreur s'est produite lors de la création du commentaire";
  const accessToken = sessionStorage.getItem("accessToken")
  const deleteComment = (id) => {
  confirmAlert({
    title: 'Confirm to submit',
    message: 'Are you sure to do this.',
    buttons: [
      {
        label: 'Yes',
        onClick: () => {
          axios.delete(`${COMMENT_URL}/${id}`, {
              headers: {
                Authorization: accessToken
              }
            })
            .then((response) => {
              setComments(response.data);
              window.location.reload();
            })
            .catch((error) => {
              console.error('Error fetching comments:', error);
            });
        }
      },
      {
        label: 'No',
        onClick: () => window.location.reload()
      }
    ]
  });
  }
  useEffect(() => {
    fetchPostData();
    fetchComments();
  }, [id]);
  const fetchPostData = () => {
    axios.get(`${POST_URL}/${id}`,
    {
      headers: {
        Authorization: accessToken
      }}
    )
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error('Error fetching post:', error);
      });
  };
  const fetchComments = () => {
    axios.get(`${COMMENT_URL}/${id}`, {
      headers: {
        Authorization: accessToken
      }
    })
      .then((response) => {
        setComments(response.data);
        
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  };
  const addComment = () => {
    axios.post(COMMENT_URL,
      {
        commentBody: newComment,
        PostId: id,
      },
      {
        headers: {
          Authorization: accessToken
        }
      }
    )
      .then(handleCreateCommentResponse)
      .catch(handleCreateCommentError);
  };
  // Gestion de la réponse de création de commentaire
  const handleCreateCommentResponse = (response) => {
    if (response.status === 200 && response.data.error !== USER_NOT_LOGGED_IN_ERROR) {
      toast.success(Success_Created_Comment);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      handleCreateCommentError();
    }
  };
  // Gestion des erreurs lors de la création de commentaire
  const handleCreateCommentError = (error) => {
    console.error(error);
    toast.error(Error_Comment);
  };
  // Rendu JSX
  return (
    <div className="container">
      <Toaster />
      <div className="row justify-content-center">
        {/* Post details */}
        <div className='post'>
          <div className='title'>{post.title}</div>
          <div className='body'>{post.postText}</div>
          <div className='footer'>{post.username}</div>
        </div>
        {/* Comment section */}
        <div className='ml-2'>
          {/* Add comment input */}
          <div className="addCommentContainer">
            <input type="text" placeholder="Comment...." autoComplete="off" onChange={(event) => {
              setNewComment(event.target.value);
            }} />
            <button onClick={addComment}>Add new Comment</button>
          </div>
          {/* List of comments */}
          <div className="listOfComments">
            {comments.length > 0 && comments.map((comment, key) => (
              <div className="comment" key={key}>
                {comment.CommentBody} <br></br>
                <label className="justify-end">User Name : {comment.username}</label>
                <button onClick={()=>deleteComment(comment.id)}>
                     x
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Poste;
