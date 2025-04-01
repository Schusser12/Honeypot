const puppeteer = require('puppeteer');
const readline = require('readline');

(async () => {
    const MAX_RETRIES = 3; // Maximum attempts for CAPTCHA
    let captchaSolved = false;

    // Function to get user input for CAPTCHA
    const promptForCaptcha = (url) => {
        console.log(`CAPTCHA image URL: ${url}`);
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        return new Promise((resolve) => {
            rl.question('Enter CAPTCHA text: ', (answer) => {
                rl.close();
                resolve(answer.trim());
            });
        });
    };

    // Launch the browser in headless mode
    const browser = await puppeteer.launch({
        headless: true, // Run headless
        args: ['--no-sandbox', '--disable-setuid-sandbox'], // Ensure compatibility
    });

    const page = await browser.newPage();

    // Set cookies (if needed for session persistence)
    const cookies = [{ name: 'example_cookie', value: 'example_value', domain: 'www.projecthoneypot.org' }];
    await page.setCookie(...cookies);

    // Navigate to the form page
    await page.goto('https://www.projecthoneypot.org/white_list.php');

    // Fill out the form fields
    await page.type('#wl_ip', '173.249.147.143');
    await page.type('#wl_email', 'msallam@nexcess.net');
    await page.select('#wl_reason', 'Hit by a virus or trojan');
    await page.type('#wl_note', 'SPAM issue resolved.');

    // Attempt to solve CAPTCHA up to MAX_RETRIES
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        console.log(`Attempt ${attempt}/${MAX_RETRIES} for CAPTCHA`);

        // Retrieve CAPTCHA image URL
        const captchaUrl = await page.$eval('.captchapict', (img) => img.src);

        // Prompt user for CAPTCHA text
        const captchaText = await promptForCaptcha(captchaUrl);

        // Enter the CAPTCHA text
        await page.type('input[name="private_key"]', captchaText);

        // Submit the form
        await page.click('#submit_form');

        // Wait for navigation or an error message
        try {
            await page.waitForNavigation({ timeout: 5000 });
            console.log('Form submitted successfully!');
            captchaSolved = true;
            break;
        } catch (e) {
            console.log('CAPTCHA incorrect or form submission failed. Retrying...');
        }
    }

    if (!captchaSolved) {
        console.log('Failed to solve CAPTCHA after maximum attempts.');
    }

    // Close the browser
    await browser.close();
})();
