# Website Reader

Website Reader is a web application that reads the content of webpages aloud to users. It extracts the main readable content from a given URL and utilizes the Web Speech API to provide text-to-speech functionality.

## Features

- **URL Input:** Enter any valid URL to extract content
- **Content Extraction:** Automatically extracts main readable content, ignoring ads, navigation, etc.
- **Text-to-Speech:** Reads content aloud using browser's built-in speech synthesis
- **Playback Controls:** Play, Pause, Resume, and Stop functionality
- **Speed Control:** Adjust reading speed from 0.5x (slow) to 2.0x (fast)
- **Responsive Design:** Works on mobile and desktop devices
- **Accessibility:** Keyboard navigable and screen-reader friendly

## Technologies Used

- **React:** Frontend UI library
- **Tailwind CSS:** Utility-first CSS framework
- **Web Speech API:** Browser-based text-to-speech
- **@mozilla/readability:** Content extraction library (Mozilla's Readability)
- **DOMPurify:** HTML sanitization to prevent XSS attacks

## Prerequisites

- Node.js (v14.x or higher recommended)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/website-reader.git
   cd website-reader
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser (or http://localhost:3001 if port 3000 is occupied)

## Deployment Options

### Option 1: Static File Hosting (Recommended)

The simplest way to deploy the Website Reader is through static file hosting:

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the contents of the `build` folder to any static hosting service:

   - **Local testing with serve:**
     ```bash
     npm install -g serve
     serve -s build
     ```

   - **Netlify:**
     - Connect your GitHub repository to Netlify
     - Set build command to `npm run build`
     - Set publish directory to `build`
     - Or use Netlify CLI:
       ```bash
       npm install -g netlify-cli
       netlify deploy
       ```

   - **GitHub Pages:**
     ```bash
     npm run deploy
     ```

   - **Vercel:**
     ```bash
     npm install -g vercel
     vercel
     ```

### Option 2: Docker Deployment

1. Build the Docker image:
   ```bash
   docker build -t website-reader .
   ```

2. Run the container:
   ```bash
   docker run -p 8080:80 website-reader
   ```

3. Or use docker-compose:
   ```bash
   docker-compose up -d
   ```

4. Access the application at http://localhost:8080

### Option 3: Cloud Platform Deployment

The application can be deployed to various cloud platforms:

- **AWS Amplify:**
  1. Connect your GitHub repository
  2. Configure build settings (build command: `npm run build`, output directory: `build`)

- **Google Cloud Run:**
  1. Build and push the Docker image to Google Container Registry
  2. Deploy to Cloud Run with the following command:
     ```bash
     gcloud run deploy website-reader --image gcr.io/your-project/website-reader --platform managed
     ```

- **Azure Static Web Apps:**
  1. Connect your GitHub repository
  2. Configure build settings (build command: `npm run build`, output directory: `build`)

## Usage Guide

1. **Entering a URL**
   - Type or paste a valid URL into the input field
   - If you omit the protocol (http:// or https://), https:// will be added automatically
   - Click "Read Website" to extract the content

2. **Reading Content**
   - Once content is extracted, it will be displayed in a readable format
   - Use the playback controls to interact with the text-to-speech feature:
     - **Play:** Start reading the content from the beginning
     - **Pause:** Temporarily stop reading
     - **Resume:** Continue reading from where you paused
     - **Stop:** Stop reading completely

3. **Adjusting Reading Speed**
   - Use the slider to adjust the reading speed between 0.5x and 2.0x
   - Click on preset buttons (0.5x, 0.75x, 1.0x, etc.) for quick speed adjustments

4. **Clearing Content**
   - Click "Clear & Start Over" to reset the application and enter a new URL

## Known Limitations

- **CORS Restrictions:** Some websites block content extraction due to Cross-Origin Resource Sharing (CORS) policies. The app attempts to use CORS proxies, but they may not always work.
- **Browser Compatibility:** The Web Speech API is not supported in all browsers. For best results, use Chrome, Edge, or Safari.
- **Content Extraction Quality:** The readability algorithm works best with article-style content. It may struggle with complex layouts, highly interactive sites, or sites with minimal textual content.
- **Language Support:** Text-to-speech quality varies by language and browser.

## Troubleshooting

- **Content Not Extracting:** Try adding or removing "www." from the URL, or make sure the URL includes the protocol (https://)
- **Speech Not Working:** Check if your browser supports the Web Speech API. Try using Chrome or Edge.
- **CORS Errors:** Try a different website, or consider setting up your own CORS proxy server.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Build for Production

To create an optimized production build:
```bash
npm run build
```

The build will be created in the `build` folder, ready for deployment.

## Usage Guide

1. **Entering a URL**
   - Type or paste a valid URL into the input field
   - If you omit the protocol (http:// or https://), https:// will be added automatically
   - Click "Read Website" to extract the content

2. **Reading Content**
   - Once content is extracted, it will be displayed in a readable format
   - Use the playback controls to interact with the text-to-speech feature:
     - **Play:** Start reading the content from the beginning
     - **Pause:** Temporarily stop reading
     - **Resume:** Continue reading from where you paused
     - **Stop:** Stop reading completely

3. **Adjusting Reading Speed**
   - Use the slider to adjust the reading speed between 0.5x and 2.0x
   - Click on preset buttons (0.5x, 0.75x, 1.0x, etc.) for quick speed adjustments

4. **Clearing Content**
   - Click "Clear & Start Over" to reset the application and enter a new URL

## Known Limitations

- **CORS Restrictions:** Some websites block content extraction due to Cross-Origin Resource Sharing (CORS) policies. The app attempts to use CORS proxies, but they may not always work.
- **Browser Compatibility:** The Web Speech API is not supported in all browsers. For best results, use Chrome, Edge, or Safari.
- **Content Extraction Quality:** The readability algorithm works best with article-style content. It may struggle with complex layouts, highly interactive sites, or sites with minimal textual content.
- **Language Support:** Text-to-speech quality varies by language and browser.

## Troubleshooting

- **Content Not Extracting:** Try adding or removing "www." from the URL, or make sure the URL includes the protocol (https://)
- **Speech Not Working:** Check if your browser supports the Web Speech API. Try using Chrome or Edge.
- **CORS Errors:** Try a different website, or consider setting up your own CORS proxy server.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

```bash
npm run build
```

The build files will be in the `build` directory, ready to be deployed.

## Deployment

You can deploy this application to services like Netlify or Vercel:

### Netlify

1. Create a new site from Git in the Netlify dashboard
2. Connect to your repository
3. Set build command to `npm run build`
4. Set publish directory to `build`

### Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory and follow prompts

## Browser Compatibility

Website Reader relies on the Web Speech API, which is supported in:

- Chrome (Desktop & Android)
- Edge
- Safari (Desktop & iOS)
- Firefox
- Opera

## Limitations

- **CORS Restrictions:** Some websites block content extraction due to Cross-Origin Resource Sharing (CORS) restrictions
- **Speech Synthesis Support:** Feature depends on browser support for Web Speech API
- **Content Extraction:** Highly dynamic websites or those with unusual layouts may not extract properly

## License

MIT

## Acknowledgments

- [Mozilla Readability](https://github.com/mozilla/readability) for content extraction
- Web Speech API for text-to-speech capabilities

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/website-reader.git
   ```

2. Navigate to the project directory:

   ```
   cd website-reader
   ```

3. Install the dependencies:

   ```
   npm install
   ```

### Running the Application

To start the development server, run:

```
npm start
```

The application will be available at `http://localhost:3000`.

### Building for Production

To create a production build, run:

```
npm run build
```

This will generate a `build` directory containing the optimized application.

## Usage

1. Enter a valid URL in the input field.
2. Click the submit button to extract the content.
3. Use the playback controls to listen to the content.
4. Adjust the reading speed using the speed control.

## Error Handling

The application handles various error scenarios, including:

- Invalid or unsupported URLs.
- CORS issues or fetch failures.
- No readable content found.
- Browser does not support speech synthesis.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.