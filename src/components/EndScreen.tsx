import { Lock, RotateCcw, CheckCircle } from 'lucide-react';
import { StatusBar } from './StatusBar';

interface EndScreenProps {
  decisions: Record<string, string>;
  onRestart: () => void;
  batteryLevel: number;
}

export const EndScreen = ({ decisions, onRestart, batteryLevel }: EndScreenProps) => {
  const decisionCount = Object.keys(decisions).length;

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col">
      <StatusBar batteryLevel={batteryLevel} darkMode />

      <div className="flex-1 flex flex-col items-center justify-center text-white px-6">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 text-center max-w-md mb-8">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="text-red-400" size={40} />
          </div>

          <h1 className="text-3xl font-bold mb-4">Story Complete</h1>
          <p className="text-lg opacity-90 mb-6">
            The phone owner has remotely locked their device.
          </p>

          <div className="bg-white/5 rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2">
              <CheckCircle size={24} className="text-green-400" />
              Your Choices
            </h2>
            <div className="space-y-3 text-sm">
              {decisionCount > 0 ? (
                Object.entries(decisions).map(([key, value]) => (
                  <div key={key} className="bg-white/5 rounded-lg p-3">
                    <p className="opacity-75 mb-1">Decision {key.replace('decision_', '')}</p>
                    <p className="font-medium">{value}</p>
                  </div>
                ))
              ) : (
                <p className="opacity-75">You made {decisionCount} choices during this story</p>
              )}
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <p className="text-sm opacity-75 mb-4">What you witnessed:</p>
            <ul className="text-left space-y-2 text-sm opacity-90">
              <li>• Alex dealing with betrayal from Jamie</li>
              <li>• A mother's concern for her child</li>
              <li>• Workplace relationships and support</li>
              <li>• Real human emotions unfolding in real-time</li>
            </ul>
          </div>
        </div>

        <button
          onClick={onRestart}
          className="bg-white text-gray-900 px-12 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all flex items-center gap-3"
        >
          <RotateCcw size={24} />
          Experience Again
        </button>

        <p className="mt-8 text-sm opacity-50 text-center">
          More stories coming soon...
        </p>
      </div>
    </div>
  );
};
