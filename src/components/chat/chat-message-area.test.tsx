import { Message } from "@/lib/store";
import { act, render, screen } from "@testing-library/react";
import { ChatMessagesArea } from "./chat-message-area";

jest.mock("@/components/ui/scroll-area", () => ({
  ScrollArea: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-scroll-area">{children}</div>
  ),
}));

jest.mock("./chat-message", () => ({
  ChatMessage: jest.fn(({ message }: { message: Message }) => (
    <div data-testid={`chat-message-${message.id}`}>{message.text}</div>
  )),
}));

jest.mock("./chat-typing-indicator", () => ({
  ChatTypingIndicator: jest.fn(() => (
    <div data-testid="mock-typing-indicator"></div>
  )),
}));

import { ChatMessage } from "./chat-message";
import { ChatTypingIndicator } from "./chat-typing-indicator";

describe("ChatMessagesArea", () => {
  const mockMessages: Message[] = [
    { id: "1", text: "Hello there!", sender: "bot" },
    { id: "2", text: "General Kenobi!", sender: "user" },
  ];

  const scrollIntoViewMock = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    scrollIntoViewMock.mockClear();
    jest.clearAllMocks();

    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
      writable: true,
      value: scrollIntoViewMock,
    });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("should render all provided messages", () => {
    render(<ChatMessagesArea messages={mockMessages} isBotTyping={false} />);
    expect(screen.getByTestId("chat-message-1")).toHaveTextContent(
      "Hello there!"
    );
    expect(screen.getByTestId("chat-message-2")).toHaveTextContent(
      "General Kenobi!"
    );
    expect(ChatMessage).toHaveBeenCalledTimes(mockMessages.length);
  });

  it("should render the ChatTypingIndicator when isBotTyping is true", () => {
    render(<ChatMessagesArea messages={mockMessages} isBotTyping={true} />);
    expect(screen.getByTestId("mock-typing-indicator")).toBeInTheDocument();
    expect(ChatTypingIndicator).toHaveBeenCalledTimes(1);
  });

  it("should not render the ChatTypingIndicator when isBotTyping is false", () => {
    render(<ChatMessagesArea messages={mockMessages} isBotTyping={false} />);
    expect(
      screen.queryByTestId("mock-typing-indicator")
    ).not.toBeInTheDocument();
    expect(ChatTypingIndicator).not.toHaveBeenCalled();
  });

  it("should scroll to the bottom when messages change", async () => {
    const { rerender } = render(
      <ChatMessagesArea messages={[]} isBotTyping={false} />
    );

    act(() => {
      jest.runAllTimers();
    });

    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: "smooth" });

    scrollIntoViewMock.mockClear();

    const newMessages: Message[] = [
      ...mockMessages,
      { id: "3", text: "New message!", sender: "bot" },
    ];
    rerender(<ChatMessagesArea messages={newMessages} isBotTyping={false} />);

    act(() => {
      jest.runAllTimers();
    });

    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: "smooth" });
  });

  it("should scroll to the bottom when isBotTyping changes", async () => {
    const { rerender } = render(
      <ChatMessagesArea messages={mockMessages} isBotTyping={false} />
    );

    act(() => {
      jest.runAllTimers();
    });
    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: "smooth" });

    scrollIntoViewMock.mockClear();

    rerender(<ChatMessagesArea messages={mockMessages} isBotTyping={true} />);

    act(() => {
      jest.runAllTimers();
    });
    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: "smooth" });
  });

  it("should not scroll if neither messages nor isBotTyping change (on re-render with same props)", async () => {
    const { rerender } = render(
      <ChatMessagesArea messages={mockMessages} isBotTyping={false} />
    );

    act(() => {
      jest.runAllTimers();
    });
    expect(scrollIntoViewMock).toHaveBeenCalledTimes(1);
    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: "smooth" });

    scrollIntoViewMock.mockClear();

    rerender(<ChatMessagesArea messages={mockMessages} isBotTyping={false} />);

    act(() => {
      jest.runAllTimers();
    });

    expect(scrollIntoViewMock).not.toHaveBeenCalled();
  });
});
