import Todo from './Todo'
import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react'
import Form from './Form';
import { useState, useEffect } from 'react';
import axios from 'axios';


export default function TodoList() {
    const [todos, setTodos] = useState([]);


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
    const editTodo = async (_id, note) => {
        const updatedTodo = await axios.put(`/api/todos/${_id}`, { note: note });
        const allTodos = await axios.get(`/api/todos`);
        setTodos(allTodos.data);
    }

    const listOfTodos = todos.map((todo) => <Todo
        todo={todo} deleteTodo={deleteTodo} key={todo.id} editTodo={editTodo} />)

    return (
        <div>
            <Form addTodo={addTodo} />
            {listOfTodos}
        </div>
    )
}


