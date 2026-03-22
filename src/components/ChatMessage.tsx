import ReactMarkdown from "react-markdown";
import { User } from "lucide-react";
import eaideLogo from "@/assets/eaide-logo.jpeg";

type ChatMessageProps = {
  role: "user" | "assistant";
  content: string;
};

const ChatMessage = ({ role, content }: ChatMessageProps) => {
  const isUser = role === "user";

  return (
    <div
      className={`flex gap-3 animate-fade-in-up ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? "bubble-user" : "glass"
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-primary-foreground" />
        ) : (
          <img src={eaideLogo} alt="eaide" className="w-full h-full object-cover rounded-full" />
        )}
      </div>

      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
          isUser
            ? "bubble-user text-primary-foreground rounded-tr-md"
            : "bubble-ai text-foreground rounded-tl-md"
        }`}
      >
        <div className="prose-chat">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
