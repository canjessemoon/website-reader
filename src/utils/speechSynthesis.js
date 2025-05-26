import { useState, useEffect, useRef } from 'react';
import { isChrome, isSafari, isIOS, supportsSpeechSynthesis } from './browserDetection';

const speechSynthesis = window.speechSynthesis;

/**
 * Custom hook for managing speech synthesis functionality
 * @returns {Object} - Speech synthesis state and controls
 */
export const useSpeechSynthesis = () => {
    const [speaking, setSpeaking] = useState(false);
    const [speed, setSpeed] = useState(1.0);
    const [text, setText] = useState('');
    const utteranceRef = useRef(null);
    const chunksRef = useRef([]);
    const currentChunkIndexRef = useRef(0);
    
    // Fix for Chrome's bug where speechSynthesis stops working after ~15 seconds of inactivity
    useEffect(() => {
        let timerId;
        
        // Chrome fix - keep speechSynthesis alive
        const keepAlive = () => {
            if (speechSynthesis && (isChrome() || isSafari())) {
                speechSynthesis.pause();
                speechSynthesis.resume();
                timerId = setTimeout(keepAlive, 5000);
            }
        };
        
        if (speaking && (isChrome() || isSafari())) {
            keepAlive();
        }
        
        return () => {
            if (timerId) {
                clearTimeout(timerId);
            }
            if (speechSynthesis) {
                speechSynthesis.cancel();
            }
        };
    }, [speaking]);
    
    // Clean up when component unmounts
    useEffect(() => {
        return () => {
            if (speechSynthesis) {
                speechSynthesis.cancel();
            }
        };
    }, []);
    
    // Handle speed changes
    useEffect(() => {
        if (utteranceRef.current && speaking) {
            // Need to restart with new rate
            const currentText = utteranceRef.current.text;
            speechSynthesis.cancel();
            
            const newUtterance = new SpeechSynthesisUtterance(currentText);
            newUtterance.rate = speed;
            setupUtteranceEvents(newUtterance);
            
            utteranceRef.current = newUtterance;
            speechSynthesis.speak(newUtterance);
            // Make sure the speaking state stays true after cancellation/restart
            setSpeaking(true);
        }
    }, [speed, speaking]);
    
    const setupUtteranceEvents = (utterance) => {
        utterance.onend = () => setSpeaking(false);
        utterance.onerror = (event) => {
            console.error('SpeechSynthesis error:', event);
            setSpeaking(false);
        };
    };
    
    /**
     * Speaks the provided text
     * @param {string} content - The text to be spoken
     */
    const speak = (content) => {
        if (!supportsSpeechSynthesis()) {
            console.error("Speech synthesis not supported in this browser.");
            return;
        }
        
        // Cancel any ongoing speech
        speechSynthesis.cancel();
        
        // Determine optimal chunk size based on browser
        const maxLength = isIOS() ? 100 : (isChrome() ? 200 : 300);
        const chunks = [];
        
        if (content.length > maxLength) {
            // Split at sentences when possible
            const sentences = content.split(/(?<=[.!?])\s+/);
            let currentChunk = '';
            
            sentences.forEach(sentence => {
                if (currentChunk.length + sentence.length < maxLength) {
                    currentChunk += sentence + ' ';
                } else {
                    if (currentChunk) {
                        chunks.push(currentChunk.trim());
                    }
                    currentChunk = sentence + ' ';
                }
            });
            
            if (currentChunk) {
                chunks.push(currentChunk.trim());
            }
        } else {
            chunks.push(content);
        }
        
        console.log(`Speaking text in ${chunks.length} chunks`);
        
        // Store chunks for potential pause/resume
        chunksRef.current = chunks;
        currentChunkIndexRef.current = 0;
        
        // Function to speak chunks sequentially
        const speakChunk = (index) => {
            if (index >= chunks.length) {
                setSpeaking(false);
                chunksRef.current = [];
                currentChunkIndexRef.current = 0;
                return;
            }
            
            currentChunkIndexRef.current = index;
            
            const utterance = new SpeechSynthesisUtterance(chunks[index]);
            utterance.rate = speed;
            
            utterance.onend = () => {
                console.log(`Finished chunk ${index + 1} of ${chunks.length}`);
                // Speak the next chunk
                speakChunk(index + 1);
            };
            
            utterance.onerror = (event) => {
                console.error('SpeechSynthesis error on chunk', index, ':', event);
                setSpeaking(false);
                chunksRef.current = [];
                currentChunkIndexRef.current = 0;
            };
            
            utteranceRef.current = utterance;
            speechSynthesis.speak(utterance);
        };
        
        // Start speaking from the first chunk
        speakChunk(0);
        setSpeaking(true);
        setText(content);
    };
    
    /**
     * Pauses the current speech
     */
    const pause = () => {
        if (speechSynthesis && speaking) {
            speechSynthesis.pause();
            setSpeaking(false);
        }
    };
    
    /**
     * Resumes the paused speech
     */
    const resume = () => {
        if (speechSynthesis && !speaking && utteranceRef.current) {
            speechSynthesis.resume();
            setSpeaking(true);
        }
    };
    
    /**
     * Stops the current speech
     */
    const stop = () => {
        if (speechSynthesis) {
            speechSynthesis.cancel();
            setSpeaking(false);
            utteranceRef.current = null;
            chunksRef.current = [];
            currentChunkIndexRef.current = 0;
        }
    };
    
    return {
        speaking,
        setSpeaking,
        speed,
        setSpeed,
        speak,
        pause,
        resume,
        stop
    };
};