import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Todo from './Todo';
import { TextField, Box } from '@mui/material';


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
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <TextField
                        size='small'
                        fullWidth
                        type="text"
                        value={note}
                        onChange={handleNewTodo}
                        className="form-control"
                        placeholder="Things I need to do"
                    />
                    <Button variant="outlined" type="submit" id="button">Add</Button>
                </Box>
            </form>
            <div>
                <ul>

                </ul>
            </div>
        </React.Fragment>
    )
}


