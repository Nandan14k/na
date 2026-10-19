# Namma Seva website — first version

## Files
- `index.html`: bilingual landing page, services, order form, terms and FAQs
- `styles.css`: responsive design for mobile and desktop
- `script.js`: Kannada/English toggle and WhatsApp order-message generation

## Before publishing: configure WhatsApp
The form is currently configured for the Namma Seva number previously provided: `919742579783` (India country code + 9742579783). Please verify this is still the correct WhatsApp Business number before publishing. If it changes, edit `WHATSAPP_NUMBER` in `script.js` using digits only, with no `+`, spaces or hyphens.

## Test locally
Open `index.html` in a modern browser. The WhatsApp form will not submit until the number is configured in `script.js`.

## Free hosting with GitHub Pages
1. Sign in to GitHub and create a new **public** repository named `namma-seva-website`.
2. Upload `index.html`, `styles.css`, `script.js`, and this README at the repository root.
3. Open repository **Settings → Pages**.
4. Under build/deployment, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
5. Wait for GitHub Pages to publish the site. Its URL will look like `https://YOUR-USERNAME.github.io/namma-seva-website/`.
6. Open that URL on your phone, test the language toggle, all navigation links, and the WhatsApp order form.

## Business checks before launch
- Confirm delivery coverage and the ₹19 charge.
- Confirm order hours (6 AM–10 PM).
- Keep order availability and delivery estimates subject to confirmation.
- Confirm payment wording with customers before purchase.
- Pharmacy fulfilment must follow applicable law, prescription requirements and licensed-pharmacy rules.
- Do not publish private customer information or collect more information than needed.
