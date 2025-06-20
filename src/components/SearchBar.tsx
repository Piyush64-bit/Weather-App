import React, { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface SearchBarProps {
  onSearch: (city: string) => void;
  onLocationSearch: () => void;
  isLoading: boolean;
  theme: {
    card: string;
    text: string;
    accent: string;
  };
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  onLocationSearch,
  isLoading,
  theme,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchQuery('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-2xl mx-auto mb-12"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className={`${theme.card} backdrop-blur-md rounded-3xl p-6 border shadow-2xl`}>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${theme.accent} w-5 h-5`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a city..."
                disabled={isLoading}
                className={`w-full pl-12 pr-4 py-4 rounded-2xl bg-white/10 border border-white/20 ${theme.text} placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent disabled:opacity-50 text-lg`}
              />
            </div>
            <motion.button
              type="submit"
              disabled={isLoading || !searchQuery.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-4 rounded-2xl bg-white/20 border border-white/30 ${theme.text} hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium`}
            >
              Search
            </motion.button>
            <motion.button
              type="button"
              onClick={onLocationSearch}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-2xl bg-white/20 border border-white/30 ${theme.text} hover:bg-white/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <MapPin className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};