# Visual Regression Testing Guide

## Overview

This testing framework uses **Playwright 1.52** with:
1. **Structural locators** - Role/text-based selectors (NOT class/ID-based)
2. **Flexible visual regression** - Tolerates size variations while catching design errors
3. **Layout validation** - Position, alignment, and dimension checks

---

## Key Improvements Over Traditional Approach

### 1. Robust Element Selection

**❌ Old Way (Brittle):**
```javascript
page.locator('.notification-title')      // Breaks if class changes
page.locator('#notification-panel')      // Breaks if ID changes
page.locator('.notification-items ul li') // Breaks with nested elements
```

**✅ New Way (Robust):**
```javascript
page.getByText(/your notifications/i)    // Based on stable content
page.getByRole('list')                   // Based on semantic HTML
page.getByRole('listitem')               // Works with any DOM structure
page.getByRole('button', { name: /close/i })  // Based on accessibility
```

### 2. Size-Tolerant Visual Regression

**❌ Old Settings (Too Strict OR Too Loose):**
```javascript
threshold: 0.5,           // 50% color tolerance - too loose, misses design errors
maxDiffPixelRatio: 0.5    // 50% pixel difference - too loose
```

**✅ New Settings (Balanced):**
```javascript
threshold: 0.3,           // 30% - catches wrong colors, tolerates rendering
maxDiffPixelRatio: 0.2    // 20% - allows size changes, catches layout errors
```

**What This Catches:**
- ✅ Wrong colors (red → orange, blue → green)
- ✅ Wrong fonts, sizes, spacing
- ✅ Missing elements
- ✅ Layout problems

**What This Tolerates:**
- ✅ Panel width variations (20-40% of viewport)
- ✅ Panel height variations (based on content)
- ✅ Font anti-aliasing differences
- ✅ Minor rendering differences

### 3. Structural Validation

**New: Separate Structure from Appearance**

```javascript
// Step 1: Validate structure (dimensions, layout)
await locators.validatePanelDimensions({
  minWidthPercent: 20,
  maxWidthPercent: 40,
  minHeight: 50,
  maxHeight: 150
});

// Step 2: Validate visual appearance
await expect(panel).toHaveScreenshot('reference.png', visualOptions);
```

---

## Project Structure

```
dashboard/
├── e2e-tests/
│   ├── helpers/
│   │   ├── structural-locators.js       # Robust element selectors
│   │   ├── visual-regression-config.js  # Visual comparison settings
│   │   └── test-helpers.js              # Reusable test utilities
│   ├── notifications-seq1.spec.js       # Populated state tests
│   └── notifications-seq2.spec.js       # Empty state tests
├── _reference_images_/                  # Your manual reference screenshots
│   ├── notification-panel.png
│   ├── no-notifications.png
│   └── notification-title.png
├── createReference.js                   # Script to prepare references
└── playwright.config.js                 # Playwright configuration
```

---

## Usage Guide

### Running Tests

```bash
# Run all visual regression tests
npx playwright test e2e-tests/

# Run specific test file
npx playwright test e2e-tests/notifications-seq2.spec.js

# Run in headed mode (see browser)
npx playwright test --headed

# Debug mode
npx playwright test --debug

# Update snapshots (CAREFUL! Only when you want to update references)
npx playwright test --update-snapshots
```

### Creating Reference Images

1. **Create your reference screenshots** manually and save to `_reference_images_/`
2. **Run the reference script**:
   ```bash
   node createReference.js
   ```
3. **This copies references** to the correct snapshot directories for each browser/OS

### Understanding Test Results

**When a test fails:**

```
Error: Screenshot comparison failed:
  - Expected: notification-panel-chromium-linux.png
  - Actual: notification-panel-actual.png
  - Diff: notification-panel-diff.png

  4532 pixels (ratio 0.24 of all image pixels) are different
```

**What to check:**

