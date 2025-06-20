import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WeatherData } from './types/weather';
import { 
  fetchWeatherByCity, 
  fetchWeatherByCoords, 
  getCurrentLocation,
  getWeatherTheme,
  getTimeOfDay
} from './utils/weather';
import { SearchBar } from './components/SearchBar';
import { WeatherCard } from './components/WeatherCard';
import LoadingAnimation from './components/LoadingAnimation';
import { ErrorMessage } from './components/ErrorMessage';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const theme = weatherData 
    ? getWeatherTheme(
        weatherData.weather[0].main,
        getTimeOfDay(Date.now() / 1000, weatherData.sys.sunrise, weatherData.sys.sunset)
      )
    : {
        gradient: 'from-blue-400 via-blue-500 to-blue-600',
        card: 'bg-white/20 border-white/30',
        text: 'text-white',
        accent: 'text-blue-100',
      };

  const handleCitySearch = async (cityName: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const weather = await fetchWeatherByCity(cityName);
      setWeatherData(weather);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLocationSearch = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const coords = await getCurrentLocation();
      const weather = await fetchWeatherByCoords(coords);
      setWeatherData(weather);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get location');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    if (weatherData) {
      handleCitySearch(weatherData.name);
    }
  };

  // Load default weather on mount
  useEffect(() => {
    handleCitySearch('London');
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.gradient} transition-all duration-1000`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-white rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-white rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className={`text-5xl md:text-7xl font-bold ${theme.text} mb-6`}>
            Weather
            <span className={`block text-4xl md:text-5xl font-light ${theme.accent} mt-2`}>
              Forecast
            </span>
          </h1>
          <p className={`text-xl ${theme.accent} max-w-2xl mx-auto leading-relaxed`}>
            Discover real-time weather conditions with beautiful animated visuals
          </p>
        </motion.div>

        <SearchBar
          onSearch={handleCitySearch}
          onLocationSearch={handleLocationSearch}
          isLoading={isLoading}
          theme={theme}
        />

        <AnimatePresence mode="wait">
          {isLoading && (
            <motion.div key="loading">
              <LoadingAnimation theme={theme} />
            </motion.div>
          )}

          {error && !isLoading && (
            <motion.div key="error">
              <ErrorMessage 
                message={error} 
                theme={theme} 
                onRetry={handleRetry}
              />
            </motion.div>
          )}

          {weatherData && !isLoading && !error && (
            <motion.div key="weather" className="space-y-8">
              <WeatherCard weatherData={weatherData} theme={theme} />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className={`text-center mt-20 ${theme.accent}`}
        >
          <p className="text-sm">
            Weather data provided by OpenWeatherMap API • Animations powered by Lottie
          </p>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;