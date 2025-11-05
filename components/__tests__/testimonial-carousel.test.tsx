import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TestimonialCarousel } from "../ui/testimonial-carousel";
import type { Testimonial } from "@/types/testimonial";

const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    patientName: "Patient 1",
    condition: "Condition 1",
    rating: 5,
    text: "Testimonial 1",
    treatmentDate: "2024-10-15",
    doctorName: "Dr. One",
    verified: true,
  },
  {
    id: "2",
    patientName: "Patient 2",
    condition: "Condition 2",
    rating: 4,
    text: "Testimonial 2",
    treatmentDate: "2024-09-20",
    doctorName: "Dr. Two",
    verified: true,
  },
  {
    id: "3",
    patientName: "Patient 3",
    condition: "Condition 3",
    rating: 5,
    text: "Testimonial 3",
    treatmentDate: "2024-11-01",
    doctorName: "Dr. Three",
    verified: true,
  },
];

// Mock framer-motion to avoid animation issues in tests
jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe("TestimonialCarousel", () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  it("renders carousel with testimonials", () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} />);
    
    expect(screen.getByRole("region", { name: /testimonials carousel/i })).toBeInTheDocument();
    expect(screen.getByText("Patient 1")).toBeInTheDocument();
  });

  it("shows current position indicator", () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} />);
    
    expect(screen.getByText("1 of 3")).toBeInTheDocument();
  });

  it("navigates to next testimonial when Next button clicked", async () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} config={{ enableAutoPlay: false }} />);
    
    const nextButton = screen.getByLabelText("Next testimonial");
    await userEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText("2 of 3")).toBeInTheDocument();
    });
  });

  it("navigates to previous testimonial when Previous button clicked", async () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} config={{ enableAutoPlay: false }} />);
    
    // Go to second item first
    const nextButton = screen.getByLabelText("Next testimonial");
    await userEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText("2 of 3")).toBeInTheDocument();
    });
    
    // Then go back
    const prevButton = screen.getByLabelText("Previous testimonial");
    await userEvent.click(prevButton);
    
    await waitFor(() => {
      expect(screen.getByText("1 of 3")).toBeInTheDocument();
    });
  });

  it("renders indicator dots for all testimonials", () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} />);
    
    const indicators = screen.getAllByRole("tab");
    expect(indicators).toHaveLength(3);
  });

  it("navigates to specific testimonial when indicator clicked", async () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} config={{ enableAutoPlay: false }} />);
    
    const thirdIndicator = screen.getByLabelText("Go to testimonial 3");
    await userEvent.click(thirdIndicator);
    
    await waitFor(() => {
      expect(screen.getByText("3 of 3")).toBeInTheDocument();
    });
  });

  it("displays play/pause button when auto-play enabled", () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} config={{ enableAutoPlay: true }} />);
    
    expect(screen.getByLabelText("Pause auto-play")).toBeInTheDocument();
  });

  it("toggles play/pause state", async () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} config={{ enableAutoPlay: true }} />);
    
    const pauseButton = screen.getByLabelText("Pause auto-play");
    await userEvent.click(pauseButton);
    
    await waitFor(() => {
      expect(screen.getByLabelText("Resume auto-play")).toBeInTheDocument();
    });
  });

  it("disables Previous button at first item when loop is false", () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} config={{ loop: false, enableAutoPlay: false }} />);
    
    const prevButton = screen.getByLabelText("Previous testimonial");
    expect(prevButton).toBeDisabled();
  });

  it("disables Next button at last item when loop is false", async () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} config={{ loop: false, enableAutoPlay: false }} />);
    
    // Navigate to last item
    const nextButton = screen.getByLabelText("Next testimonial");
    await userEvent.click(nextButton);
    await userEvent.click(nextButton);
    
    await waitFor(() => {
      expect(nextButton).toBeDisabled();
    });
  });

  it("loops back to first item when at end and loop is true", async () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} config={{ loop: true, enableAutoPlay: false }} />);
    
    const nextButton = screen.getByLabelText("Next testimonial");
    
    // Click next 3 times to loop
    await userEvent.click(nextButton);
    await userEvent.click(nextButton);
    await userEvent.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText("1 of 3")).toBeInTheDocument();
    });
  });

  it("handles empty testimonials array gracefully", () => {
    render(<TestimonialCarousel testimonials={[]} />);
    
    expect(screen.getByText("No testimonials available.")).toBeInTheDocument();
  });

  it("has proper ARIA attributes", () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} />);
    
    const carousel = screen.getByRole("region");
    expect(carousel).toHaveAttribute("aria-label", "Patient testimonials carousel");
    expect(carousel).toHaveAttribute("aria-roledescription", "carousel");
  });

  it("announces position changes to screen readers", async () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} config={{ enableAutoPlay: false }} />);
    
    const nextButton = screen.getByLabelText("Next testimonial");
    await userEvent.click(nextButton);
    
    // Check for live region announcement
    const liveRegion = screen.getByRole("status");
    expect(liveRegion).toBeInTheDocument();
  });

  it("marks current indicator as selected", () => {
    render(<TestimonialCarousel testimonials={mockTestimonials} />);
    
    const firstIndicator = screen.getByLabelText("Go to testimonial 1");
    expect(firstIndicator).toHaveAttribute("aria-selected", "true");
    expect(firstIndicator).toHaveAttribute("aria-current", "true");
  });
});
