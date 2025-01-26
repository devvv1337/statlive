import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const Navigation: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Accueil', icon: HomeIcon },
    { path: '/stats', label: 'Statistiques', icon: ChartBarIcon },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 shadow-lg z-50"
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around">
          {navItems.map(({ path, label, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className="relative py-4 px-3 flex flex-col items-center focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 rounded-lg"
                aria-current={isActive ? 'page' : undefined}
                role="menuitem"
                aria-label={label}
              >
                <motion.div
                  initial={false}
                  animate={{
                    color: isActive ? '#1a56db' : '#6b7280',
                    scale: isActive ? 1.1 : 1,
                  }}
                  className="flex flex-col items-center"
                >
                  <Icon className="w-6 h-6" aria-hidden="true" />
                  <span className="text-xs mt-1">{label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-4 w-12 h-1 bg-brand-600 rounded-full"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30
                      }}
                      aria-hidden="true"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 