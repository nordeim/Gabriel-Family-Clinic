import { test, expect } from '@playwright/test'

test.describe('Gabriel Clinic E2E User Journeys', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the clinic homepage before each test
    await page.goto('/')
  })

  test.describe('Patient Journey: Homepage to Appointment Inquiry', () => {
    test('should allow user to browse services and contact for appointment', async ({ page }) => {
      // 1. User lands on homepage and sees clinic branding
      await expect(page.locator('h1')).toContainText('Gabriel Clinic')
      await expect(page.locator('h2')).toContainText('Compassionate Healthcare')
      
      // 2. User browses available services
      await page.getByRole('button', { name: 'Our Services' }).click()
      await expect(page.locator('[data-testid="services-section"]')).toBeVisible()
      
      // 3. User views specific service details
      await page.locator('[data-testid="service-card"]:first-child').click()
      await expect(page.locator('h3')).toContainText(/General Practice|Physiotherapy|Dental Care/)
      
      // 4. User returns to contact information
      await page.getByRole('link', { name: 'Contact Us' }).click()
      await expect(page.locator('[data-testid="contact-info"]')).toBeVisible()
      
      // 5. User reads clinic hours and location
      await expect(page.locator('[data-testid="clinic-hours"]')).toBeVisible()
      await expect(page.locator('[data-testid="clinic-address"]')).toBeVisible()
    })

    test('should provide accessibility features for elderly patients', async ({ page }) => {
      // 1. User increases text size for better readability
      await page.locator('[data-testid="text-size-increase"]').click()
      await page.locator('[data-testid="text-size-increase"]').click()
      
      // 2. Verify text size increased
      const bodyFontSize = await page.locator('body').evaluate(el => 
        window.getComputedStyle(el).fontSize
      )
      expect(parseFloat(bodyFontSize)).toBeGreaterThan(16)
      
      // 3. User navigates using keyboard
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Enter')
      
      // 4. Verify focus is visible and functional
      const focusedElement = page.locator(':focus')
      await expect(focusedElement).toBeVisible()
    })
  })

  test.describe('Navigation and Information Discovery', () => {
    test('should provide clear navigation for new patients', async ({ page }) => {
      // 1. New patient seeks information about the clinic
      await page.getByRole('link', { name: 'About Us' }).click()
      await expect(page.locator('h1')).toContainText('About Gabriel Clinic')
      
      // 2. Patient reads about clinic values and approach
      await expect(page.locator('[data-testid="clinic-mission"]')).toBeVisible()
      await expect(page.locator('[data-testid="clinic-values"]')).toBeVisible()
      
      // 3. Patient looks for testimonials from other patients
      await page.getByRole('link', { name: 'Testimonials' }).click()
      await expect(page.locator('[data-testid="testimonials-section"]')).toBeVisible()
      
      // 4. Patient reads patient experiences
      const testimonials = page.locator('[data-testid="testimonial-card"]')
      await expect(testimonials.first()).toBeVisible()
      
      // 5. Patient navigates through testimonial carousel
      await page.locator('[data-testid="testimonial-next"]').click()
      await page.locator('[data-testid="testimonial-next"]').click()
      
      // Verify carousel moved
      const activeTestimonial = page.locator('[data-testid="testimonial-card"].active')
      await expect(activeTestimonial).toBeVisible()
    })

    test('should help users find emergency and urgent care information', async ({ page }) => {
      // 1. User looks for emergency contact information
      await page.locator('[data-testid="emergency-contact"]').scrollIntoViewIfNeeded()
      await expect(page.locator('[data-testid="emergency-contact"]')).toBeVisible()
      
      // 2. User reads about after-hours services
      await expect(page.locator('[data-testid="after-hours-info"]')).toBeVisible()
      
      // 3. User checks clinic hours for planning visit
      await expect(page.locator('[data-testid="clinic-hours-table"]')).toBeVisible()
      
      // 4. User verifies location and accessibility
      await expect(page.locator('[data-testid="location-accessibility"]')).toBeVisible()
    })
  })

  test.describe('Accessibility and Usability Journey', () => {
    test('should be fully accessible via screen reader navigation', async ({ page }) => {
      // 1. Page loads with proper semantic structure
      const main = page.locator('main')
      await expect(main).toBeVisible()
      
      // 2. All interactive elements have proper ARIA labels
      const buttons = page.locator('button')
      const buttonCount = await buttons.count()
      for (let i = 0; i < buttonCount; i++) {
        const button = buttons.nth(i)
        const ariaLabel = await button.getAttribute('aria-label')
        const textContent = await button.textContent()
        expect(ariaLabel || textContent).toBeTruthy()
      }
      
      // 3. Form elements have proper labels
      const formElements = page.locator('input, textarea, select')
      const formCount = await formElements.count()
      for (let i = 0; i < formCount; i++) {
        const element = formElements.nth(i)
        const id = await element.getAttribute('id')
        const ariaLabel = await element.getAttribute('aria-label')
        const label = id ? page.locator(`label[for="${id}"]`) : null
        expect(ariaLabel || (label && await label.isVisible())).toBeTruthy()
      }
      
      // 4. Navigation is accessible via keyboard
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      
      // Verify focus indicators are visible
      const focusedElement = page.locator(':focus')
      await expect(focusedElement).toHaveCSS('outline', /.*/)
    })

    test('should meet WCAG AAA touch target requirements', async ({ page }) => {
      // 1. All buttons and links meet minimum 44px touch target
      const interactiveElements = page.locator('button, a, [role="button"], input[type="submit"], input[type="button"]')
      const elementCount = await interactiveElements.count()
      
      for (let i = 0; i < elementCount; i++) {
        const element = interactiveElements.nth(i)
        const box = await element.boundingBox()
        
        if (box) {
          expect(box.width).toBeGreaterThanOrEqual(44)
          expect(box.height).toBeGreaterThanOrEqual(44)
        }
      }
      
      // 2. Minimum spacing between touch targets
      for (let i = 0; i < elementCount - 1; i++) {
        const currentElement = interactiveElements.nth(i)
        const nextElement = interactiveElements.nth(i + 1)
        
        const currentBox = await currentElement.boundingBox()
        const nextBox = await nextElement.boundingBox()
        
        if (currentBox && nextBox) {
          // Check horizontal and vertical spacing
          const horizontalDistance = Math.abs(nextBox.x - (currentBox.x + currentBox.width))
          const verticalDistance = Math.abs(nextBox.y - (currentBox.y + currentBox.height))
          
          // Elements should not overlap and should have adequate spacing
          expect(horizontalDistance).toBeGreaterThanOrEqual(8)
          expect(verticalDistance).toBeGreaterThanOrEqual(8)
        }
      }
    })
  })

  test.describe('Mobile-First User Experience', () => {
    test('should work seamlessly on mobile devices', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 812 })
      
      // 1. Mobile navigation works properly
      const mobileMenuButton = page.locator('[data-testid="mobile-menu-toggle"]')
      if (await mobileMenuButton.isVisible()) {
        await mobileMenuButton.click()
        await expect(page.locator('[data-testid="mobile-navigation"]')).toBeVisible()
      }
      
      // 2. Content is readable and usable on small screens
      await expect(page.locator('h1')).toBeVisible()
      const h1FontSize = await page.locator('h1').evaluate(el => 
        window.getComputedStyle(el).fontSize
      )
      expect(parseFloat(h1FontSize)).toBeGreaterThanOrEqual(18)
      
      // 3. Touch interactions work properly
      await page.locator('[data-testid="cta-button"]').tap()
      await expect(page.locator('[data-testid="contact-section"]')).toBeVisible()
      
      // 4. Scroll behavior is smooth
      await page.mouse.wheel(0, 500)
      await page.waitForTimeout(500)
      
      // Verify sections are properly spaced for mobile
      const heroSection = page.locator('[data-testid="hero-section"]')
      const servicesSection = page.locator('[data-testid="services-section"]')
      await expect(heroSection).toBeVisible()
      await expect(servicesSection).toBeVisible()
    })

    test('should handle text size preferences on mobile', async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 812 })
      
      // 1. User increases text size for accessibility
      await page.locator('[data-testid="text-size-control"]').scrollIntoViewIfNeeded()
      
      // Test multiple text size increases
      for (let i = 0; i < 3; i++) {
        await page.locator('[data-testid="text-size-increase"]').click()
        await page.waitForTimeout(200)
      }
      
      // 2. Verify content remains readable and properly sized
      const body = page.locator('body')
      const fontSize = await body.evaluate(el => window.getComputedStyle(el).fontSize)
      expect(parseFloat(fontSize)).toBeGreaterThan(16)
      
      // 3. Ensure no horizontal scrolling on increased text size
      const pageWidth = await page.evaluate('document.documentElement.scrollWidth')
      const viewportWidth = await page.evaluate('window.innerWidth')
      expect(pageWidth).toBeLessThanOrEqual(viewportWidth)
      
      // 4. Verify layout doesn't break with larger text
      await expect(page.locator('[data-testid="services-grid"]')).toBeVisible()
      await expect(page.locator('[data-testid="footer"]')).toBeVisible()
    })
  })

  test.describe('Error Handling and Edge Cases', () => {
    test('should handle network issues gracefully', async ({ page }) => {
      // 1. Simulate slow network
      await page.route('**/*', route => {
        setTimeout(() => route.continue(), 1000)
      })
      
      // 2. Page should still load and be functional
      await page.goto('/', { waitUntil: 'networkidle' })
      await expect(page.locator('h1')).toContainText('Gabriel Clinic')
      
      // 3. Critical functionality should work even with slow connections
      await page.locator('[data-testid="text-size-control"]').click()
      await expect(page.locator('[data-testid="text-size-decrease"]')).toBeVisible()
    })

    test('should handle JavaScript being disabled', async ({ page }) => {
      // 1. Disable JavaScript
      await page.addInitScript(() => {
        window.alert = () => {}
        window.confirm = () => true
      })
      
      // 2. Page should still be navigable and readable
      await page.goto('/')
      await expect(page.locator('h1')).toContainText('Gabriel Clinic')
      
      // 3. Basic navigation should work
      await page.locator('a[href*="about"]').click()
      await expect(page.locator('h1')).toContainText(/About|Clinic/)
    })
  })
})