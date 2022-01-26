import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Todo from './Todo';

export default function Form({ addTodo }) {
    const [note, setNote] = useState('');

    const handleNewTodo = (e) => {
        setNote(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo(note);
        setNote('');
    }

    return (
        <React.Fragment>
            <form onSubmit={handleSubmit}>
                <div className="input-group w-25 m-auto mt-5">
                    <input
                        type="text"
                        value={note}
                        onChange={handleNewTodo}
                        className="form-control"
                        placeholder="What's missing?"
                    />
                    <button className="btn btn-outline-secondary" type="submit" id="button">Add</button>
                </div>
            </form>
            <div>
                <ul>

                </ul>
            </div>
        </React.Fragment>
    )
}


