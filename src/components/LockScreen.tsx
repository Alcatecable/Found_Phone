import { Smartphone, Lock } from 'lucide-react';
import { StatusBar } from './StatusBar';

interface LockScreenProps {
  onUnlock: () => void;
  batteryLevel: number;
}

export const LockScreen = ({ onUnlock, batteryLevel }: LockScreenProps) => {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
  });
  const dateString = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex flex-col">
      <StatusBar batteryLevel={batteryLevel} darkMode />

      <div className="flex-1 flex flex-col items-center justify-center text-white px-6">
        <div className="text-center mb-12">
          <div className="text-7xl font-light mb-2">{timeString}</div>
          <div className="text-xl opacity-90">{dateString}</div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center mb-8 max-w-sm">
          <Smartphone className="mx-auto mb-4" size={48} />
          <h1 className="text-2xl font-semibold mb-2">Found Phone</h1>
          <p className="text-sm opacity-90 mb-6">You found a phone on the ground. What do you do?</p>
          <div className="flex items-center justify-center gap-2 text-sm opacity-75 mb-4">
            <Lock size={16} />
            <span>No Password Set</span>
          </div>
        </div>

        <button
          onClick={onUnlock}
          className="bg-white text-gray-900 px-12 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
        >
          Unlock Phone
        </button>

        <p className="mt-8 text-sm opacity-75 text-center max-w-xs">
          An interactive story experience. Your choices will be tracked.
        </p>
      </div>
    </div>
  );
};
