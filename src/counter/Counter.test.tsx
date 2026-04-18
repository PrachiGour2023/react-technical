import Counter from "./Counter";
import { render, screen } from '@testing-library/react'

describe('Counter component', () => {
    test('renders Counter component', () => {
        render(<Counter />)
        const counterElement = screen.getByText(/Counter/i)
        expect(counterElement).toBeInTheDocument()
    })  
})