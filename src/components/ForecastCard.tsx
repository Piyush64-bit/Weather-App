import React from 'react';
import { motion } from 'framer-motion';
import { ForecastData } from '../types/weather';
import { getWeatherIcon, formatDate } from '../utils/weather';

interface ForecastCardProps {
  forecastData: ForecastData;
  theme: {
    card: string;
    text: string;
    accent: string;
  };
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ forecastData, theme }) => {
  // Get one forecast per day (taking the noon forecast for each day)
  const dailyForecasts = forecastData.list.filter((item, index) => {
    const date = new Date(item.dt * 1000);
    return date.getHours() === 12; // Get noon forecast
  }).slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-4xl mx-auto mt-8"
    >
      <h2 className={`text-2xl font-bold ${theme.text} mb-6 text-center`}>
        5-Day Forecast
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {dailyForecasts.map((forecast, index) => (
          <motion.div
            key={forecast.dt}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            className={`${theme.card} backdrop-blur-md rounded-2xl p-4 border shadow-lg text-center`}
          >
            <div className={`text-sm font-medium ${theme.accent} mb-2`}>
              {formatDate(forecast.dt)}
            </div>
            
            <div className="flex justify-center mb-3">
              <img
                src={getWeatherIcon(forecast.weather[0].icon)}
                alt={forecast.weather[0].description}
                className="w-12 h-12"
              />
            </div>
            
            <div className={`text-lg font-bold ${theme.text} mb-1`}>
              {Math.round(forecast.main.temp)}°
            </div>
            
            <div className={`text-xs ${theme.accent} mb-2 capitalize`}>
              {forecast.weather[0].description}
            </div>
            
            <div className={`text-xs ${theme.accent} space-y-1`}>
              <div>H: {Math.round(forecast.main.temp_max)}°</div>
              <div>L: {Math.round(forecast.main.temp_min)}°</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};