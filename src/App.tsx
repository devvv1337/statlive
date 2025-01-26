import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navigation from './components/Navigation';

const Home = lazy(() => import('./pages/Home'));
const MatchStatsDisplay = lazy(() => import('./components/MatchStatsDisplay'));

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 pb-16">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<MatchStatsDisplay />} />
          </Routes>
        </Suspense>
        <Navigation />
      </div>
    </Router>
  );
}

export default App;
