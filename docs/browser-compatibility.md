# Browser Compatibility Guide

Website Reader uses the Web Speech API for text-to-speech functionality, which has varying levels of support across different browsers.

## Web Speech API Support

| Browser | Text-to-Speech Support | Notes |
|---------|------------------------|-------|
| Google Chrome | ✅ Full support | Best experience, wide language support |
| Microsoft Edge | ✅ Full support | Good experience, based on Chromium |
| Safari | ✅ Supported | Limited language options compared to Chrome |
| Firefox | ⚠️ Partial support | Some features may not work consistently |
| Opera | ✅ Supported | Based on Chromium, similar to Chrome |
| Samsung Internet | ✅ Supported | Works well on mobile devices |
| Internet Explorer | ❌ Not supported | Web Speech API is not available |

## CORS Proxy Support

The content extraction feature relies on CORS proxies to fetch content from external websites. These proxies may have usage limitations or be blocked by some websites.

If you encounter issues with content extraction:

1. Try a different URL
2. Check if the website allows content to be fetched by third-party applications
3. Consider setting up your own CORS proxy server for more reliable access

## Mobile Device Support

The application is fully responsive and works well on mobile devices with browsers that support the Web Speech API:

- iOS (Safari): Good support for text-to-speech
- Android (Chrome): Excellent support for text-to-speech
- Other mobile browsers: Support varies

## Performance Considerations

- Large articles may take longer to process and extract
- Text-to-speech performance may vary based on the device's processing power
- On mobile devices, battery usage may increase during speech synthesis
