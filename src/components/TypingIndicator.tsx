const TypingIndicator = () => (
  <div className="flex gap-3 animate-fade-in-up">
    <div className="flex-shrink-0 w-8 h-8 rounded-full glass flex items-center justify-center">
      <div className="w-4 h-4 rounded-full bg-primary/60" />
    </div>
    <div className="bubble-ai px-4 py-3 rounded-2xl rounded-tl-md">
      <div className="flex gap-1.5">
        <span className="typing-dot w-2 h-2 rounded-full bg-foreground/60" />
        <span className="typing-dot w-2 h-2 rounded-full bg-foreground/60" />
        <span className="typing-dot w-2 h-2 rounded-full bg-foreground/60" />
      </div>
    </div>
  </div>
);

export default TypingIndicator;
