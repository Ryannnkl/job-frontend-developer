// chat-header.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChatHeader } from "./chat-header";

describe("ChatHeader", () => {
  it("deve abrir o menu e chamar onExport corretamente", async () => {
    const user = userEvent.setup();
    const onExportMock = jest.fn();

    render(<ChatHeader onExport={onExportMock} />);

    const menuButton = screen.getByRole("button", {
      name: /opções de conversa/i,
    });
    await user.click(menuButton);

    const exportItem = await screen.findByText("Exportar como JSON", {
      selector: '[role="menuitem"]',
    });

    await user.click(exportItem);

    expect(onExportMock).toHaveBeenCalledWith("json");
  });
});
