# Portfolio Website — GitHub Pages Deployment with Custom Domain

This repository contains my personal portfolio website, built using HTML, CSS, and JavaScript.

The website is hosted using **GitHub Pages**, while my custom domain is managed through **Cloudflare DNS**.

**Live Website:** https://sabyasachisaha.in  
**GitHub Repository:** https://github.com/Sab-429/My-portfolio

---

## 1. Deployment Architecture

The deployment uses GitHub Pages for static website hosting and Cloudflare for DNS management.

```text
                  USER / BROWSER
                        |
                        |
                sabyasachisaha.in
                        |
                        v
                 CLOUDFLARE DNS
                 (DNS Resolution)
                        |
                        |
              GitHub Pages IP Addresses
                        |
                        v
                 GITHUB PAGES
                        |
                        v
              Sab-429/My-portfolio
                   (main branch)
                        |
                        v
                index.html
                        |
             +----------+----------+
             |          |          |
             v          v          v
           HTML        CSS       JavaScript
             |          |          |
             +----------+----------+
                        |
                        v
                 PORTFOLIO WEBSITE
```

### Components

| Component | Responsibility |
|---|---|
| GitHub Repository | Stores website source code |
| GitHub Pages | Hosts and publishes static files |
| Cloudflare DNS | Maps the custom domain to GitHub Pages |
| Custom Domain | Provides a professional website URL |
| HTTPS | Encrypts communication between browser and website |

**Important:** Cloudflare is used for DNS management in this setup. The website itself is hosted by GitHub Pages, not Cloudflare Pages.

---

## 2. Technology Stack

- HTML5
- CSS3
- JavaScript
- Git and GitHub
- GitHub Pages
- Cloudflare DNS
- HTTPS

---

## 3. Repository Structure

The repository uses GitHub Pages branch-based deployment.

```text
My-portfolio/
│
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
│
├── CNAME
├── index.html
├── README.md
└── .gitignore
```

The important files are:

- `index.html`: Entry point of the static website.
- `assets/`: Contains CSS, JavaScript, images, and other static resources.
- `CNAME`: Connects the GitHub Pages deployment with the custom domain.
- `README.md`: Documents the project and deployment process.

---

## 4. Step 1 — Push the Website to GitHub

First, create a GitHub repository and push the website source code.

Repository:

`https://github.com/Sab-429/My-portfolio`

Example commands:

```bash
git init
git add .
git commit -m "Initial portfolio website"
git branch -M main
git remote add origin https://github.com/Sab-429/My-portfolio.git
git push -u origin main
```

The website source code is now available in GitHub.

---

## 5. Step 2 — Configure GitHub Pages

GitHub Pages publishes the static website directly from the repository.

Follow these steps:

1. Open the GitHub repository.
2. Navigate to **Settings**.
3. Select **Pages** from the sidebar.
4. Under **Build and deployment**, select:
   - Source: Deploy from a branch
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**.

GitHub Pages will automatically deploy the website from the root of the `main` branch.

The default project website URL is:

`https://sab-429.github.io/My-portfolio/`

---

## 6. Step 3 — Configure the Custom Domain

Instead of using the default GitHub Pages URL, I configured my own domain:

`https://sabyasachisaha.in`

Steps:

1. Open the repository's **Settings → Pages**.
2. Find the **Custom domain** section.
3. Enter:

```text
sabyasachisaha.in
```

4. Click **Save**.
5. GitHub Pages creates or updates a `CNAME` file in the repository.

The `CNAME` file should contain exactly:

```text
sabyasachisaha.in
```

Do not include `https://`, `http://`, or a trailing path.

---

## 7. Step 4 — Configure Cloudflare DNS

Cloudflare manages the DNS records for my domain.

Dashboard:

`https://dash.cloudflare.com/`

Steps:

1. Log in to Cloudflare.
2. Select the domain `sabyasachisaha.in`.
3. Open **DNS → Records**.
4. Add the following DNS records.

### A Records — Root Domain

These records point the root domain to GitHub Pages.

| Type | Name | IPv4 Address |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

### CNAME Record — WWW Subdomain

This record points the `www` subdomain to the GitHub Pages account domain.

| Type | Name | Target |
|---|---|---|
| CNAME | www | sab-429.github.io |

