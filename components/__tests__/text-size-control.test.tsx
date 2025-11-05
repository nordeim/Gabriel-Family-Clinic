import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextSizeControl } from "../accessibility/text-size-control";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("TextSizeControl", () => {
  beforeEach(() => {
    localStorageMock.clear();
    document.documentElement.style.fontSize = "";
  });

  it("renders with default size", () => {
    render(<TextSizeControl />);
    expect(screen.getByText("Normal")).toBeInTheDocument();
  });

  it("has increase and decrease buttons", () => {
    render(<TextSizeControl />);
    expect(screen.getByLabelText("Increase text size")).toBeInTheDocument();
    expect(screen.getByLabelText("Decrease text size")).toBeInTheDocument();
  });

  it("increases text size when increase button clicked", async () => {
    render(<TextSizeControl />);
    const increaseButton = screen.getByLabelText("Increase text size");
    
    await userEvent.click(increaseButton);
    
    expect(screen.getByText("Large")).toBeInTheDocument();
    expect(document.documentElement.style.fontSize).toBe("22px");
  });

  it("decreases text size when decrease button clicked", async () => {
    render(<TextSizeControl defaultSize="large" />);
    const decreaseButton = screen.getByLabelText("Decrease text size");
    
    await userEvent.click(decreaseButton);
    
    expect(screen.getByText("Normal")).toBeInTheDocument();
    expect(document.documentElement.style.fontSize).toBe("18px");
  });

  it("disables increase button at maximum size", async () => {
    render(<TextSizeControl defaultSize="extra-large" />);
    const increaseButton = screen.getByLabelText("Increase text size");
    
    expect(increaseButton).toBeDisabled();
  });

  it("disables decrease button at minimum size", async () => {
    render(<TextSizeControl defaultSize="normal" />);
    const decreaseButton = screen.getByLabelText("Decrease text size");
    
    expect(decreaseButton).toBeDisabled();
  });

  it("saves preference to localStorage", async () => {
    render(<TextSizeControl />);
    const increaseButton = screen.getByLabelText("Increase text size");
    
    await userEvent.click(increaseButton);
    
    expect(localStorageMock.getItem("gabriel-clinic-text-size")).toBe("large");
  });

  it("loads preference from localStorage", () => {
    localStorageMock.setItem("gabriel-clinic-text-size", "extra-large");
    
    render(<TextSizeControl />);
    
    expect(screen.getByText("Extra Large")).toBeInTheDocument();
  });

  it("supports keyboard navigation with arrow keys", async () => {
    render(<TextSizeControl />);
    const control = screen.getByRole("group");
    
    // Arrow right to increase
    fireEvent.keyDown(control, { key: "ArrowRight" });
    expect(screen.getByText("Large")).toBeInTheDocument();
    
    // Arrow left to decrease
    fireEvent.keyDown(control, { key: "ArrowLeft" });
    expect(screen.getByText("Normal")).toBeInTheDocument();
  });

  it("resets to normal with Home key", async () => {
    render(<TextSizeControl defaultSize="extra-large" />);
    const control = screen.getByRole("group");
    
    fireEvent.keyDown(control, { key: "Home" });
    
    expect(screen.getByText("Normal")).toBeInTheDocument();
  });

  it("announces size changes to screen readers", async () => {
    render(<TextSizeControl />);
    const increaseButton = screen.getByLabelText("Increase text size");
    
    await userEvent.click(increaseButton);
    
    const announcement = screen.getByRole("status");
    expect(announcement).toHaveTextContent("Text size changed to Large");
  });

  it("calls onSizeChange callback", async () => {
    const handleSizeChange = jest.fn();
    render(<TextSizeControl onSizeChange={handleSizeChange} />);
    
    const increaseButton = screen.getByLabelText("Increase text size");
    await userEvent.click(increaseButton);
    
    expect(handleSizeChange).toHaveBeenCalledWith("large");
  });

  it("has visual size indicators", () => {
    render(<TextSizeControl />);
    const indicators = screen.getAllByRole("button").filter(
      (btn) => btn.getAttribute("aria-pressed") !== null
    );
    
    expect(indicators).toHaveLength(3);
  });

  it("marks current size indicator as pressed", () => {
    render(<TextSizeControl defaultSize="large" />);
    const largeIndicator = screen.getByLabelText("Set text size to Large");
    
    expect(largeIndicator).toHaveAttribute("aria-pressed", "true");
  });
});
