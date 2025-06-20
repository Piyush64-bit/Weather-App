import React from 'react';
import { motion } from 'framer-motion';
import Lottie from 'react-lottie-player';
import { getSimpleWeatherAnimation } from '../utils/lottieAnimations';

interface WeatherAnimationProps {
  weatherMain: string;
  timeOfDay: 'day' | 'night';
  className?: string;
}

export const WeatherAnimation: React.FC<WeatherAnimationProps> = ({
  weatherMain,
  className = "w-48 h-48"
}) => {
  const animationUrl = getSimpleWeatherAnimation(weatherMain);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`flex items-center justify-center ${className}`}
    >
      <Lottie
        loop
        animationData={animationUrl}
        play
        style={{ width: '100%', height: '100%' }}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice'
        }}
      />
    </motion.div>
  );
};