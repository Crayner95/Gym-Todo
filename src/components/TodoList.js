import Todo from './Todo'
import * as React from 'react'
import Form from './Form';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../App';
import { useContext } from 'react'
import { useHistory } from 'react-router';
import { FormControlLabel, List, Box, Button, TextField } from '@mui/material';
import { Paper } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';



export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const history = useHistory();
    const [allChecked, setAllChecked] = useState(false)
    const { user, setUser } = useContext(UserContext)
    const [showIncomplete, setShowIncomplete] = useState(false)


    const todoLists = () => {
        (async () => {
            const allTodos = await axios.get(`/api/todos`);
            setTodos(allTodos.data);
        })()
    }

    useEffect(todoLists, [])

    //Check
    const addTodo = async (note) => {
        const newTodo = await axios.post(`/api/todos`, { note: note });
        const allTodos = [newTodo.data, ...todos];
        // same!!!
        // const allTodos = await axios.get(`/api/todos`);

        setTodos(allTodos);
    }

    //check
    const deleteTodo = async (_id) => {
        const afterDeletion = await axios.delete(`/api/todos/${_id}`);
        const removeTodo = todos.filter((note) => note._id !== _id)
        setTodos(removeTodo);
    }

    //Check
    const editTodo = async (_id, note, checked) => {
        const updatedTodo = await axios.put(`/api/todos/${_id}`, { note: note, isChecked: checked });
        const allTodos = await axios.get(`/api/todos`);
        setTodos(allTodos.data);
    }

    const handleDelete = async () => {
        for (let i = 0; i < todos.length; i++) {
            const deleteTodos = await axios.delete(`/api/todos/${todos[i]._id}`)
        }
        const allTodos = await axios.get(`/api/todos`);
        setTodos(allTodos.data);
    }

    useEffect(async () => {
        for (let i = 0; i < todos.length; i++) {
            const setAllChecked = await axios.put(`/api/todos/${todos[i]._id}`, { isChecked: allChecked });
        }
        const allTodos = await axios.get(`/api/todos`);
        setTodos(allTodos.data);
    }, [allChecked])

    const handleAllChecked = async () => {
        setAllChecked(!allChecked)
    }

    const handleShowIncomplete = () => {
        setShowIncomplete(!showIncomplete)
    }

    const listOfTodos = (showIncomplete ? todos.filter(note => note.isChecked === false) : todos).map(
        (todo) => <Todo todo={todo} deleteTodo={deleteTodo} key={todo._id} editTodo={editTodo} />)

    return (
        <div>
            <Form addTodo={addTodo} />
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ marginLeft: 3, marginRight: 3 }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                edge="start"
                                checked={allChecked}
                                onChange={handleAllChecked}

                            />}
                        label="Select All"
                    />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                edge="start"
                                checked={showIncomplete}
                                onChange={handleShowIncomplete}

                            />}
                        label="Show Incomplete"
                    />
                </Box>
                <Box>
                    <Button variant="outlined" size='small' onClick={handleDelete} id="deleteAll">Delete All</Button>
                </Box>
            </Box>
            {todos.length === 0 &&
                <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'center' }}>You have no todos</Box>
            }
            {todos.length > 0 &&
                (<Paper sx={{ marginTop: 3 }}>
                    <List >
                        {listOfTodos}
                    </List >
                </Paper>)}
        </div >
    )
}


