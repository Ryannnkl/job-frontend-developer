import { render, screen } from "@testing-library/react";
import { ChatMessage } from "./chat-message";

jest.mock("@/lib/utils", () => ({
  cn: jest.fn((...classes: string[]) => classes.join(" ")),
}));

describe("ChatMessage", () => {
  it("should render a bot message aligned to the left with bot's avatar", () => {
    const botMessage = {
      id: "1",
      text: "Olá! Como posso ajudar?",
      sender: "bot",
    };

    render(<ChatMessage message={botMessage} />);

    const messageText = screen.getByText("Olá! Como posso ajudar?");
    expect(messageText).toBeInTheDocument();

    expect(screen.getByText("SF")).toBeInTheDocument();
    expect(screen.queryByText("VC")).not.toBeInTheDocument();

    const messageContainer = screen.getByRole("article");
    expect(messageContainer).toHaveClass("justify-start"); // indica que é mensagem do bot

    expect(messageText.parentElement).toBeInTheDocument();
  });

  it("should render a user message aligned to the right with user's avatar", () => {
    const userMessage = {
      id: "2",
      text: "Preciso de ajuda com meu pedido.",
      sender: "user",
    };

    render(<ChatMessage message={userMessage} />);

    const messageText = screen.getByText("Preciso de ajuda com meu pedido.");
    expect(messageText).toBeInTheDocument();

    expect(screen.getByText("VC")).toBeInTheDocument();

    expect(screen.queryByText("SF")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("img", { name: /sofia/i })
    ).not.toBeInTheDocument();

    const messageContainer = screen.getByRole("article");
    expect(messageContainer).toHaveClass("justify-end");

    expect(messageText.parentElement).toBeInTheDocument();
  });

  it("should have role 'article' and tabIndex -1", () => {
    const message = {
      id: "3",
      text: "Testando atributos.",
      sender: "user",
    };

    render(<ChatMessage message={message} />);
    const messageContainer = screen.getByRole("article");
    expect(messageContainer).toBeInTheDocument();
    expect(messageContainer).toHaveAttribute("tabIndex", "-1");
  });
});
