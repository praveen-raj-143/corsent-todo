import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  // const [filteredTodos, setFilteredTodos] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    // Fetch todos from the API
    axios.get('https://jsonplaceholder.typicode.com/users/1/todos')
      .then(response => {
        setTodos(response.data);
        // setFilteredTodos(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTodo = {
        id: todos.length + 1,
        title: newTask,
        completed: false
      };
      setTodos([...todos, newTodo]);
      // setFilteredTodos([...todos, newTodo]);
      setNewTask('');
    }
  };

  const toggleCompleted = id => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    // filterTasks(showCompleted);
  };

  const editTask = (id, newTitle) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );
    setTodos(updatedTodos);
    // filterTasks(showCompleted);
  };

  const deleteTask = id => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    // filterTasks(showCompleted);
  };

  // const filterTasks = (completed) => {
  //   setShowCompleted(completed);
  //   if (completed) {
  //     const completedTasks = todos.filter(todo => todo.completed);
  //     setFilteredTodos(completedTasks);
  //   } else {
  //     setFilteredTodos(todos);
  //   }
  // };

  const filteredTodos = showCompleted ? todos.filter(todo => todo.completed) : todos;

  return (
    <div className="App">
      <h1 className='title'>Todo List</h1>
      <div className='inptbtn'>
        <input className='inputfeild'
          type="text"
          placeholder="Add new task..."
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
        />
        <button className='addbtn' onClick={addTask}>Add Task</button>
      </div>
      <br/>
      {/* <div >
        <button className='tsk' onClick={() => filterTasks(false)}>All Tasks</button>
        <button className='tsk' onClick={() => filterTasks(true)}>Completed Tasks</button>
      </div> */}
      <div className='tskbtn'>
        <button className='tsk' onClick={() => setShowCompleted(false)}>All Tasks</button>
        <button className='tsk' onClick={() => setShowCompleted(true)}>Completed Tasks</button>
      </div>
      <br/>
      <div className='tasklist' type='none'>
        {filteredTodos.map(todo => (
          <p key={todo.id} className='task'>
            <div
            className='list'
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => toggleCompleted(todo.id)}
            >
              {todo.title}
            </div>
            <div>
            <button className='addbtn' 
            style={{ display: todo.completed ? 'none' : '' }}
            onClick={() => editTask(todo.id, prompt('Edit task:', todo.title))}>
              Edit
            </button>
            
            <button className='addbtn' onClick={() => deleteTask(todo.id)}>Delete</button>
            </div>
            
          </p>
          
        ))}
        
      </div>
    </div>
  );
}

export default App;
