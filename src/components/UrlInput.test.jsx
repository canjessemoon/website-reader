import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UrlInput from './UrlInput';

test('renders URL input field and submit button', () => {
  const mockSubmit = jest.fn();
  render(<UrlInput onSubmit={mockSubmit} />);
  
  // Check for input field
  const inputElement = screen.getByPlaceholderText(/Enter website URL/i);
  expect(inputElement).toBeInTheDocument();
  
  // Check for button
  const buttonElement = screen.getByText(/Read Website/i);
  expect(buttonElement).toBeInTheDocument();
});
