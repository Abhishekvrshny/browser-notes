# Jotdown

A modern, browser-based markdown note-taking application built with React and vanilla JavaScript. Create, edit, and organize your notes with real-time markdown preview, multiple themes, and persistent local storage.

![Jotdown](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![React](https://img.shields.io/badge/React-18-blue.svg)

## 🌟 Features

### Core Functionality
- **📝 Markdown Editor**: Full-featured markdown editor with syntax highlighting
- **👁️ Live Preview**: Real-time markdown rendering with multiple view modes
- **📑 Multi-Tab Interface**: Create and manage multiple notes simultaneously
- **💾 Auto-Save**: Automatic saving to browser's local storage
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### User Experience
- **🌙 Dark/Light Theme**: Toggle between light and dark themes
- **🔤 Adjustable Font Size**: Customize editor font size for better readability
- **📐 Flexible Layout**: Switch between split view, editor-only, and preview-only modes
- **🎯 Context Menu**: Right-click context menu for quick actions
- **⌨️ Keyboard Shortcuts**: Efficient keyboard navigation and controls

### Data Management
- **📤 Export/Import**: Export notes as JSON or import existing note collections
- **🗂️ Collapsible Sidebar**: Organize your notes with a space-efficient sidebar
- **🔍 Smart Titles**: Automatic title extraction from markdown content
- **📊 Word Count**: Real-time word count display

## 🚀 Quick Start

### Option 1: Use Online (Recommended)
Visit the live application: **[https://notes.varlog.co.in](https://notes.varlog.co.in)**

### Option 2: Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abhishekvrshny/jotdown.git
   cd jotdown
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the application**
   ```bash
   npm run build
   ```

4. **Start the development server**
   ```bash
   npm run serve
   ```

The application will open in your browser at `http://localhost:3000`.

## 🛠️ Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Transpile JSX files to regular JavaScript |
| `npm run dev` | Watch mode - auto-rebuild on file changes |
| `npm run serve` | Start local HTTP server at localhost:3000 |

### Development Workflow

1. **Start development environment**:
   ```bash
   # Terminal 1: Watch for changes and auto-rebuild
   npm run dev
   
   # Terminal 2: Serve the application
   npm run serve
   ```

2. **Make your changes** to the source files in:
   - `js/components/` - React components
   - `js/services/` - Utility services
   - `css/` - Stylesheets

3. **Build for production**:
   ```bash
   npm run build
   ```

## 🏗️ Architecture

### Project Structure
```
jotdown/
├── css/
│   ├── main.css                 # Main stylesheet
│   ├── components/              # Component-specific styles
│   └── themes/                  # Theme variables
├── js/
│   ├── main.js                  # Application entry point
│   ├── components/              # React components
│   │   ├── Editor.js           # Markdown editor component
│   │   ├── Sidebar.js          # Navigation sidebar
│   │   ├── Toolbar.js          # Top toolbar
│   │   ├── ContextMenu.js      # Right-click menu
│   │   └── ConfirmDialog.js    # Confirmation dialogs
│   ├── services/               # Utility services
│   │   ├── storage.js          # Local storage management
│   │   ├── markdown.js         # Markdown parsing
│   │   └── textUtils.js        # Text processing utilities
│   └── constants/              # Application constants
├── build.js                    # Build system
├── package.json               # Dependencies and scripts
└── index.html                 # Main HTML file
```

### Technology Stack

- **Frontend Framework**: React 18 (via CDN)
- **Styling**: Tailwind CSS + DaisyUI
- **Markdown Processing**: Marked.js + DOMPurify
- **Build System**: Custom Babel-based transpiler
- **Storage**: Browser LocalStorage API
- **Deployment**: GitHub Pages with GitHub Actions

### Key Components

- **App**: Main application component managing global state
- **Editor**: Markdown editor with multiple view modes
- **Sidebar**: Note navigation and management
- **Toolbar**: Application controls and settings
- **Storage Service**: Persistent data management
- **Markdown Service**: Safe markdown parsing and rendering

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + Shift + P` | Toggle between split and preview-only modes |
| `Right Click` | Open context menu |

## 🎨 Customization

### Themes
The application supports light and dark themes with CSS custom properties defined in `css/themes/variables.css`.

### Font Sizes
Adjustable font sizes from 12px to 20px for optimal reading comfort.

### View Modes
- **Split View**: Editor and preview side by side
- **Editor Only**: Focus on writing
- **Preview Only**: Focus on reading

## 📦 Deployment

### Automatic Deployment (GitHub Pages)
The repository is configured for automatic deployment to GitHub Pages using GitHub Actions. Every push to the `main` branch triggers a new deployment.

### Manual Deployment
1. Run `npm run build` to generate compiled files
2. Deploy the entire project directory to any static hosting service
3. Ensure the web server serves `index.html` for the root path

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add feature-name'`
5. Push to the branch: `git push origin feature-name`
6. Submit a pull request

### Development Guidelines
- Follow the existing code style and structure
- Test your changes across different browsers and devices
- Update documentation for new features
- Ensure all JSX files are properly transpiled

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Issues & Support

- **Bug Reports**: [GitHub Issues](https://github.com/Abhishekvrshny/jotdown/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/Abhishekvrshny/jotdown/discussions)

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI framework
- [Marked.js](https://marked.js.org/) - Markdown parser
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [DaisyUI](https://daisyui.com/) - Tailwind CSS components
- [DOMPurify](https://github.com/cure53/DOMPurify) - HTML sanitization

---

**Made with ❤️ for better note-taking**
