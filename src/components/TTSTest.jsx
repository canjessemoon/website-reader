import React, { useState } from 'react';
import { useSpeechSynthesis } from '../utils/speechSynthesis';

/**
 * TTS Test Component - for testing speech synthesis functionality
 */
const TTSTest = () => {
    const [testText, setTestText] = useState('Hello! This is a test of the text-to-speech functionality. The speed should change when you adjust the slider.');
    const { 
        speaking, 
        speed, 
        setSpeed, 
        speak, 
        pause, 
        resume, 
        stop 
    } = useSpeechSynthesis();

    const handleSpeedChange = (event) => {
        setSpeed(parseFloat(event.target.value));
    };    return (
        <div className="max-w-2xl mx-auto p-8 sm:p-10 md:p-12 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">TTS Integration Test</h2>
            
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Test Text:
                </label>
                <textarea
                    value={testText}
                    onChange={(e) => setTestText(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    rows="3"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Speed: {speed.toFixed(1)}x
                    {speaking && <span className="ml-2 text-green-600">(Applied immediately)</span>}
                </label>
                <input
                    type="range"
                    min="0.5"
                    max="2.0"
                    step="0.1"
                    value={speed}
                    onChange={handleSpeedChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
            </div>

            <div className="flex justify-center space-x-4 mb-4">
                <button
                    onClick={() => speak(testText)}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    disabled={!testText}
                >
                    Play
                </button>
                <button
                    onClick={pause}
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    disabled={!speaking}
                >
                    Pause
                </button>
                <button
                    onClick={resume}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    disabled={speaking}
                >
                    Resume
                </button>
                <button
                    onClick={stop}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                    Stop
                </button>
            </div>

            <div className="text-center text-sm text-gray-600">
                Status: {speaking ? 'Speaking' : 'Stopped'}
            </div>
        </div>
    );
};

export default TTSTest;
