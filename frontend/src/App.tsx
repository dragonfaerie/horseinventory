import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HorseList from './components/Horselist';

const Home: React.FC = () => (
  <div>
    <h2>Welcome to the Model Horse Inventory App</h2>
    <p>Track your collection, sales, and show history.</p>
  </div>
);

function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/horses" element={<HorseList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


