# delister
This JavaScript program automates IP delisting requests on Project Honey Pot using Puppeteer. It dynamically retrieves the public IP, fills out the form fields, handles CAPTCHA input by prompting the user, and retries up to 3 times if needed. It runs in headless mode, ensuring efficient automation while providing clear logs for success or failure.

Designed for CentOS Linux release 7.9.2009 (Core)

# Instructions
- me into the server
```bash
┌──(msallam🦄mellon-login01)-[~]
└─$ me cloudhost-143970.us-west-1.nxcli.net
Warning: Permanently added 'cloudhost-143970.us-west-1.nxcli.net,173.249.144.20' (ECDSA) to the list of known hosts.
```

- clone the delister repository
```bash
┌──(msallam🦄cloudhost-143970)-[~]
└─$ git clone https://github.com/maximus-sallam/delister.git
```

- move into the delister directory
```bash
┌──(msallam🦄cloudhost-143970)-[~]
└─$ cd delister/
```

- run the delister bash script
```bash
┌──(msallam🦄cloudhost-143970)-[~/delister]
└─$ sh delist.sh
Puppeteer is not installed. Installing Puppeteer...
Using Public IP: 173.249.144.20
```
- open the image in a browser and enter the captcha code in the prompt
```bash
Attempt 1/3 to solve CAPTCHA.
CAPTCHA Image URL: https://www.projecthoneypot.org/captchas/hn_captcha_3485447e.jpg
Enter the CAPTCHA text: bd454d8e
CAPTCHA incorrect or submission failed. Retrying...
Attempt 2/3 to solve CAPTCHA.
CAPTCHA Image URL: https://www.projecthoneypot.org/captchas/hn_captcha_aa90399d.jpg
Enter the CAPTCHA text: 20699a72
CAPTCHA incorrect or submission failed. Retrying...
Attempt 3/3 to solve CAPTCHA.
CAPTCHA Image URL: https://www.projecthoneypot.org/captchas/hn_captcha_b71314a0.jpg
Enter the CAPTCHA text: 817f9c7d
CAPTCHA incorrect or submission failed. Retrying...
Failed to solve CAPTCHA after maximum attempts.
```
- choose no (don't clean up) if it fails
```bash
Do you want to clean up the delister directory (rm -rf ~/delister*)? [y/N]: n
Skipping cleanup.
```

- then, try again
```bash
┌──(msallam🦄cloudhost-143970)-[~/delister]
└─$ sh delist.sh
Puppeteer is already installed.
Using Public IP: 173.249.144.20
Attempt 1/3 to solve CAPTCHA.
CAPTCHA Image URL: https://www.projecthoneypot.org/captchas/hn_captcha_5f0ae3a6.jpg
Enter the CAPTCHA text: bd454d8e
Form submitted successfully!
```
- choose yes (clean up) if it succeeds
```bash
Do you want to clean up the delister directory (rm -rf ~/delister*)? [y/N]: y
Performing cleanup...
```
