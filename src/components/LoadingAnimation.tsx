import React from 'react';
import Lottie from 'react-lottie-player';
import animationData from '../assets/loading.json'; 
type Theme = {
  gradient: string;
  card: string;
  text: string;
  accent: string;
};

interface LoadingAnimationProps {
  theme?: Theme;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ theme }) => {
  return (
    <div
      className={`flex justify-center items-center h-64 ${
        theme?.card || 'bg-white/30'
      } rounded-xl border p-4`}
    >
      <Lottie
        loop
        play
        animationData={animationData}
        style={{ width: 150, height: 150 }}
      />
    </div>
  );
};

export default LoadingAnimation;
