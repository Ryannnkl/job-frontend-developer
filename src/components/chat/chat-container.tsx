"use client";

import { useChatExports } from "@/hooks/use-chat-exports";
import { useChatStore } from "@/lib/store";
import { useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import { ChatFooter } from "./chat-footer";
import { ChatHeader } from "./chat-header";
import { ChatMessagesArea } from "./chat-message-area";

export function ChatContainer() {
  const {
    messages,
    currentBotMessage,
    isBotTyping,
    processUserResponse,
    startChat,
  } = useChatStore();

  const { exportToJson } = useChatExports();

  useEffect(() => {
    if (messages.length === 0 && !currentBotMessage && !isBotTyping) {
      startChat();
    }
  }, [messages.length, currentBotMessage, isBotTyping, startChat]);

  const handleOptionSelect = (option: string) => {
    processUserResponse(option);
  };

  const handleExportConversation = (format: "json") => {
    if (format === "json") {
      exportToJson();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto h-screen flex flex-col p-0 gap-0 rounded-none border-none shadow-none md:h-[80vh] md:rounded-xl md:border md:shadow-lg">
      <ChatHeader onExport={handleExportConversation} />
      <CardContent className="flex-1 overflow-hidden p-0">
        <ChatMessagesArea messages={messages} isBotTyping={isBotTyping} />
      </CardContent>
      <ChatFooter
        currentBotMessage={currentBotMessage}
        onOptionSelect={handleOptionSelect}
      />
    </Card>
  );
}
