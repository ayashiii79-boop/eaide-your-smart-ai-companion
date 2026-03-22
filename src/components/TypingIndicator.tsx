import eaideLogo from "@/assets/eaide-logo.jpeg";

const TypingIndicator = () => (
  <div className="flex gap-3 animate-fade-in-up">
    <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden">
      <img src={eaideLogo} alt="eaide" className="w-full h-full object-cover" />
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
