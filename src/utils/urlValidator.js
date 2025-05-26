/**
 * Validates URLs for the Website Reader application
 */

/**
 * Checks if the provided string is a valid URL
 * @param {string} url - The URL to validate
 * @returns {boolean} - Whether the URL is valid
 */
export const validateUrl = (url) => {
    try {
        const urlObj = new URL(url);
        return ['http:', 'https:'].includes(urlObj.protocol);
    } catch (error) {
        return false;
    }
};

export default {
    validateUrl
};