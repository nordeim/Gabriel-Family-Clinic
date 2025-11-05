import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TestimonialCard } from "../ui/testimonial-card";
import type { Testimonial } from "@/types/testimonial";

const mockTestimonial: Testimonial = {
  id: "test-1",
  patientName: "Test Patient",
  condition: "Test Condition",
  rating: 5,
  text: "This is a test testimonial text.",
  treatmentDate: "2024-10-15",
  doctorName: "Dr. Test",
  doctorTitle: "MD",
  verified: true,
  location: "Test City",
};

describe("TestimonialCard", () => {
  it("renders testimonial data correctly", () => {
    render(<TestimonialCard testimonial={mockTestimonial} />);
    
    expect(screen.getByText("Test Patient")).toBeInTheDocument();
    expect(screen.getByText("Test Condition")).toBeInTheDocument();
    expect(screen.getByText("This is a test testimonial text.")).toBeInTheDocument();
    expect(screen.getByText(/Dr. Test/)).toBeInTheDocument();
    expect(screen.getByText("Test City")).toBeInTheDocument();
  });

  it("displays 5-star rating correctly", () => {
    render(<TestimonialCard testimonial={mockTestimonial} />);
    
    const rating = screen.getByRole("img", { name: "5 out of 5 stars" });
    expect(rating).toBeInTheDocument();
  });

  it("shows verified badge for verified testimonials", () => {
    render(<TestimonialCard testimonial={mockTestimonial} />);
    
    const verifiedBadge = screen.getByLabelText("Verified testimonial");
    expect(verifiedBadge).toBeInTheDocument();
  });

  it("does not show verified badge for unverified testimonials", () => {
    const unverifiedTestimonial = { ...mockTestimonial, verified: false };
    render(<TestimonialCard testimonial={unverifiedTestimonial} />);
    
    expect(screen.queryByLabelText("Verified testimonial")).not.toBeInTheDocument();
  });

  it("formats treatment date correctly", () => {
    render(<TestimonialCard testimonial={mockTestimonial} />);
    
    expect(screen.getByText("October 2024")).toBeInTheDocument();
  });

  it("renders as article element", () => {
    const { container } = render(<TestimonialCard testimonial={mockTestimonial} />);
    
    expect(container.querySelector("article")).toBeInTheDocument();
  });

  it("displays patient avatar icon when no avatar URL provided", () => {
    render(<TestimonialCard testimonial={mockTestimonial} />);
    
    // User icon should be present as placeholder
    const userIcon = document.querySelector('.lucide-user');
    expect(userIcon).toBeInTheDocument();
  });

  it("renders different rating values correctly", () => {
    const { rerender } = render(
      <TestimonialCard testimonial={{ ...mockTestimonial, rating: 3 }} />
    );
    expect(screen.getByRole("img", { name: "3 out of 5 stars" })).toBeInTheDocument();

    rerender(<TestimonialCard testimonial={{ ...mockTestimonial, rating: 4 }} />);
    expect(screen.getByRole("img", { name: "4 out of 5 stars" })).toBeInTheDocument();
  });

  it("applies variant classes correctly", () => {
    const { container, rerender } = render(
      <TestimonialCard testimonial={mockTestimonial} variant="standard" />
    );
    expect(container.querySelector(".testimonial-card")).toBeInTheDocument();

    rerender(<TestimonialCard testimonial={mockTestimonial} variant="featured" />);
    expect(container.querySelector(".border-2.border-primary-400")).toBeTruthy();
  });

  it("renders doctor title when provided", () => {
    render(<TestimonialCard testimonial={mockTestimonial} />);
    expect(screen.getByText(/MD/)).toBeInTheDocument();
  });

  it("handles missing optional fields gracefully", () => {
    const minimalTestimonial: Testimonial = {
      id: "minimal",
      patientName: "Minimal",
      condition: "Condition",
      rating: 5,
      text: "Text",
      treatmentDate: "2024-10-15",
      doctorName: "Dr. Minimal",
      verified: false,
    };

    render(<TestimonialCard testimonial={minimalTestimonial} />);
    
    expect(screen.getByText("Minimal")).toBeInTheDocument();
    expect(screen.getByText("Dr. Minimal")).toBeInTheDocument();
  });
});
