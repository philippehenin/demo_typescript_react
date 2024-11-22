# demo_typescript_react
just copilot generate examples
init to test git pull

phe@debian-phe:~/Demos/demo_typescript_react$ npm install axios json-server @types/json-server
npm WARN EBADENGINE Unsupported engine {
npm WARN EBADENGINE   package: 'milliparsec@4.0.0',
npm WARN EBADENGINE   required: { node: '>=20' },
npm WARN EBADENGINE   current: { node: 'v18.19.0', npm: '9.2.0' }
npm WARN EBADENGINE }

added 69 packages in 9s

15 packages are looking for funding
  run `npm fund` for details


************************************************************************************************


{
  "todos": [
    { "id": 1, "title": "Acheter du pain", "completed": false },
    { "id": 2, "title": "Faire les courses", "completed": true }
  ]
}





************************************************************************************************
phe@debian-phe:~/Demos/demo_typescript_react$ nvim db.json
phe@debian-phe:~/Demos/demo_typescript_react$ 
phe@debian-phe:~/Demos/demo_typescript_react$ npx json-server --watch db.json
--watch/-w can be omitted, JSON Server 1+ watches for file changes by default
JSON Server started on PORT :3000
Press CTRL-C to stop
Watching db.json...

♡⸜(˶˃ ᵕ ˂˶)⸝♡

Index:
http://localhost:3000/

Static files:
Serving ./public directory if it exists

Endpoints:
http://localhost:3000/todos

************************************************************************************************
************************************************************************************************
TodoList.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get<Todo[]>('http://localhost:3000/todos');
        setTodos(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des tâches:', error);
      }
    };

    fetchTodos();
  }, []);

  const handleToggleComplete = async (id: number) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (todoToUpdate) {
        const updatedTodo = { ...todoToUpdate, completed: !todoToUpdate.completed };
        await axios.put(`http://localhost:3000/todos/${id}`, updatedTodo);
        setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la tâche:', error);
    }
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id} onClick={() => handleToggleComplete(todo.id)}>
          <input type="checkbox" checked={todo.completed} readOnly />
          <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.title}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;

************************************************************************************************

