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
npm WARN deprecated puppeteer@10.4.0: < 22.8.2 is no longer supported
npm WARN deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
npm WARN deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm WARN deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.

> puppeteer@10.4.0 install /chroot/home/nexcess.net/msallam/delister/node_modules/puppeteer
> node install.js

Downloading Chromium r901912 - 140.9 Mb [====================] 99% 0.0s
Chromium (901912) downloaded to /chroot/home/nexcess.net/msallam/delister/node_modules/puppeteer/.local-chromium/linux-901912
npm WARN saveError ENOENT: no such file or directory, open '/chroot/home/nexcess.net/msallam/delister/package.json'
npm WARN enoent ENOENT: no such file or directory, open '/chroot/home/nexcess.net/msallam/delister/package.json'
npm WARN delister No description
npm WARN delister No repository field.
npm WARN delister No README data
npm WARN delister No license field.

+ puppeteer@10.4.0
added 133 packages from 87 contributors and audited 58 packages in 13.971s

71 packages are looking for funding
  run `npm fund` for details

found 2 high severity vulnerabilities
  run `npm audit fix` to fix them, or `npm audit` for details
Using Public IP: 173.249.144.20
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
