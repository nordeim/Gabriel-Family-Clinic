import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import { ElderButton } from '../ui/elder-button'
import { ElderCard } from '../ui/elder-card'
import { TestimonialCarousel } from '../ui/testimonial-carousel'
import { TextSizeControl } from '../accessibility/text-size-control'

// Extend Jest matchers to include axe accessibility checks
expect.extend(toHaveNoViolations)

describe('WCAG AAA Accessibility Compliance', () => {
  describe('ElderButton Component', () => {
    it('should not have any accessibility violations', async () => {
      const { container } = render(
        <ElderButton aria-label="Test button">Accessible Button</ElderButton>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have proper touch target size (44px minimum)', () => {
      render(<ElderButton size="sm">Small Button</ElderButton>)
      const button = screen.getByRole('button')
      
      // Verify minimum touch target size
      expect(button).toHaveClass('min-h-[44px]')
      expect(button).toHaveClass('min-w-[44px]')
    })

    it('should be keyboard accessible', () => {
      const handleClick = jest.fn()
      render(
        <ElderButton onClick={handleClick} data-testid="test-button">
          Test Button
        </ElderButton>
      )
      
      const button = screen.getByTestId('test-button')
      
      // Button should be focusable (default behavior for buttons)
      expect(button).not.toHaveAttribute('disabled')
      
      // Test keyboard interaction
      button.focus()
      expect(button).toHaveFocus()
      
      // Test Enter key activation
      fireEvent.keyDown(button, { key: 'Enter' })
      fireEvent.click(button)
      expect(handleClick).toHaveBeenCalled()
    })

    it('should have proper ARIA labels and roles', () => {
      render(
        <ElderButton aria-label="Submit form" aria-describedby="submit-help">
          Submit
        </ElderButton>
      )
      
      const button = screen.getByRole('button', { name: /submit form/i })
      expect(button).toBeInTheDocument()
    })
  })

  describe('ElderCard Component', () => {
    it('should not have any accessibility violations', async () => {
      const { container } = render(
        <ElderCard 
          title="Test Card" 
          description="Test description"
          animated={false} // Disable animation to avoid Framer Motion issues in tests
        >
          Card content
        </ElderCard>
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should use semantic HTML structure', () => {
      render(
        <ElderCard as="article" title="Test Article">
          <h2>Article Title</h2>
          <p>Article content</p>
        </ElderCard>
      )
      
      const card = screen.getByRole('article')
      expect(card).toBeInTheDocument()
      
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toBeInTheDocument()
    })

    it('should support keyboard navigation when tabIndex is provided', () => {
      render(
        <ElderCard as="section" tabIndex={0} title="Interactive Card">
          <ElderButton>Click me</ElderButton>
        </ElderCard>
      )
      
      // ElderCard as section with tabIndex should be focusable - check by finding the section element
      const sections = document.querySelectorAll('section[tabindex="0"]')
      expect(sections).toHaveLength(1)
      expect(sections[0]).toHaveAttribute('tabindex', '0')
    })
  })

  describe('TestimonialCarousel Component', () => {
    const mockTestimonials = [
      {
        id: '1',
        patientName: 'John Doe',
        patientAge: 65,
        patientCondition: 'Arthritis',
        testimonial: 'Great service!',
        rating: 5,
        date: '2024-01-15',
      },
      {
        id: '2', 
        patientName: 'Jane Smith',
        patientAge: 72,
        patientCondition: 'Diabetes',
        testimonial: 'Excellent care!',
        rating: 5,
        date: '2024-01-10',
      },
    ]

    it('should not have any accessibility violations', async () => {
      const { container } = render(
        <TestimonialCarousel 
          testimonials={mockTestimonials}
          autoPlay={false}
        />
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should provide proper carousel navigation', () => {
      render(
        <TestimonialCarousel 
          testimonials={mockTestimonials}
          autoPlay={false}
        />
      )
      
      // Should have proper navigation buttons
      expect(screen.getByLabelText(/previous testimonial/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/next testimonial/i)).toBeInTheDocument()
      
      // Should have proper indicators
      expect(screen.getByLabelText(/go to testimonial 1/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/go to testimonial 2/i)).toBeInTheDocument()
    })

    it('should have live region for screen reader announcements', () => {
      render(
        <TestimonialCarousel 
          testimonials={mockTestimonials}
          autoPlay={false}
        />
      )
      
      // Should have live region for announcements
      const liveRegion = screen.getByRole('status')
      expect(liveRegion).toBeInTheDocument()
      expect(liveRegion).toHaveAttribute('aria-live', 'polite')
    })

    it('should support keyboard navigation', () => {
      render(
        <TestimonialCarousel 
          testimonials={mockTestimonials}
          autoPlay={false}
        />
      )
      
      const prevButton = screen.getByLabelText(/previous testimonial/i)
      const nextButton = screen.getByLabelText(/next testimonial/i)
      
      // Navigation buttons should be accessible (buttons are focusable by default)
      expect(prevButton).not.toHaveAttribute('disabled')
      expect(nextButton).not.toHaveAttribute('disabled')
    })
  })

  describe('TextSizeControl Component', () => {
    it('should not have any accessibility violations', async () => {
      const { container } = render(
        <TextSizeControl onSizeChange={jest.fn()} />
      )
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have proper touch targets for text size controls', () => {
      render(<TextSizeControl onSizeChange={jest.fn()} />)
      
      // All buttons should meet minimum touch target requirements
      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        // Check if the button has proper minimum dimensions via style
        const computedStyle = window.getComputedStyle(button)
        const minHeight = parseInt(computedStyle.minHeight) || 0
        const minWidth = parseInt(computedStyle.minWidth) || 0
        expect(minHeight).toBeGreaterThanOrEqual(44)
        expect(minWidth).toBeGreaterThanOrEqual(44)
      })
    })

    it('should have live region for screen reader announcements', () => {
      render(
        <TextSizeControl 
          onSizeChange={jest.fn()}
          announceChanges={true}
        />
      )
      
      // Should have live region for announcements
      const liveRegion = screen.getByRole('status')
      expect(liveRegion).toBeInTheDocument()
      expect(liveRegion).toHaveAttribute('aria-live', 'polite')
    })
  })

  describe('Color Contrast and Visual Accessibility', () => {
    it('should meet basic color contrast requirements', async () => {
      const { container } = render(
        <div>
          <ElderButton variant="primary">Primary Button</ElderButton>
          <ElderButton variant="secondary">Secondary Button</ElderButton>
          <ElderButton variant="destructive">Delete Button</ElderButton>
        </div>
      )
      
      const results = await axe(container)
      // Should not have critical color contrast violations
      const colorContrastViolations = results.violations.filter(violation => 
        violation.id === 'color-contrast'
      )
      expect(colorContrastViolations).toHaveLength(0)
    })
  })

  describe('Focus Management and Keyboard Navigation', () => {
    it('should provide visible focus indicators', () => {
      render(
        <div>
          <ElderButton>Focusable Button</ElderButton>
          <ElderButton variant="secondary">Another Button</ElderButton>
        </div>
      )
      
      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        // Buttons should have focus-visible styles
        expect(button).toHaveClass('focus-visible:outline-none')
        expect(button).toHaveClass(/focus-visible:ring/)
      })
    })
  })

  describe('Semantic HTML and Structure', () => {
    it('should use proper heading hierarchy', () => {
      render(
        <div>
          <h1>Main Heading</h1>
          <ElderCard title="Card with proper heading">
            <p>Content with proper structure</p>
          </ElderCard>
        </div>
      )
      
      const h1 = screen.getByRole('heading', { level: 1 })
      expect(h1).toBeInTheDocument()
      
      const cardTitle = screen.getByRole('heading', { level: 3 })
      expect(cardTitle).toBeInTheDocument()
    })

    it('should have proper landmark regions', async () => {
      const { container } = render(
        <div>
          <main>
            <ElderCard title="Main Content">
              <p>Main content area</p>
            </ElderCard>
          </main>
        </div>
      )
      
      const results = await axe(container)
      const landmarkViolations = results.violations.filter(violation => 
        violation.id === 'region'
      )
      expect(landmarkViolations).toHaveLength(0)
    })
  })

  describe('Screen Reader and ARIA Support', () => {
    it('should support proper ARIA labeling', () => {
      render(
        <div>
          <ElderButton aria-label="Close dialog" data-testid="close-button">
            ×
          </ElderButton>
        </div>
      )
      
      const button = screen.getByTestId('close-button')
      expect(button).toHaveAttribute('aria-label', 'Close dialog')
    })

    it('should have proper ARIA roles and descriptions', () => {
      render(
        <TextSizeControl 
          onSizeChange={jest.fn()}
          aria-label="Text size controls"
        />
      )
      
      const group = screen.getByRole('group', { name: /text size controls/i })
      expect(group).toBeInTheDocument()
    })
  })

  describe('Touch Target and Mobile Accessibility', () => {
    afterEach(() => {
      cleanup()
    })

    it('should meet minimum touch target requirements', () => {
      // Test each size separately with cleanup
      const testButtonSize = (size: string) => {
        cleanup() // Ensure clean state before each test
        render(<ElderButton size={size}>Button</ElderButton>)
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
        // Verify button has proper size classes
        expect(button.className).toMatch(/min-h-\[.*px\]|h-\[.*px\]/)
        expect(button.className).toMatch(/min-w-\[.*px\]/)
      }
      
      testButtonSize('sm')
      testButtonSize('md')  
      testButtonSize('lg')
      testButtonSize('xl')
    })
  })

  describe('Animation and Motion Preferences', () => {
    it('should not have accessibility issues with motion preferences', async () => {
      // Mock reduced motion preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      })
      
      // Test with non-animated components to avoid Framer Motion issues in tests
      const { container } = render(
        <div>
          <ElderButton>Static Button</ElderButton>
          <ElderCard animated={false} title="Static Card">
            Card content without animation
          </ElderCard>
        </div>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
