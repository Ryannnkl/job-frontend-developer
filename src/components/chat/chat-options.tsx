import { Button } from "@/components/ui/button";

export type ChatOptionsProps = {
  options: string[];
  onSelect: (option: string) => void;
};

export function ChatOptions({ options, onSelect }: ChatOptionsProps) {
  return (
    <div className="flex flex-wrap gap-2 p-2 justify-end">
      {options.map((option) => (
        <Button
          key={option}
          variant="outline"
          onClick={() => onSelect(option)}
          aria-label={`Selecionar opção ${option}`}
          className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          {option}
        </Button>
      ))}
    </div>
  );
}
