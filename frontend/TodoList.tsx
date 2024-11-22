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
