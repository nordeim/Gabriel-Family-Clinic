#!/usr/bin/env node

/**
 * Performance Benchmarking Script for Gabriel Clinic
 * Measures Core Web Vitals and Lighthouse scores
 */

const lighthouse = require('lighthouse')
const chromeLauncher = require('chrome-launcher')
const fs = require('fs')
const path = require('path')

const CLINIC_URL = 'http://localhost:3001'
const PERFORMANCE_THRESHOLDS = {
  performance: 90,
  accessibility: 100,
  bestPractices: 90,
  seo: 90,
  pwa: 80
}

const CORE_WEB_VITALS_THRESHOLDS = {
  fcp: 1800, // First Contentful Paint (ms)
  lcp: 2500, // Largest Contentful Paint (ms)
  cls: 0.1,  // Cumulative Layout Shift
  fid: 100,  // First Input Delay (ms)
  tbt: 300,  // Total Blocking Time (ms)
  ttfb: 600  // Time to First Byte (ms)
}

async function runLighthouseAudit() {
  console.log('🔍 Starting Gabriel Clinic Performance Audit...\n')
  
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] })
  
  try {
    const options = {
      logLevel: 'info',
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      port: chrome.port,
    }
    
    console.log(`📊 Auditing ${CLINIC_URL}...`)
    const runnerResult = await lighthouse(CLINIC_URL, options)
    
    const lh = runnerResult.lhr
    const categories = lh.categories
    
    // Extract scores
    const scores = {
      performance: Math.round(categories.performance.score * 100),
      accessibility: Math.round(categories.accessibility.score * 100),
      bestPractices: Math.round(categories['best-practices'].score * 100),
      seo: Math.round(categories.seo.score * 100)
    }
    
    // Extract Core Web Vitals
    const audits = lh.audits
    const coreWebVitals = {
      fcp: audits['first-contentful-paint'].numericValue,
      lcp: audits['largest-contentful-paint'].numericValue,
      cls: audits['cumulative-layout-shift'].numericValue,
      fid: audits['max-potential-fid'].numericValue,
      tbt: audits['total-blocking-time'].numericValue,
      ttfb: audits['server-response-time'].numericValue
    }
    
    // Extract additional metrics
    const additionalMetrics = {
      firstMeaningfulPaint: audits['first-meaningful-paint'].numericValue,
      speedIndex: audits['speed-index'].numericValue,
      timeToInteractive: audits['interactive'].numericValue,
      bundleSize: audits['total-byte-weight'].numericValue,
      unusedJavaScript: audits['unused-javascript'].numericValue,
      unusedCss: audits['unused-css-rules'].numericValue
    }
    
    // Display results
    console.log('📈 Lighthouse Scores:')
    console.log('─'.repeat(50))
    Object.entries(scores).forEach(([category, score]) => {
      const status = score >= PERFORMANCE_THRESHOLDS[category] ? '✅' : '⚠️'
      console.log(`${status} ${category.charAt(0).toUpperCase() + category.slice(1)}: ${score}/100`)
    })
    
    console.log('\n⚡ Core Web Vitals:')
    console.log('─'.repeat(50))
    Object.entries(coreWebVitals).forEach(([metric, value]) => {
      const threshold = CORE_WEB_VITALS_THRESHOLDS[metric]
      const passes = metric === 'cls' ? value <= threshold : value <= threshold
      const status = passes ? '✅' : '⚠️'
      const unit = metric === 'cls' ? '' : 'ms'
      console.log(`${status} ${metric.toUpperCase()}: ${Math.round(value)}${unit} (threshold: ${threshold}${unit})`)
    })
    
    console.log('\n🔧 Additional Metrics:')
    console.log('─'.repeat(50))
    console.log(`First Meaningful Paint: ${Math.round(additionalMetrics.firstMeaningfulPaint)}ms`)
    console.log(`Speed Index: ${Math.round(additionalMetrics.speedIndex)}ms`)
    console.log(`Time to Interactive: ${Math.round(additionalMetrics.timeToInteractive)}ms`)
    console.log(`Bundle Size: ${Math.round(additionalMetrics.bundleSize / 1024)}KB`)
    console.log(`Unused JavaScript: ${Math.round(additionalMetrics.unusedJavaScript / 1024)}KB`)
    console.log(`Unused CSS: ${Math.round(additionalMetrics.unusedCss)} rules`)
    
    // Generate report
    const report = {
      timestamp: new Date().toISOString(),
      url: CLINIC_URL,
      scores,
      coreWebVitals,
      additionalMetrics,
      thresholds: {
        lighthouse: PERFORMANCE_THRESHOLDS,
        coreWebVitals: CORE_WEB_VITALS_THRESHOLDS
      },
      compliance: {
        lighthouse: Object.entries(scores).every(([cat, score]) => score >= PERFORMANCE_THRESHOLDS[cat]),
        coreWebVitals: Object.entries(coreWebVitals).every(([metric, value]) => {
          const threshold = CORE_WEB_VITALS_THRESHOLDS[metric]
          return metric === 'cls' ? value <= threshold : value <= threshold
        })
      }
    }
    
    // Save detailed report
    const reportPath = path.join(__dirname, '../performance/performance-report.json')
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
    
    // Create markdown summary
    const markdownSummary = generateMarkdownSummary(report)
    const summaryPath = path.join(__dirname, '../performance/performance-summary.md')
    fs.writeFileSync(summaryPath, markdownSummary)
    
    console.log('\n📄 Reports saved:')
    console.log(`   • ${reportPath}`)
    console.log(`   • ${summaryPath}`)
    
    // Final verdict
    const overallPass = report.compliance.lighthouse && report.compliance.coreWebVitals
    console.log(`\n${overallPass ? '🎉' : '⚠️'} Overall Performance: ${overallPass ? 'PASSED' : 'NEEDS IMPROVEMENT'}`)
    
    return report
    
  } catch (error) {
    console.error('❌ Performance audit failed:', error.message)
    throw error
  } finally {
    await chrome.kill()
  }
}

