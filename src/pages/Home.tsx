import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChartBarIcon } from '@heroicons/react/24/outline';
import { Github, Linkedin } from 'lucide-react';
import LazyImage from '../components/LazyImage';

const contributors = [
  {
    name: 'Cardi Julien',
    role: 'AI Engineer',
    image: '/julien.png',
    linkedin: 'https://www.linkedin.com/in/julien-1ee7/',
    github: 'https://github.com/devvv1337'
  },
  {
    name: 'Ferroni Sandro',
    role: 'AI Engineer',
    image: '/sandro.png',
    linkedin: 'https://www.linkedin.com/in/sandro-ferroni/',
    github: 'https://github.com/CirSandro'
  },
  {
    name: 'Moyo Kamdem Auren',
    role: 'AI Engineer',
    image: '/auren.png',
    linkedin: 'https://www.linkedin.com/in/auren-bradley-moyo-kamdem-a6a052268/',
    github: 'https://github.com/Mkbrad77'
  }
];

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-800 to-brand-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white max-w-3xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Analyse Statistique du Football en Temps Réel
          </h1>
          <div className="space-y-6 text-lg leading-relaxed text-white/90 backdrop-blur-sm bg-white/5 rounded-2xl p-8 shadow-xl">
            <p>
              Le football est bien plus qu'un simple jeu ; il représente une industrie mondiale estimée à 5,7 milliards de livres sterling pour la saison 2022/2023 en Premier League. L'impact économique de ce sport, combiné à la passion qu'il suscite à travers le monde, a engendré une demande croissante pour des analyses de plus en plus détaillées.
            </p>
            <p>
              Dans ce contexte, la collecte de données en temps réel, telles que la possession de balle, le nombre de tirs ou encore les actions décisives, devient un outil essentiel. Ce suivi statistique en direct permet de mieux comprendre la dynamique de chaque match, d'analyser la performance des équipes et d'apporter des insights précieux aux clubs, journalistes, joueurs professionnels et même aux fans.
            </p>
            <p>
              L'importance de cette collecte est multiple : pour les clubs, elle fournit des informations stratégiques permettant d'optimiser les entraînements et la gestion des matchs ; pour les joueurs, elle offre des retours précieux sur leur propre performance ; pour les journalistes et le public, elle enrichit l'expérience en fournissant des statistiques détaillées et accessibles, notamment sur ses adversaires.
            </p>
          </div>
        </motion.div>

        {/* Stats Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex justify-center mb-20"
        >
          <Link
            to="/stats"
            className="group relative inline-flex items-center gap-2 bg-white text-brand-800 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <ChartBarIcon className="w-6 h-6" />
            Voir les stats
            <span className="absolute -right-2 -top-2 w-4 h-4 bg-betting-win rounded-full animate-ping" />
          </Link>
        </motion.div>

        {/* Contributors Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Nos Contributeurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contributors.map((contributor, index) => (
              <motion.div
                key={contributor.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.2, duration: 0.6 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center text-white hover:bg-white/15 transition-colors"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
                  <LazyImage
                    src={contributor.image}
                    alt={contributor.name}
                    className="w-full h-full object-cover"
                    placeholderText={contributor.name}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{contributor.name}</h3>
                <p className="text-white/80 mb-4">{contributor.role}</p>
                <div className="flex justify-center gap-4">
                  <a
                    href={contributor.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors hover:scale-110 transform duration-200"
                    aria-label={`LinkedIn de ${contributor.name}`}
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                  <a
                    href={contributor.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white transition-colors hover:scale-110 transform duration-200"
                    aria-label={`GitHub de ${contributor.name}`}
                  >
                    <Github className="w-6 h-6" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home; 