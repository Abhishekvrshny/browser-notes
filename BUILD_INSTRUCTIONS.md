# Build Instructions for Jotdown

This document explains how to use the build utility to transpile JSX files and avoid CORS issues when running the application.

## Problem Solved

The original application used `type="text/babel"` script tags which caused CORS errors when opening the HTML file directly from the filesystem. This happened because Babel was using XMLHttpRequest behind the scenes to load and transpile JSX files.

## Solution

We've implemented a pre-compilation approach that transpiles JSX files to regular JavaScript before serving them.

## Setup

1. **Install dependencies** (one-time setup):
   ```bash
   npm install
   ```

## Available Commands

### `npm run build`
Transpiles all JSX files once:
```bash
npm run build
```

This will:
- Convert `js/components.js` → `js/components.compiled.js`
- Convert `js/app.js` → `js/app.compiled.js`
- Add header comments to compiled files with generation timestamp

### `npm run dev`
Runs the build in watch mode (automatically rebuilds when source files change):
```bash
npm run dev
```

This is useful during development - any changes to your JSX files will automatically trigger recompilation.

### `npm run serve`
Starts a local HTTP server and opens the application in your browser:
```bash
npm run serve
```

This serves the application at `http://localhost:8080` and automatically opens it in your default browser.

## Development Workflow

1. **Initial setup**:
   ```bash
   npm install
   npm run build
   ```

2. **During development**:
   ```bash
   # Terminal 1: Watch for changes and auto-rebuild
   npm run dev
   
   # Terminal 2: Serve the application
   npm run serve
   ```

3. **For production/sharing**:
   ```bash
   npm run build
   # Then serve the files through any web server
   ```

## File Structure

```
jotdown/
├── js/
│   ├── components.js          # Source JSX file (edit this)
│   ├── components.compiled.js # Generated file (don't edit)
│   ├── app.js                 # Source JSX file (edit this)
│   ├── app.compiled.js        # Generated file (don't edit)
│   └── utils.js               # Regular JS (no compilation needed)
├── build.js                   # Build utility script
├── package.json               # Dependencies and scripts
└── index.html                 # Updated to use compiled files
```

## Important Notes

- **Always edit the source files** (`js/components.js`, `js/app.js`), not the compiled versions
- **Compiled files are auto-generated** and will be overwritten on each build
- **The HTML file now references compiled files** instead of using Babel transpilation
- **No more CORS errors** when opening the HTML file directly from filesystem
- **Babel dependency removed** from the HTML file (faster loading)

## Adding New JSX Files

To add new JSX files to the build process:

1. Edit `build.js`
2. Add your new file to the `filesToTranspile` array:
   ```javascript
   const filesToTranspile = [
     {
       input: 'js/components.js',
       output: 'js/components.compiled.js'
     },
     {
       input: 'js/app.js',
       output: 'js/app.compiled.js'
     },
     {
       input: 'js/your-new-file.js',        // Add this
       output: 'js/your-new-file.compiled.js' // Add this
     }
   ];
   ```
3. Update your HTML file to include the compiled version
4. Run `npm run build` or `npm run dev`

## Troubleshooting

- **Build fails**: Check that your JSX syntax is valid
- **Application doesn't work**: Ensure you've run `npm run build` after making changes
- **Still getting CORS errors**: Make sure you're using `npm run serve` or another HTTP server, not opening the HTML file directly
- **Changes not reflected**: If using `npm run dev`, check that the watch process is running and rebuilding files
