import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  theme: {
    card: string;
    text: string;
    accent: string;
  };
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, theme, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`${theme.card} backdrop-blur-md rounded-2xl p-6 border shadow-lg max-w-md mx-auto text-center`}
    >
      <AlertCircle className={`w-12 h-12 ${theme.accent} mx-auto mb-4`} />
      <h3 className={`text-lg font-semibold ${theme.text} mb-2`}>
        Oops! Something went wrong
      </h3>
      <p className={`${theme.accent} mb-4`}>
        {message}
      </p>
      {onRetry && (
        <motion.button
          onClick={onRetry}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-6 py-2 rounded-xl bg-white/20 border border-white/30 ${theme.text} hover:bg-white/30 transition-colors`}
        >
          Try Again
        </motion.button>
      )}
    </motion.div>
  );
};