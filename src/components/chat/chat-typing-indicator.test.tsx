import { render, screen } from "@testing-library/react";
import { ChatTypingIndicator } from "./chat-typing-indicator";

jest.mock("@/components/ui/avatar", () => ({
  Avatar: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-avatar">{children}</div>
  ),
  AvatarFallback: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="mock-avatar-fallback">{children}</span>
  ),
  AvatarImage: (props: any) => (
    <img data-testid="mock-avatar-image" {...props} />
  ),
}));

jest.mock("@/components/ui/spinner", () => ({
  Spinner: ({ variant }: { variant: string }) => (
    <div data-testid="mock-spinner" data-variant={variant}></div>
  ),
}));

describe("ChatTypingIndicator", () => {
  it("should render the typing message and spinner", () => {
    render(<ChatTypingIndicator />);

    expect(screen.getByText("O bot está digitando")).toBeInTheDocument();

    expect(screen.getByTestId("mock-spinner")).toBeInTheDocument();
    expect(screen.getByTestId("mock-spinner")).toHaveAttribute(
      "data-variant",
      "ellipsis"
    );

    expect(screen.getByTestId("mock-avatar")).toBeInTheDocument();
    expect(screen.getByTestId("mock-avatar-fallback")).toHaveTextContent("SF");
    expect(screen.getByTestId("mock-avatar-image")).toHaveAttribute(
      "src",
      "/sofia-avatar.png"
    );
    expect(screen.getByTestId("mock-avatar-image")).toHaveAttribute(
      "alt",
      "Sofia"
    );
  });

  it("should have correct accessibility attributes", () => {
    const { container } = render(<ChatTypingIndicator />);

    const indicatorContainer = container.firstChild;

    expect(indicatorContainer).toHaveAttribute("role", "status");
    expect(indicatorContainer).toHaveAttribute("aria-live", "polite");
  });
});
