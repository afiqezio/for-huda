
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Catalogue from './pages/Catalogue';
import GirlfriendDay from './pages/GirlfriendDay';
import ValentinesDay from './pages/ValentinesDay';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="min-h-screen relative selection:bg-pink-200">
        <Routes>
          <Route path="/" element={<Catalogue />} />
          <Route path="/girlfriend" element={<GirlfriendDay />} />
          <Route path="/valentine" element={<ValentinesDay />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
