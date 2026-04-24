import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Toggle from "./Toggle";

describe('Toggle Component', () => {
    test('render initial toggle state', () => {
        render(<Toggle />)
        const toggle = screen.getByRole('switch');
        expect(toggle).toHaveAttribute("aria-checked", 'false')
    })

    test('switch should be turn true when clicked', async () => {
        const user = userEvent.setup();
        render(<Toggle />)
        const toggle = screen.getByRole('switch');

        await user.click(toggle);
        expect(toggle).toHaveAttribute("aria-checked", 'true')
    })

     test('switch should be turn on and off when clicked', async () => {
        const user = userEvent.setup();
        render(<Toggle />)
        const toggle = screen.getByRole('switch');

         await user.click(toggle);
        expect(toggle).toHaveAttribute("aria-checked", 'true')

         await user.click(toggle);
        expect(toggle).toHaveAttribute("aria-checked", 'false')
    })
})