import React from 'react';

const SpeedControl = ({ speed, setSpeed, speaking }) => {
    const handleSpeedChange = (event) => {
        setSpeed(parseFloat(event.target.value));
    };
    
    const speedPresets = [
        { label: '0.5x (Slow)', value: 0.5 },
        { label: '0.75x', value: 0.75 },
        { label: '1.0x (Normal)', value: 1.0 },
        { label: '1.25x', value: 1.25 },
        { label: '1.5x', value: 1.5 },
        { label: '2.0x (Fast)', value: 2.0 }
    ];

    return (
        <div className="w-full max-w-3xl mx-auto mb-4">
            <div className="flex flex-col md:flex-row items-center">
                <label htmlFor="speed-slider" className="font-medium text-gray-700 mb-2 md:mb-0 md:mr-4">
                    Reading Speed: <span className="font-bold">{speed.toFixed(1)}x</span>
                    {speaking && <span className="ml-2 text-green-600 text-sm">(Applied immediately)</span>}
                </label>
                <div className="w-full md:w-2/3 flex items-center">
                    <span className="mr-2 text-sm">0.5x</span>
                    <input
                        type="range"
                        id="speed-slider"
                        min="0.5"
                        max="2.0"
                        step="0.1"
                        value={speed}
                        onChange={handleSpeedChange}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        aria-label="Reading speed slider"
                    />
                    <span className="ml-2 text-sm">2.0x</span>
                </div>
            </div>
            
            <div className="flex flex-wrap justify-center mt-3 space-x-2">
                {speedPresets.map(preset => (
                    <button
                        key={preset.value}
                        type="button"
                        onClick={() => setSpeed(preset.value)}
                        className={`px-3 py-1 text-sm rounded-full ${
                            Math.abs(speed - preset.value) < 0.05 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        {preset.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SpeedControl;