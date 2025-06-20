import React, { useEffect, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { motion } from 'framer-motion';
import { getSimpleWeatherAnimation } from '../utils/lottieAnimations';

interface WeatherAnimationProps {
  weatherMain: string;
  timeOfDay: 'day' | 'night';
  className?: string;
}

export const WeatherAnimation: React.FC<WeatherAnimationProps> = ({
  weatherMain,
  timeOfDay, // timeOfDay is now used
  className = "w-48 h-48"
}) => {
  const [animationData, setAnimationData] = useState<object | null>(null);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  // Using getLottieAnimation which considers timeOfDay
  const animationUrl = getSimpleWeatherAnimation(weatherMain, timeOfDay);

  useEffect(() => {
    setAnimationData(null);
    setLoadingError(null);
    if (typeof animationUrl === 'string') {
      fetch(animationUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch animation: ${response.status} ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => setAnimationData(data))
        .catch(error => {
          console.error('Error fetching Lottie animation:', error);
          setLoadingError('Weather animation could not be loaded.');
        });
    } else if (typeof animationUrl === 'object' && animationUrl !== null) {
      // If getSimpleWeatherAnimation directly returns an object (though it currently returns a string)
      setAnimationData(animationUrl);
    }
  }, [animationUrl]);

  if (loadingError) {
    return (
      <div className={`flex items-center justify-center ${className} bg-red-100 text-red-700`}>
        {loadingError}
      </div>
    );
  }

  if (!animationData) {
    return (
      <div data-testid="animation-loading" className={`flex items-center justify-center ${className}`}>
        Loading animation...
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`flex items-center justify-center ${className}`}
    >
      <Player
        autoplay
        loop
        src={animationData}
        style={{ width: '100%', height: '100%' }}
      />
    </motion.div>
  );
};
