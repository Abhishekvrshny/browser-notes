# GitHub Pages Setup Instructions

This repository is now configured for automatic deployment to GitHub Pages using GitHub Actions. Follow these steps to complete the setup:

## 1. Enable GitHub Pages in Repository Settings

1. Go to your GitHub repository: `https://github.com/Abhishekvrshny/browser-notes`
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. Save the settings

## 2. Verify Deployment

After enabling GitHub Pages:

1. Go to the **Actions** tab in your repository
2. You should see the "Deploy to GitHub Pages" workflow running
3. Once it completes successfully (green checkmark), your site will be available at:
   - **Custom Domain**: https://notes.varlog.co.in (as configured in CNAME file)
   - **GitHub Pages URL**: https://abhishekvrshny.github.io/browser-notes

## 3. Custom Domain Configuration

Your repository already includes a `CNAME` file configured for `notes.varlog.co.in`. To use this custom domain:

1. In your domain registrar (where you manage `varlog.co.in`), add a CNAME record:
   - **Name**: `notes`
   - **Value**: `abhishekvrshny.github.io`
   - **TTL**: 3600 (or your preferred value)

2. In GitHub repository settings under **Pages**:
   - The custom domain should automatically be detected from the CNAME file
   - Ensure "Enforce HTTPS" is checked

## 4. Automatic Deployment

The workflow is configured to automatically deploy when:
- Code is pushed to the `main` branch
- Pull requests are made to the `main` branch (for testing)

## 5. Build Process

The deployment workflow:
1. Installs Node.js dependencies
2. Runs `npm run build` to transpile JSX files
3. Deploys the built site to GitHub Pages

## 6. Development Workflow

For local development:
```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start development server with auto-rebuild
npm run dev

# Serve locally
npm run serve
```

## Troubleshooting

- **Workflow fails**: Check the Actions tab for error details
- **Site not updating**: Ensure the workflow completed successfully
- **Custom domain not working**: Verify DNS settings and wait for propagation (up to 24 hours)
- **Build errors**: Check that all JSX files are valid and dependencies are correctly installed

## Files Added for GitHub Pages

- `.github/workflows/deploy.yml` - GitHub Actions workflow for deployment
- Updated `.gitignore` - Now includes compiled JS files in the repository
- `js/*.compiled.js` - Pre-built JavaScript files for deployment

Your site should be live at https://notes.varlog.co.in once you complete the GitHub Pages setup!
