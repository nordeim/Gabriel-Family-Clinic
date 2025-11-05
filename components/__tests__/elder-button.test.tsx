import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ElderButton } from "../ui/elder-button";

describe("ElderButton", () => {
  it("renders with default props", () => {
    render(<ElderButton>Click me</ElderButton>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it("applies primary variant by default", () => {
    render(<ElderButton>Primary</ElderButton>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-primary-500");
  });

  it("applies correct size classes", () => {
    const { rerender } = render(<ElderButton size="sm">Small</ElderButton>);
    expect(screen.getByRole("button")).toHaveClass("h-[40px]");

    rerender(<ElderButton size="md">Medium</ElderButton>);
    expect(screen.getByRole("button")).toHaveClass("h-[48px]");

    rerender(<ElderButton size="lg">Large</ElderButton>);
    expect(screen.getByRole("button")).toHaveClass("h-[56px]");

    rerender(<ElderButton size="xl">Extra Large</ElderButton>);
    expect(screen.getByRole("button")).toHaveClass("h-[64px]");
  });

  it("shows loading state", () => {
    render(<ElderButton loading>Loading</ElderButton>);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true");
  });

  it("is disabled when disabled prop is true", () => {
    render(<ElderButton disabled>Disabled</ElderButton>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-disabled", "true");
  });

  it("is disabled when loading", () => {
    render(<ElderButton loading>Loading</ElderButton>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  it("handles click events", async () => {
    const handleClick = jest.fn();
    render(<ElderButton onClick={handleClick}>Click me</ElderButton>);
    
    const button = screen.getByRole("button");
    await userEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not handle click when disabled", async () => {
    const handleClick = jest.fn();
    render(
      <ElderButton disabled onClick={handleClick}>
        Disabled
      </ElderButton>
    );
    
    const button = screen.getByRole("button");
    await userEvent.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("renders with left icon", () => {
    render(
      <ElderButton iconLeft={<span data-testid="left-icon">←</span>}>
        With Icon
      </ElderButton>
    );
    expect(screen.getByTestId("left-icon")).toBeInTheDocument();
  });

  it("renders with right icon", () => {
    render(
      <ElderButton iconRight={<span data-testid="right-icon">→</span>}>
        With Icon
      </ElderButton>
    );
    expect(screen.getByTestId("right-icon")).toBeInTheDocument();
  });

  it("applies full width class", () => {
    render(<ElderButton fullWidth>Full Width</ElderButton>);
    expect(screen.getByRole("button")).toHaveClass("w-full");
  });

  it("meets minimum touch target size (44px)", () => {
    render(<ElderButton size="sm">Small Button</ElderButton>);
    const button = screen.getByRole("button");
    const styles = window.getComputedStyle(button);
    const minHeight = parseInt(styles.minHeight);
    expect(minHeight).toBeGreaterThanOrEqual(44);
  });

  it("has focus-visible styles", () => {
    render(<ElderButton>Focus me</ElderButton>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("focus-visible:outline-none");
    expect(button).toHaveClass("focus-visible:ring-3");
  });

  it("applies destructive variant", () => {
    render(<ElderButton variant="destructive">Delete</ElderButton>);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("bg-error-500");
  });
});
