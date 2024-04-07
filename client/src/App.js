// Import necessary components and hooks from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePoste';
import Post from './pages/Poste';
import Login from './pages/Login';
import { AuthContext } from "./helpers/AuthContext";
import { useEffect, useState } from "react";
import Registration from './pages/Registrition';
import axios from 'axios';
function App() {
  const [authState, setAuthState] = useState(false);
  useEffect(() =>
      {   
      axios.get("http://localhost:10/users/validate/Token",
        {
        headers: {
        Authorization: sessionStorage.getItem("accessToken")
      }
        })
    .then((response) => {
      if (response.data.error) {
        setAuthState(false);
      } else {
        setAuthState(true);
      }
    })
    .catch((error) => {
      console.error("Axios Error:", error);
    })
  } ,[])
  return (
      <div className='app'>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className='navbar'>
            <Link to="/"> Home</Link>
            <Link to="/CreatePost"> Create new Post</Link>
            {!authState && (
              <>
                <Link to="/Login"> Login</Link>
                <Link to="/Registration"> Registration</Link>
              </>
            )
            }
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/CreatePost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/Login" element={<Login />} />
             <Route path="/Registration" element={<Registration />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
