import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SpeedControl from './SpeedControl';

test('renders speed control slider and presets', () => {
  const mockSetSpeed = jest.fn();
  render(<SpeedControl speed={1.0} setSpeed={mockSetSpeed} />);
  
  // Check for slider
  const sliderElement = screen.getByLabelText(/Reading speed slider/i);
  expect(sliderElement).toBeInTheDocument();
  
  // Check for preset buttons
  expect(screen.getByText(/1.0x \(Normal\)/i)).toBeInTheDocument();
});
