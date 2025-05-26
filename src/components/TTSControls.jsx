import React from 'react';

const TTSControls = ({ content, speaking, setSpeaking, speed, speechSynthesis }) => {
    if (!content || (!content.title && !content.content)) {
        return null;
    }
    
    // Get plain text from HTML content for speech
    const getTextFromHtml = (html) => {
        const temp = document.createElement('div');
        temp.innerHTML = html;
        return temp.textContent || temp.innerText || '';
    };
    
    const textToRead = getTextFromHtml(content.content);
    
    const handlePlay = () => {
        if (!textToRead) return;
        
        if (!window.speechSynthesis) {
            alert('Your browser does not support the Speech Synthesis API');
            return;
        }
        
        if (speaking) {
            speechSynthesis.stop();
        }
        
        // Use the speak function from our speechSynthesis hook
        speechSynthesis.speak(textToRead);
        // No need to set speaking state as the hook will handle this
    };
    
    const handlePause = () => {
        if (speaking) {
            speechSynthesis.pause();
            // No need to set speaking state as the hook will handle this
        }
    };
    
    const handleResume = () => {
        if (!speaking) {
            speechSynthesis.resume();
            // No need to set speaking state as the hook will handle this
        }
    };
    
    const handleStop = () => {
        speechSynthesis.stop();
        // No need to set speaking state as the hook will handle this
    };

    return (
        <div className="w-full max-w-3xl mx-auto mb-6">
            <div className="flex justify-center space-x-4">
                {!speaking ? (
                    <button 
                        onClick={handlePlay} 
                        className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
                        aria-label="Play"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Play
                    </button>
                ) : (
                    <button 
                        onClick={handlePause} 
                        className="px-6 py-2 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 flex items-center"
                        aria-label="Pause"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Pause
                    </button>
                )}
                
                <button 
                    onClick={handleResume} 
                    disabled={speaking}
                    className={`px-6 py-2 font-medium rounded-lg flex items-center ${
                        speaking 
                            ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                            : 'bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'
                    }`}
                    aria-label="Resume"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Resume
                </button>
                
                <button 
                    onClick={handleStop} 
                    className="px-6 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center"
                    aria-label="Stop"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                    </svg>
                    Stop
                </button>
            </div>
        </div>
    );
};

export default TTSControls;