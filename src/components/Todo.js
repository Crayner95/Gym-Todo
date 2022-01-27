import * as React from 'react';
import { useState, useEffect } from 'react';
import { BsTrash } from 'react-icons/bs';
import { BiMessageEdit } from 'react-icons/bi';
import { MdSaveAlt } from 'react-icons/md';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { TextField } from '@mui/material';


export default function Todo({ todo, deleteTodo, editTodo }) {
    const [checked, setChecked] = useState(todo.isChecked);
    const [editText, setEditText] = useState(todo.note)
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        editTodo(todo._id, editText, checked)
    }, [checked])

    const handleCheck = () => {
        setChecked(!checked)
    }

    const updateTodo = () => {
        editTodo(todo._id, editText, checked)
        setEdit(false)
    };

    return (

        <ListItem
            secondaryAction={
                <div>
                    {!edit && (<IconButton edge="end" aria-label="comments">
                        <BiMessageEdit onClick={() => setEdit(true)} />
                    </IconButton>)}
                    {edit && (<IconButton edge="end" aria-label="comments">
                        <MdSaveAlt onClick={updateTodo} />
                    </IconButton>)}
                    <IconButton edge="end" aria-label="comments">
                        <BsTrash onClick={() => deleteTodo(todo._id)} />
                    </IconButton>
                </div>

            }
            disablePadding
        >
            <ListItemButton dense>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={checked}
                        onChange={handleCheck}

                    />
                </ListItemIcon>
                {edit ? (<TextField
                    sx={{ paddingRight: 5 }}
                    fullWidth
                    size='small'
                    type="text"
                    onChange={(e) => setEditText(e.target.value)}
                    value={editText} />) : (<ListItemText primary={todo.note} />)}
            </ListItemButton>
        </ListItem>


    )
}

