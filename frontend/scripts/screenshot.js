const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");

async function takeScreenshot() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();

    // Set viewport to standard desktop size
    await page.setViewport({
      width: 1280,
      height: 720,
      deviceScaleFactor: 2, // For high quality screenshots
    });

    // Navigate to the demo page
    const url = process.env.DEMO_URL || "http://localhost:3000";
    console.log(`Navigating to ${url}...`);
    await page.goto(url, { waitUntil: "networkidle0" });

    // Wait for the widget to be visible
    await page.waitForSelector("#root", { visible: true });

    // Optional: Add some demo messages
    if (process.env.ADD_DEMO_MESSAGES === "true") {
      // Type a message
      await page.type('textarea[placeholder*="Type a message"]', "Hello! Can you help me with coding?");
      await page.keyboard.down("Control");
      await page.keyboard.press("d");
      await page.keyboard.up("Control");

      // Wait for response
      await page.waitForTimeout(2000);

      // Click an action button
      const buttons = await page.$$('button:not([type="submit"])');
      if (buttons.length > 0) {
        await buttons[0].click();
        await page.waitForTimeout(1500);
      }
    }

    // Create screenshots directory if it doesn't exist
    const screenshotsDir = path.join(__dirname, "../screenshots");
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }

    // Take full page screenshot
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fullPagePath = path.join(screenshotsDir, `widget-fullpage-${timestamp}.png`);
    await page.screenshot({
      path: fullPagePath,
      fullPage: true,
    });
    console.log(`Full page screenshot saved to: ${fullPagePath}`);

    // Take widget-only screenshot
    const widgetElement = await page.$("#root > div");
    if (widgetElement) {
      const widgetPath = path.join(screenshotsDir, `widget-only-${timestamp}.png`);
      await widgetElement.screenshot({
        path: widgetPath,
      });
      console.log(`Widget screenshot saved to: ${widgetPath}`);
    }

    // Take a screenshot with specific interactions if requested
    if (process.env.INTERACTIVE_SCREENSHOT === "true") {
      // Focus on textarea
      await page.focus('textarea[placeholder*="Type a message"]');
      
      // Take screenshot with focused input
      const focusedPath = path.join(screenshotsDir, `widget-focused-${timestamp}.png`);
      await widgetElement.screenshot({
        path: focusedPath,
      });
      console.log(`Focused widget screenshot saved to: ${focusedPath}`);
    }

    // Return the paths for programmatic use
    return {
      fullPage: fullPagePath,
      widget: widgetPath,
    };
  } catch (error) {
    console.error("Error taking screenshot:", error);
    throw error;
  } finally {
    await browser.close();
  }
}

// Run if called directly
if (require.main === module) {
  takeScreenshot()
    .then(() => {
      console.log("Screenshots captured successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Failed to capture screenshots:", error);
      process.exit(1);
    });
}

module.exports = { takeScreenshot };