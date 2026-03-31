import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import HostApp from './pages/HostApp';
import PlayerApp from './pages/PlayerApp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/host/*" element={<HostApp />} />
        <Route path="/join/*" element={<PlayerApp />} />
      </Routes>
    </Router>
  );
}

export default App;
