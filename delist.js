const puppeteer = require('puppeteer');
const readline = require('readline');

// Get the public IP from command-line arguments
const publicIP = process.argv[2];

if (!publicIP) {
    console.error('Error: No public IP provided.');
    process.exit(1);
}

// Function to prompt for manual CAPTCHA input
const promptForCaptcha = (captchaUrl) => {
    console.log(`CAPTCHA Image URL: ${captchaUrl}`);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise((resolve) => {
        rl.question('Enter the CAPTCHA text: ', (answer) => {
            rl.close();
            resolve(answer.trim());
        });
    });
};

(async () => {
    console.log('Using Public IP:', publicIP);

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.goto('https://www.projecthoneypot.org/white_list.php');

    // Fill out the form
    await page.type('#wl_ip', publicIP);
    await page.type('#wl_email', 'msallam@nexcess.net');
    await page.select('#wl_reason', 'Hit by a virus or trojan');
    await page.type('#wl_note', 'Automated submission for delisting.');

    let captchaSolved = false;
    const MAX_RETRIES = 3;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        console.log(`Attempt ${attempt}/${MAX_RETRIES} to solve CAPTCHA.`);

        // Extract the CAPTCHA image URL
        const captchaUrl = await page.$eval('.captchapict', (img) => img.src);
        const captchaText = await promptForCaptcha(captchaUrl); // Ask for CAPTCHA input

        // Enter the CAPTCHA text
        await page.type('input[name="private_key"]', captchaText);

        // Submit the form
        await page.click('#submit_form');

        try {
            // Wait for navigation or confirmation of successful submission
            await page.waitForNavigation({ timeout: 5000 });
            console.log('Form submitted successfully!');
            captchaSolved = true;
            break;
        } catch (error) {
            console.log('CAPTCHA incorrect or submission failed. Retrying...');
        }
    }

    if (!captchaSolved) {
        console.error('Failed to solve CAPTCHA after maximum attempts.');
    }

    await browser.close();
})();

