import React, { useState, useEffect } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // when app loads, we need to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    // fires when the app.js loads
    db.collection('todos')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  }, []);

  const addTodo = (e) => {
    e.preventDefault();

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput('');
  };

  return (
    <div className='App'>
      <h1>Todo List with React ⚛️ | Firebase 🔥 </h1>
      <form className='form'>
        <FormControl>
          <InputLabel>Write a Todo</InputLabel>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
        </FormControl>
        <Button
          style={{ marginLeft: '1rem' }}
          disabled={!input}
          type='submit'
          onClick={addTodo}
          variant='contained'
          color='primary'>
          Add Todo
        </Button>
      </form>

      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
