# Testing Guide for Website Reader

This guide provides a systematic approach to testing the Website Reader application before deployment.

## Functional Testing Checklist

### URL Input and Content Extraction
- [ ] Enter a valid URL with https:// protocol
- [ ] Enter a valid URL without protocol (should automatically add https://)
- [ ] Enter an invalid URL (should show appropriate error message)
- [ ] Test with a variety of website types:
  - [ ] News articles
  - [ ] Blog posts
  - [ ] Documentation pages
  - [ ] Wikipedia articles
- [ ] Test with URLs that are known to have CORS restrictions

### Text-to-Speech Functionality
- [ ] Play button starts reading from the beginning
- [ ] Pause button temporarily stops reading
- [ ] Resume button continues from where it was paused
- [ ] Stop button completely stops reading
- [ ] Play after stop starts from the beginning again

### Speed Control
- [ ] Slider adjusts speech rate correctly
- [ ] Preset buttons (0.5x, 0.75x, etc.) set the correct rate
- [ ] Speed changes take effect immediately when already playing
- [ ] Active preset is highlighted correctly

### User Interface
- [ ] Loading indicator appears during content extraction
- [ ] Error messages are clear and helpful
- [ ] Content is displayed in a readable format
- [ ] "Clear & Start Over" button resets the application state
- [ ] UI is responsive on different screen sizes

## Cross-Browser Testing

Test the application in the following browsers:
- [ ] Google Chrome
- [ ] Microsoft Edge
- [ ] Safari
- [ ] Firefox
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iOS)

## Performance Testing

- [ ] Test with very long articles (10,000+ words)
- [ ] Monitor memory usage during extended text-to-speech playback
- [ ] Check loading times for content extraction

## Accessibility Testing

- [ ] All interactive elements are keyboard accessible
- [ ] Focus states are visible
- [ ] Screen readers can navigate the application
- [ ] Color contrast meets WCAG standards

## Security Testing

- [ ] Check that HTML content is properly sanitized
- [ ] Verify that CORS proxies are working properly
- [ ] Test for XSS vulnerabilities with malicious URLs

## Edge Cases to Test

- [ ] Content with non-Latin characters
- [ ] Content with special characters and symbols
- [ ] URLs with query parameters
- [ ] Very short content (less than 100 words)
- [ ] Websites with minimal text content
- [ ] Rapid successive URL submissions

## Reporting Issues

When reporting issues, please include:
1. The URL tested
2. Browser and version
3. Steps to reproduce
4. Expected vs. actual behavior
5. Screenshots if applicable
