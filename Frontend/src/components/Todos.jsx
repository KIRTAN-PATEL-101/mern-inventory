import React from 'react';
import '../index.css'; // Create this CSS file based on your existing styles

const Todos = () => {
  return (
    <div className="todo">
      <div className="head">
        <h3>Todos</h3>
        <i className='bx bx-plus' ></i>
        <i className='bx bx-filter' ></i>
      </div>
      <ul className="todo-list">
        <li className="completed">
          <p>Todo List</p>
          <i className='bx bx-dots-vertical-rounded' ></i>
        </li>
        <li className="completed">
          <p>Todo List</p>
          <i className='bx bx-dots-vertical-rounded' ></i>
        </li>
        <li className="not-completed">
          <p>Todo List</p>
          <i className='bx bx-dots-vertical-rounded' ></i>
        </li>
        <li className="completed">
          <p>Todo List</p>
          <i className='bx bx-dots-vertical-rounded' ></i>
        </li>
        <li className="not-completed">
          <p>Todo List</p>
          <i className='bx bx-dots-vertical-rounded' ></i>
        </li>
      </ul>
    </div>
  );
};

export default Todos;