1. **Look at the diff image** in `test-results/` folder
   - Pink pixels = differences
   - If mostly pink around edges = size difference (might be OK)
   - If pink in content area = design problem (needs fixing)

2. **Check structural validation errors**:
   ```
   Panel width 520px outside range [256, 512]px
   ```
   - This means the panel is too wide (design problem)

3. **Check if it's a legitimate failure**:
   - Wrong colors? → Fix the code
   - Wrong layout? → Fix the code
   - Just wider panel with same design? → Might be acceptable
   - Different font? → Check if it's a mistake

---

## Helper Files Documentation

### structural-locators.js

**Purpose:** Provides robust element selectors

**Key Methods:**

```javascript
import { createNotificationLocators } from './helpers/structural-locators.js';

const locators = createNotificationLocators(page);

// Get elements (flexible, structure-independent)
locators.getTitle()                  // Title by text
locators.getPanel()                  // Panel container (any element type)
locators.getEmptyStateMessage()      // Empty state text
locators.getNotificationList()       // <ul> by role="list"
locators.getNotificationItems()      // <li> by role="listitem"
locators.getCloseButton()            // Button by role + name

// Validate structure
await locators.verifyTitleAbovePanel()
await locators.verifyRightAlignment()
await locators.verifyEmptyState()
await locators.verifyPopulatedState(3)  // Expects 3 items
await locators.validatePanelDimensions({
  minWidthPercent: 20,
  maxWidthPercent: 40,
  minHeight: 50,
  maxHeight: 150
});
```

### visual-regression-config.js

**Purpose:** Visual comparison settings

**Configurations:**

```javascript
import { NOTIFICATION_CONFIGS } from './helpers/visual-regression-config.js';

// For empty notification panel
NOTIFICATION_CONFIGS.emptyPanel.visual
// → threshold: 0.3, maxDiffPixelRatio: 0.2

// For populated notification panel
NOTIFICATION_CONFIGS.populatedPanel.visual
// → threshold: 0.3, maxDiffPixelRatio: 0.2

// For title element
NOTIFICATION_CONFIGS.title.visual
// → threshold: 0.3, maxDiffPixelRatio: 0.15
```

### test-helpers.js

**Purpose:** Common test utilities

**Key Functions:**

```javascript
import {
  setupViewport,
  waitForPageStable,
  validateTextContent,
  validateElementAbove,
  validateAlignment,
  validateViewportRegion
} from './helpers/test-helpers.js';

// Setup
await setupViewport(page, 1280, 720);
await waitForPageStable(page);

// Validations
await validateTextContent(element, 'expected text');
await validateElementAbove(topEl, bottomEl, 10);      // 10px tolerance
await validateAlignment(el1, el2, 'right', 20);       // Right-aligned
await validateViewportRegion(element, page, 'right'); // In right half
```

---

## Best Practices

### 1. Always Use Structural Locators

```javascript
// ❌ DON'T
page.locator('.notification-items')

// ✅ DO
const locators = createNotificationLocators(page);
const panel = locators.getPanel();
```

### 2. Combine Structural + Visual Validation

```javascript
// Step 1: Structure (dimensions, layout)
await locators.validatePanelDimensions({ ... });
await validateElementAbove(title, panel);

// Step 2: Visual (screenshot comparison)
await expect(panel).toHaveScreenshot('ref.png', config.visual);
```

### 3. Use Appropriate Tolerance

```javascript
// Small stable elements (title)
NOTIFICATION_CONFIGS.title.visual

// Dynamic size elements (panel)
NOTIFICATION_CONFIGS.populatedPanel.visual

// Custom tolerance
{
  threshold: 0.3,
  maxDiffPixelRatio: 0.2
}
```

### 4. Descriptive Test Names

```javascript
// ❌ DON'T
test('test 1', ...)

// ✅ DO
test('Notification panel visual appearance with size tolerance', ...)
```

### 5. Wait for Stability

```javascript
await waitForPageStable(page);  // Before screenshots
await element.waitFor({ state: 'visible', timeout: 5000 });
```

