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

const defaultMatchData = {
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
      algorithm: "Calculé en temps réel basé sur le temps de contrôle effectif du ballon via computer vision et machine learning. Notre système utilise des caméras haute définition pour suivre la position du ballon et des joueurs, permettant une analyse précise de la possession.",
      odds: { home: 1.85, draw: 3.40, away: 4.20 },
      trend: 'up' as const
    },
    shots: {
      home: 18,
      away: 4,
      algorithm: "Détection automatique des tirs via analyse vidéo et intelligence artificielle. Notre système reconnaît les mouvements caractéristiques des tirs et utilise des capteurs de vitesse pour mesurer la puissance.",
      odds: { home: 1.95, draw: 3.50, away: 3.80 },
      suspended: true
    },
    passes: {
      home: 385,
      away: 198,
      algorithm: "Comptage des échanges de balle réussis entre coéquipiers grâce à notre système de tracking optique avancé. L'IA analyse les trajectoires du ballon pour identifier les passes intentionnelles.",
      odds: { home: 1.75, draw: 3.60, away: 4.50 },
      trend: 'stable' as const
    },
    xG: {
      home: 5.24,
      away: 1.12,
      algorithm: "Expected Goals (xG) calculé en temps réel en utilisant le machine learning. Notre modèle analyse la position du tir, l'angle, la pression des défenseurs et l'historique des situations similaires.",
      odds: { home: 1.90, draw: 3.45, away: 4.10 }
    },
    corners: {
      home: 65,
      away: 59,
      algorithm: "Détection automatique des corners via notre système de tracking vidéo. Les caméras suivent la sortie du ballon et sa position exacte sur le terrain.",
      odds: { home: 2.10, draw: 3.20, away: 3.60 },
      trend: 'down' as const
    },
  
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
