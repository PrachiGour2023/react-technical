import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Todo from "./Todo";

describe('Todo Component', () => {

    test('render todo component correctly', () => {
        render(<Todo />)
        expect(screen.getByText(/Todo App/)).toBeInTheDocument();
    })

    test('input box will render without value', () => {
        render(<Todo />)
        const checkInput = screen.getByRole('textbox');
        expect(checkInput).toHaveAttribute("value", "")
    })

    test('user will add the input value in todo list', async () => {
        const event = userEvent.setup();
        render(<Todo />)
        const elem = screen.getByRole('textbox');
        const button = screen.getByRole("button")
        await event.type(elem, "prachi");
        await event.click(button)
        expect(screen.getByText("prachi")).toBeInTheDocument();
    })

    test('user will update the todo item in list', async () => {
        const event = userEvent.setup();
        render(<Todo />)
        
        const input = screen.getByRole("textbox");
        const addBtn = screen.getByRole("button", { name: /add/i });

        await event.type(input, "prachi");
        await event.click(addBtn);

        const editBtn = screen.getByRole("button", { name: /edit/i });
        await event.click(editBtn);
        expect(input).toHaveValue("prachi");

        await event.clear(input)
        await event.type(input, "prachi gour");

        const updateBtn = screen.getByRole("button", { name: /update/i })
        await event.click(updateBtn);

        expect(screen.getByText("prachi gour")).toBeInTheDocument();
    })

    test('user will delete the todo item from list', async () => {
        const event = userEvent.setup();
        render(<Todo />)

        const input = screen.getByRole("textbox");
        const addBtn = screen.getByRole("button", { name: /add/i})

        await event.type(input, "prachi");
        await event.click(addBtn)

        const deleteBtn = screen.getByRole("button", { name: /delete/i})
        await event.click(deleteBtn)

        expect(screen.queryByText("prachi")).not.toBeInTheDocument();

    })

    test('clear all items from todo list', async () => {
        const event = userEvent.setup();
        render(<Todo />)

        const input = screen.getByRole("textbox");
        const addBtn = screen.getByRole("button", { name: /add/i })

        await event.type(input, "one");
        await event.click(addBtn);

        await event.type(input, "two");
        await event.click(addBtn)

        const clearBtn = screen.getByRole("button", { name: /clear all/i})
        await event.click(clearBtn)

        expect(screen.queryByText('one')).not.toBeInTheDocument();
        expect(screen.queryByText('two')).not.toBeInTheDocument();
    })
})