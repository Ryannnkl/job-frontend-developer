import { render, screen } from "@testing-library/react";
import { ChatContainer } from "./chat-container";

// Mocks para as dependências
jest.mock("@/lib/store", () => ({
  useChatStore: () => ({
    messages: [],
    currentBotMessage: null,
    isBotTyping: false,
    processUserResponse: jest.fn(),
    startChat: jest.fn(),
  }),
}));

jest.mock("@/hooks/use-chat-exports", () => ({
  useChatExports: () => ({
    exportToJson: jest.fn(),
  }),
}));

jest.mock("./chat-header", () => ({
  ChatHeader: ({ onExport }: any) => (
    <div data-testid="chat-header" onClick={() => onExport("json")}>
      Header
    </div>
  ),
}));

jest.mock("./chat-footer", () => ({
  ChatFooter: ({ currentBotMessage, onOptionSelect }: any) => (
    <div data-testid="chat-footer" onClick={() => onOptionSelect("option")}>
      Footer
    </div>
  ),
}));

jest.mock("./chat-message-area", () => ({
  ChatMessagesArea: ({ messages, isBotTyping }: any) => (
    <div data-testid="chat-messages">Messages</div>
  ),
}));

describe("ChatContainer", () => {
  it("renders all child components", () => {
    render(<ChatContainer />);

    expect(screen.getByTestId("chat-header")).toBeInTheDocument();
    expect(screen.getByTestId("chat-footer")).toBeInTheDocument();
    expect(screen.getByTestId("chat-messages")).toBeInTheDocument();
  });
});