function generateMarkdownSummary(report) {
  const { scores, coreWebVitals, compliance, timestamp } = report
  
  return `# Gabriel Clinic Performance Certification

**Audit Date:** ${new Date(timestamp).toLocaleDateString()}  
**URL:** ${report.url}  
**Status:** ${compliance.lighthouse && compliance.coreWebVitals ? '✅ CERTIFIED' : '⚠️ NEEDS IMPROVEMENT'}

## Lighthouse Scores

| Category | Score | Status |
|----------|-------|--------|
| Performance | ${scores.performance}/100 | ${scores.performance >= PERFORMANCE_THRESHOLDS.performance ? '✅' : '⚠️'} |
| Accessibility | ${scores.accessibility}/100 | ${scores.accessibility >= PERFORMANCE_THRESHOLDS.accessibility ? '✅' : '⚠️'} |
| Best Practices | ${scores.bestPractices}/100 | ${scores.bestPractices >= PERFORMANCE_THRESHOLDS.bestPractices ? '✅' : '⚠️'} |
| SEO | ${scores.seo}/100 | ${scores.seo >= PERFORMANCE_THRESHOLDS.seo ? '✅' : '⚠️'} |

## Core Web Vitals

| Metric | Value | Threshold | Status |
|--------|-------|-----------|--------|
| First Contentful Paint | ${Math.round(coreWebVitals.fcp)}ms | ${CORE_WEB_VITALS_THRESHOLDS.fcp}ms | ${coreWebVitals.fcp <= CORE_WEB_VITALS_THRESHOLDS.fcp ? '✅' : '⚠️'} |
| Largest Contentful Paint | ${Math.round(coreWebVitals.lcp)}ms | ${CORE_WEB_VITALS_THRESHOLDS.lcp}ms | ${coreWebVitals.lcp <= CORE_WEB_VITALS_THRESHOLDS.lcp ? '✅' : '⚠️'} |
| Cumulative Layout Shift | ${coreWebVitals.cls} | ${CORE_WEB_VITALS_THRESHOLDS.cls} | ${coreWebVitals.cls <= CORE_WEB_VITALS_THRESHOLDS.cls ? '✅' : '⚠️'} |
| First Input Delay | ${Math.round(coreWebVitals.fid)}ms | ${CORE_WEB_VITALS_THRESHOLDS.fid}ms | ${coreWebVitals.fid <= CORE_WEB_VITALS_THRESHOLDS.fid ? '✅' : '⚠️'} |

## Certification Status

${compliance.lighthouse && compliance.coreWebVitals 
  ? '🎉 **CERTIFIED** - Gabriel Clinic meets all performance and accessibility standards for production deployment.'
  : '⚠️ **IMPROVEMENT NEEDED** - Performance benchmarks not fully met. See detailed report for recommendations.'}

---

*Generated by Gabriel Clinic Performance Benchmarking Suite*
`
}

// Run audit if called directly
if (require.main === module) {
  runLighthouseAudit().catch(console.error)
}

module.exports = { runLighthouseAudit, PERFORMANCE_THRESHOLDS, CORE_WEB_VITALS_THRESHOLDS }