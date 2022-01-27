import Todo from './Todo'
import Button from '@mui/material/Button';
import * as React from 'react'
import Form from './Form';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../App';
import { useContext } from 'react'
import { useHistory } from 'react-router';
import { List } from '@mui/material';
import { Paper } from '@mui/material';


export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const history = useHistory();
    const { user, setUser } = useContext(UserContext)


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


    const listOfTodos = todos.map((todo) => <Todo
        todo={todo} deleteTodo={deleteTodo} key={todo._id} editTodo={editTodo} />)

    return (
        <div>
            <Form addTodo={addTodo} />
            <Paper>
                <List >
                    {listOfTodos}
                </List >
            </Paper>
        </div>
    )
}


