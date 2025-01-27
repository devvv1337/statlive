import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navigation from './components/Navigation';
import type { MatchData } from './components/MatchStatsDisplay';

const Home = lazy(() => import('./pages/Home'));
const MatchStatsDisplay = lazy(() => import('./components/MatchStatsDisplay').then(module => ({ default: module.default })));

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-600"></div>
  </div>
);

const defaultMatchData: MatchData = {
  id: "L1-2024-OM-OL",
  homeTeam: "OM",
  awayTeam: "OL",
  score: {
    home: 3,
    away: 2
  },
  time: "87'",
  league: "Ligue 1 McDonald's",
  redCards: {
    home: 1,
    away: 0,
    homePlayers: ["Leonardo Balerdi"]
  },
  stats: {
    possession: {
      home: 65,
      away: 35,
      algorithm: "Calculé en temps réel basé sur le temps de contrôle effectif du ballon via computer vision et machine learning.",
      odds: { home: 1.85, draw: 3.40, away: 4.20 },
      trend: 'up'
    },
    shots: {
      home: 18,
      away: 4,
      algorithm: "Détection automatique des tirs via analyse vidéo et intelligence artificielle.",
      odds: { home: 1.95, draw: 3.50, away: 3.80 },
      suspended: true
    },
    passes: {
      home: 385,
      away: 198,
      algorithm: "Comptage des échanges de balle réussis entre coéquipiers.",
      odds: { home: 1.75, draw: 3.60, away: 4.50 },
      trend: 'stable'
    },
    xG: {
      home: 5.24,
      away: 1.12,
      algorithm: "Expected Goals (xG) calculé en temps réel.",
      odds: { home: 1.90, draw: 3.45, away: 4.10 }
    },
    corners: {
      home: 9,
      away: 2,
      algorithm: "Détection automatique des corners.",
      odds: { home: 2.10, draw: 3.20, away: 3.60 },
      trend: 'down'
    },
    fouls: {
      home: 8,
      away: 15,
      algorithm: "Analyse en temps réel des contacts entre joueurs.",
      odds: { home: 2.25, draw: 3.30, away: 3.15 }
    }
  }
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 pb-16">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<MatchStatsDisplay matchData={defaultMatchData} />} />
          </Routes>
        </Suspense>
        <Navigation />
      </div>
    </Router>
  );
}

export default App;
