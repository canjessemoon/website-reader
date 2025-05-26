import React from 'react';
import SpeedControl from './SpeedControl';
import TTSControls from './TTSControls';

const ControlPanel = ({ content, speaking, setSpeaking, speed, setSpeed, speechSynthesis }) => {
    return (
        <div className="w-full max-w-3xl mx-auto p-6 sm:p-8 md:p-10 bg-white rounded-lg shadow-md mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Playback Controls</h2>
            <TTSControls 
                content={content}
                speaking={speaking}
                setSpeaking={setSpeaking}
                speed={speed}
                speechSynthesis={speechSynthesis}
            />
            <SpeedControl speed={speed} setSpeed={setSpeed} speaking={speaking} />
        </div>
    );
};

export default ControlPanel;