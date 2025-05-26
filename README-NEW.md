# Website Reader 🎧

A modern web application that extracts and reads website content aloud using React, Tailwind CSS, Web Speech API, and Mozilla's Readability library.

## 🌟 Features

- **Content Extraction**: Automatically extracts main readable content from any website
- **Text-to-Speech**: High-quality speech synthesis with customizable speed controls
- **Responsive Design**: Beautiful, mobile-friendly interface built with Tailwind CSS
- **Browser Compatibility**: Works across all modern browsers with browser-specific optimizations
- **Real-time Controls**: Play, pause, resume, and stop functionality with speed adjustment
- **Debug Mode**: Built-in testing interface for TTS functionality

## 🚀 Live Demo

- **GitHub Pages**: [https://yourusername.github.io/website-reader](https://yourusername.github.io/website-reader)
- **Netlify**: [https://website-reader.netlify.app](https://website-reader.netlify.app)

## 🛠️ Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/website-reader.git
cd website-reader

# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📦 Deployment

### Automatic Deployment (Recommended)

The project is configured for automatic deployment using GitHub Actions:

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/website-reader.git
   git push -u origin main
   ```

2. **GitHub Pages**: Automatically deploys on every push to `main` branch
3. **Netlify**: Deploys automatically when connected to your GitHub repository

### Manual Deployment

#### GitHub Pages
```bash
# Windows
.\deploy.ps1

# Unix/macOS
chmod +x deploy.sh
./deploy.sh
```

#### Netlify
```bash
npm run build
npm run deploy:netlify
```

### Environment Setup for Deployment

#### GitHub Pages Setup
1. Go to your repository → Settings → Pages
2. Select "Deploy from a branch"
3. Choose "gh-pages" branch
4. Update `homepage` in `package.json` with your GitHub username

#### Netlify Setup
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Add environment variables (if needed):
   - `CI=false`
   - `PUBLIC_URL=/`

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
# Optional: Custom CORS proxy
REACT_APP_CORS_PROXY=https://your-proxy.com

# Optional: Analytics
REACT_APP_GA_TRACKING_ID=your-ga-id
```

### Browser Support
- ✅ Chrome 71+
- ✅ Firefox 62+
- ✅ Safari 14.1+
- ✅ Edge 79+
- ✅ Mobile browsers

## 🎯 Usage

1. **Enter URL**: Input any website URL in the text field
2. **Extract Content**: Click "Read Website" to extract readable content
3. **Adjust Speed**: Use the speed slider (0.5x - 2.0x) or preset buttons
4. **Control Playback**: Use play, pause, resume, and stop controls
5. **Debug Mode**: Toggle debug mode to test TTS functionality directly

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:ci

# Debug TTS functionality
# Enable "Debug Mode" in the application
```

## 🏗️ Architecture

### Components
- **App.jsx**: Main application component
- **UrlInput.jsx**: URL input form
- **ReadableContent.jsx**: Displays extracted content
- **ControlPanel.jsx**: Houses TTS and speed controls
- **TTSControls.jsx**: Text-to-speech playback controls
- **SpeedControl.jsx**: Speed adjustment interface
- **TTSTest.jsx**: Debug component for testing

### Utilities
- **speechSynthesis.js**: Custom hook for Web Speech API
- **contentExtractor.js**: Content extraction with CORS proxy support
- **browserDetection.js**: Browser-specific optimizations
- **urlValidator.js**: URL validation utilities

## 🔄 CI/CD Pipeline

The project includes automated workflows for:

1. **Code Quality**: ESLint, Prettier, and tests on every PR
2. **Build Verification**: Ensures builds succeed before deployment
3. **Automatic Deployment**: 
   - GitHub Pages for main branch
   - Netlify for production
   - Preview deployments for PRs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Mozilla Readability](https://github.com/mozilla/readability) for content extraction
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API) for text-to-speech
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [React](https://reactjs.org/) for the UI framework

## 📞 Support

If you encounter any issues or have questions:

1. Check the [browser compatibility guide](docs/browser-compatibility.md)
2. Review the [testing guide](docs/testing-guide.md)
3. Open an issue on GitHub

---

**Made with ❤️ for accessibility and web content consumption**
