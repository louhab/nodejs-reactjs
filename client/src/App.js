import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePoste from './pages/CreatePoste';
import Poste from './pages/Poste';
import Login from './pages/Login';
import Registration from './pages/Registrition';
function App() {
  return (
    <Router>
          <div className='navbar'>
            <Link to="/"> Home</Link>
            <Link to="/CreatePost" > Create new Poste</Link>
            <Link to="/Login"> Login</Link>
            <Link to="/Registration"> Registration</Link>
          </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CreatePost" element={<CreatePoste />} />
        <Route path="/post/:id" element={<Poste />} />
        <Route path="/Login" element={<Login />} />
         <Route path="/Registration" element={<Registration />} />
      </Routes>
    </Router>
  );
}

export default App;
