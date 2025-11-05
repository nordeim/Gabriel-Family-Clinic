import { render, screen } from "@testing-library/react";
import { ElderCard } from "../ui/elder-card";

describe("ElderCard", () => {
  it("renders with default props", () => {
    render(<ElderCard>Card content</ElderCard>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("renders as div by default", () => {
    const { container } = render(<ElderCard>Content</ElderCard>);
    expect(container.querySelector("div")).toBeInTheDocument();
  });

  it("renders as article when specified", () => {
    const { container } = render(<ElderCard as="article">Content</ElderCard>);
    expect(container.querySelector("article")).toBeInTheDocument();
  });

  it("renders as section when specified", () => {
    const { container } = render(<ElderCard as="section">Content</ElderCard>);
    expect(container.querySelector("section")).toBeInTheDocument();
  });

  it("renders title with correct heading level", () => {
    render(
      <ElderCard title="Card Title" titleLevel="h2">
        Content
      </ElderCard>
    );
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Card Title");
  });

  it("renders title as h3 by default", () => {
    render(<ElderCard title="Default Title">Content</ElderCard>);
    const heading = screen.getByRole("heading", { level: 3 });
    expect(heading).toHaveTextContent("Default Title");
  });

  it("renders header content", () => {
    render(
      <ElderCard header={<div>Custom Header</div>}>Content</ElderCard>
    );
    expect(screen.getByText("Custom Header")).toBeInTheDocument();
  });

  it("renders footer content", () => {
    render(
      <ElderCard footer={<div>Custom Footer</div>}>Content</ElderCard>
    );
    expect(screen.getByText("Custom Footer")).toBeInTheDocument();
  });

  it("applies default variant", () => {
    const { container } = render(<ElderCard>Content</ElderCard>);
    const card = container.firstChild;
    expect(card).toHaveClass("bg-white", "border", "border-gray-200");
  });

  it("applies elevated variant", () => {
    const { container } = render(<ElderCard variant="elevated">Content</ElderCard>);
    const card = container.firstChild;
    expect(card).toHaveClass("shadow-lg");
  });

  it("applies glass variant", () => {
    const { container } = render(<ElderCard variant="glass">Content</ElderCard>);
    const card = container.firstChild;
    expect(card).toHaveClass("bg-white/70", "backdrop-blur-md");
  });

  it("applies padding variants", () => {
    const { container, rerender } = render(<ElderCard padding="sm">Content</ElderCard>);
    expect(container.firstChild).toHaveClass("p-4");

    rerender(<ElderCard padding="md">Content</ElderCard>);
    expect(container.firstChild).toHaveClass("p-6");

    rerender(<ElderCard padding="lg">Content</ElderCard>);
    expect(container.firstChild).toHaveClass("p-8");
  });

  it("applies hoverable styles when hoverable is true", () => {
    const { container } = render(<ElderCard hoverable>Content</ElderCard>);
    expect(container.firstChild).toHaveClass("hover:scale-[1.01]", "cursor-pointer");
  });

  it("renders with animation by default", () => {
    const { container } = render(<ElderCard>Content</ElderCard>);
    // Framer motion adds motion attributes
    expect(container.querySelector("[style*='opacity']")).toBeTruthy();
  });

  it("renders without animation when animated is false", () => {
    const { container } = render(<ElderCard animated={false}>Content</ElderCard>);
    const card = container.firstChild as HTMLElement;
    expect(card.style.opacity).toBeFalsy();
  });

  it("has proper semantic structure", () => {
    render(
      <ElderCard
        as="article"
        title="Article Title"
        titleLevel="h2"
        footer={<div>Footer</div>}
      >
        <p>Article content</p>
      </ElderCard>
    );

    expect(screen.getByRole("article")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(screen.getByText("Article content")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});
