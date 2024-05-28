import React from 'react';
import Orders from './Orders';
import Todos from './Todos';
import '../index.css'; // Create this CSS file based on your existing styles

const Main = () => {
  return (
    <main>
      <div className="head-title">
        <div className="left">
          <h1>Dashboard</h1>
          <ul className="breadcrumb">
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li><i className='bx bx-chevron-right' ></i></li>
            <li>
              <a className="active" href="#">Home</a>
            </li>
          </ul>
        </div>
        
      </div>

      <ul className="box-info">
        <li>
          <i className='bx bxs-calendar-check' ></i>
          <span className="text">
            <h3>1020</h3>
            <p>New Order</p>
          </span>
        </li>
        <li>
          <i className='bx bxs-group' ></i>
          <span className="text">
            <h3>2834</h3>
            <p>Visitors</p>
          </span>
        </li>
        <li>
          <i className='bx bxs-dollar-circle' ></i>
          <span className="text">
            <h3>$2543</h3>
            <p>Total Sales</p>
          </span>
        </li>
      </ul>

      <div className="table-data">
        <Orders />
        <Todos />
      </div>
    </main>
  );
};

export default Main;
