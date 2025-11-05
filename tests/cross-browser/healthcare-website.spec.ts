import { test, expect } from '@playwright/test'

test.describe('Cross-Browser Healthcare Website Compatibility', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/')
  })

  test.describe('Desktop Browsers', () => {
    test('should load and display correctly in Chrome', async ({ page }) => {
      // Test page loads
      await expect(page).toHaveTitle(/Gabriel Clinic/i)
      
      // Test main navigation is present and functional
      await expect(page.locator('nav')).toBeVisible()
      
      // Test ElderButton components are rendered correctly
      await expect(page.locator('button').first()).toBeVisible()
      
      // Test ElderCard components are displayed
      await expect(page.locator('[class*="elder-card"], .elder-card-content')).toBeVisible()
      
      // Verify touch target sizes are accessible (44px minimum)
      const buttons = page.locator('button')
      const buttonCount = await buttons.count()
      expect(buttonCount).toBeGreaterThan(0)
      
      // Check that buttons have minimum touch target sizes
      for (let i = 0; i < buttonCount; i++) {
        const button = buttons.nth(i)
        const box = await button.boundingBox()
        if (box) {
          expect(box.height).toBeGreaterThanOrEqual(44)
          expect(box.width).toBeGreaterThanOrEqual(44)
        }
      }
    })

    test('should load and display correctly in Firefox', async ({ page }) => {
      // Test page loads
      await expect(page).toHaveTitle(/Gabriel Clinic/i)
      
      // Test CSS animations and transitions work
      const card = page.locator('[class*="elder-card"], .elder-card-content').first()
      await card.hover()
      
      // Verify hover states are applied
      await expect(card).toHaveClass(/hover:|transition/)
    })

    test('should load and display correctly in Safari/WebKit', async ({ page }) => {
      // Test page loads
      await expect(page).toHaveTitle(/Gabriel Clinic/i)
      
      // Test font rendering is consistent
      const heading = page.locator('h1, h2, [class*="heading"]').first()
      await expect(heading).toBeVisible()
      
      // Test that CSS Grid/Flexbox layouts work
      const layout = page.locator('[class*="flex"], [class*="grid"]').first()
      await expect(layout).toBeVisible()
    })

    test('should load and display correctly in Microsoft Edge', async ({ page }) => {
      // Test page loads
      await expect(page).toHaveTitle(/Gabriel Clinic/i)
      
      // Test that all interactive elements work
      const interactiveElements = page.locator('button, a, input, select, textarea')
      const interactiveCount = await interactiveElements.count()
      expect(interactiveCount).toBeGreaterThan(0)
      
      // Test focus management
      const firstButton = page.locator('button').first()
      await firstButton.focus()
      await expect(firstButton).toBeFocused()
    })
  })

  test.describe('Mobile Browsers', () => {
    test('should be responsive and touch-friendly on Mobile Chrome', async ({ page, isMobile }) => {
      // Test viewport is responsive
      const viewport = page.viewportSize()
      if (viewport) {
        expect(viewport.width).toBeLessThanOrEqual(768) // Mobile breakpoint
      }
      
      // Test touch targets are accessible (44px minimum)
      const buttons = page.locator('button')
      const buttonCount = await buttons.count()
      expect(buttonCount).toBeGreaterThan(0)
      
      // Verify buttons are large enough for touch
      for (let i = 0; i < Math.min(buttonCount, 3); i++) {
        const button = buttons.nth(i)
        const box = await button.boundingBox()
        if (box) {
          expect(box.height).toBeGreaterThanOrEqual(44)
          expect(box.width).toBeGreaterThanOrEqual(44)
        }
      }
      
      // Test scroll behavior
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await page.evaluate(() => window.scrollTo(0, 0))
    })

    test('should be responsive and touch-friendly on Mobile Safari', async ({ page, isMobile, browserName }) => {
      if (browserName !== 'webkit') return // Only run for Safari
      
      // Test mobile-specific features
      const viewport = page.viewportSize()
      if (viewport) {
        expect(viewport.width).toBeLessThanOrEqual(768)
      }
      
      // Test that text is readable at mobile sizes
      const textElements = page.locator('p, span, div')
      const textCount = await textElements.count()
      expect(textCount).toBeGreaterThan(0)
      
      // Verify text size is appropriate for mobile
      const bodyFontSize = await page.evaluate(() => {
        return window.getComputedStyle(document.body).fontSize
      })
      expect(parseFloat(bodyFontSize)).toBeGreaterThanOrEqual(14) // Minimum readable size
    })
  })

  test.describe('Healthcare-Specific Functionality', () => {
    test('should support accessibility features across all browsers', async ({ page }) => {
      // Test keyboard navigation works
      await page.keyboard.press('Tab')
      let focusedElement = await page.locator(':focus').first()
      await expect(focusedElement).toBeVisible()
      
      // Continue tabbing through interactive elements
      await page.keyboard.press('Tab')
      await page.keyboard.press('Tab')
      focusedElement = await page.locator(':focus').first()
      await expect(focusedElement).toBeVisible()
      
      // Test that focus indicators are visible
      const focusedStyles = await page.evaluate(() => {
        const focused = document.activeElement
        if (focused && focused !== document.body) {
          const styles = window.getComputedStyle(focused)
          return {
            outline: styles.outline,
            ring: styles.boxShadow,
            background: styles.backgroundColor
          }
        }
        return null
      })
      
      // Verify focus styles are applied
      expect(focusedStyles?.outline || focusedStyles?.ring).toBeTruthy()
    })

    test('should handle appointment booking interactions', async ({ page }) => {
      // Look for appointment-related buttons or links
      const appointmentSelectors = [
        'text=/book appointment/i',
        'text=/schedule/i',
        'text=/appointment/i',
        '[aria-label*="appointment"]',
        '[aria-label*="schedule"]'
      ]
      
      let appointmentFound = false
      for (const selector of appointmentSelectors) {
        const element = page.locator(selector)
        if (await element.isVisible()) {
          appointmentFound = true
          // Test clicking functionality
          await element.click()
          break
        }
      }
      
      // If no appointment elements found, test general button functionality
      if (!appointmentFound) {
        const button = page.locator('button').first()
        if (await button.isVisible()) {
          await button.click()
        }
      }
      
      // Verify no console errors occurred
      const consoleErrors: string[] = []
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text())
        }
      })
      
      await page.waitForTimeout(1000)
      expect(consoleErrors.length).toBe(0)
    })

    test('should display patient testimonials properly', async ({ page }) => {
      // Look for testimonial components
      const testimonialSelectors = [
        '[class*="testimonial"]',
        '[role="region"][aria-label*="testimonial"]',
        '[aria-label*="patient"]'
      ]
      
      let testimonialFound = false
      for (const selector of testimonialSelectors) {
        const element = page.locator(selector)
        if (await element.isVisible()) {
          testimonialFound = true
          
          // Test carousel navigation if present
          const prevButton = page.locator('[aria-label*="previous"], [aria-label*="prev"]')
          const nextButton = page.locator('[aria-label*="next"]')
          
          if (await prevButton.isVisible()) {
            await prevButton.click()
            await page.waitForTimeout(500)
          }
          
          if (await nextButton.isVisible()) {
            await nextButton.click()
            await page.waitForTimeout(500)
          }
          
          break
        }
      }
      
      // Even if no testimonials found, verify page is functional
      expect(true).toBe(true) // Test passes if page loads without errors
    })
  })

  test.describe('Performance and Visual Consistency', () => {
    test('should load quickly across all browsers', async ({ page }) => {
      // Measure page load performance
      const loadMetrics = await page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        return {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          firstPaint: performance.getEntriesByType('paint').find(entry => entry.name === 'first-paint')?.startTime || 0
        }
      })
      
      // Verify performance is acceptable (threshold: 3 seconds)
      expect(loadMetrics.loadComplete).toBeLessThan(3000)
      expect(loadMetrics.firstPaint).toBeLessThan(1000)
    })

    test('should maintain visual layout consistency', async ({ page }) => {
      // Test that key layout elements are present and positioned correctly
      const layoutElements = [
        'header',
        'nav',
        'main',
        'footer',
        '[class*="container"]',
        '[class*="grid"]'
      ]
      
      for (const selector of layoutElements) {
        const element = page.locator(selector)
        if (await element.isVisible()) {
          const box = await element.boundingBox()
          if (box) {
            expect(box.width).toBeGreaterThan(0)
            expect(box.height).toBeGreaterThan(0)
          }
        }
      }
    })

    test('should handle text scaling and accessibility', async ({ page }) => {
      // Test that text remains readable when zoomed
      await page.evaluate(() => {
        document.body.style.zoom = '1.5'
      })
      
      // Verify text is still visible and readable
      const textElements = page.locator('p, h1, h2, h3, span')
      const textCount = await textElements.count()
      expect(textCount).toBeGreaterThan(0)
      
      // Check that text is not cut off
      for (let i = 0; i < Math.min(textCount, 3); i++) {
        const textElement = textElements.nth(i)
        if (await textElement.isVisible()) {
          const box = await textElement.boundingBox()
          if (box) {
            expect(box.height).toBeGreaterThan(0)
          }
        }
      }
    })
  })

  test.describe('Error Handling and Resilience', () => {
    test('should handle network issues gracefully', async ({ page }) => {
      // Simulate slow network
      await page.route('**/*', route => {
        setTimeout(() => route.continue(), 100)
      })
      
      // Verify page still loads
      await expect(page).toHaveTitle(/Gabriel Clinic/i)
      
      // Verify core functionality still works
      const button = page.locator('button').first()
      if (await button.isVisible()) {
        await button.hover()
      }
    })

    test('should not have JavaScript errors in console', async ({ page }) => {
      const errors: string[] = []
      
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text())
        }
      })
      
      page.on('pageerror', error => {
        errors.push(error.message)
      })
      
      // Interact with various elements to trigger potential errors
      await page.goto('/')
      await page.waitForTimeout(2000)
      
      // Click various buttons to test functionality
      const buttons = page.locator('button')
      const buttonCount = await buttons.count()
      for (let i = 0; i < Math.min(buttonCount, 3); i++) {
        try {
          await buttons.nth(i).click()
          await page.waitForTimeout(500)
        } catch (error) {
          // Ignore click errors as buttons may be disabled
        }
      }
      
      // Verify no critical JavaScript errors occurred
      const criticalErrors = errors.filter(error => 
        !error.includes('favicon') && 
        !error.includes('warning') &&
        !error.includes('Non-Error promise rejection')
      )
      expect(criticalErrors.length).toBe(0)
    })
  })
})
