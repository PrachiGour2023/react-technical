import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DarkModeToggle from "./DarkModeToggle";

describe('Dark Mode Component' , () => {
    test('render dark mode component correctly' , () => {
        render(<DarkModeToggle />)
        expect(screen.getByText(/Dark Mode Toggle/i)).toBeInTheDocument();
    })

    test('toggle from light mode to dark mode', async () => {
        render(<DarkModeToggle />)

        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).not.toBeChecked();

        await userEvent.click(checkbox)

        expect(checkbox).toBeChecked();
    })
})