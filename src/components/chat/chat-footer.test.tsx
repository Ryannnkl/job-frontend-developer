import { BotMessageWithId } from "@/lib/store";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChatFooter } from "./chat-footer";

jest.mock("framer-motion", () => ({
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  motion: {
    div: ({
      children,
      ...props
    }: {
      children: React.ReactNode;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [key: string]: any;
    }) => <div {...props}>{children}</div>,
  },
}));

jest.mock("./chat-options", () => ({
  ChatOptions: jest.fn(
    ({
      options,
      onSelect,
    }: {
      options: string[];
      onSelect: (option: string) => void;
    }) => (
      <div data-testid="mock-chat-options">
        {options.map((option) => (
          <button key={option} onClick={() => onSelect(option)}>
            {option}
          </button>
        ))}
      </div>
    )
  ),
}));

import { ChatOptions } from "./chat-options";

describe("ChatFooter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should display chat options when currentBotMessage has options", async () => {
    const mockBotMessage: BotMessageWithId = {
      id: "bot-msg-1",
      text: "Por favor, escolha uma opção:",
      sender: "bot",
      options: ["Opção A", "Opção B"],
      originalMockIndex: 0,
    };
    const onOptionSelectMock = jest.fn();

    render(
      <ChatFooter
        currentBotMessage={mockBotMessage}
        onOptionSelect={onOptionSelectMock}
      />
    );

    expect(screen.getByTestId("mock-chat-options")).toBeInTheDocument();
    expect(screen.getByText("Opção A")).toBeInTheDocument();
    expect(screen.getByText("Opção B")).toBeInTheDocument();

    expect(ChatOptions).toHaveBeenCalledWith(
      expect.objectContaining({
        options: ["Opção A", "Opção B"],
        onSelect: expect.any(Function),
      }),
      undefined
    );
  });

  it("should not display chat options when currentBotMessage is null", () => {
    const onOptionSelectMock = jest.fn();

    render(
      <ChatFooter
        currentBotMessage={null}
        onOptionSelect={onOptionSelectMock}
      />
    );

    expect(screen.queryByTestId("mock-chat-options")).not.toBeInTheDocument();
    expect(screen.queryByText("Opção A")).not.toBeInTheDocument();
  });

  it("should not display chat options when currentBotMessage has no 'options' property", () => {
    const mockBotMessage: BotMessageWithId = {
      id: "bot-msg-2",
      text: "Mensagem sem opções",
      sender: "bot",
      originalMockIndex: 0,
    };
    const onOptionSelectMock = jest.fn();

    render(
      <ChatFooter
        currentBotMessage={mockBotMessage}
        onOptionSelect={onOptionSelectMock}
      />
    );

    expect(screen.queryByTestId("mock-chat-options")).not.toBeInTheDocument();
  });

  it("should not display chat options when currentBotMessage has an empty options array", () => {
    const mockBotMessage: BotMessageWithId = {
      id: "bot-msg-3",
      text: "Mensagem com array vazio de opções",
      sender: "bot",
      options: [],
      originalMockIndex: 0,
    };
    const onOptionSelectMock = jest.fn();

    render(
      <ChatFooter
        currentBotMessage={mockBotMessage}
        onOptionSelect={onOptionSelectMock}
      />
    );

    expect(screen.queryByTestId("mock-chat-options")).not.toBeInTheDocument();
  });

  it("should call onOptionSelect when an option is selected", async () => {
    const mockBotMessage: BotMessageWithId = {
      id: "bot-msg-4",
      text: "Escolha com cuidado:",
      sender: "bot",
      options: ["Sim", "Não"],
      originalMockIndex: 0,
    };
    const onOptionSelectMock = jest.fn();

    render(
      <ChatFooter
        currentBotMessage={mockBotMessage}
        onOptionSelect={onOptionSelectMock}
      />
    );

    const yesButton = screen.getByText("Sim");
    await userEvent.click(yesButton);

    expect(onOptionSelectMock).toHaveBeenCalledTimes(1);
    expect(onOptionSelectMock).toHaveBeenCalledWith("Sim");

    const noButton = screen.getByText("Não");
    await userEvent.click(noButton);

    expect(onOptionSelectMock).toHaveBeenCalledTimes(2);
    expect(onOptionSelectMock).toHaveBeenCalledWith("Não");
  });
});
