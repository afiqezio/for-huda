
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import GirlfriendDay from './pages/GirlfriendDay';
import ValentinesDay from './pages/ValentinesDay';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen relative">
        <Routes>
          <Route path="/" element={<GirlfriendDay />} />
          <Route path="/valentine" element={<ValentinesDay />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
