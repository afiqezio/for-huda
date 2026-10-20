
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Catalogue from './pages/Catalogue';
import GirlfriendDay from './pages/GirlfriendDay';
import ValentinesDay from './pages/ValentinesDay';
import Birthday from './pages/Birthday';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// With hash routing every page shares the URL path "/", so report the router's path to count each chapter separately.
const PageAnalytics: React.FC = () => {
  const { pathname } = useLocation();
  return <Analytics route={pathname} path={pathname} />;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <PageAnalytics />
      <Routes>
        <Route path="/" element={<Catalogue />} />
        <Route path="/girlfriend" element={<GirlfriendDay />} />
        <Route path="/valentine" element={<ValentinesDay />} />
        <Route path="/birthday" element={<Birthday />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
