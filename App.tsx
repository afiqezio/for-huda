
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Catalogue from './pages/Catalogue';
import GirlfriendDay from './pages/GirlfriendDay';
import ValentinesDay from './pages/ValentinesDay';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Catalogue />} />
        <Route path="/girlfriend" element={<GirlfriendDay />} />
        <Route path="/valentine" element={<ValentinesDay />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
