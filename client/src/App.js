import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreatePoste from './pages/CreatePoste';

function App() {
  return (
    <Router>
      <Link to="/CreatePost"> Create new Poste</Link>
      <Link to="/"> Home page</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CreatePost" element={<CreatePoste />} />
      </Routes>
    </Router>
  );
}

export default App;
