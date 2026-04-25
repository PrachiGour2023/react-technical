import { useState } from "react";
import "./index.css";

const Todo = () => {

    const [todos, setTodos] = useState<string[]>([]);
    const [input, setInput] = useState<string>('')
    const [isEdit, setIsEdit] = useState<boolean>();
    const [editIndex, setEditIndex] = useState<number>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    const handleAddTodo = () => {
        if (input === "") {
            return;
        }
        setTodos([...todos, input])
        setInput("")
    }

    const handleDelete = (i: number) => {
        const filterData = todos.filter((_, index) => index != i)
        setTodos(filterData)
    }

    const handleEdit = (item: string, i: number) => {
        setInput(item)
        setIsEdit(true)
        setEditIndex(i)
    }

    const handleUpdate = () => {
        const updateData = todos.map((item, i) => {
            if (i === editIndex) {
                return input
            }
            return item;
        })
        setTodos(updateData)
        setInput('');
        setIsEdit(false);
    }

    return (
        <div className="container">
            <h1>Todo App</h1>

            <div className="input-container">
                <input value={input} className="input" onChange={handleChange} />
                <button className="add" onClick={isEdit ? handleUpdate : handleAddTodo}>{isEdit ? 'UPDATE' : 'ADD'}</button>
            </div>
            <div className="items">
                {
                    todos.map((item: string, i) => {
                        return (
                            <div className="item-container">
                                <p className="item">{item}</p>
                                <div className="btn-container">
                                    <button className="edit" onClick={() => handleEdit(item, i)}>Edit</button>
                                    <button className="delete" onClick={() => handleDelete(i)}>Delete</button>
                                </div>
                            </div>
                        )
                    })
                }

            </div>
            {
                todos.length > 1 && <button className="clear" onClick={() => setTodos([])}>Clear All</button>
            }
        </div>
    )
}

export default Todo