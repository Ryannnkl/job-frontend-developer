import { CardFooter } from "@/components/ui/card";
import type { BotMessageWithId } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";
import { ChatOptions } from "./chat-options";

export type ChatFooterProps = {
  currentBotMessage: BotMessageWithId | null;
  onOptionSelect: (option: string) => void;
};

export function ChatFooter({
  currentBotMessage,
  onOptionSelect,
}: ChatFooterProps) {
  const showOptions =
    currentBotMessage &&
    currentBotMessage.options &&
    currentBotMessage.options.length > 0;

  return (
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
              onSelect={onOptionSelect}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </CardFooter>
  );
}
