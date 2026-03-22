import { useState, useRef, useEffect } from "react";
import { Instagram } from "lucide-react";

import bgGradient from "@/assets/bg-gradient.jpg";
import eaideLogo from "@/assets/eaide-logo.jpeg";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import TypingIndicator from "@/components/TypingIndicator";
import ParticleBackground from "@/components/ParticleBackground";
import { streamChat, type Msg } from "@/lib/chat";
import { toast } from "sonner";

const WELCOME_MSG: Msg = {
  role: "assistant",
  content: "Halo! 👋 Saya **eaide**, asisten virtual cerdas Anda. Saya siap membantu menjawab pertanyaan, memberikan informasi, dan berdiskusi tentang berbagai topik. Apa yang bisa saya bantu hari ini?",
};

const Index = () => {
  const [messages, setMessages] = useState<Msg[]>([WELCOME_MSG]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (input: string) => {
    const userMsg: Msg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setIsLoading(true);

    let assistantSoFar = "";

    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && prev.length > newMessages.length) {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
          );
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    await streamChat({
      messages: newMessages,
      onDelta: (chunk) => upsertAssistant(chunk),
      onDone: () => setIsLoading(false),
      onError: (error) => {
        setIsLoading(false);
        toast.error(error);
      },
    });
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat scale-110"
        style={{ backgroundImage: `url(${bgGradient})` }}
      />
      <div className="fixed inset-0 bg-background/70" />
      <ParticleBackground />

      {/* Floating Header */}
      <header className="relative z-10 pt-4 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div
            className="flex items-center gap-3 px-5 py-2.5 rounded-[50px]"
            style={{
              background: 'hsla(355, 60%, 90%, 0.06)',
              backdropFilter: 'blur(24px) saturate(1.8)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
              border: '1px solid hsla(0, 0%, 100%, 0.18)',
              boxShadow: '0 8px 32px 0 hsla(355, 60%, 10%, 0.4), inset 0 1px 0 0 hsla(0, 0%, 100%, 0.08)',
            }}
          >
            <div className="w-9 h-9 rounded-full overflow-hidden animate-glow-pulse flex-shrink-0">
              <img src={eaideLogo} alt="eaide" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm font-semibold text-foreground tracking-tight leading-tight">
                eaide
              </h1>
              <p className="text-[11px] text-muted-foreground leading-tight">
                Asisten Virtual Cerdas
              </p>
            </div>
            <div className="ml-auto flex items-center gap-1.5 flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-online animate-pulse" />
              <span className="text-[11px] text-muted-foreground">Online</span>
            </div>
          </div>
        </div>
      </header>

      {/* Messages */}
      <main className="relative z-10 flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
          {messages.map((msg, i) => (
            <ChatMessage key={i} role={msg.role} content={msg.content} />
          ))}
          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <TypingIndicator />
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input */}
      <footer className="relative z-10 border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <ChatInput onSend={handleSend} disabled={isLoading} />
          <p className="text-center text-[10px] text-muted-foreground mt-2 opacity-60">
            eaide dapat membuat kesalahan. Periksa informasi penting.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
