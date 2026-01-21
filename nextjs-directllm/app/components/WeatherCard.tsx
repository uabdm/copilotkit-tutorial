"use client";

interface WeatherCardProps {
  location: string;
  temperature?: number;
  condition?: string;
  humidity?: number;
}

export function WeatherCard({ location, temperature, condition, humidity }: WeatherCardProps) {
  const getWeatherIcon = (cond?: string) => {
    switch (cond?.toLowerCase()) {
      case "sunny": return "☀️";
      case "cloudy": return "☁️";
      case "rainy": return "🌧️";
      case "snowy": return "❄️";
      case "stormy": return "⛈️";
      default: return "🌤️";
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-6 text-white shadow-lg max-w-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium opacity-90">{location}</h3>
          <p className="text-5xl font-bold mt-2">
            {temperature !== undefined ? `${temperature}°F` : "Loading..."}
          </p>
        </div>
        <span className="text-5xl">{getWeatherIcon(condition)}</span>
      </div>
      {condition && (
        <p className="mt-4 text-lg capitalize">{condition}</p>
      )}
      {humidity !== undefined && (
        <p className="mt-1 text-sm opacity-80">Humidity: {humidity}%</p>
      )}
    </div>
  );
}
