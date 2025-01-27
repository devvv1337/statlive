import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navigation from './components/Navigation';

const Home = lazy(() => import('./pages/Home'));
const MatchStatsDisplay = lazy(() => import('./components/MatchStatsDisplay'));

const App = () => {
  return (
    <Router>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<MatchStatsDisplay />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
