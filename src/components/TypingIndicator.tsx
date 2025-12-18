export const TypingIndicator = () => {
  return (
    <div className="flex items-start gap-2 mb-4 animate-fade-in">
      <div className="bg-white rounded-lg rounded-tl-none px-4 py-3 shadow-sm max-w-[75%]">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
};
