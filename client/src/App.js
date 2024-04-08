import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePoste';
import Post from './pages/Poste';
import Login from './pages/Login';
import { AuthContext } from "./helpers/AuthContext";
import Registration from './pages/Registrition';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut } from "@fortawesome/free-solid-svg-icons";
function App() {
  const [authState, setAuthState] = useState(false);
  const Validated_Token_URL = "http://localhost:10/users/validate/Token";
  useEffect(() => {
    console.log(authState)
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      axios.get(Validated_Token_URL, {
        headers: { Authorization: accessToken }
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({
          username:"",
          id: "",
          status :false
          });
        } else {
          setAuthState({
          username: response.data.username,
          id: response.data.id,
          status :true
          });
        }
      })
      .catch((error) => {
        console.error("Axios Error:", error);
      });
    }
  }, []);

  const Logout = () => {
    sessionStorage.removeItem("accessToken");
    setAuthState({
          username:"",
          id: "",
          status :false
          }
    );
    window.location.href = "/";
  }

  return (
    <div className='app'>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className='navbar'>
            <Link to="/"> Home Page </Link>
            <Link to="/CreatePost"> Create new Post</Link>
            {!authState ? (
              <>
                <Link to="/Login"> Login</Link>
                <Link to="/Registration"> Registration</Link>
              </>
            ) :(
            <div>
            <h1>{authState.username} </h1>
              <button onClick={() => { Logout(); }}>
                <FontAwesomeIcon icon={faSignOut} />
              </button>
            </div>
          )}
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/CreatePost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Registration" element={<Registration />} />
            {!authState && <Route path="*" element={<Navigate to="/" />} />}
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
