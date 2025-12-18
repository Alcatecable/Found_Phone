import { Battery, Wifi, Signal } from 'lucide-react';

interface StatusBarProps {
  batteryLevel: number;
  darkMode?: boolean;
}

export const StatusBar = ({ batteryLevel, darkMode = false }: StatusBarProps) => {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  });

  const getBatteryColor = () => {
    if (batteryLevel <= 5) return 'text-red-600';
    if (batteryLevel <= 20) return 'text-yellow-500';
    return darkMode ? 'text-white' : 'text-gray-900';
  };

  return (
    <div className={`px-6 py-2 flex items-center justify-between text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
      <div className="flex items-center gap-2">
        <span>{timeString}</span>
      </div>
      <div className="flex items-center gap-2">
        <Signal size={16} className={darkMode ? 'text-white' : 'text-gray-900'} />
        <Wifi size={16} className={darkMode ? 'text-white' : 'text-gray-900'} />
        <div className="flex items-center gap-1">
          <span className={getBatteryColor()}>{batteryLevel}%</span>
          <Battery size={16} className={getBatteryColor()} fill={batteryLevel > 20 ? 'currentColor' : 'none'} />
        </div>
      </div>
    </div>
  );
};