**DNS configuration recommendation:** Use **DNS only** (grey cloud) while configuring and verifying GitHub Pages. This allows the domain to resolve directly to GitHub Pages without Cloudflare proxying the traffic.

### Important DNS precautions

- Do not delete unrelated MX records used for email.
- Do not delete SPF, DKIM, or DMARC TXT records.
- Avoid duplicate or conflicting A, AAAA, and CNAME records.
- Do not create wildcard DNS records unnecessarily.
- If a Worker or another service already owns the hostname, remove or change that hostname association before creating a conflicting DNS record.

---

## 8. Step 5 — Verify DNS Configuration

After creating the DNS records, verify that they resolve correctly.

On Windows PowerShell:

```powershell
Resolve-DnsName sabyasachisaha.in -Type A
```

Check the `www` subdomain:

```powershell
Resolve-DnsName www.sabyasachisaha.in -Type CNAME
```

The root domain should resolve to GitHub Pages IP addresses, and `www` should resolve to `sab-429.github.io`.

DNS changes can take time to propagate.

---

## 9. Step 6 — Enable HTTPS

HTTPS encrypts communication between the browser and the website.

To enable it:

1. Open GitHub repository.
2. Navigate to **Settings → Pages**.
3. Confirm that the custom domain is configured.
4. Wait for GitHub to provision the TLS certificate.
5. Once available, enable **Enforce HTTPS**.

After configuration, the website should be accessible through:

`https://sabyasachisaha.in`

HTTPS ensures that website traffic is encrypted using TLS.

---

## 10. Step 7 — Automatic Deployment Workflow

One of the main advantages of GitHub Pages is automatic deployment.

Whenever I update the website and push changes to the `main` branch, GitHub Pages automatically starts a new deployment.

Practical workflow:

```text
        LOCAL DEVELOPMENT
                |
                v
          Modify HTML/CSS/JS
                |
                v
             git add .
                |
                v
          git commit -m
                |
                v
           git push origin main
                |
                v
          GITHUB REPOSITORY
                |
                v
          GITHUB PAGES
          DEPLOYMENT PROCESS
                |
                v
          PUBLISH STATIC FILES
                |
                v
          LIVE WEBSITE UPDATED
```

Example:

```bash
git add .
git commit -m "Update portfolio design"
git push origin main
```

GitHub Pages detects the new commit and publishes the updated website.

No manual server deployment or VPS configuration is required.

---

## 11. Monitoring Deployment Status

To check whether a deployment succeeded:

1. Open the GitHub repository.
2. Navigate to the **Actions** tab.
3. Open the latest `pages-build-deployment` workflow run.
4. Inspect the build and deployment job statuses.

Typical outcomes:

- Green check: Deployment completed successfully.
- Red cross: Deployment failed.
- Running: Deployment is still processing.

If deployment fails, inspect the workflow logs to identify whether the issue occurred during the build or publishing stage.

A deployment timeout at `updating_pages` may indicate a GitHub Pages publishing-side problem. It does not necessarily mean the HTML, CSS, or JavaScript is incorrect.

---

## 12. Common Troubleshooting

| Problem | Possible solution |
|---|---|
| GitHub Pages 404 | Verify `index.html` exists in the configured publishing directory |
| Custom domain not resolving | Verify Cloudflare A and CNAME records |
| DNS check failed | Check for conflicting DNS records and wait for propagation |
| HTTPS unavailable | Wait for certificate provisioning and verify DNS |
| Old website still appearing | Check DNS records, browser cache, and any old Worker hostname association |
| Deployment timeout | Inspect the Actions workflow logs and retry after checking GitHub Pages status |
| CNAME error | Ensure the `CNAME` file contains the correct domain |

---

## 13. Final Deployment Configuration

| Configuration | Value |
|---|---|
| Repository | `Sab-429/My-portfolio` |
| Deployment platform | GitHub Pages |
| Publishing branch | `main` |
| Publishing directory | `/ (root)` |
| Custom domain | `sabyasachisaha.in` |
| DNS provider | Cloudflare |
| Root DNS | Four GitHub Pages A records |
| WWW DNS | CNAME → `sab-429.github.io` |
| HTTPS | GitHub Pages TLS certificate |
| Deployment method | Automatic branch-based deployment |

---

## 14. Useful Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Pages Custom Domain Configuration](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [GitHub Pages Publishing Sources](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Cloudflare DNS Documentation](https://developers.cloudflare.com/dns/)

---
