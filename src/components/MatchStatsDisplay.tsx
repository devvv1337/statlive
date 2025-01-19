import React, { useState, useEffect } from 'react';
import { Info, Clock, BarChart2, Trophy, TrendingUp, X, Star, AlertTriangle, Zap } from 'lucide-react';

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
  score: string;
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

const MatchStatsDisplay: React.FC = () => {
  const [selectedStat, setSelectedStat] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState<'stats' | 'odds'>('stats');
  const [betSlipOpen, setBetSlipOpen] = useState(false);
  const [selectedBets, setSelectedBets] = useState<{
    stat: string;
    type: 'home' | 'draw' | 'away';
    odds: number;
  }[]>([]);
  const [showHighlightModal, setShowHighlightModal] = useState(false);
  
  const matchData: MatchData = {
    id: "L1-2024-OM-OL",
    homeTeam: "OM",
    awayTeam: "OL",
    score: "3 - 2",
    time: "87'",
    league: "Ligue 1 Uber Eats",
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
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setShowHighlightModal(true);
      setTimeout(() => setShowHighlightModal(false), 5000);
    }, 30000);

    return () => clearInterval(timer);
  }, []);

  const handleBetSelection = (stat: string, type: 'home' | 'draw' | 'away', odds: number) => {
    const existingBetIndex = selectedBets.findIndex(
      bet => bet.stat === stat && bet.type === type
    );

    if (existingBetIndex !== -1) {
      setSelectedBets(selectedBets.filter((_, index) => index !== existingBetIndex));
    } else {
      setSelectedBets([...selectedBets, { stat, type, odds }]);
    }
    setBetSlipOpen(true);
  };

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
    <div className="max-w-md mx-auto bg-surface-dark min-h-screen relative font-body">
      {/* Status Bar */}
      <div className="bg-brand-900 text-white h-7 flex items-center justify-between px-4 text-xs">
        <span>20:45</span>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-betting-live rounded-full animate-pulse-slow" />
          <span>EN DIRECT</span>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-b from-brand-800 to-brand-700 text-white p-6 pb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Trophy size={16} className="text-betting-win" />
            <span className="text-sm font-medium">{matchData.league}</span>
          </div>
          <button className="hover:text-betting-win transition-colors" aria-label="Favori">
            <Star size={16} />
          </button>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="text-2xl font-bold flex items-center gap-2">
            {matchData.homeTeam}
            {matchData.redCards.home > 0 && (
              <div className="group relative">
                <div className="bg-betting-loss w-4 h-5 rounded-sm cursor-help" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-white text-xs text-gray-900 rounded shadow-lg opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity z-50 font-medium">
                  Carton rouge : {matchData.redCards.homePlayers?.join(', ')}
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center">
            <div className="text-3xl font-bold tracking-tight">{matchData.score}</div>
            <div className="text-sm text-white/80 flex items-center gap-1 mt-1">
              <Clock size={12} />
              {matchData.time}
            </div>
          </div>
          <div className="text-2xl font-bold flex items-center gap-2">
            {matchData.redCards.away > 0 && (
              <div className="group relative">
                <div className="bg-betting-loss w-4 h-5 rounded-sm cursor-help" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-white text-xs text-gray-900 rounded shadow-lg opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity z-50 font-medium">
                  Carton rouge : {matchData.redCards.awayPlayers?.join(', ')}
                </div>
              </div>
            )}
            {matchData.awayTeam}
          </div>
        </div>
        <div className="flex justify-center gap-8">
          <button 
            onClick={() => setSelectedTab('stats')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              selectedTab === 'stats' 
                ? 'text-white border-b-2 border-white' 
                : 'text-white/70 hover:text-white'
            }`}
          >
            Statistiques
          </button>
          <button 
            onClick={() => setSelectedTab('odds')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              selectedTab === 'odds' 
                ? 'text-white border-b-2 border-white' 
                : 'text-white/70 hover:text-white'
            }`}
          >
            Cotes
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="p-4 space-y-4 pb-32">
        {selectedTab === 'stats' ? (
          Object.entries(matchData.stats).map(([key, value]) => {
            const statLabels: { [key: string]: string } = {
              possession: 'Possession',
              shots: 'Tirs',
              passes: 'Passes',
              xG: 'xG (buts attendus)',
              corners: 'Corners',
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
          })
        ) : (
          <div className="bg-surface-light rounded-xl shadow-stats p-4 animate-fade-in">
            <div className="space-y-6">
              {Object.entries(matchData.stats).map(([key, value]) => {
                const statLabels: { [key: string]: string } = {
                  possession: 'Possession',
                  shots: 'Tirs',
                  passes: 'Passes',
                  xG: 'xButs',
                  corners: 'Corners',
                  fouls: 'Fautes'
                };
                
                return value.odds && (
                  <div key={key} className="border-b border-surface-accent last:border-0 pb-6 last:pb-0">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-sm font-medium text-gray-500">{statLabels[key]}</h3>
                      {value.suspended && (
                        <div className="flex items-center gap-1 text-betting-suspended">
                          <AlertTriangle size={14} />
                          <span className="text-xs font-medium">Suspendu</span>
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <button 
                        onClick={() => !value.suspended && handleBetSelection(key, 'home', value.odds!.home)}
                        disabled={value.suspended}
                        className={`relative bg-surface-accent hover:bg-surface-accent/80 transition-colors rounded-xl p-3 text-center ${
                          selectedBets.some(bet => bet.stat === key && bet.type === 'home')
                            ? 'ring-2 ring-betting-win ring-offset-2'
                            : ''
                        } ${value.suspended ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="text-xs text-gray-500 mb-1">Domicile</div>
                        <div className="text-lg font-bold text-betting-win">{value.odds.home}</div>
                      </button>
                      <button 
                        onClick={() => !value.suspended && handleBetSelection(key, 'draw', value.odds!.draw)}
                        disabled={value.suspended}
                        className={`relative bg-surface-accent hover:bg-surface-accent/80 transition-colors rounded-xl p-3 text-center ${
                          selectedBets.some(bet => bet.stat === key && bet.type === 'draw')
                            ? 'ring-2 ring-betting-draw ring-offset-2'
                            : ''
                        } ${value.suspended ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="text-xs text-gray-500 mb-1">Nul</div>
                        <div className="text-lg font-bold text-betting-draw">{value.odds.draw}</div>
                      </button>
                      <button 
                        onClick={() => !value.suspended && handleBetSelection(key, 'away', value.odds!.away)}
                        disabled={value.suspended}
                        className={`relative bg-surface-accent hover:bg-surface-accent/80 transition-colors rounded-xl p-3 text-center ${
                          selectedBets.some(bet => bet.stat === key && bet.type === 'away')
                            ? 'ring-2 ring-betting-loss ring-offset-2'
                            : ''
                        } ${value.suspended ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="text-xs text-gray-500 mb-1">Extérieur</div>
                        <div className="text-lg font-bold text-betting-loss">{value.odds.away}</div>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Info Modal */}
      {selectedStat && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end z-50 animate-fade-in">
          <div className="bg-surface-light rounded-t-2xl p-6 w-full animate-slide-up">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {selectedStat === 'possession' ? 'Possession' :
                 selectedStat === 'shots' ? 'Tirs' :
                 selectedStat === 'passes' ? 'Passes' :
                 selectedStat === 'xG' ? 'xButs' :
                 selectedStat === 'corners' ? 'Corners' :
                 selectedStat === 'fouls' ? 'Fautes' : selectedStat}
              </h2>
              <button
                onClick={() => setSelectedStat(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Fermer"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {matchData.stats[selectedStat as keyof typeof matchData.stats].algorithm}
            </p>
          </div>
        </div>
      )}

      {/* Highlight Modal */}
      {showHighlightModal && (
        <div className="fixed left-1/2 transform -translate-x-1/2 top-20 w-full max-w-md px-4">
          <div className="bg-surface-light rounded-xl shadow-lg p-4 animate-slide-down">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-betting-win/10 rounded-full flex items-center justify-center">
                <Zap size={20} className="text-betting-win" />
              </div>
              <div>
                <h4 className="font-medium">Occasion dangereuse !</h4>
                <p className="text-sm text-gray-500">Tir cadré de l'OM, la possession monte à 62%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bet Slip */}
      {betSlipOpen && selectedBets.length > 0 && (
        <div className="fixed bottom-20 left-4 right-4 bg-surface-light rounded-t-xl shadow-lg animate-slide-up">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Parier</h3>
              <button
                onClick={() => setBetSlipOpen(false)}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Fermer"
              >
                <X size={20} />
              </button>
            </div>
            <div className="space-y-3">
              {selectedBets.map((bet, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-surface-accent rounded-lg">
                  <div>
                    <div className="text-sm font-medium">
                      {bet.stat === 'possession' ? 'Possession' :
                       bet.stat === 'shots' ? 'Tirs' :
                       bet.stat === 'passes' ? 'Passes' :
                       bet.stat === 'xG' ? 'xButs' :
                       bet.stat === 'corners' ? 'Corners' :
                       bet.stat === 'fouls' ? 'Fautes' : bet.stat}
                    </div>
                    <div className="text-xs text-gray-500">
                      {bet.type === 'home' ? 'Domicile' : bet.type === 'draw' ? 'Nul' : 'Extérieur'}
                    </div>
                  </div>
                  <div className="text-lg font-bold text-betting-win">{bet.odds}</div>
                </div>
              ))}
              <button className="w-full bg-betting-win hover:bg-betting-win-dark text-white font-medium py-3 rounded-lg transition-colors">
                Placer le pari
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface-light border-t flex justify-around p-4 pb-safe-bottom">
        <button className="text-brand-600 flex flex-col items-center">
          <BarChart2 size={24} />
          <span className="text-xs mt-1">Statistiques</span>
        </button>
        <button className="text-gray-400 flex flex-col items-center">
          <TrendingUp size={24} />
          <span className="text-xs mt-1">Paris</span>
        </button>
      </div>
    </div>
  );
};

export default MatchStatsDisplay; 