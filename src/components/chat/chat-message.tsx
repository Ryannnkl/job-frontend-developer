import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export type ChatMessageProps = {
  message: {
    id: string;
    text: string;
    sender: string;
  };
};

export function ChatMessage({ message }: ChatMessageProps) {
  const isBot = message.sender === "bot";

  return (
    <div
      className={cn(
        "flex items-end gap-2 p-2",
        isBot ? "justify-start" : "justify-end"
      )}
      role="article"
      tabIndex={-1}
    >
      {isBot && (
        <Avatar>
          <AvatarImage src="/sofia-avatar.png" alt="Sofia" />{" "}
          {/* Adicione um avatar para Sofia */}
          <AvatarFallback>SF</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[70%] rounded-lg px-4 py-2 text-sm",
          isBot
            ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
            : "bg-blue-600 text-white dark:bg-blue-700"
        )}
      >
        {message.text}
      </div>
      {!isBot && (
        <Avatar>
          <AvatarFallback>VC</AvatarFallback> {/* Avatar para o usuário */}
        </Avatar>
      )}
    </div>
  );
}
