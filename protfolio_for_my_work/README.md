
A streamlined portfolio website built to showcase educational resources for BTEC students and professional ATS resume design services.
The platform features an optimized UI designed to capture client requests efficiently, highlight academic materials,
and bridge the gap between academic success and career readiness.


<img width="1888" height="781" alt="image" src="https://github.com/user-attachments/assets/ac1c0a47-f6ac-433d-8fb5-112ea65a9c5c" />

<img width="1876" height="813" alt="image" src="https://github.com/user-attachments/assets/38ec320d-38a6-4a13-95e4-f34ba9b3d460" />


<img width="1886" height="798" alt="image" src="https://github.com/user-attachments/assets/b977442d-c30d-41e3-a22d-793ffa486e67" />

## Service request form

The services page sends requests through Formspree; no backend is required. Create a form at [formspree.io](https://formspree.io/), verify the email where you want to receive submissions, and replace `YOUR_FORM_ID` in the form's `action` in `services.html` with the ID from your Formspree endpoint. If you publish the nested `protfolio_for_my_work` copy, update its `services.html` too. Form submissions include the customer's name, phone number, selected package, and optional message.

## Security notes

The pages use a Content Security Policy that blocks inline scripts and limits scripts, styles, form submissions, and network requests to the site and required providers. Keep external resources on HTTPS and review this policy if adding another provider. Enable **Enforce HTTPS** in the GitHub Pages repository settings. GitHub Pages does not let this repository configure response headers or application-level DDoS rate limits; large-scale traffic protection must come from the hosting/CDN provider. This static site has no SQL database, so SQL injection is not applicable.
