import { WeatherData, ForecastData, LocationCoords } from '../types/weather';

const API_KEY = 'f4c88638556a8336537e68d402c4f840';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherByCity = async (cityName: string): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found. Please check the spelling and try again.');
      }
      throw new Error('Failed to fetch weather data. Please try again later.');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred.');
  }
};

export const fetchWeatherByCoords = async (coords: LocationCoords): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data for your location.');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred.');
  }
};

export const getCurrentLocation = (): Promise<LocationCoords> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        let errorMessage = 'Failed to get your location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied. Please enable location services.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }
        reject(new Error(errorMessage));
      },
      { timeout: 10000 }
    );
  });
};

export const getTimeOfDay = (currentTime: number, sunrise: number, sunset: number): 'day' | 'night' => {
  return currentTime >= sunrise && currentTime <= sunset ? 'day' : 'night';
};

export const getWeatherTheme = (weatherMain: string, timeOfDay: 'day' | 'night') => {
  if (timeOfDay === 'night') {
    return {
      gradient: 'from-slate-900 via-purple-900 to-slate-900',
      card: 'bg-slate-800/40 border-slate-700/50',
      text: 'text-white',
      accent: 'text-purple-300',
    };
  }

  switch (weatherMain.toLowerCase()) {
    case 'clear':
      return {
        gradient: 'from-yellow-400 via-orange-500 to-red-500',
        card: 'bg-white/20 border-white/30',
        text: 'text-white',
        accent: 'text-yellow-100',
      };
    case 'clouds':
      return {
        gradient: 'from-gray-400 via-gray-500 to-gray-600',
        card: 'bg-white/25 border-white/35',
        text: 'text-white',
        accent: 'text-gray-100',
      };
    case 'rain':
    case 'drizzle':
      return {
        gradient: 'from-blue-400 via-blue-500 to-indigo-600',
        card: 'bg-white/20 border-white/30',
        text: 'text-white',
        accent: 'text-blue-100',
      };
    case 'thunderstorm':
      return {
        gradient: 'from-gray-700 via-gray-800 to-black',
        card: 'bg-white/15 border-white/25',
        text: 'text-white',
        accent: 'text-gray-200',
      };
    case 'snow':
      return {
        gradient: 'from-blue-100 via-white to-blue-200',
        card: 'bg-white/40 border-white/50',
        text: 'text-gray-800',
        accent: 'text-blue-600',
      };
    default:
      return {
        gradient: 'from-blue-400 via-blue-500 to-blue-600',
        card: 'bg-white/20 border-white/30',
        text: 'text-white',
        accent: 'text-blue-100',
      };
  }
};