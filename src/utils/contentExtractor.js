import { Readability } from '@mozilla/readability';
import DOMPurify from 'dompurify';

/**
 * Use a CORS proxy to fetch content from a URL
 * @param {string} url - The URL to fetch
 * @returns {Promise<Response>} - The fetch response
 */
const fetchWithProxy = async (url) => {
    // List of reliable CORS proxies to try (ordered by reliability)
    const corsProxies = [
        {
            url: `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`,
            transform: (data) => JSON.parse(data).contents
        },
        {
            url: `https://thingproxy.freeboard.io/fetch/${url}`,
            transform: (data) => data
        },
        {
            url: `https://cors.bridged.cc/${url}`,
            transform: (data) => data
        },
        {
            url: `https://yacdn.org/proxy/${url}`,
            transform: (data) => data
        },
        {
            url: `https://proxy.cors.sh/${url}`,
            transform: (data) => data,
            headers: { 'x-cors-api-key': 'temp_' + Math.random().toString(36) }
        }
    ];
    
    // Try each proxy in order
    for (const proxy of corsProxies) {
        try {
            console.log(`Trying proxy: ${new URL(proxy.url).hostname}`);
            
            const response = await fetch(proxy.url, {
                headers: {
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'User-Agent': 'Mozilla/5.0 (compatible; WebsiteReader/1.0)',
                    ...proxy.headers
                }
            });
            
            if (response.ok) {
                const text = await response.text();
                const transformedText = proxy.transform ? proxy.transform(text) : text;
                
                // Create a response-like object
                return {
                    ok: true,
                    text: () => Promise.resolve(transformedText),
                    statusText: 'OK'
                };
            }
        } catch (error) {
            console.warn(`Proxy ${new URL(proxy.url).hostname} failed:`, error.message);
            // Continue to the next proxy
        }
    }
    
    // If all proxies fail, try direct fetch as a last resort
    console.log('All proxies failed, trying direct fetch...');
    try {
        return await fetch(url, {
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'User-Agent': 'Mozilla/5.0 (compatible; WebsiteReader/1.0)'
            },
            mode: 'cors'
        });
    } catch (error) {
        throw new Error(`All proxy services failed and direct access is blocked by CORS. Error: ${error.message}`);
    }
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
        if (error.message.includes('CORS') || error.message.includes('proxy services failed')) {
            throw new Error('Cannot access this website due to security restrictions. The site may block automated content extraction or all proxy services are currently unavailable.');
        } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
            throw new Error('Could not connect to the website. Please check the URL and your internet connection.');
        } else if (error.message.includes('No readable content') || error.message.includes('Insufficient content')) {
            throw new Error('No readable content found on this page. The page may be empty, require JavaScript, or block content extraction.');
        } else if (error.message.includes('blocked by CORS')) {
            throw new Error('This website blocks cross-origin requests. Try accessing the site directly or use a different URL.');
        }
        
        throw error;
    }
};

/**
 * Test which CORS proxies are currently working
 * @param {string} testUrl - URL to test with (default: a simple test page)
 * @returns {Promise<Array>} - Array of working proxy configurations
 */
export const testProxies = async (testUrl = 'https://httpbin.org/html') => {
    const corsProxies = [
        {
            name: 'AllOrigins',
            url: `https://api.allorigins.win/get?url=${encodeURIComponent(testUrl)}`,
            transform: (data) => JSON.parse(data).contents
        },
        {
            name: 'ThingProxy',
            url: `https://thingproxy.freeboard.io/fetch/${testUrl}`,
            transform: (data) => data
        },
        {
            name: 'Bridged CORS',
            url: `https://cors.bridged.cc/${testUrl}`,
            transform: (data) => data
        },
        {
            name: 'YACDN Proxy',
            url: `https://yacdn.org/proxy/${testUrl}`,
            transform: (data) => data
        },
        {
            name: 'CORS.sh',
            url: `https://proxy.cors.sh/${testUrl}`,
            transform: (data) => data
        }
    ];

    const workingProxies = [];
    
    for (const proxy of corsProxies) {
        try {
            const response = await fetch(proxy.url, {
                headers: { 'Accept': 'text/html' }
            });
            
            if (response.ok) {
                const text = await response.text();
                if (text && text.length > 100) { // Basic content check
                    workingProxies.push({
                        name: proxy.name,
                        hostname: new URL(proxy.url).hostname,
                        status: 'working'
                    });
                }
            }
        } catch (error) {
            console.warn(`${proxy.name} test failed:`, error.message);
        }
    }
    
    return workingProxies;
};