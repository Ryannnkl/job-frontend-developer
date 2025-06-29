"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import type { Message } from "@/lib/store";
import { useEffect, useRef } from "react";
import { ChatMessage } from "./chat-message";
import { ChatTypingIndicator } from "./chat-typing-indicator";

export type ChatMessagesAreaProps = {
  messages: Message[];
  isBotTyping: boolean;
};

export function ChatMessagesArea({
  messages,
  isBotTyping,
}: ChatMessagesAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isBotTyping]);

  return (
    <ScrollArea className="h-full">
      <div className="p-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        {isBotTyping && <ChatTypingIndicator />}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
}
