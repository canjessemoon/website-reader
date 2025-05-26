import React, { useState, useEffect } from 'react';
import UrlInput from './components/UrlInput';
import ReadableContent from './components/ReadableContent';
import ControlPanel from './components/ControlPanel';
import ErrorMessage from './components/ErrorMessage';
import TTSTest from './components/TTSTest';
import ProxyStatus from './components/ProxyStatus';
import { extractContent } from './utils/contentExtractor';
import { validateUrl } from './utils/urlValidator';
import { useSpeechSynthesis } from './utils/speechSynthesis';
import './App.css';

const App = () => {
    const [url, setUrl] = useState('');
    const [content, setContent] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [debugMode, setDebugMode] = useState(false);
    const [showProxyStatus, setShowProxyStatus] = useState(false);
    const { 
        speaking, 
        setSpeaking, 
        speed, 
        setSpeed, 
        speak, 
        pause, 
        resume, 
        stop 
    } = useSpeechSynthesis();

    // Check if browser supports Speech Synthesis
    useEffect(() => {
        if (!window.speechSynthesis) {
            setError('Your browser does not support the Speech Synthesis API.');
        }
    }, []);

    const handleUrlSubmit = async (submittedUrl) => {
        setError('');
        setContent(null);
        setLoading(true);
        stop(); // Stop any ongoing speech

        if (!validateUrl(submittedUrl)) {
            setError('Please enter a valid URL (e.g., https://example.com)');
            setLoading(false);
            return;
        }

        try {
            const extractedContent = await extractContent(submittedUrl);
            setContent(extractedContent);
            setUrl(submittedUrl);
        } catch (err) {
            console.error('Content extraction error:', err);
            setError(err.message || 'Failed to extract content from the URL');
        } finally {
            setLoading(false);
        }
    };
    
    const handleClear = () => {
        setUrl('');
        setContent(null);
        setError('');
        stop(); // Stop any ongoing speech
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-6 sm:px-8 md:px-12 lg:px-16">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Website Reader</h1>
                    <p className="text-gray-600">Enter a URL to extract and read the content aloud</p>
                    
                    {/* Debug Mode Toggle */}
                    <div className="mt-4 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                checked={debugMode}
                                onChange={(e) => setDebugMode(e.target.checked)}
                                className="form-checkbox h-4 w-4 text-blue-600"
                            />
                            <span className="ml-2 text-sm text-gray-600">Debug Mode (TTS Test)</span>
                        </label>
                        
                        <button
                            onClick={() => setShowProxyStatus(true)}
                            className="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        >
                            Check Proxy Status
                        </button>
                    </div>
                </header>

                {debugMode ? (
                    <TTSTest />
                ) : (
                    <>
                        <UrlInput onSubmit={handleUrlSubmit} />
                        
                        {error && <ErrorMessage message={error} />}
                        
                        {loading && (
                            <div className="w-full max-w-3xl mx-auto text-center py-8">
                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600 mb-2"></div>
                                <p>Extracting content from the website...</p>
                            </div>
                        )}
                        
                        {content && (
                            <>
                                <ControlPanel 
                                    content={content}
                                    speaking={speaking}
                                    setSpeaking={setSpeaking}
                                    speed={speed}
                                    setSpeed={setSpeed}
                                    speechSynthesis={{
                                        speak,
                                        pause,
                                        resume,
                                        stop
                                    }}
                                />
                                <ReadableContent content={content} />
                                <div className="w-full max-w-3xl mx-auto mb-8 text-center">
                                    <button 
                                        onClick={handleClear} 
                                        className="px-6 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                                    >
                                        Clear & Start Over
                                    </button>
                                </div>
                            </>
                        )}
                    </>
                )}
                
                <footer className="mt-8 text-center text-gray-500 text-sm">
                    <p>
                        This application uses the Web Speech API to read content aloud.
                        <br />
                        Note: Some websites may block content extraction due to CORS restrictions.
                    </p>
                </footer>
                
                {/* Proxy Status Modal */}
                {showProxyStatus && (
                    <ProxyStatus onClose={() => setShowProxyStatus(false)} />
                )}
            </div>
        </div>
    );
};

export default App;