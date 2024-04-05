import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePoste from './pages/CreatePoste';
import Poste from './pages/Poste';


function App() {
  return (
    <Router>
        <div className='navbar'>
            <Link to="/CreatePost" > Create new Poste</Link>
            <Link to="/"> Home page</Link>
        </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CreatePost" element={<CreatePoste />} />
        <Route path="/post/:id" element={<Poste />} />
      </Routes>
    </Router>
  );
}

export default App;
