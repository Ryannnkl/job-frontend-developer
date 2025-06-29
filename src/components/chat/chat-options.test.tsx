import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChatOptions } from "./chat-options";

describe("ChatOptions", () => {
  it("should render all provided options as clickable buttons", () => {
    const options = ["Opção 1", "Opção 2", "Opção 3"];
    const onSelectMock = jest.fn();

    render(<ChatOptions options={options} onSelect={onSelectMock} />);

    options.forEach((option) => {
      const button = screen.getByRole("button", {
        name: new RegExp(option, "i"),
      });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent(option);
    });
  });

  it("should call onSelect with the correct option when a button is clicked", async () => {
    const options = ["Sim", "Não", "Talvez"];
    const onSelectMock = jest.fn();

    render(<ChatOptions options={options} onSelect={onSelectMock} />);

    const simButton = screen.getByRole("button", { name: /sim/i });
    await userEvent.click(simButton);

    expect(onSelectMock).toHaveBeenCalledTimes(1);
    expect(onSelectMock).toHaveBeenCalledWith("Sim");

    const talvezButton = screen.getByRole("button", { name: /talvez/i });
    await userEvent.click(talvezButton);

    expect(onSelectMock).toHaveBeenCalledTimes(2);
    expect(onSelectMock).toHaveBeenCalledWith("Talvez");
  });

  it("should render no buttons when no options are provided", () => {
    const options: string[] = [];
    const onSelectMock = jest.fn();

    render(<ChatOptions options={options} onSelect={onSelectMock} />);

    const buttons = screen.queryAllByRole("button");
    expect(buttons).toHaveLength(0);
    expect(onSelectMock).not.toHaveBeenCalled();
  });

  it("should have correct aria-label for accessibility", () => {
    const options = ["Ajuda", "Configurações"];
    const onSelectMock = jest.fn();

    render(<ChatOptions options={options} onSelect={onSelectMock} />);

    const helpButton = screen.getByRole("button", {
      name: "Selecionar opção Ajuda",
    });
    const settingsButton = screen.getByRole("button", {
      name: "Selecionar opção Configurações",
    });

    // Verifica se o aria-label é formatado corretamente
    expect(helpButton).toHaveAttribute("aria-label", "Selecionar opção Ajuda");
    expect(settingsButton).toHaveAttribute(
      "aria-label",
      "Selecionar opção Configurações"
    );
  });
});
