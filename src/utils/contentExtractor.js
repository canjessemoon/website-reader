import { Readability } from '@mozilla/readability';
import DOMPurify from 'dompurify';

/**
 * Use a CORS proxy to fetch content from a URL
 * @param {string} url - The URL to fetch
 * @returns {Promise<Response>} - The fetch response
 */
const fetchWithProxy = async (url) => {
    // List of public CORS proxies to try
    const corsProxies = [
        `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
        `https://cors-anywhere.herokuapp.com/${url}`,
        `https://crossorigin.me/${url}`
    ];
    
    // Try each proxy in order
    for (const proxyUrl of corsProxies) {
        try {
            const response = await fetch(proxyUrl, {
                headers: {
                    'Accept': 'text/html'
                }
            });
            
            if (response.ok) {
                return response;
            }
        } catch (error) {
            console.warn(`Proxy ${proxyUrl} failed:`, error);
            // Continue to the next proxy
        }
    }
    
    // If all proxies fail, try direct fetch as a last resort
    return fetch(url, {
        headers: {
            'Accept': 'text/html'
        }
    });
};

/**
 * Fetches and extracts the main content from a URL
 * @param {string} url - The URL to extract content from
 * @returns {Promise<Object>} - The extracted content object with title and content
 * @throws {Error} - If content extraction fails
 */
export const extractContent = async (url) => {
    try {
        // Try fetch with proxy
        const response = await fetchWithProxy(url);
        
        if (!response.ok) {
            throw new Error(`Failed to fetch URL: ${response.statusText}`);
        }
        
        const html = await response.text();
        
        // Parse the HTML
        const doc = new DOMParser().parseFromString(html, 'text/html');
        
        // Check if we got meaningful content
        if (doc.body.textContent.trim().length < 50) {
            throw new Error('Insufficient content was retrieved from the URL');
        }
        
        const reader = new Readability(doc);
        const article = reader.parse();
        
        if (!article || !article.content) {
            throw new Error('No readable content found on this page');
        }
        
        // Sanitize the content
        const sanitizedContent = DOMPurify.sanitize(article.content);
        
        return {
            title: article.title || 'Extracted Content',
            content: sanitizedContent,
            byline: article.byline,
            siteName: article.siteName,
            excerpt: article.excerpt
        };
    } catch (error) {
        console.error('Content extraction error:', error);
        
        // Provide more user-friendly error messages
        if (error.message.includes('CORS') || error.message.includes('fetch')) {
            throw new Error('Cannot access this website due to security restrictions. Try a different URL or try using our alternative CORS proxies.');
        } else if (error.message.includes('Failed to fetch')) {
            throw new Error('Could not connect to the website. Please check the URL and try again.');
        } else if (error.message.includes('No readable content') || error.message.includes('Insufficient content')) {
            throw new Error('No readable content found on this page. Try a different URL or check if the site allows content extraction.');
        }
        
        throw error;
    }
};