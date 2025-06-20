import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Droplets, Eye, Thermometer } from 'lucide-react';
import { WeatherData } from '../types/weather';
import { WeatherAnimation } from './WeatherAnimation';
import { getTimeOfDay } from '../utils/weather';

interface WeatherCardProps {
  weatherData: WeatherData;
  theme: {
    card: string;
    text: string;
    accent: string;
  };
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData, theme }) => {
  const { name, main, weather, wind, sys } = weatherData;
  const currentWeather = weather[0];
  const timeOfDay = getTimeOfDay(Date.now() / 1000, sys.sunrise, sys.sunset);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Weather Display */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`${theme.card} backdrop-blur-md rounded-3xl p-8 border shadow-2xl`}
        >
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-3xl font-bold ${theme.text} mb-2`}
            >
              {name}
              <span className={`text-lg font-normal ${theme.accent} ml-2`}>
                {sys.country}
              </span>
            </motion.h1>
            
            <WeatherAnimation 
              weatherMain={currentWeather.main}
              timeOfDay={timeOfDay}
              className="w-40 h-40 mx-auto mb-4"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className={`text-6xl font-bold ${theme.text} mb-2`}>
                {Math.round(main.temp)}°C
              </div>
              <div className={`text-xl ${theme.accent} capitalize mb-2`}>
                {currentWeather.description}
              </div>
              <div className={`text-lg ${theme.accent}`}>
                Feels like {Math.round(main.feels_like)}°C
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Weather Details */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className={`${theme.card} backdrop-blur-md rounded-2xl p-6 border shadow-lg`}>
              <div className="flex items-center mb-3">
                <Wind className={`w-6 h-6 ${theme.accent} mr-3`} />
                <span className={`text-sm font-medium ${theme.accent} uppercase tracking-wide`}>Wind Speed</span>
              </div>
              <div className={`text-2xl font-bold ${theme.text}`}>
                {Math.round(wind.speed)} m/s
              </div>
            </div>

            <div className={`${theme.card} backdrop-blur-md rounded-2xl p-6 border shadow-lg`}>
              <div className="flex items-center mb-3">
                <Droplets className={`w-6 h-6 ${theme.accent} mr-3`} />
                <span className={`text-sm font-medium ${theme.accent} uppercase tracking-wide`}>Humidity</span>
              </div>
              <div className={`text-2xl font-bold ${theme.text}`}>
                {main.humidity}%
              </div>
            </div>

            <div className={`${theme.card} backdrop-blur-md rounded-2xl p-6 border shadow-lg`}>
              <div className="flex items-center mb-3">
                <Eye className={`w-6 h-6 ${theme.accent} mr-3`} />
                <span className={`text-sm font-medium ${theme.accent} uppercase tracking-wide`}>Pressure</span>
              </div>
              <div className={`text-2xl font-bold ${theme.text}`}>
                {main.pressure} hPa
              </div>
            </div>

            <div className={`${theme.card} backdrop-blur-md rounded-2xl p-6 border shadow-lg`}>
              <div className="flex items-center mb-3">
                <Thermometer className={`w-6 h-6 ${theme.accent} mr-3`} />
                <span className={`text-sm font-medium ${theme.accent} uppercase tracking-wide`}>Real Feel</span>
              </div>
              <div className={`text-2xl font-bold ${theme.text}`}>
                {Math.round(main.feels_like)}°C
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};