import { render, screen } from "@testing-library/react";
import Home from "./page";

jest.mock("@/components/chat/chat-container", () => ({
  ChatContainer: () => <div data-testid="chat-container" />,
}));

describe("Home Page", () => {
  it("renders ChatContainer", () => {
    render(<Home />);
    expect(screen.getByTestId("chat-container")).toBeInTheDocument();
  });
});
