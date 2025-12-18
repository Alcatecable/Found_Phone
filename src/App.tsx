import { useEffect } from 'react';
import { useStory } from './hooks/useStory';
import { LockScreen } from './components/LockScreen';
import { ContactList } from './components/ContactList';
import { ChatView } from './components/ChatView';
import { EndScreen } from './components/EndScreen';

function App() {
  const { state, actions } = useStory();

  useEffect(() => {
    document.title = 'Found Phone - Interactive Story';
  }, []);

  return (
    <div className="max-w-md mx-auto h-screen bg-black shadow-2xl relative overflow-hidden">
      {state.batteryLevel <= 20 && state.batteryLevel > 5 && state.currentScreen !== 'lock' && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-4 py-2 rounded-full text-sm font-medium z-50 shadow-lg animate-slide-down">
          Battery Low: {state.batteryLevel}%
        </div>
      )}

      {state.batteryLevel <= 5 && state.currentScreen !== 'lock' && (
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-medium z-50 shadow-lg animate-pulse">
          Critical Battery: {state.batteryLevel}%
        </div>
      )}

      {state.currentScreen === 'lock' && (
        <LockScreen onUnlock={actions.unlock} batteryLevel={state.batteryLevel} />
      )}

      {state.currentScreen === 'contacts' && (
        <ContactList
          messages={state.messages}
          isTyping={state.isTyping}
          onSelectContact={actions.openChat}
          batteryLevel={state.batteryLevel}
        />
      )}

      {state.currentScreen === 'chat' && state.selectedContactId && (
        <ChatView
          contactId={state.selectedContactId}
          messages={state.messages}
          isTyping={state.isTyping[state.selectedContactId] || false}
          onBack={actions.goBack}
          batteryLevel={state.batteryLevel}
        />
      )}

      {state.currentScreen === 'end' && (
        <EndScreen
          decisions={state.decisions}
          onRestart={actions.restart}
          batteryLevel={state.batteryLevel}
        />
      )}
    </div>
  );
}

export default App;
