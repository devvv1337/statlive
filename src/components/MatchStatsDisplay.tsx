import React, { useState, useEffect } from 'react';
import { Info, Clock, BarChart2, X, Star, AlertTriangle, Zap, ChevronDown, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LazyImage from './LazyImage';

interface MatchStats {
  home: number;
  away: number;
  algorithm: string;
  odds?: { home: number; draw: number; away: number };
  suspended?: boolean;
  trend?: 'up' | 'down' | 'stable';
}

interface MatchData {
  id: string;
  homeTeam: string;
  awayTeam: string;
  score: {
    home: number;
    away: number;
  };
  time: string;
  league: string;
  redCards: {
    home: number;
    away: number;
    homePlayers?: string[];
    awayPlayers?: string[];
  };
  stats: {
    possession: MatchStats;
    shots: MatchStats;
    passes: MatchStats;
    xG: MatchStats;
    corners: MatchStats;
    fouls: MatchStats;
  };
}

interface Reference {
  id: number;
  text: string;
  url: string;
}

const references: Reference[] = [
  {
    id: 1,
    text: "Analyse des mouvements des joueurs via capteurs",
    url: "https://arxiv.org/pdf/2103.02938"
  },
  {
    id: 2,
    text: "Tracking des joueurs en 2D",
    url: "https://link.springer.com/article/10.1007/s12283-022-00381-6"
  },
  {
    id: 3,
    text: "Intelligence artificielle dans le sport",
    url: "https://www.statsperform.com/artificial-intelligence-in-sport/"
  },
  {
    id: 4,
    text: "Solutions Tracab",
    url: "http://tracab.com/solutions/rights-holders-solutions/"
  },
  {
    id: 5,
    text: "Particle Filters dans le tracking sportif",
    url: "https://pdfs.semanticscholar.org/6d7a/6064e2c3cf893380b04d484c3c4277af7ea5.pdf"
  },
  {
    id: 6,
    text: "Deep Learning pour le tracking",
    url: "https://pdfs.semanticscholar.org/4909/4efd7a678a22967198c59ebe14ea26cf18b2.pdf"
  },
  {
    id: 7,
    text: "Visualisation 2D des terrains",
    url: "https://rria.ici.ro/documents/37/art._Saseendran_Thanalakshmi_Prabakaran_Ravisankar.pdf"
  },
  {
    id: 8,
    text: "Reconnaissance d'événements dans le football",
    url: "https://ntnuopen.ntnu.no/ntnu-xmlui/bitstream/handle/11250/3011129/AI-Driven_Salient_Soccer_Events_Recognition_Framework_for_Next_Generation_IoT-Enabled_Environments.pdf"
  },
  {
    id: 9,
    text: "Suivi manuel des statistiques",
    url: "https://passed.fr/passion_/donnees-statistiques-football/"
  },
  {
    id: 10,
    text: "Détection d'événements avec MLSTM",
    url: "https://ntnuopen.ntnu.no/ntnu-xmlui/bitstream/handle/11250/3011129/AI-Driven_Salient_Soccer_Events_Recognition_Framework_for_Next_Generation_IoT-Enabled_Environments.pdf"
  },
  {
    id: 11,
    text: "Détection d'événements et classification des buts",
    url: "https://link.springer.com/article/10.1007/s12283-022-00381-6"
  },
  {
    id: 12,
    text: "Machine Learning et capteurs pour la détection de buts",
    url: "https://arxiv.org/pdf/2103.02938"
  },
  {
    id: 13,
    text: "Classification d'événements avec MLSTM",
    url: "https://ntnuopen.ntnu.no/ntnu-xmlui/bitstream/handle/11250/3011129/AI-Driven_Salient_Soccer_Events_Recognition_Framework_for_Next_Generation_IoT-Enabled_Environments.pdf"
  },
  {
    id: 14,
    text: "Utilisation des capteurs pour la possession",
    url: "https://arxiv.org/pdf/2103.02938"
  },
  {
    id: 15,
    text: "Détection d'événements et possession",
    url: "https://link.springer.com/article/10.1007/s12283-022-00381-6"
  }
];

const teamCompositions = {
  home: {
    name: "OM",
    image: "/compo_om.png",
    algorithm: "Le tracking des joueurs est réalisé en temps réel grâce à notre système de computer vision avancé. Des caméras haute définition suivent chaque joueur sur le terrain, permettant de détecter leur position exacte et leurs mouvements. L'intelligence artificielle analyse ces données pour comprendre les formations, les changements tactiques et les zones d'influence de chaque joueur."
  },
  away: {
    name: "OL",
    image: "/compo_ol.png",
    algorithm: "Le tracking des joueurs est réalisé en temps réel grâce à notre système de computer vision avancé. Des caméras haute définition suivent chaque joueur sur le terrain, permettant de détecter leur position exacte et leurs mouvements. L'intelligence artificielle analyse ces données pour comprendre les formations, les changements tactiques et les zones d'influence de chaque joueur."
  }
};

interface Props {
  matchData: MatchData;
}

const MatchStatsDisplay: React.FC<Props> = ({ matchData = {
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
      trend: 'up'
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
      trend: 'stable'
    },
    xG: {
      home: 5.24,
      away: 1.12,
      algorithm: "Expected Goals (xG) calculé en temps réel en utilisant le machine learning. Notre modèle analyse la position du tir, l'angle, la pression des défenseurs et l'historique des situations similaires.",
      odds: { home: 1.90, draw: 3.45, away: 4.10 }
    },
    corners: {
      home: 9,
      away: 2,
      algorithm: "Détection automatique des corners via notre système de tracking vidéo. Les caméras suivent la sortie du ballon et sa position exacte sur le terrain.",
      odds: { home: 2.10, draw: 3.20, away: 3.60 },
      trend: 'down'
    },
    fouls: {
      home: 8,
      away: 15,
      algorithm: "Analyse en temps réel des contacts entre joueurs via notre système de computer vision. L'IA évalue l'intensité et la nature des contacts pour identifier les fautes.",
      odds: { home: 2.25, draw: 3.30, away: 3.15 }
    }
  }
} }) => {
  const [selectedStat, setSelectedStat] = useState<string | null>(null);
  const [showHighlightModal, setShowHighlightModal] = useState(false);
  const [selectedComposition, setSelectedComposition] = useState<'home' | 'away' | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [selectedReference, setSelectedReference] = useState<number | null>(null);
  const [showFixedButton, setShowFixedButton] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showRedCardInfo, setShowRedCardInfo] = useState(false);
  const [showGoalInfo, setShowGoalInfo] = useState(false);
  
  useEffect(() => {
    // Afficher le modal initial
    setShowHighlightModal(true);
    setTimeout(() => setShowHighlightModal(false), 5000);

    // Configurer l'intervalle pour les affichages suivants (toutes les 5 minutes)
    const timer = setInterval(() => {
      setShowHighlightModal(true);
      setTimeout(() => setShowHighlightModal(false), 5000);
    }, 300000); // 5 minutes = 300000ms

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Inverse la visibilité du bouton fixe quand le bouton statique sort de la vue
        setShowFixedButton(!entry.isIntersecting);
      },
      {
        // Déclenche quand le bouton statique est complètement hors de vue
        threshold: 0,
        rootMargin: '-80px 0px 0px 0px' // Ajuste le seuil de déclenchement
      }
    );

    const anchor = document.getElementById('tracking-button-anchor');
    if (anchor) {
      observer.observe(anchor);
    }

    return () => observer.disconnect();
  }, []);

  const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <Zap size={14} className="text-betting-win animate-bounce-subtle" />;
      case 'down':
        return <Zap size={14} className="text-betting-loss rotate-180" />;
      case 'stable':
        return <Zap size={14} className="text-betting-draw rotate-90" />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="max-w-[98vw] mx-auto bg-surface-dark min-h-screen relative font-body"
      role="main"
      aria-label="Statistiques du match"
    >
      {/* Status Bar */}
      <div 
        className="bg-brand-900 text-white h-7 flex items-center justify-between px-4 text-xs"
        role="status"
        aria-label="Statut du match"
      >
        <span>20:45</span>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-betting-live rounded-full animate-pulse-slow" aria-hidden="true" />
          <span>EN DIRECT</span>
        </div>
      </div>

      {/* Match Container */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-1.75rem)]">
        {/* Left Side - Compositions (Desktop) */}
        <div className="hidden lg:flex w-[400px] bg-white flex-col relative">
          <div className="flex-1 grid grid-rows-2">
            {/* Home Team Composition */}
            <div className="flex flex-col items-center justify-center p-4 relative border-b border-gray-100">
              <h3 className="text-lg font-semibold mb-2 text-brand-800">{teamCompositions.home.name}</h3>
              <LazyImage
                src={teamCompositions.home.image}
                alt={`Composition ${teamCompositions.home.name}`}
                placeholderText={`Composition ${teamCompositions.home.name}`}
                className="max-h-[calc(100%-2rem)] max-w-full object-contain"
              />
            </div>
            {/* Away Team Composition */}
            <div className="flex flex-col items-center justify-center p-4 relative">
              <h3 className="text-lg font-semibold mb-2 text-brand-800">{teamCompositions.away.name}</h3>
              <LazyImage
                src={teamCompositions.away.image}
                alt={`Composition ${teamCompositions.away.name}`}
                placeholderText={`Composition ${teamCompositions.away.name}`}
                className="max-h-[calc(100%-2rem)] max-w-full object-contain"
              />
            </div>
          </div>
          {/* Single Tracking Button */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <button
              onClick={() => setSelectedComposition('home')}
              className="bg-brand-800 hover:bg-brand-700 text-white px-6 py-3 rounded-xl text-sm flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <Info size={18} />
              Système de tracking des joueurs
            </button>
          </div>
        </div>

        {/* Central Stats Section */}
        <div className="flex-1 bg-gradient-to-b from-brand-800 to-brand-700 lg:mx-4">
          {/* Header */}
          <div className="text-white p-6 pb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <img src="/ligue1logo.png" alt="Logo Ligue 1" className="h-6 w-auto object-contain" />
                <span className="text-sm font-medium">{matchData.league}</span>
              </div>
              <button 
                onClick={() => setIsFavorite(!isFavorite)} 
                className={`hover:scale-110 transition-all duration-300 ${isFavorite ? 'text-betting-win' : 'hover:text-betting-win'}`} 
                aria-label="Favori"
              >
                <Star size={16} className={isFavorite ? 'fill-current' : ''} />
              </button>
            </div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4">
                <img src="/omlogo.png" alt="Logo OM" className="w-20 h-20 object-contain" />
                <div className="flex flex-col items-start">
                  <div className="text-4xl font-bold h-[48px] flex items-center">{matchData.homeTeam}</div>
                  {matchData.redCards.home > 0 && (
                    <button 
                      onClick={() => setShowRedCardInfo(true)}
                      className="flex items-center gap-2 mt-1 hover:bg-white/10 px-2 py-1 rounded-lg transition-colors"
                    >
                      <div className="w-4 h-6 bg-red-600 rounded-sm"></div>
                      <span className="text-sm text-white/80">Balerdi</span>
                      <Info size={14} className="text-white/60" />
                    </button>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <button
                  onClick={() => setShowGoalInfo(true)}
                  className="text-white/80 hover:text-white flex items-center gap-1 mb-2 text-sm"
                >
                  <Info size={14} />
                  <span>Détection des buts</span>
                </button>
                <div className="text-3xl font-bold tracking-tight flex items-center gap-4">
                  <span>{matchData.score.home}</span>
                  <span>-</span>
                  <span>{matchData.score.away}</span>
                </div>
                <div className="text-sm text-white/80 flex items-center gap-1 mt-1">
                  <Clock size={12} />
                  <span>{matchData.time}</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold h-[48px] flex items-center">{matchData.awayTeam}</div>
                <img src="/ollogo.png" alt="Logo OL" className="w-14 h-14 object-contain" />
              </div>
            </div>
          </div>

          {/* Stats Content */}
          <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-15rem)]">
            {Object.entries(matchData.stats).map(([key, value]) => {
              const statLabels: { [key: string]: string } = {
                possession: 'Possession',
                shots: 'Tirs',
                passes: 'Passes',
                xG: 'xG (buts attendus)',
                corners: 'Coups de pied arrêtés',
                fouls: 'Fautes'
              };
              
              return (
                <div key={key} className="bg-surface-light rounded-xl shadow-stats p-4 animate-fade-in">
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{statLabels[key]}</h3>
                      {getTrendIcon(value.trend)}
                    </div>
                    <button
                      onClick={() => setSelectedStat(key)}
                      className="text-brand-600 hover:text-brand-700 transition-colors"
                      aria-label="Plus d'informations"
                    >
                      <Info size={18} />
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-bold w-16 text-right">
                      {typeof value.home === 'number' && value.home % 1 !== 0 
                        ? value.home.toFixed(2) 
                        : value.home}
                    </span>
                    <div className="flex-1 h-2.5 bg-surface-accent rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-500 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${key === 'possession' 
                            ? value.home 
                            : (value.home / (value.home + value.away) * 100)}%` 
                        }}
                      />
                    </div>
                    <span className="text-xl font-bold w-16">
                      {typeof value.away === 'number' && value.away % 1 !== 0 
                        ? value.away.toFixed(2) 
                        : value.away}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side - Ladder (Desktop) */}
        <div className="hidden lg:block w-[400px] bg-white">
          <div className="h-full flex items-center">
            <img
              src="/ladder.png"
              alt="Ladder"
              className="w-full h-auto max-h-[calc(100vh-2rem)] object-contain"
            />
          </div>
        </div>

        {/* Mobile Compositions */}
        <div className="lg:hidden bg-white">
          <div className="flex flex-col p-4">
            {/* Home Team */}
            <div className="flex flex-col items-center mb-6">
              <h3 className="text-lg font-semibold mb-3 text-brand-800">{teamCompositions.home.name}</h3>
              <div className="w-full max-w-[280px] mx-auto bg-gray-50 rounded-xl p-3">
                <div className="aspect-[3/4] relative">
                  <LazyImage
                    src={teamCompositions.home.image}
                    alt={`Composition ${teamCompositions.home.name}`}
                    placeholderText={`Composition ${teamCompositions.home.name}`}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="h-px bg-gray-100 w-full mb-6" />

            {/* Away Team */}
            <div className="flex flex-col items-center mb-6">
              <h3 className="text-lg font-semibold mb-3 text-brand-800">{teamCompositions.away.name}</h3>
              <div className="w-full max-w-[280px] mx-auto bg-gray-50 rounded-xl p-3">
                <div className="aspect-[3/4] relative">
                  <LazyImage
                    src={teamCompositions.away.image}
                    alt={`Composition ${teamCompositions.away.name}`}
                    placeholderText={`Composition ${teamCompositions.away.name}`}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Tracking Button - Static */}
            <div className="w-full max-w-[280px] mx-auto mb-6" id="tracking-button-anchor">
              <button
                onClick={() => setSelectedComposition('home')}
                className="w-full bg-brand-800 hover:bg-brand-700 active:bg-brand-900 text-white px-6 py-3.5 rounded-xl text-sm font-medium flex items-center gap-2 justify-center transition-all duration-300 shadow-lg"
              >
                <Info size={18} />
                Système de tracking des joueurs
              </button>
            </div>
          </div>

          {/* Tracking Button - Fixed on Scroll */}
          <div 
            className={`transition-transform duration-300 ${
              showFixedButton ? 'translate-y-0' : 'translate-y-full'
            } fixed bottom-16 left-0 right-0 p-4 bg-white shadow-[0_-1px_3px_rgba(0,0,0,0.1)] z-[40]`}
          >
            <button
              onClick={() => setSelectedComposition('home')}
              className="w-full max-w-[280px] mx-auto bg-brand-800 hover:bg-brand-700 active:bg-brand-900 text-white px-6 py-3.5 rounded-xl text-sm font-medium flex items-center gap-2 justify-center transition-all duration-300 shadow-lg"
            >
              <Info size={18} />
              Système de tracking des joueurs
            </button>
          </div>
        </div>
      </div>

      {/* Info Modal - Redesigned */}
      {selectedStat && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl w-full max-w-2xl mx-4 overflow-hidden shadow-xl"
          >
            {/* Modal Header */}
            <div className="bg-brand-800 text-white p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  {selectedStat === 'possession' ? (
                    <>
                      <div className="p-2 bg-white/10 rounded-lg">
                        <BarChart2 size={24} className="text-betting-win" />
                      </div>
                      Possession
                    </>
                  ) : selectedStat === 'shots' ? (
                    <>
                      <div className="p-2 bg-white/10 rounded-lg">
                        <BarChart2 size={24} className="text-betting-win" />
                      </div>
                      Tirs
                    </>
                  ) : selectedStat === 'passes' ? (
                    <>
                      <div className="p-2 bg-white/10 rounded-lg">
                        <BarChart2 size={24} className="text-betting-win" />
                      </div>
                      Passes
                    </>
                  ) : selectedStat === 'xG' ? (
                    <>
                      <div className="p-2 bg-white/10 rounded-lg">
                        <BarChart2 size={24} className="text-betting-win" />
                      </div>
                      xButs
                    </>
                  ) : selectedStat === 'corners' ? (
                    <>
                      <div className="p-2 bg-white/10 rounded-lg">
                        <BarChart2 size={24} className="text-betting-win" />
                      </div>
                      Coups de pied arrêtés
                    </>
                  ) : selectedStat === 'fouls' ? (
                    <>
                      <div className="p-2 bg-white/10 rounded-lg">
                        <BarChart2 size={24} className="text-betting-win" />
                      </div>
                      Fautes
                    </>
                  ) : selectedStat}
                </h2>
                <button
                  onClick={() => setSelectedStat(null)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Fermer"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Current Values */}
              <div className="flex justify-between items-center mb-8 px-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-brand-600">
                    {matchData.stats[selectedStat as keyof typeof matchData.stats].home}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{matchData.homeTeam}</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-400">VS</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-brand-600">
                    {matchData.stats[selectedStat as keyof typeof matchData.stats].away}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{matchData.awayTeam}</div>
                </div>
              </div>

              {/* Algorithm Explanation */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">Comment est-ce calculé ?</h3>
                <p className="text-gray-600 leading-relaxed">
                  {matchData.stats[selectedStat as keyof typeof matchData.stats].algorithm}
                </p>
              </div>

              {/* Trend if available */}
              {matchData.stats[selectedStat as keyof typeof matchData.stats].trend && (
                <div className="mt-6 flex items-center gap-2 text-sm text-gray-600">
                  <span>Tendance :</span>
                  {getTrendIcon(matchData.stats[selectedStat as keyof typeof matchData.stats].trend)}
                  <span>
                    {matchData.stats[selectedStat as keyof typeof matchData.stats].trend === 'up'
                      ? 'En hausse'
                      : matchData.stats[selectedStat as keyof typeof matchData.stats].trend === 'down'
                      ? 'En baisse'
                      : 'Stable'}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Composition Info Modal */}
      <AnimatePresence>
        {selectedComposition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="bg-white w-full sm:rounded-2xl sm:max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-brand-800 text-white p-4 sm:p-6 flex-shrink-0">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <BarChart2 size={24} className="text-betting-win" />
                    </div>
                    Système de tracking des joueurs
                  </h2>
                  <button
                    onClick={() => setSelectedComposition(null)}
                    className="p-2 hover:bg-white/10 active:bg-white/20 rounded-full transition-colors"
                    aria-label="Fermer"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="p-4 sm:p-8 overflow-y-auto flex-1">
                {/* Introduction */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6 shadow-md mb-6">
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Cette partie Composition n'est pas réellement une collecte de statistiques, mais plutôt la manière dont nous récupérons les données lors d'un match de football. Autrement dit, le "tracking", qui est l'action de suivre, surveiller ou enregistrer le déplacement ou l'évolution de quelque chose au fil du temps. Dans le contexte du sport, le tracking consiste à suivre les mouvements des joueurs, la trajectoire du ballon ou d'autres éléments du match en temps réel, afin de collecter des données précises.
                  </p>
                </div>

                {/* Main Methods Section */}
                <div className="space-y-6">
                  {/* Capteurs Section */}
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <button 
                      onClick={() => setExpandedSection(expandedSection === 'capteurs' ? null : 'capteurs')}
                      className="w-full flex items-center justify-between p-4 sm:p-6 bg-brand-800/5 hover:bg-brand-800/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-brand-800/10 rounded-lg">
                          <Zap size={20} className="text-brand-800" />
                        </div>
                        <h3 className="text-lg font-semibold text-brand-800">Capteurs</h3>
                      </div>
                      <ChevronDown 
                        size={20} 
                        className={`text-brand-800 transition-transform ${expandedSection === 'capteurs' ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {expandedSection === 'capteurs' && (
                      <div className="p-4 sm:p-6 bg-white">
                        <div className="prose prose-sm sm:prose-base max-w-none">
                          <p>Le cas des capteurs est sans doute le plus simple à mettre en place, mais il n'est pas réaliste dans le cadre d'un match de football. Cette méthode peut néanmoins être utilisée lors de matchs amicaux ou d'entraînements au sein d'un club, afin de collecter des données de manière relativement simple. Cependant, elle empêche les joueurs de jouer de manière libérée et est interdite lors des matchs de football officiels.</p>
                          
                          <div className="mt-4">
                            <h4 className="text-brand-800 font-semibold mb-2">Fonctionnement technique</h4>
                            <p>Cette technique repose généralement sur l'utilisation de trois capteurs : un accéléromètre tri-axial, un gyroscope et un magnétomètre. Ces capteurs collectent des données en continu à une fréquence de 120 Hz, permettant ainsi d'obtenir neuf mesures différentes à un moment donné.</p>
                          </div>

                          <div className="mt-4">
                            <h4 className="text-brand-800 font-semibold mb-2">Traitement des données</h4>
                            <p>À l'aide de la méthode des fenêtres glissantes, des vecteurs de caractéristiques sont extraits. Chaque caractéristique correspond à des données statistiques calculées sur un intervalle de fenêtre glissante, telles que :</p>
                            <ul className="list-disc pl-4 space-y-2 mt-2">
                              <li>Valeurs minimale, maximale et moyenne</li>
                              <li>Variance, asymétrie et kurtosis</li>
                              <li>Dix échantillons équidistants de la séquence d'autocorrélation</li>
                              <li>Les cinq premiers pics de la transformée de Fourier discrète (DFT) et leurs fréquences associées</li>
                            </ul>
                          </div>

                          <div className="mt-4">
                            <h4 className="text-brand-800 font-semibold mb-2">Optimisation</h4>
                            <p>Ainsi, 26 caractéristiques sont obtenues pour chaque signal, soit 234 caractéristiques à un instant t, multipliées par le nombre de dispositifs de détection placés sur les joueurs. Cette quantité importante de données peut provoquer un overfitting. Par conséquent, seules les 30 caractéristiques les plus pertinentes sont retenues.</p>
                            <p className="mt-2">Pour analyser les événements, un modèle de type Random Forest est ensuite utilisé.
                              <button 
                                onClick={() => setSelectedReference(1)}
                                className="inline-flex items-center text-brand-600 hover:text-brand-700 ml-1"
                              >
                                <sup>[1]</sup>
                              </button>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Caméras Section */}
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <button 
                      onClick={() => setExpandedSection(expandedSection === 'cameras' ? null : 'cameras')}
                      className="w-full flex items-center justify-between p-4 sm:p-6 bg-brand-800/5 hover:bg-brand-800/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-brand-800/10 rounded-lg">
                          <Camera size={20} className="text-brand-800" />
                        </div>
                        <h3 className="text-lg font-semibold text-brand-800">Caméras</h3>
                      </div>
                      <ChevronDown 
                        size={20} 
                        className={`text-brand-800 transition-transform ${expandedSection === 'cameras' ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {expandedSection === 'cameras' && (
                      <div className="p-4 sm:p-6 bg-white">
                        <div className="prose prose-sm sm:prose-base max-w-none">
                          <p>Cette méthode est la plus utilisée lors de vrais matchs. Elle consiste à mettre en place des caméras, parfois fixes ou non, et à appliquer différents algorithmes dans l'objectif de suivre le déplacement des joueurs et du ballon pendant un match.</p>
                          
                          <div className="mt-6">
                            <h4 className="text-brand-800 font-semibold mb-2">Solutions professionnelles</h4>
                            <p>Il existe de nombreuses entreprises spécialisées dans le tracking lors des matchs de football, comme Track160, Tracab ou encore Hawk-Eye. Celles-ci permettent de récupérer des données sur les déplacements des joueurs et du ballon, en fournissant leurs coordonnées (x,y), échantillonnées à 25 Hz en 2D
                              <button 
                                onClick={() => setSelectedReference(2)}
                                className="inline-flex items-center text-brand-600 hover:text-brand-700 ml-1"
                              >
                                <sup>[2]</sup>
                              </button>
                            </p>
                            <p className="mt-2">Cependant, ces entreprises communiquent peu sur leurs techniques. Par exemple, Opta ne donne pas de détails sur ses méthodes d'acquisition ou de tracking, se limitant à mentionner l'utilisation de deep learning
                              <button 
                                onClick={() => setSelectedReference(3)}
                                className="inline-flex items-center text-brand-600 hover:text-brand-700 ml-1"
                              >
                                <sup>[3]</sup>
                              </button>
                            </p>
                            <p className="mt-2">De même, Tracab fournit peu d'informations techniques, mais explique que la première étape consiste à détecter les dimensions du terrain de football, comme illustré ci-dessous
                              <button 
                                onClick={() => setSelectedReference(4)}
                                className="inline-flex items-center text-brand-600 hover:text-brand-700 ml-1"
                              >
                                <sup>[4]</sup>
                              </button>
                            </p>

                            <div className="mt-4 bg-gray-50 rounded-xl p-4">
                              <div className="relative aspect-[16/9] w-full">
                                <img
                                  src="/track1.png"
                                  alt="Détection des dimensions du terrain"
                                  className="w-full h-full object-contain rounded-lg shadow-md"
                                />
                              </div>
                              <p className="text-sm text-gray-500 mt-2 text-center">Détection des dimensions du terrain par Tracab</p>
                            </div>
                          </div>

                          <div className="mt-6">
                            <h4 className="text-brand-800 font-semibold mb-2">Méthodes de tracking</h4>
                            <div className="space-y-6">
                              <div>
                                <h5 className="text-brand-700 font-medium mb-2">1. Particle Filters</h5>
                                <p>Le Particle Filters SIR (Sample Importance Resampling) est adapté pour modéliser des processus non linéaires et non gaussiens. Il nécessite une caméra positionnée au centre du terrain, filmant le match en continu. Le filtre particulaire représente la position et l'état d'un joueur sous forme de distribution de probabilités à l'aide d'un ensemble de particules pondérées.</p>
                                <p className="mt-2">La position future est estimée en fonction des états passés et d'un modèle dynamique. Les particules sont ajustées en fonction de la position actuelle, et la phase de rééchantillonnage élimine les particules de faible pondération tout en dupliquant celles ayant une forte pondération. Un état est défini par la position du joueur (x,y), ses valeurs de chromaticité et sa vitesse.</p>
                                <p className="mt-2">Le terrain n'est pas pris en compte en supprimant la couleur verte de l'arrière-plan grâce à un histogramme HSV et un seuillage. Les régions probables des joueurs sont identifiées à l'aide des points de contour, du centre de masse et de la couleur moyenne, comme illustré ci-dessous. La couleur joue un rôle clé pour reconnaître les joueurs en cas d'occlusion : lorsque deux joueurs sont très proches, les particules "se mélangent" temporairement mais finissent par se séparer.</p>

                                <div className="mt-4 bg-gray-50 rounded-xl p-4">
                                  <div className="relative aspect-[16/9] w-full">
                                    <img
                                      src="/track2.png"
                                      alt="Particle Filters tracking"
                                      className="w-full h-full object-contain rounded-lg shadow-md"
                                    />
                                  </div>
                                  <p className="text-sm text-gray-500 mt-2 text-center">Tracking des joueurs avec Particle Filters</p>
                                </div>

                                <p className="mt-2">La couleur permet ainsi de les identifier avec précision
                                  <button 
                                    onClick={() => setSelectedReference(5)}
                                    className="inline-flex items-center text-brand-600 hover:text-brand-700 ml-1"
                                  >
                                    <sup>[5]</sup>
                                  </button>
                                </p>
                              </div>

                              <div>
                                <h5 className="text-brand-700 font-medium mb-2">2. Intelligence Artificielle</h5>
                                <p>L'intelligence artificielle offre plusieurs approches prometteuses :</p>
                                <p className="mt-2">Dans un premier temps, après l'acquisition d'une vidéo du terrain, un modèle nommé YOLOv7 (You Only Look Once version 7) peut être utilisé. Ce modèle détecte les joueurs (classe = 'Person') et renvoie une "boîte englobante" pour chaque joueur. Il offre une précision de 87% pour une vitesse moyenne de 0,25 seconde/image.</p>

                                <div className="mt-4 bg-gray-50 rounded-xl p-4">
                                  <div className="relative aspect-[16/9] w-full">
                                    <img
                                      src="/track3.png"
                                      alt="Détection YOLO"
                                      className="w-full h-full object-contain rounded-lg shadow-md"
                                    />
                                  </div>
                                  <p className="text-sm text-gray-500 mt-2 text-center">Détection des joueurs avec YOLOv7</p>
                                </div>

                                <p className="mt-4">Ensuite, un DAN (Deep Affinity Network), basé sur une architecture VGG (Visual Geometry Group), peut être appliqué. Ce réseau produit des vecteurs de caractéristiques de 520 dimensions pour chaque joueur détecté, permettant de comparer ces vecteurs entre images consécutives afin d'associer des IDs uniques à chaque joueur. Cependant, cette méthode présente des difficultés face à l'occlusion, notamment lorsque la distance euclidienne entre deux joueurs est inférieure à 4 pixels.</p>
                                <p className="mt-2">Il est également possible de lisser les trajectoires des joueurs et de réduire le bruit en appliquant des filtres tels que le filtre Savitzky-Golay. Cela améliore la continuité des trajectoires et augmente la précision à 90,5%. Cependant, cette approche est difficile à mettre en œuvre en temps réel, car le traitement complet d'un match peut nécessiter environ 24 heures
                                  <button 
                                    onClick={() => setSelectedReference(6)}
                                    className="inline-flex items-center text-brand-600 hover:text-brand-700 ml-1"
                                  >
                                    <sup>[6]</sup>
                                  </button>
                                </p>
                              </div>

                              <div>
                                <h5 className="text-brand-700 font-medium mb-2">3. Méthodes alternatives</h5>
                                <p>Une autre méthode, basée sur une idée similaire à la précédente, consisterait à remplacer le DAN par DeepSORT (Deep Simple Online and Real-time Tracking). Ce système permet de suivre les joueurs et de leur assigner des identifiants uniques. En le combinant avec un algorithme K-Means, il serait possible de distinguer les joueurs des deux équipes en fonction de la couleur de leurs maillots.</p>
                                <p className="mt-2">Cette approche permettrait également d'obtenir une visualisation 2D du terrain vue du dessus, en utilisant un GAN (Generative Adversarial Networks) pour extraire les lignes du terrain et isoler la pelouse, comme illustré ci-dessous.
                                  <button 
                                    onClick={() => setSelectedReference(7)}
                                    className="inline-flex items-center text-brand-600 hover:text-brand-700 ml-1"
                                  >
                                    <sup>[7]</sup>
                                  </button>
                                </p>

                                <div className="mt-4 bg-gray-50 rounded-xl p-4">
                                  <div className="relative aspect-[16/9] w-full">
                                    <img
                                      src="/track4.png"
                                      alt="Visualisation GAN"
                                      className="w-full h-full object-contain rounded-lg shadow-md"
                                    />
                                  </div>
                                  <p className="text-sm text-gray-500 mt-2 text-center">Visualisation 2D du terrain avec GAN</p>
                                </div>

                                <p className="mt-4">L'utilisation de méthodes telles que ResNet50 est également possible. ResNet50 est un réseau convolutif qui extrait les caractéristiques des images en appliquant une série de couches convolutives pour produire des vecteurs caractéristiques. Cependant, ce type de solution fonctionnerait mieux sur des vidéos ou lors d'un événement spécifique, avec pour objectif de détecter le type d'événement qui a eu lieu parmi plusieurs classifications possibles
                                  <button 
                                    onClick={() => setSelectedReference(8)}
                                    className="inline-flex items-center text-brand-600 hover:text-brand-700 ml-1"
                                  >
                                    <sup>[8]</sup>
                                  </button>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Padding for Mobile Scroll */}
                <div className="h-6 sm:h-0" />
              </div>

              {/* Mobile Close Button - Fixed at Bottom */}
              <div className="sm:hidden flex-shrink-0 p-4 bg-white border-t border-gray-100">
                <button
                  onClick={() => setSelectedComposition(null)}
                  className="w-full bg-brand-800 hover:bg-brand-700 active:bg-brand-900 text-white px-6 py-3.5 rounded-xl text-sm font-medium flex items-center gap-2 justify-center"
                >
                  Fermer
                </button>
              </div>

              {/* References Modal */}
              <AnimatePresence>
                {selectedReference && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
                    onClick={() => setSelectedReference(null)}
                  >
                    <motion.div
                      className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl"
                      onClick={e => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-brand-800">Référence [{selectedReference === 1 ? '1' : selectedReference === 2 ? '2' : '3'}]</h3>
                        <button
                          onClick={() => setSelectedReference(null)}
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <p className="text-gray-600 mb-4">{references[selectedReference - 1].text}</p>
                      <a
                        href={references[selectedReference - 1].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-600 hover:text-brand-700 underline break-all"
                      >
                        {references[selectedReference - 1].url}
                      </a>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modified Highlight Modal */}
      <AnimatePresence>
        {showHighlightModal && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed left-4 right-4 top-6 w-auto max-w-[280px] mx-auto z-[100]"
            role="alert"
            aria-live="polite"
          >
            <div className="bg-surface-light rounded-lg shadow-lg p-3 border border-betting-win/10">
              <div className="flex items-center gap-2">
                <div 
                  className="w-8 h-8 bg-betting-win/10 rounded-full flex items-center justify-center flex-shrink-0"
                  aria-hidden="true"
                >
                  <AlertTriangle size={16} className="text-betting-win" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-medium text-brand-800 truncate text-sm">Rumeur Mercato !</h4>
                  <p className="text-xs text-gray-600 line-clamp-2">Auren Bradley pourrait rejoindre l'OM en tant que gardien</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Red Card Info Modal */}
      <AnimatePresence>
        {showRedCardInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="bg-white w-full sm:rounded-2xl sm:max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-brand-800 text-white p-4 sm:p-6 flex-shrink-0">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <div className="w-4 h-6 bg-red-600 rounded-sm"></div>
                    </div>
                    Détection des Cartons Rouges
                  </h2>
                  <button
                    onClick={() => setShowRedCardInfo(false)}
                    className="p-2 hover:bg-white/10 active:bg-white/20 rounded-full transition-colors"
                    aria-label="Fermer"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="p-4 sm:p-8 overflow-y-auto flex-1">
                {/* Introduction */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6 shadow-md mb-6">
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Pour reconnaître les cartons, peu de recherches se concentrent spécifiquement sur ce sujet. Voici les différentes approches possibles pour détecter et analyser les cartons rouges lors d'un match de football.
                  </p>
                </div>

                {/* Main Methods Section */}
                <div className="space-y-6">
                  {/* Manual Method */}
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg font-semibold text-brand-800 mb-4">Méthode Manuelle</h3>
                      <p className="text-gray-600 leading-relaxed">
                        La première solution, qui semble évidente, consisterait à effectuer un suivi manuel, où un technicien chargé de collecter les statistiques du match reporterait l'intégralité des données à la main
                        <button 
                          onClick={() => setSelectedReference(9)}
                          className="inline-flex items-center text-brand-600 hover:text-brand-700 ml-1"
                        >
                          <sup>[1]</sup>
                        </button>
                      </p>
                    </div>
                  </div>

                  {/* Automated Method */}
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg font-semibold text-brand-800 mb-4">Méthode Automatisée</h3>
                      <div className="space-y-4">
                        <p className="text-gray-600 leading-relaxed">
                          Notre objectif est de trouver un moyen d'automatiser ce type de tâche. À ce jour, un seul article traite de ce sujet
                    <button 
                      onClick={() => setSelectedReference(10)}
                      className="inline-flex items-center text-brand-600 hover:text-brand-700 ml-1"
                    >
                      <sup>[2]</sup>
                    </button>
                          . Celui-ci est cependant peu applicable en temps réel puisque, comme abordé dans la partie "tracking", le modèle utilisé (ResNet50) est entraîné sur des événements déjà découpés, où seule une classification parmi différents événements possibles est nécessaire.</p>

                        <p className="text-gray-600 leading-relaxed">
                          Après le processus de tracking détaillé dans une autre section, nous pouvons appliquer un apprentissage des séquences avec un réseau MLSTM (Multi-Layer Long Short-Term Memory). Ce réseau capture les relations temporelles entre les trames afin de détecter des motifs séquentiels associés aux événements, tels que les cartons rouges dans notre cas.
                        </p>

                        <div className="bg-gray-50 rounded-xl p-4">
                          <h4 className="text-brand-800 font-semibold mb-3">Fonctionnement du MLSTM</h4>
                          <p className="text-gray-600 mb-4">
                            Le MLSTM prédit une classe avec un score de confiance en se basant sur :
                          </p>
                          <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>La corrélation des mouvements des joueurs</li>
                            <li>Les actions contextuelles (comme les fautes)</li>
                            <li>Les indices visuels spécifiques</li>
                          </ul>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4">
                          <h4 className="text-brand-800 font-semibold mb-3">Résultats Comparatifs</h4>
                          <p className="text-gray-600 mb-4">
                            Ces prédictions sont comparées à l'ensemble de données SVE (Soccer Video Events) pour calculer le score d'accuracy, qui atteint 83 %. Comparaison avec d'autres techniques :
                          </p>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white p-3 rounded-lg text-center">
                              <div className="text-xl font-bold text-brand-600">73%</div>
                              <div className="text-sm text-gray-500">HOG+SVM</div>
                            </div>
                            <div className="bg-white p-3 rounded-lg text-center">
                              <div className="text-xl font-bold text-brand-600">82%</div>
                              <div className="text-sm text-gray-500">AlexNet+MLSTM</div>
                            </div>
                            <div className="bg-white p-3 rounded-lg text-center">
                              <div className="text-xl font-bold text-brand-600">82%</div>
                              <div className="text-sm text-gray-500">GoogleNet+MLSTM</div>
                            </div>
                            <div className="bg-white p-3 rounded-lg text-center">
                              <div className="text-xl font-bold text-betting-win">83%</div>
                              <div className="text-sm text-gray-500">ResNet50+MLSTM</div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6">
                          <div className="relative aspect-[16/9] w-full">
                            <img
                              src="/redcard.png"
                              alt="Détection de carton rouge"
                              className="w-full h-full object-contain rounded-lg shadow-md"
                            />
                          </div>
                          <p className="text-sm text-gray-500 mt-2 text-center">Détection de carton rouge avec MLSTM</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Close Button */}
              <div className="sm:hidden flex-shrink-0 p-4 bg-white border-t border-gray-100">
                <button
                  onClick={() => setShowRedCardInfo(false)}
                  className="w-full bg-brand-800 hover:bg-brand-700 active:bg-brand-900 text-white px-6 py-3.5 rounded-xl text-sm font-medium flex items-center gap-2 justify-center"
                >
                  Fermer
                </button>
              </div>

              {/* References Modal */}
              <AnimatePresence>
                {selectedReference && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
                    onClick={() => setSelectedReference(null)}
                  >
                    <motion.div
                      className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl"
                      onClick={e => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-brand-800">Référence [{selectedReference === 9 ? '1' : '2'}]</h3>
                        <button
                          onClick={() => setSelectedReference(null)}
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <p className="text-gray-600 mb-4">{references[selectedReference - 1].text}</p>
                      <a
                        href={references[selectedReference - 1].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-600 hover:text-brand-700 underline break-all"
                      >
                        {references[selectedReference - 1].url}
                      </a>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Goal Info Modal */}
      <AnimatePresence>
        {showGoalInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="bg-white w-full sm:rounded-2xl sm:max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-brand-800 text-white p-4 sm:p-6 flex-shrink-0">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <BarChart2 size={24} className="text-betting-win" />
                    </div>
                    Détection des Buts
                  </h2>
                  <button
                    onClick={() => setShowGoalInfo(false)}
                    className="p-2 hover:bg-white/10 active:bg-white/20 rounded-full transition-colors"
                    aria-label="Fermer"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="p-4 sm:p-8 overflow-y-auto flex-1">
                {/* Introduction */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6 shadow-md mb-6">
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    La statistique qui est sûrement la plus regardée par la population, même par ceux qui n'aiment pas ce sport, est bien celle-ci : le nombre de buts. Il existe en effet plusieurs moyens de la détecter.
                  </p>
                </div>

                {/* Main Methods Section */}
                <div className="space-y-6">
                  {/* Event Detection Method */}
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg font-semibold text-brand-800 mb-4">Détection d'événements et classification</h3>
                      <div className="space-y-2">
                        <p className="text-gray-600 leading-relaxed">
                          La première méthode fonctionne avec des arbres de décision. Après avoir effectué le suivi des joueurs, on applique nos méthodes présentées dans la partie "possessions" afin de connaître l'équipe titulaire du ballon (qui sera l'équipe qui marque).  Celle-ci détecte s'il y a un tir comme présenté dans la partie "tir" de la ressource pédagogique. Après cette frappe, notre modèle va chercher à savoir si actuellement nous sommes dans un temps de "dead ball interval". Cela indique que le jeu s'est arrêté et que la frappe n'a pas été arrêtée. Cette zone de non-possessions signifie qu'elle ne respecte pas les contraintes de possession décrites dans cette partie du même nom et/ou que la balle n'est plus dans les limites du terrain. Enfin, après ce "dead ball interval", le modèle va rechercher plusieurs patterns pour détecter la raison de cet événement et ainsi le classifier en suivant la méthodologie de la photo ci-dessous :
                        </p>

                        <div className="bg-gray-50 rounded-lg p-1">
                          <img
                            src="/goal1.png"
                            alt="Classification des événements"
                            className="w-full h-auto object-contain max-h-[300px] sm:max-h-[400px]"
                          />
                          <p className="text-xs sm:text-sm text-gray-500 mt-1 text-center">Méthodologie de classification des événements</p>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-1">
                          <img
                            src="/goal2.png"
                            alt="Position des joueurs après un but"
                            className="w-full h-auto object-contain max-h-[300px] sm:max-h-[400px]"
                          />
                          <p className="text-xs sm:text-sm text-gray-500 mt-1 text-center">Position des joueurs après un but</p>
                        </div>

                        <p className="text-gray-600 leading-relaxed">
                          Ainsi, si tous les joueurs sont dans leur moitié de terrain et qu'au moins un joueur est dans le cercle central comme le montre la seconde photo, alors nous pouvons prendre la décision de classer cet événement comme un but pour l'équipe qui avait la possession. Cependant, ces méthodes sont limitées, notamment pour des buts à la dernière seconde de la mi-temps où le coup d'envoi n'a pas lieu. Quand c'est le cas, l'algorithme compte cela comme un but si le match se termine par un "dead ball interval" et que celui-ci était un tir allant dans le cadre de la cage sur un plan 2D uniquement. De plus, pour éviter les cas où le coup d'envoi doit être rejoué, une variable k représentant le nombre de coups d'envoi est initialisée. Celle-ci ne s'incrémente pas si la balle n'est pas rentrée dans au moins une des surfaces de réparation. Ce type de méthode a été évalué à 96% de précision et 91% de rappel.
                          <button 
                            onClick={() => setSelectedReference(2)}
                            className="inline-flex items-center text-brand-600 hover:text-brand-700 ml-1"
                          >
                            <sup>[1]</sup>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Sensors Method */}
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg font-semibold text-brand-800 mb-4">Capteurs</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Si l'on utilise des capteurs sur des joueurs, il est conseillé d'utiliser du Machine Learning, tel qu'un RandomForestClassifier, qui s'entraînerait sur nos données collectées dans le but de prédire des buts. Après cette classification, on peut utiliser des techniques de Frequent Itemset Mining (FIM) (par exemple, l'algorithme Apriori) pour analyser les séquences d'annotations et identifier les corrélations entre les événements, afin de détecter de potentielles erreurs de classification, notamment en créant des règles d'association avec un dataset d'entraînement et chercher à détecter ce type de règle lors de la prédiction d'un but.
                        <button 
                          onClick={() => setSelectedReference(12)}
                          className="inline-flex items-center text-brand-600 hover:text-brand-700 ml-1"
                        >
                          <sup>[2]</sup>
                        </button>
                      </p>
                    </div>
                  </div>

                  {/* Event Classification Method */}
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg font-semibold text-brand-800 mb-4">Classification d'événements</h3>
                      <div className="space-y-4">
                        <p className="text-gray-600 leading-relaxed">
                          Dans la même idée que pour les cartons rouges, il est possible de faire de la classification d'événements, où l'on appliquerait un réseau MLSTM (Multi-Layer Long Short-Term Memory), capturant les relations temporelles entre les trames afin de détecter des motifs séquentiels associés aux événements, tels que les buts.
                        </p>

                        <div className="bg-gray-50 rounded-xl p-4">
                          <h4 className="text-brand-800 font-semibold mb-3">Paramètres analysés</h4>
                          <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>Corrélation des mouvements des joueurs</li>
                            <li>Actions contextuelles</li>
                            <li>Indices visuels spécifiques</li>
                          </ul>
                        </div>

                        <div className="mt-4 bg-gray-50 rounded-xl p-4">
                          <div className="relative aspect-[16/9] w-full">
                            <img
                              src="/goal3.png"
                              alt="Classification MLSTM"
                              className="w-full h-full object-contain rounded-lg shadow-md"
                            />
                          </div>
                          <p className="text-sm text-gray-500 mt-2 text-center">Classification des buts avec MLSTM</p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4">
                          <h4 className="text-brand-800 font-semibold mb-3">Résultats par type de but</h4>
                          <p className="text-gray-600 leading-relaxed">
                            Ces prédictions sont comparées à l'ensemble de données SVE (Soccer Video Events) pour calculer le score d'accuracy, qui atteint 89 % pour un but "normal", 88 % pour les buts de la tête et 98 % pour un but sur penalty. Ce résultat est mis en perspective avec d'autres techniques utilisées, où les résultats sont respectivement :
                          </p>

                          <div className="bg-gray-100 p-4 rounded-lg">
                            <h2 className="text-lg font-semibold mb-4">ResNet50+MLSTM</h2>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="bg-white p-3 rounded-lg text-center">
                                <div className="text-xl font-bold text-brand-600">89%</div>
                                <div className="text-sm text-gray-500">But normal</div>
                              </div>
                              <div className="bg-white p-3 rounded-lg text-center">
                                <div className="text-xl font-bold text-brand-600">88%</div>
                                <div className="text-sm text-gray-500">But de la tête</div>
                              </div>
                              <div className="bg-white p-3 rounded-lg text-center">
                                <div className="text-xl font-bold text-betting-win">98%</div>
                                <div className="text-sm text-gray-500">But sur penalty</div>
                              </div>
                            </div>
                          </div>

                          {/* Tableau 2 */}
                          <div className="bg-gray-100 p-4 rounded-lg">
                            <h2 className="text-lg font-semibold mb-4">HOG+SVM</h2>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="bg-white p-3 rounded-lg text-center">
                                <div className="text-xl font-bold text-brand-600">89%</div>
                                <div className="text-sm text-gray-500">But normal</div>
                              </div>
                              <div className="bg-white p-3 rounded-lg text-center">
                                <div className="text-xl font-bold text-brand-600">64%</div>
                                <div className="text-sm text-gray-500">But de la tête</div>
                              </div>
                              <div className="bg-white p-3 rounded-lg text-center">
                                <div className="text-xl font-bold text-betting-win">69%</div>
                                <div className="text-sm text-gray-500">But sur penalty</div>
                              </div>
                            </div>
                          </div>

                          {/* Tableau 3 */}
                          <div className="bg-gray-100 p-4 rounded-lg">
                            <h2 className="text-lg font-semibold mb-4">AlexNet+MLSTM</h2>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="bg-white p-3 rounded-lg text-center">
                                <div className="text-xl font-bold text-brand-600">79%</div>
                                <div className="text-sm text-gray-500">But normal</div>
                              </div>
                              <div className="bg-white p-3 rounded-lg text-center">
                                <div className="text-xl font-bold text-brand-600">93%</div>
                                <div className="text-sm text-gray-500">But de la tête</div>
                              </div>
                              <div className="bg-white p-3 rounded-lg text-center">
                                <div className="text-xl font-bold text-betting-win">92%</div>
                                <div className="text-sm text-gray-500">But sur penalty</div>
                              </div>
                            </div>
                          </div>

                          {/* Tableau 4 */}
                          <div className="bg-gray-100 p-4 rounded-lg">
                            <h2 className="text-lg font-semibold mb-4">GoogleNet+MLSTM</h2>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="bg-white p-3 rounded-lg text-center">
                                <div className="text-xl font-bold text-brand-600">89%</div>
                                <div className="text-sm text-gray-500">But normal</div>
                              </div>
                              <div className="bg-white p-3 rounded-lg text-center">
                                <div className="text-xl font-bold text-brand-600">93%</div>
                                <div className="text-sm text-gray-500">But de la tête</div>
                              </div>
                              <div className="bg-white p-3 rounded-lg text-center">
                                <div className="text-xl font-bold text-betting-win">98%</div>
                                <div className="text-sm text-gray-500">But sur penalty</div>
                              </div>
                            </div>
                          </div>


                          <button 
                            onClick={() => setSelectedReference(13)}
                            className="inline-flex items-center text-brand-600 hover:text-brand-700 mt-3"
                          >
                            <sup>[3]</sup>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Close Button */}
              <div className="sm:hidden flex-shrink-0 p-4 bg-white border-t border-gray-100">
                <button
                  onClick={() => setShowGoalInfo(false)}
                  className="w-full bg-brand-800 hover:bg-brand-700 active:bg-brand-900 text-white px-6 py-3.5 rounded-xl text-sm font-medium flex items-center gap-2 justify-center"
                >
                  Fermer
                </button>
              </div>

              {/* References Modal */}
              <AnimatePresence>
                {selectedReference && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
                    onClick={() => setSelectedReference(null)}
                  >
                    <motion.div
                      className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl"
                      onClick={e => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-brand-800">Référence [{selectedReference === 11 ? '1' : selectedReference === 12 ? '2' : '3'}]</h3>
                        <button
                          onClick={() => setSelectedReference(null)}
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <p className="text-gray-600 mb-4">{references[selectedReference - 1].text}</p>
                      <a
                        href={references[selectedReference - 1].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-600 hover:text-brand-700 underline break-all"
                      >
                        {references[selectedReference - 1].url}
                      </a>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Possession Info Modal */}
      <AnimatePresence>
        {selectedStat === 'possession' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="bg-white w-full sm:rounded-2xl sm:max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-brand-800 text-white p-4 sm:p-6 flex-shrink-0">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <BarChart2 size={24} className="text-betting-win" />
                    </div>
                    Détection de la Possession
                  </h2>
                  <button
                    onClick={() => setSelectedStat(null)}
                    className="p-2 hover:bg-white/10 active:bg-white/20 rounded-full transition-colors"
                    aria-label="Fermer"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="p-4 sm:p-8 overflow-y-auto flex-1">
                {/* Introduction */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6 shadow-md mb-6">
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    La statistique de possession est sûrement l'une des plus utiles puisqu'elle permet de distinguer quelle équipe a déclenché l'événement, c'est-à-dire quelle équipe vient de marquer ou quel joueur vient de tirer, etc.
                  </p>
                </div>

                {/* Main Methods Section */}
                <div className="space-y-6">
                  {/* Capteurs Section */}
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg font-semibold text-brand-800 mb-4">Capteurs</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Une possibilité reste les capteurs, même si elle n'est pas applicable en match officiel. Avec l'acquisition, un RandomForestClassifier nous prédirait la possession du ballon. Ces prédictions seraient corrigées avec des techniques comme le Frequent Itemset Mining (FIM) (par exemple, l'algorithme Apriori) pour analyser les séquences d'annotations et identifier les corrélations entre les événements.
                        <button 
                          onClick={() => setSelectedReference(14)}
                          className="inline-flex items-center text-brand-600 hover:text-brand-700 ml-1"
                        >
                          <sup>[1]</sup>
                        </button>
                      </p>
                    </div>
                  </div>

                  {/* Event Detection Section */}
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg font-semibold text-brand-800 mb-4">Détection d'événements</h3>
                      <div className="space-y-4">
                        <p className="text-gray-600 leading-relaxed">
                          L'une des méthodes qui semble la plus appropriée reste celle utilisée dans notre article de détection d'événements.
                          Celle-ci utilise le tracking des joueurs et du ballon pour déterminer quel joueur, de quelle équipe, est le plus proche du ballon et assigne ainsi la possession à ce dernier, comme on le voit ci-dessous :
                        </p>

                        <div className="bg-gray-50 rounded-lg p-1">
                          <img
                            src="/possession1.png"
                            alt="Détection de la possession"
                            className="w-full h-auto object-contain max-h-[300px] sm:max-h-[400px]"
                          />
                          <p className="text-xs sm:text-sm text-gray-500 mt-1 text-center">Détection de la possession par tracking</p>
                        </div>

                        <p className="text-gray-600 leading-relaxed">
                          Chaque joueur possède une zone circulaire autour de lui d'un rayon de 0,5 m. Si le ballon se trouve dans cette zone, le joueur est considéré en possession de celui-ci. Si deux joueurs "possèdent" le ballon, l'algorithme classe l'événement comme un duel, en définissant une zone circulaire autour du ballon d'un rayon d'1 m. Dans ce cas, on calcule :
                        </p>

                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                          <li>La distance entre les joueurs et le ballon,</li>
                          <li>Le déplacement du ballon (Δs) entre deux frames (f et f+1),</li>
                          <li>Le vecteur de direction du ballon (df₀),</li>
                          <li>La vitesse de déplacement du ballon (vf₀)</li>
                        </ul>

                        <div className="bg-gray-50 rounded-lg p-1">
                          <img
                            src="/possession2.png"
                            alt="Calculs de possession"
                            className="w-full h-auto object-contain max-h-[300px] sm:max-h-[400px]"
                          />
                          <p className="text-xs sm:text-sm text-gray-500 mt-1 text-center">Calculs pour la détection de possession</p>
                        </div>

                        <p className="text-gray-600 leading-relaxed">
                          Un joueur perd la possession lorsque le ballon quitte sa zone, que le déplacement du ballon est supérieur à un seuil défini, et que le joueur n'est plus présent par la suite (le ballon entre dans la zone d'un seul joueur, sans qu'il y ait de zone de duel).
                        </p>

                        <p className="text-gray-600 leading-relaxed">
                          Le ballon est récupéré par un autre joueur si ce dernier est proche du ballon et entre en contact avec lui, ce qui est caractérisé par un changement de direction et de vitesse du ballon.
                        </p>

                        <p className="text-gray-600 leading-relaxed">
                          Ce type de calcul permet d'obtenir une précision de plus de 90 %.
                          <button 
                            onClick={() => setSelectedReference(15)}
                            className="inline-flex items-center text-brand-600 hover:text-brand-700 ml-1"
                          >
                            <sup>[2]</sup>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Close Button */}
              <div className="sm:hidden flex-shrink-0 p-4 bg-white border-t border-gray-100">
                <button
                  onClick={() => setSelectedStat(null)}
                  className="w-full bg-brand-800 hover:bg-brand-700 active:bg-brand-900 text-white px-6 py-3.5 rounded-xl text-sm font-medium flex items-center gap-2 justify-center"
                >
                  Fermer
                </button>
              </div>

              {/* References Modal */}
              <AnimatePresence>
                {selectedReference && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
                    onClick={() => setSelectedReference(null)}
                  >
                    <motion.div
                      className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl"
                      onClick={e => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-brand-800">Référence [{selectedReference === 14 ? '1' : '2'}]</h3>
                        <button
                          onClick={() => setSelectedReference(null)}
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <p className="text-gray-600 mb-4">{references[selectedReference - 1].text}</p>
                      <a
                        href={references[selectedReference - 1].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-600 hover:text-brand-700 underline break-all"
                      >
                        {references[selectedReference - 1].url}
                      </a>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              
            </motion.div>
          </motion.div>
          
        )}
      </AnimatePresence>

      {/* Shots Info Modal */}
      <AnimatePresence>
        {selectedStat === 'shots' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="bg-white w-full sm:rounded-2xl sm:max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-brand-800 text-white p-4 sm:p-6 flex-shrink-0">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <BarChart2 size={24} className="text-betting-win" />
                    </div>
                    Détection des Tirs
                  </h2>
                  <button
                    onClick={() => setSelectedStat(null)}
                    className="p-2 hover:bg-white/10 active:bg-white/20 rounded-full transition-colors"
                    aria-label="Fermer"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="p-4 sm:p-8 overflow-y-auto flex-1">
                {/* Introduction */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6 shadow-md mb-6">
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Le nombre de tirs est une statistique qui permet de savoir à quel point une équipe arrive à se projeter vers l'avant et à créer des occasions de buts. Comme pour la plupart des statistiques, on observe 2 grandes parties.
                  </p>
                </div>

                {/* Main Methods Section */}
                <div className="space-y-6">
                  {/* Capteurs Section */}
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg font-semibold text-brand-800 mb-4">Capteurs</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Une possibilité reste les capteurs, même si elle n'est pas applicable en match officiel. Avec l'acquisition, un RandomForestClassifier nous prédirait qu'un tir vient d'être effectué par un joueur. Ces prédictions seraient corrigées avec des techniques comme le Frequent Itemset Mining (FIM) (par exemple, l'algorithme Apriori) pour analyser les séquences d'annotations et identifier les corrélations entre les événements.
                        <button 
                          onClick={() => setSelectedReference(1)}
                          className="inline-flex items-center text-brand-600 hover:text-brand-700 ml-1"
                        >
                          <sup>[1]</sup>
                        </button>
                      </p>
                    </div>
                  </div>

                  {/* Event Detection Section */}
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg font-semibold text-brand-800 mb-4">Détection d'événement</h3>
                      <div className="space-y-4">
                        <p className="text-gray-600 leading-relaxed">
                          L'avantage de la manière dont nous avons décrit le calcul de la possession est que les pertes de possession permettent la détection de tirs, en définissant un événement de tir comme une perte de possession par un joueur de l'équipe attaquante suivie d'un but, d'un corner, d'un six mètres ou d'un arrêt. 
                        </p>
                        
                        <p className="text-gray-600 leading-relaxed">
                          Le problème d'une telle méthode est que les tirs contrés ne sont pas définis comme des tirs. Un tir est considéré comme cadré si, dans notre plan 2D, il passe par les coordonnées de la cage et qu'il n'y a pas de remise en jeu via un coup de pied arrêté ou un coup d'envoi, ou s'il y a un arrêt. Un arrêt, dans la même logique que les tirs, est détecté par un gain de possession, par le gradient dans la surface de réparation et précédé d'un tir (de même que pour un tir contré qui lui revient dessus, ceci est une limite).
                        </p>

                        <div className="bg-gray-50 rounded-lg p-1">
                          <img
                            src="/tir1.png"
                            alt="Arbre de décision pour la classification des tirs"
                            className="w-full h-auto object-contain max-h-[300px] sm:max-h-[400px]"
                          />
                          <p className="text-xs sm:text-sm text-gray-500 mt-1 text-center">
                            Arbre de décision pour la classification des tirs
                          </p>
                        </div>

                        <p className="text-gray-600 leading-relaxed">
                          Cette technique nous permet d'avoir une précision de 78 % et un recall de 53 %, dû au fait que les tirs contrés sont considérés comme des passes, de même que les tirs qui partiraient de la "cross zone" ou de la "other zone". L'article en question, mais aussi le tracking, limite ce type de détection où les occlusions des joueurs seraient mal gérées.
                          <button 
                            onClick={() => setSelectedReference(2)}
                            className="inline-flex items-center text-brand-600 hover:text-brand-700 ml-1"
                          >
                            <sup>[2]</sup>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Close Button */}
              <div className="sm:hidden flex-shrink-0 p-4 bg-white border-t border-gray-100">
                <button
                  onClick={() => setSelectedStat(null)}
                  className="w-full bg-brand-800 hover:bg-brand-700 active:bg-brand-900 text-white px-6 py-3.5 rounded-xl text-sm font-medium flex items-center gap-2 justify-center"
                >
                  Fermer
                </button>
              </div>

              {/* References Modal */}
              <AnimatePresence>
                {selectedReference && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
                    onClick={() => setSelectedReference(null)}
                  >
                    <motion.div
                      className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl"
                      onClick={e => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-brand-800">Référence [{selectedReference}]</h3>
                        <button
                          onClick={() => setSelectedReference(null)}
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <p className="text-gray-600 mb-4">{references[selectedReference - 1].text}</p>
                      <a
                        href={references[selectedReference - 1].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-600 hover:text-brand-700 underline break-all"
                      >
                        {references[selectedReference - 1].url}
                      </a>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Passes Info Modal */}
      <AnimatePresence>
        {selectedStat === 'passes' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="bg-white w-full sm:rounded-2xl sm:max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-brand-800 text-white p-4 sm:p-6 flex-shrink-0">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <BarChart2 size={24} className="text-betting-win" />
                    </div>
                    Détection des Passes
                  </h2>
                  <button
                    onClick={() => setSelectedStat(null)}
                    className="p-2 hover:bg-white/10 active:bg-white/20 rounded-full transition-colors"
                    aria-label="Fermer"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="p-4 sm:p-8 overflow-y-auto flex-1">
                {/* Introduction */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6 shadow-md mb-6">
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Les statistiques de passes sont souvent corrélées avec celles de la possession, ce qui est logique et se reflète dans la façon de calculer ces statistiques.
                  </p>
                </div>

                {/* Main Methods Section */}
                <div className="space-y-6">
                  {/* Capteurs Section */}
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg font-semibold text-brand-800 mb-4">Capteurs</h3>
                      <div className="space-y-4">
                        <p className="text-gray-600 leading-relaxed">
                          Même si cette méthode n'est pas applicable en match officiel, les capteurs restent une solution d'acquisition des données. Où un RandomForestClassifier nous prédirait qu'une passe a été effectuée d'un joueur à un autre. Ces prédictions seraient corrigées avec des techniques comme le Frequent Itemset Mining (FIM) (par exemple, l'algorithme Apriori) pour analyser les séquences d'annotations et identifier les corrélations entre les événements, notamment en utilisant des règles d'association où l'on constate dans le tableau ci-dessous que les passes y sont souvent.
                          <button 
                            onClick={() => setSelectedReference(1)}
                            className="inline-flex items-center text-brand-600 hover:text-brand-700 ml-1"
                          >
                            <sup>[1]</sup>
                          </button>
                        </p>

                        <div className="bg-gray-50 rounded-lg p-1">
                          <img
                            src="/pass1.png"
                            alt="Tableau des corrélations de passes"
                            className="w-full h-auto object-contain max-h-[300px] sm:max-h-[400px]"
                          />
                          <p className="text-xs sm:text-sm text-gray-500 mt-1 text-center">
                            Tableau des corrélations de passes
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Event Detection Section */}
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg font-semibold text-brand-800 mb-4">Détection d'événement</h3>
                      <div className="space-y-4">
                        <p className="text-gray-600 leading-relaxed">
                          Pour la détection des passes, on utilise la même logique que pour la détection des tirs, comme le montre la figure ci-dessous, en faisant une distinction entre centres et passes, où le centre pourrait être une autre statistique (dans le cadre de notre projet, nous avons assemblé les deux, de même que les tirs cadrés et non cadrés).
                        </p>

                        <div className="bg-gray-50 rounded-lg p-1">
                          <img
                            src="/pass2.png"
                            alt="Logique de détection des passes"
                            className="w-full h-auto object-contain max-h-[300px] sm:max-h-[400px]"
                          />
                          <p className="text-xs sm:text-sm text-gray-500 mt-1 text-center">
                            Logique de détection des passes
                          </p>
                        </div>

                        <p className="text-gray-600 leading-relaxed">
                          Pour classifier un centre, la perte de balle doit partir de la "cross zone", atterrir dans la surface de réparation, dans laquelle au moins un attaquant se trouve. Le centre est considéré comme réussi si l'attaquant prend la possession, et comme raté si c'est le défenseur qui en prend possession. Les passes suivent la même logique, mais peu importe la zone de perte de possession du joueur.
                        </p>

                        <p className="text-gray-600 leading-relaxed">
                          Dans le cadre des passes, la précision de cette méthode est de 90 % avec un recall de 94 %. Et pour les centres, respectivement 86 % et 39 %.
                          <button 
                            onClick={() => setSelectedReference(2)}
                            className="inline-flex items-center text-brand-600 hover:text-brand-700 ml-1"
                          >
                            <sup>[2]</sup>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Close Button */}
              <div className="sm:hidden flex-shrink-0 p-4 bg-white border-t border-gray-100">
                <button
                  onClick={() => setSelectedStat(null)}
                  className="w-full bg-brand-800 hover:bg-brand-700 active:bg-brand-900 text-white px-6 py-3.5 rounded-xl text-sm font-medium flex items-center gap-2 justify-center"
                >
                  Fermer
                </button>
              </div>

              {/* References Modal */}
              <AnimatePresence>
                {selectedReference && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
                    onClick={() => setSelectedReference(null)}
                  >
                    <motion.div
                      className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl"
                      onClick={e => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-brand-800">Référence [{selectedReference}]</h3>
                        <button
                          onClick={() => setSelectedReference(null)}
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <p className="text-gray-600 mb-4">{references[selectedReference - 1].text}</p>
                      <a
                        href={references[selectedReference - 1].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-600 hover:text-brand-700 underline break-all"
                      >
                        {references[selectedReference - 1].url}
                      </a>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* xG Info Modal */}
      <AnimatePresence>
        {selectedStat === 'xG' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="bg-white w-full sm:rounded-2xl sm:max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-brand-800 text-white p-4 sm:p-6 flex-shrink-0">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <BarChart2 size={24} className="text-betting-win" />
                    </div>
                    Expected Goals (xG)
                  </h2>
                  <button
                    onClick={() => setSelectedStat(null)}
                    className="p-2 hover:bg-white/10 active:bg-white/20 rounded-full transition-colors"
                    aria-label="Fermer"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="p-4 sm:p-8 overflow-y-auto flex-1">
                {/* Introduction */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6 shadow-md mb-6">
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Les xG ou buts attendus sont des données qui se sont démocratisées assez récemment dans le domaine du football. 
                    Celles-ci permettent de donner le nombre de buts attendus d'une équipe ou d'un joueur dans un match de football. 
                    Cette donnée permet notamment de détecter les joueurs et équipes qui surperforment ou, au contraire, qui sous-performent. 
                    Comme dans l'exemple ci-dessous, où, au vu du match et des actions que le RC Lens a eues, l'équipe aurait dû marquer 5,24 buts 
                    et Montpellier HSC plutôt 0,82 buts.
                    <button 
                      onClick={() => setSelectedReference(1)}
                      className="inline-flex items-center text-brand-600 hover:text-brand-700 ml-1"
                    >
                      <sup>[1]</sup>
                    </button>
                  </p>
                </div>

                {/* Example Image */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                  <div className="p-4 sm:p-6">
                    <div className="bg-gray-50 rounded-lg p-1">
                      <img
                        src="/xg1.png"
                        alt="Exemple de xG dans un match"
                        className="w-full h-auto object-contain max-h-[300px] sm:max-h-[400px]"
                      />
                      <p className="text-xs sm:text-sm text-gray-500 mt-1 text-center">
                        Exemple d'analyse xG dans un match
                      </p>
                    </div>
                  </div>
                </div>

                {/* Calculation Method */}
                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg font-semibold text-brand-800 mb-4">Méthode de calcul</h3>
                    <div className="space-y-4">
                      <p className="text-gray-600 leading-relaxed">
                        Cette métrique est calculée en additionnant la probabilité de marquer chaque tir effectué.
                        Il est difficile de trouver des articles détaillant précisément les techniques utilisées par les entreprises 
                        professionnelles pour calculer ces métriques, d'autant que celles-ci changent selon l'entreprise.
                      </p>

                      <p className="text-gray-600 leading-relaxed">
                        Cependant, il est assez logique de penser que l'IA, précisément le Machine Learning, soit une solution pour 
                        ce type de prédiction
                        <button 
                          onClick={() => setSelectedReference(2)}
                          className="inline-flex items-center text-brand-600 hover:text-brand-700 ml-1"
                        >
                          <sup>[2]</sup>
                        </button>
                        . Cela permettrait d'obtenir des prédictions de buts entre [0, 1] afin d'additionner ces prédictions pour 
                        obtenir notre métrique.
                      </p>

                      <div className="bg-gray-50 rounded-xl p-4">
                        <h4 className="text-brand-800 font-semibold mb-3">Facteurs pris en compte</h4>
                        <p className="text-gray-600 mb-3">
                          Les techniques de calcul varient ainsi que les données permettant la prédiction. Dans le cadre de l'exemple 
                          trouvé, celles-ci dépendent de :
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                          <li>L'angle du tir</li>
                          <li>La distance du tir</li>
                          <li>La vitesse</li>
                          <li>La position du gardien</li>
                          <li>La position des défenseurs</li>
                        </ul>
                        <p className="text-gray-600 mt-3">
                          Toutes ces caractéristiques serviraient, avec un dataset constitué du nombre de tirs sur plusieurs saisons 
                          d'entraînement, à entraîner des modèles dans le but d'obtenir des prédictions (ici, 40 000 données issues 
                          de la Bundesliga en 2019).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Close Button */}
              <div className="sm:hidden flex-shrink-0 p-4 bg-white border-t border-gray-100">
                <button
                  onClick={() => setSelectedStat(null)}
                  className="w-full bg-brand-800 hover:bg-brand-700 active:bg-brand-900 text-white px-6 py-3.5 rounded-xl text-sm font-medium flex items-center gap-2 justify-center"
                >
                  Fermer
                </button>
              </div>

              {/* References Modal */}
              <AnimatePresence>
                {selectedReference && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
                    onClick={() => setSelectedReference(null)}
                  >
                    <motion.div
                      className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl"
                      onClick={e => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-brand-800">Référence [{selectedReference}]</h3>
                        <button
                          onClick={() => setSelectedReference(null)}
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <p className="text-gray-600 mb-4">{references[selectedReference - 1].text}</p>
                      <a
                        href={references[selectedReference - 1].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-600 hover:text-brand-700 underline break-all"
                      >
                        {references[selectedReference - 1].url}
                      </a>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corners Info Modal */}
      <AnimatePresence>
        {selectedStat === 'corners' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="bg-white w-full sm:rounded-2xl sm:max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-brand-800 text-white p-4 sm:p-6 flex-shrink-0">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <BarChart2 size={24} className="text-betting-win" />
                    </div>
                    Coups de pied arrêtés
                  </h2>
                  <button
                    onClick={() => setSelectedStat(null)}
                    className="p-2 hover:bg-white/10 active:bg-white/20 rounded-full transition-colors"
                    aria-label="Fermer"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="p-4 sm:p-8 overflow-y-auto flex-1">
                {/* Introduction */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6 shadow-md mb-6">
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Cette section rassemble l'intégralité des coups de pied arrêtés, mais nous présentons bien comment distinguer tous les différents types de coups de pied arrêtés, c'est-à-dire penalty, corner, touche, six mètres, coup franc et coup franc indirect.
                  </p>
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-4 sm:p-6">
                      <div className="space-y-6">
                        <p className="text-gray-600 leading-relaxed">
                          Comme décrit dans la partie but, nous repartons sur cette méthode utilisant des arbres de décision. Dans un premier temps, nous allons détecter un "dead ball interval". Cela indique que le jeu s'est arrêté. Cette zone de non-possession signifie qu'elle ne respecte pas les contraintes de possession décrites dans cette partie du même nom et/ou que la balle n'est plus dans les limites du terrain. Enfin, après ce "dead ball interval", le modèle va rechercher plusieurs patterns pour détecter la raison de cet événement et ainsi le classifier en suivant la méthodologie de la photo ci-dessous :
                          <button 
                            onClick={() => setSelectedReference(1)}
                            className="inline-flex items-center text-brand-600 hover:text-brand-700 ml-1"
                          >
                            <sup>[1]</sup>
                          </button>
                        </p>

                        <div className="bg-gray-50 rounded-lg p-1">
                          <img
                            src="/couparret1.png"
                            alt="Méthodologie de classification des coups de pied arrêtés"
                            className="w-full h-auto object-contain max-h-[300px] sm:max-h-[400px]"
                          />
                          <p className="text-xs sm:text-sm text-gray-500 mt-1 text-center">
                            Méthodologie de classification des coups de pied arrêtés
                          </p>
                        </div>

                        <p className="text-gray-600 leading-relaxed">
                          Cette seconde image permet de visualiser les patterns des coups de pied arrêtés :
                        </p>

                        <div className="bg-gray-50 rounded-lg p-1">
                          <img
                            src="/couparret2.png"
                            alt="Patterns des coups de pied arrêtés"
                            className="w-full h-auto object-contain max-h-[300px] sm:max-h-[400px]"
                          />
                          <p className="text-xs sm:text-sm text-gray-500 mt-1 text-center">
                            Visualisation des patterns des coups de pied arrêtés
                          </p>
                        </div>

                        <div className="space-y-4">
                          <h4 className="text-lg font-semibold text-brand-800">Types de coups de pied arrêtés</h4>
                          
                          <div className="pl-4 space-y-3">
                            <div>
                              <h5 className="font-medium text-brand-700">1. Penalty</h5>
                              <p className="text-gray-600">Un penalty est donc un coup franc dans la surface de réparation adverse où un attaquant et le gardien sont en place, ce dernier sur sa ligne de but, avec le ballon positionné au point de penalty et l'intégralité des autres joueurs en dehors de la surface.</p>
                            </div>
                            
                            <div>
                              <h5 className="font-medium text-brand-700">2. Corner</h5>
                              <p className="text-gray-600">Le ballon est au moins un joueur attaquant est sur le point de corner et aucun défenseur n'est proche de celui-ci.</p>
                            </div>
                            
                            <div>
                              <h5 className="font-medium text-brand-700">3. Touche</h5>
                              <p className="text-gray-600">Au moins un joueur est en dehors du terrain ou sur la ligne avec le ballon.</p>
                            </div>
                            
                            <div>
                              <h5 className="font-medium text-brand-700">4. 6 mètres</h5>
                              <p className="text-gray-600">Le gardien est dans la zone de but avec le ballon et aucun attaquant n'est dans la surface de réparation.</p>
                            </div>
                            
                            <div>
                              <h5 className="font-medium text-brand-700">5. Coup franc indirect</h5>
                              <p className="text-gray-600">Coup franc dans la surface (tout autre événement dans la surface) avec la présence de plusieurs joueurs offensifs et défensifs.</p>
                            </div>
                            
                            <div>
                              <h5 className="font-medium text-brand-700">6. Coup franc</h5>
                              <p className="text-gray-600">Tout autre événement sur le terrain ne correspondant pas à un des 5 critères précédemment cités.</p>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-600 leading-relaxed">
                          On retrouve les résultats de ces calculs dans la matrice de corrélation suivante :
                        </p>

                        <div className="bg-gray-50 rounded-lg p-1">
                          <img
                            src="/couparret3.png"
                            alt="Matrice de corrélation des coups de pied arrêtés"
                            className="w-full h-auto object-contain max-h-[300px] sm:max-h-[400px]"
                          />
                          <p className="text-xs sm:text-sm text-gray-500 mt-1 text-center">
                            Matrice de corrélation des coups de pied arrêtés
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Close Button */}
              <div className="sm:hidden flex-shrink-0 p-4 bg-white border-t border-gray-100">
                <button
                  onClick={() => setSelectedStat(null)}
                  className="w-full bg-brand-800 hover:bg-brand-700 active:bg-brand-900 text-white px-6 py-3.5 rounded-xl text-sm font-medium flex items-center gap-2 justify-center"
                >
                  Fermer
                </button>
              </div>

              {/* References Modal */}
              <AnimatePresence>
                {selectedReference && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
                    onClick={() => setSelectedReference(null)}
                  >
                    <motion.div
                      className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl"
                      onClick={e => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-brand-800">Référence [{selectedReference}]</h3>
                        <button
                          onClick={() => setSelectedReference(null)}
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <p className="text-gray-600 mb-4">{references[selectedReference - 1].text}</p>
                      <a
                        href={references[selectedReference - 1].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-600 hover:text-brand-700 underline break-all"
                      >
                        {references[selectedReference - 1].url}
                      </a>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fouls Info Modal */}
      <AnimatePresence>
        {selectedStat === 'fouls' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="bg-white w-full sm:rounded-2xl sm:max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="bg-brand-800 text-white p-4 sm:p-6 flex-shrink-0">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <BarChart2 size={24} className="text-betting-win" />
                    </div>
                    Détection des Fautes
                  </h2>
                  <button
                    onClick={() => setSelectedStat(null)}
                    className="p-2 hover:bg-white/10 active:bg-white/20 rounded-full transition-colors"
                    aria-label="Fermer"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Modal Content - Scrollable */}
              <div className="p-4 sm:p-8 overflow-y-auto flex-1">
                {/* Introduction */}
                <div className="bg-gray-50 rounded-xl p-4 sm:p-6 shadow-md mb-6">
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    Les fautes sont une statistique qui permet de mesurer la probabilité qu'un tir soit un but lors d'une faute. Cette méthode est basée sur l'analyse des données de football et prend en compte de nombreux facteurs pour estimer la probabilité qu'un tir soit un but lors d'une faute.
                  </p>
                </div>

                {/* Main Methods Section */}
                <div className="space-y-6">
                  {/* Capteurs Section */}
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg font-semibold text-brand-800 mb-4">Capteurs</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Une possibilité reste les capteurs, même si elle n'est pas applicable en match officiel. Avec l'acquisition, un RandomForestClassifier nous prédirait la probabilité qu'un tir soit un but lors d'une faute. Ces prédictions seraient corrigées avec des techniques comme le Frequent Itemset Mining (FIM) (par exemple, l'algorithme Apriori) pour analyser les séquences d'annotations et identifier les corrélations entre les événements.
                        <button 
                          onClick={() => setSelectedReference(1)}
                          className="inline-flex items-center text-brand-600 hover:text-brand-700 ml-1"
                        >
                          <sup>[1]</sup>
                        </button>
                      </p>
                    </div>
                  </div>

                  {/* Event Detection Section */}
                  <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="p-4 sm:p-6">
                      <h3 className="text-lg font-semibold text-brand-800 mb-4">Détection d'événement</h3>
                      <div className="space-y-4">
                        <p className="text-gray-600 leading-relaxed">
                          L'avantage de la manière dont nous avons décrit le calcul de la possession est que les pertes de possession permettent la détection de tirs, en définissant un événement de tir comme une perte de possession par un joueur de l'équipe attaquante suivie d'un but, d'un corner, d'un six mètres ou d'un arrêt. 
                        </p>
                        
                        <p className="text-gray-600 leading-relaxed">
                          Le problème d'une telle méthode est que les tirs contrés ne sont pas définis comme des tirs. Un tir est considéré comme cadré si, dans notre plan 2D, il passe par les coordonnées de la cage et qu'il n'y a pas de remise en jeu via un coup de pied arrêté ou un coup d'envoi, ou s'il y a un arrêt. Un arrêt, dans la même logique que les tirs, est détecté par un gain de possession, par le gradient dans la surface de réparation et précédé d'un tir (de même que pour un tir contré qui lui revient dessus, ceci est une limite).
                        </p>

                        <div className="bg-gray-50 rounded-lg p-1">
                          <img
                            src="/foul1.png"
                            alt="Arbre de décision pour la classification des tirs"
                            className="w-full h-auto object-contain max-h-[300px] sm:max-h-[400px]"
                          />
                          <p className="text-xs sm:text-sm text-gray-500 mt-1 text-center">
                            Arbre de décision pour la classification des tirs
                          </p>
                        </div>

                        <p className="text-gray-600 leading-relaxed">
                          Cette technique nous permet d'avoir une précision de 78 % et un recall de 53 %, dû au fait que les tirs contrés sont considérés comme des passes, de même que les tirs qui partiraient de la "cross zone" ou de la "other zone". L'article en question, mais aussi le tracking, limite ce type de détection où les occlusions des joueurs seraient mal gérées.
                          <button 
                            onClick={() => setSelectedReference(2)}
                            className="inline-flex items-center text-brand-600 hover:text-brand-700 ml-1"
                          >
                            <sup>[2]</sup>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Close Button */}
              <div className="sm:hidden flex-shrink-0 p-4 bg-white border-t border-gray-100">
                <button
                  onClick={() => setSelectedStat(null)}
                  className="w-full bg-brand-800 hover:bg-brand-700 active:bg-brand-900 text-white px-6 py-3.5 rounded-xl text-sm font-medium flex items-center gap-2 justify-center"
                >
                  Fermer
                </button>
              </div>

              {/* References Modal */}
              <AnimatePresence>
                {selectedReference && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
                    onClick={() => setSelectedReference(null)}
                  >
                    <motion.div
                      className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl"
                      onClick={e => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-brand-800">Référence [{selectedReference}]</h3>
                        <button
                          onClick={() => setSelectedReference(null)}
                          className="p-1 hover:bg-gray-100 rounded-full"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      <p className="text-gray-600 mb-4">{references[selectedReference - 1].text}</p>
                      <a
                        href={references[selectedReference - 1].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-600 hover:text-brand-700 underline break-all"
                      >
                        {references[selectedReference - 1].url}
                      </a>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default MatchStatsDisplay; 