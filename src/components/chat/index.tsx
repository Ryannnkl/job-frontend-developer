"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { ChatMessage } from "./chat-message";
import { ChatOptions } from "./chat-options";

export function Chat() {
  const goToNextStep = (step?: any) => {};

  const messages = [
    {
      id: "1",
      sender: "bot",
      text: "Olá! Como posso ajudar você hoje?",
      options: [
        "Falar sobre produtos",
        "Suporte técnico",
        "Falar com um atendente",
      ],
    },
  ];

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      goToNextStep();
    }
  }, [messages.length, goToNextStep]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleOptionSelect = (option: string) => {
    goToNextStep(option);
  };

  const currentBotMessage =
    messages.length > 0 && messages[messages.length - 1].sender === "bot"
      ? messages[messages.length - 1]
      : null;

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
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      {showOptions && (
        <CardFooter className="border-t p-4 flex flex-col items-end">
          <ChatOptions
            options={currentBotMessage.options!}
            onSelect={handleOptionSelect}
          />
        </CardFooter>
      )}
    </Card>
  );
}