---

## Troubleshooting

### Issue: "Element not found"

**Cause:** Locator strategy not matching DOM structure

**Solution:**
- Check element exists: `await expect(element).toBeVisible()`
- Use browser DevTools to inspect actual HTML
- Try alternative locator: `getByText()`, `getByRole()`

### Issue: "Screenshot comparison failed" with high pixel difference

**Cause:** Significant visual differences

**Solution:**
1. Check diff image in `test-results/`
2. If design is wrong → fix code
3. If design is correct but different → check if reference needs updating
4. If only size differs → structural validation should pass

### Issue: "Could not get bounding box"

**Cause:** Element not visible or not rendered

**Solution:**
- Add wait: `await element.waitFor({ state: 'visible' })`
- Check display: `await expect(element).toBeVisible()`
- Verify element exists in DOM

### Issue: Tests pass locally but fail in CI

**Cause:** Font rendering, OS differences

**Solution:**
- Run tests in same environment
- Use Docker for consistency
- Increase tolerance slightly for CI: `threshold: 0.35`

---

## Migration from Old Tests

**Replace class-based selectors:**

```javascript
// Before
page.locator('.notification-title')
page.locator('.notification-items')
page.locator('.notification-items ul li')

// After
const locators = createNotificationLocators(page);
locators.getTitle()
locators.getPanel()
locators.getNotificationItems()
```

**Update visual options:**

```javascript
// Before
{ threshold: 0.5, maxDiffPixelRatio: 0.5 }

// After
NOTIFICATION_CONFIGS.emptyPanel.visual
// or
NOTIFICATION_CONFIGS.populatedPanel.visual
```

**Add structural validation:**

```javascript
// Before
await expect(panel).toHaveScreenshot('ref.png', options);

// After
await locators.validatePanelDimensions({ ... });
await expect(panel).toHaveScreenshot('ref.png', options);
```

---

## Configuration Reference

### Viewport Sizes

```javascript
setupViewport(page, 1280, 720)  // Default desktop
setupViewport(page, 375, 667)   // Mobile (iPhone SE)
setupViewport(page, 768, 1024)  // Tablet
```

### Tolerance Values

| Setting | Value | Meaning |
|---------|-------|---------|
| `threshold` | 0.3 | 30% per-pixel color tolerance |
| `maxDiffPixelRatio` | 0.2 | 20% of total pixels can differ |

### Dimension Ranges

| Element | Min Width % | Max Width % | Min Height | Max Height |
|---------|-------------|-------------|------------|------------|
| Empty Panel | 20% | 35% | 50px | 150px |
| Populated Panel | 20% | 40% | 150px | 500px |
| Title | 10% | 30% | 20px | 60px |

---

## Examples

### Complete Test Example

```javascript
import { test, expect } from '@playwright/test';
import { createNotificationLocators } from './helpers/structural-locators.js';
import { NOTIFICATION_CONFIGS } from './helpers/visual-regression-config.js';
import { setupViewport, waitForPageStable } from './helpers/test-helpers.js';

test('Notification panel with tolerance', async ({ page }) => {
  // 1. Setup
  await setupViewport(page);
  await page.goto('/');
  await waitForPageStable(page);

  // 2. Get elements
  const locators = createNotificationLocators(page);
  const panel = locators.getPanel();

  // 3. Structural validation
  await locators.validatePanelDimensions({
    minWidthPercent: 20,
    maxWidthPercent: 40,
    minHeight: 50,
    maxHeight: 150
  });

  // 4. Visual validation
  await expect(panel).toHaveScreenshot(
    'no-notifications.png',
    NOTIFICATION_CONFIGS.emptyPanel.visual
  );
});
```

---

## Questions?

For issues or questions:
1. Check test-results/ folder for diff images
2. Review this documentation
3. Check Playwright docs: https://playwright.dev
4. Review structural-locators.js for available methods
