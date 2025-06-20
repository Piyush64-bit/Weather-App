import { chromium } from 'playwright';
import fs from 'fs/promises';

const APP_URL = 'http://localhost:5179'; // Adjusted port
const LOTTIE_ANIMATION_PATH = 'src/components/WeatherAnimation.tsx';
const LOTTIE_UTILS_PATH = 'src/utils/lottieAnimations.ts';

async function runTests() {
  let browser;
  let originalLottieAnimationContent = null;
  let originalLottieUtilsContent = null;
  let modifiedLottieUtilsContent = null; // Ensure it's declared here for finally block access

  try {
    browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    page.on('console', msg => {
      console.log(`BROWSER CONSOLE: ${msg.type().toUpperCase()} ${msg.text()}`);
    });
    page.on('pageerror', error => {
      console.log(`BROWSER PAGE ERROR: ${error.message}`);
    });

    // Store original content before modification
    originalLottieAnimationContent = await fs.readFile(LOTTIE_ANIMATION_PATH, 'utf-8');
    originalLottieUtilsContent = await fs.readFile(LOTTIE_UTILS_PATH, 'utf-8');

    // Modify WeatherAnimation.tsx to use a placeholder
    const placeholderContent = `
import React from 'react';
import { motion } from 'framer-motion';

interface WeatherAnimationProps {
  weatherMain: string;
  timeOfDay: 'day' | 'night';
  className?: string;
}

export const WeatherAnimation: React.FC<WeatherAnimationProps> = ({
  weatherMain, // Keep for prop consistency, though not used directly in this simplified version
  timeOfDay,   // Keep for prop consistency
  className = "w-48 h-48"
}) => {
  return (
    <motion.div
      data-testid="weather-animation-placeholder" // Using this as a consistent identifier
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={\`flex items-center justify-center \${className} bg-gray-200\`}
    >
      <div>Animation Placeholder Content</div> {/* Changed text to be more specific */}
    </motion.div>
  );
};
`;
    await fs.writeFile(LOTTIE_ANIMATION_PATH, placeholderContent);
    console.log('Modified WeatherAnimation.tsx to use placeholder.');


    console.log('--- Test 1: Initial Load (London) ---');
    await page.goto(APP_URL, { waitUntil: 'networkidle', timeout: 30000 });

    await page.waitForSelector('[data-testid="weather-animation-placeholder"]', { timeout: 10000 });
    console.log('Weather animation placeholder found.');

    // Then, wait for the main weather card to be fully visible by checking for the city name
    await page.waitForSelector('h1:has-text("London")', { timeout: 10000 });
    console.log('Initial load complete with city name London.');

    console.log('--- Test 2: Search for New York ---');
    await page.fill('input[type="text"]', 'New York');
    await page.click('button[type="submit"]');
    // Wait for search results (e.g., weather card updates)
    // The selector now also checks for the placeholder to ensure the card updated
    await page.waitForSelector('.weather-card:has-text("New York") [data-testid="weather-animation-placeholder"]', { timeout: 15000 });
    console.log('City search for "New York" complete.');

    // Simulate clicking "Use Current Location"
    const locationButtonSelector = 'form button[type="button"]:has(svg)';
    await page.waitForSelector(locationButtonSelector, { state: 'visible', timeout: 10000 });
    console.log('Location button found.');

    await page.click(locationButtonSelector);
    await page.waitForTimeout(5000); // Additional wait for any async updates
    console.log('Location search attempt complete.');

    console.log('--- Test 3: Restore original WeatherAnimation.tsx and test error handling ---');
    // Restore original content for WeatherAnimation.tsx
    await fs.writeFile(LOTTIE_ANIMATION_PATH, originalLottieAnimationContent);
    console.log('Restored original WeatherAnimation.tsx for error handling test.');

    // Now, modify lottieAnimations.ts to simulate a fetch error
    modifiedLottieUtilsContent = originalLottieUtilsContent.replace(
      "'https://assets3.lottiefiles.com/packages/lf20_puciaact.json'", // Target the Clear Day animation
      "'https://example.com/nonexistent.json'" // Replace with a bad URL
    );
    await fs.writeFile(LOTTIE_UTILS_PATH, modifiedLottieUtilsContent);
    console.log('Modified lottieAnimations.tsx to simulate fetch error for Clear Day.');

    await page.goto(APP_URL, { waitUntil: 'networkidle', timeout: 30000 }); // Reload to trigger London (which might be Clear)
    await page.waitForSelector('h1:has-text("London")', { timeout: 15000 });
    console.log('Reloaded London weather card for error test.');

    await page.waitForSelector('text="Weather animation could not be loaded."', { timeout: 15000 });
    console.log('User-friendly animation error message displayed correctly.');

    await page.waitForSelector('h1:has-text("London")', { timeout: 5000 }); // Check if city name is still there
    console.log('Weather data (city name) is still visible with error message.');

    console.log('All tests passed!');

  } catch (error) {
    console.error(`Playwright script error: ${error.message}`);
    throw error;
  } finally {
    // Ensure original files are restored even if an error occurs
    if (originalLottieAnimationContent) {
        try {
            await fs.writeFile(LOTTIE_ANIMATION_PATH, originalLottieAnimationContent);
            console.log('Restored original WeatherAnimation.tsx successfully in finally block.');
        } catch (restoreError) {
            console.error('Error restoring WeatherAnimation.tsx in finally block:', restoreError);
        }
    }
    // Only attempt to restore lottieAnimations.ts if it was actually modified and originalLottieUtilsContent is not null
    if (originalLottieUtilsContent && modifiedLottieUtilsContent && originalLottieUtilsContent !== modifiedLottieUtilsContent) {
        try {
            await fs.writeFile(LOTTIE_UTILS_PATH, originalLottieUtilsContent);
            console.log('Restored original lottieAnimations.ts successfully in finally block.');
        } catch (restoreError) {
            console.error('Error restoring lottieAnimations.ts in finally block:', restoreError);
        }
    }
    if (browser) {
      await browser.close();
    }
  }
}

runTests();
