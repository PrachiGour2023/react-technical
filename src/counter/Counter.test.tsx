import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

describe('Counter Component', () => {

  test('renders initial count correctly', () => {
    render(<Counter />);
    expect(screen.getByText(/Counter 0/i)).toBeInTheDocument();
  });

  test('increments count when Increment button is clicked', () => {
    render(<Counter />);

    const incrementBtn = screen.getByText('Increment');
    fireEvent.click(incrementBtn);

    expect(screen.getByText(/Counter 1/i)).toBeInTheDocument();
  });

  test('decrements count when Decrement button is clicked', () => {
    render(<Counter />);

    const decrementBtn = screen.getByText('Decrement');
    fireEvent.click(decrementBtn);

    expect(screen.getByText(/Counter -1/i)).toBeInTheDocument();
  });

  test('resets count to 0 when Reset button is clicked', () => {
    render(<Counter />);

    const incrementBtn = screen.getByText('Increment');
    const resetBtn = screen.getByText('Reset');

    fireEvent.click(incrementBtn); // count = 1
    fireEvent.click(resetBtn);     // reset to 0

    expect(screen.getByText(/Counter 0/i)).toBeInTheDocument();
  });

  test('handles multiple interactions correctly', () => {
    render(<Counter />);

    const incrementBtn = screen.getByText('Increment');
    const decrementBtn = screen.getByText('Decrement');

    fireEvent.click(incrementBtn); // 1
    fireEvent.click(incrementBtn); // 2
    fireEvent.click(decrementBtn); // 1

    expect(screen.getByText(/Counter 1/i)).toBeInTheDocument();
  });

});