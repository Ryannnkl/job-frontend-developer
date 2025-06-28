"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatStore } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Spinner } from "../ui/spinner";
import { ChatMessage } from "./chat-message";
import { ChatOptions } from "./chat-options";

export function Chat() {
  const {
    messages,
    currentBotMessage,
    isBotTyping,
    processUserResponse,
    startChat,
  } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0 && !currentBotMessage && !isBotTyping) {
      startChat();
    }
  }, [messages.length, currentBotMessage, isBotTyping, startChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isBotTyping]);

  const handleOptionSelect = (option: string) => {
    processUserResponse(option);
  };

  const showOptions =
    currentBotMessage &&
    currentBotMessage.options &&
    currentBotMessage.options.length > 0;

  return (
    <Card className="w-full max-w-2xl mx-auto h-[80vh] flex flex-col shadow-lg">
      <CardHeader className="border-b p-4">
        <CardTitle>Dolado Chatbot</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <ScrollArea className="h-full">
          <div className="p-4">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isBotTyping && <Spinner variant="ellipsis" />}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t p-4 flex flex-col items-end">
        <AnimatePresence mode="wait">
          {showOptions && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <ChatOptions
                options={currentBotMessage.options!}
                onSelect={handleOptionSelect}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </CardFooter>
    </Card>
  );
}
