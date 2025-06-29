import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Spinner } from "@/components/ui/spinner";

export function ChatTypingIndicator() {
  return (
    <div
      className="flex items-end gap-2 p-2 justify-start"
      role="status"
      aria-live="polite"
    >
      <Avatar>
        <AvatarImage src="/sofia-avatar.png" alt="Sofia" />
        <AvatarFallback>SF</AvatarFallback>
      </Avatar>
      <div className="max-w-[70%] rounded-lg px-4 py-2 text-sm bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
        <div className="flex items-center gap-2">
          <span>O bot está digitando</span>
          <Spinner variant="ellipsis" />
        </div>
      </div>
    </div>
  );
}
