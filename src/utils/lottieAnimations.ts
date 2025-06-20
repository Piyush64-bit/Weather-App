// Lottie animation URLs for different weather conditions
export const getLottieAnimation = (weatherMain: string, timeOfDay: 'day' | 'night') => {
  const animations = {
    clear: {
      day: 'https://lottie.host/4f0e3b6d-2c8a-4f5a-9b8a-1e2f3d4c5b6a/sunny.json',
      night: 'https://lottie.host/8a9b0c1d-2e3f-4g5h-6i7j-8k9l0m1n2o3p/night-clear.json'
    },
    clouds: {
      day: 'https://lottie.host/1a2b3c4d-5e6f-7g8h-9i0j-1k2l3m4n5o6p/cloudy.json',
      night: 'https://lottie.host/7f8g9h0i-1j2k-3l4m-5n6o-7p8q9r0s1t2u/night-cloudy.json'
    },
    rain: {
      day: 'https://lottie.host/2b3c4d5e-6f7g-8h9i-0j1k-2l3m4n5o6p7q/rain.json',
      night: 'https://lottie.host/6e7f8g9h-0i1j-2k3l-4m5n-6o7p8q9r0s1t/night-rain.json'
    },
    drizzle: {
      day: 'https://lottie.host/3c4d5e6f-7g8h-9i0j-1k2l-3m4n5o6p7q8r/drizzle.json',
      night: 'https://lottie.host/5d6e7f8g-9h0i-1j2k-3l4m-5n6o7p8q9r0s/night-drizzle.json'
    },
    thunderstorm: {
      day: 'https://lottie.host/4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s/thunderstorm.json',
      night: 'https://lottie.host/4d5e6f7g-8h9i-0j1k-2l3m-4n5o6p7q8r9s/thunderstorm.json'
    },
    snow: {
      day: 'https://lottie.host/5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t/snow.json',
      night: 'https://lottie.host/5e6f7g8h-9i0j-1k2l-3m4n-5o6p7q8r9s0t/snow.json'
    },
    mist: {
      day: 'https://lottie.host/6f7g8h9i-0j1k-2l3m-4n5o-6p7q8r9s0t1u/mist.json',
      night: 'https://lottie.host/6f7g8h9i-0j1k-2l3m-4n5o-6p7q8r9s0t1u/mist.json'
    },
    fog: {
      day: 'https://lottie.host/7g8h9i0j-1k2l-3m4n-5o6p-7q8r9s0t1u2v/fog.json',
      night: 'https://lottie.host/7g8h9i0j-1k2l-3m4n-5o6p-7q8r9s0t1u2v/fog.json'
    }
  };

  const weatherKey = weatherMain.toLowerCase() as keyof typeof animations;
  const fallbackAnimation = animations.clear[timeOfDay];
  
  return animations[weatherKey]?.[timeOfDay] || fallbackAnimation;
};

// Loading animation
export const getLoadingAnimation = () => {
  return 'https://lottie.host/9i0j1k2l-3m4n-5o6p-7q8r-9s0t1u2v3w4x/loading-weather.json';
};

// Fallback to simple weather animations if the above don't work
export const getSimpleWeatherAnimation = (weatherMain: string) => {
  const simpleAnimations: Record<string, string> = {
    clear: 'https://assets3.lottiefiles.com/packages/lf20_puciaact.json', // Sun
    clouds: 'https://assets2.lottiefiles.com/packages/lf20_V9t630.json', // Clouds
    rain: 'https://assets9.lottiefiles.com/packages/lf20_raiw2hcs.json', // Rain
    drizzle: 'https://assets9.lottiefiles.com/packages/lf20_raiw2hcs.json', // Rain
    thunderstorm: 'https://assets4.lottiefiles.com/packages/lf20_ydo1amjm.json', // Thunder
    snow: 'https://assets4.lottiefiles.com/packages/lf20_fy7rj4bb.json', // Snow
    mist: 'https://assets2.lottiefiles.com/packages/lf20_V9t630.json', // Clouds
    fog: 'https://assets2.lottiefiles.com/packages/lf20_V9t630.json', // Clouds
  };

  return simpleAnimations[weatherMain.toLowerCase()] || simpleAnimations.clear;
};