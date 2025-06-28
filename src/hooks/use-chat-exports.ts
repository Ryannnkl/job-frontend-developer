import { useChatStore } from "@/lib/store";
import { downloadFile } from "@/lib/utils";

export function useChatExports() {
  const messages = useChatStore((state) => state.messages);

  const exportToJson = () => {
    const dataToExport = messages.map((msg) => ({
      id: msg.id,
      text: msg.text,
      sender: msg.sender,
    }));

    const jsonContent = JSON.stringify(dataToExport, null, 2);
    downloadFile(jsonContent, "application/json", `conversa_dolado_${new Date().toISOString().split("T")[0]}.json`);
  };

  return { exportToJson };
}