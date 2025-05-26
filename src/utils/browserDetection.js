/**
 * Browser detection utility functions
 */

/**
 * Detects if the browser is Chrome
 * @returns {boolean} - True if browser is Chrome
 */
export const isChrome = () => {
    return navigator.userAgent.indexOf("Chrome") !== -1;
};

/**
 * Detects if the browser is Firefox
 * @returns {boolean} - True if browser is Firefox
 */
export const isFirefox = () => {
    return navigator.userAgent.indexOf("Firefox") !== -1;
};

/**
 * Detects if the browser is Safari
 * @returns {boolean} - True if browser is Safari
 */
export const isSafari = () => {
    return navigator.userAgent.indexOf("Safari") !== -1 && navigator.userAgent.indexOf("Chrome") === -1;
};

/**
 * Detects if the browser is Edge
 * @returns {boolean} - True if browser is Edge
 */
export const isEdge = () => {
    return navigator.userAgent.indexOf("Edg") !== -1;
};

/**
 * Detects if the browser is on iOS
 * @returns {boolean} - True if device is iOS
 */
export const isIOS = () => {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
};

/**
 * Checks if browser supports the Web Speech API
 * @returns {boolean} - True if browser supports Web Speech API
 */
export const supportsSpeechSynthesis = () => {
    return 'speechSynthesis' in window;
};

/**
 * Gets available voices for the browser
 * @returns {Promise<SpeechSynthesisVoice[]>} - Promise resolving to array of available voices
 */
export const getAvailableVoices = () => {
    return new Promise(resolve => {
        // Firefox and Edge get voices immediately
        let voices = window.speechSynthesis.getVoices();
        
        if (voices.length > 0) {
            resolve(voices);
            return;
        }
        
        // Chrome requires waiting for the voiceschanged event
        const voicesChangedHandler = () => {
            voices = window.speechSynthesis.getVoices();
            resolve(voices);
            window.speechSynthesis.removeEventListener('voiceschanged', voicesChangedHandler);
        };
        
        window.speechSynthesis.addEventListener('voiceschanged', voicesChangedHandler);
    });
};
