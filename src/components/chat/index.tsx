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
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
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

  const exportToJson = () => {
    const dataToExport = messages.map((msg) => ({
      id: msg.id,
      text: msg.text,
      sender: msg.sender,
    }));

    const jsonContent = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `conversa_dolado_${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportConversation = (format: "html" | "json") => {
    if (format === "json") {
      exportToJson();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto h-screen flex flex-col p-0 gap-0 rounded-none border-none shadow-none md:h-[80vh] md:rounded-xl md:border md:shadow-lg">
      <CardHeader className="border-b p-4 flex flex-row items-center justify-between">
        <CardTitle>Dolado Chatbot</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Exportar
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleExportConversation("json")}>
              Exportar como JSON
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
