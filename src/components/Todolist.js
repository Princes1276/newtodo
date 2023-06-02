import React, { useState, useEffect } from "react";
import "./Todolist.css";

const Todolist = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedTodoText, setEditedTodoText] = useState("");

  useEffect(() => {
    const todosFromLocalStorage =
      JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(todosFromLocalStorage);
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue("");
      localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
    }
  };

  const handleEditTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setEditingTodoId(id);
      setEditedTodoText(todoToEdit.text);
    }
  };

  const handleSaveTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: editedTodoText };
      }
      return todo;
    });

    setTodos(updatedTodos);
    setEditingTodoId(null);
    setEditedTodoText("");
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleToggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleRemoveTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setEditedTodoText("");
  };

  const completedTodos = todos.filter((todo) => todo.completed);
  const activeTodos = todos.filter((todo) => !todo.completed);

  return (
    <div className="todo-app">
      <div className="header">
        <img
          src={process.env.PUBLIC_URL + "/books.jpg"}
          alt="Logo"
          className="logo"
        />
      </div>
      <h1>AlignedAutomation Todo App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter your todos here!"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>

      <div className="section-container">
        <div className="section">
          <h2>Pending Tasks</h2>
          <ul className="todo-list">
            {activeTodos.map((todo) => (
              <li
                key={todo.id}
                className={`todo-item ${todo.completed ? "completed" : ""}`}
              >
                {editingTodoId === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={editedTodoText}
                      onChange={(e) => setEditedTodoText(e.target.value)}
                      className="edit-input"
                    />
                    <div className="button-container">
                      <button
                        className="save-button"
                        onClick={() => handleSaveTodo(todo.id)}
                      >
                        Save
                      </button>
                      <button
                        className="cancel-button"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => handleToggleTodo(todo.id)}
                    />
                    <span>{todo.text}</span>
                    <button
                      className="edit-button"
                      onClick={() => handleEditTodo(todo.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleRemoveTodo(todo.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h2>Completed Tasks</h2>
          <ul className="todo-list">
            {completedTodos.map((todo) => (
              <li
                key={todo.id}
                className={`todo-item ${todo.completed ? "completed" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                />
                <span>{todo.text}</span>
                <button
                  className="delete-button"
                  onClick={() => handleRemoveTodo(todo.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todolist;
