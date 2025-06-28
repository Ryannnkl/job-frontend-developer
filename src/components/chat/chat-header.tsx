import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, EllipsisVertical } from "lucide-react";

export type ChatHeaderProps = {
  onExport: (format: "json") => void;
};

export function ChatHeader({ onExport }: ChatHeaderProps) {
  return (
    <CardHeader className="border-b p-4 flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <CardTitle>Dolado Chatbot</CardTitle>
        <CardDescription>
          A Solução para transformar sua empresa em uma potência digital.
        </CardDescription>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" aria-label="Opções de conversa">
            <EllipsisVertical />
            <span className="sr-only">Opções de Exportação</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => onExport("json")}
            aria-label="Exportar conversa como JSON"
          >
            <Download />
            Exportar como JSON
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </CardHeader>
  );
}
