import React, { useState } from 'react';
import 'boxicons/css/boxicons.min.css';
import SidePanelUser from './SidePanelUser';
import HeaderUser from './HeaderUser';
import Order from './Order';
import { useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {

  const [items, setItems] = useState([]);
  const [statData, setStatData] = useState({});
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/users/dashboard', { withCredentials: true })
      .then(response => {
        const data = response.data;
        setStatData(data);
        console.log(data);
        setItems(data.items);
        console.log(data.items);
      })
      .catch(error => {
        console.log(error);
      });
  });

  return (
    <div className="flex">
      <SidePanelUser />
      <section id="content" className="relative w-full ml-72 transition-all">
        <HeaderUser />
        <main className="p-9 font-poppins max-h-[calc(100vh-3.5rem)] overflow-y-auto bg-gray-200 w-full" >
          <div className="head-title flex items-center justify-between gap-4 flex-wrap">
            <div className="left">
              <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
              <ul className="breadcrumb flex items-center gap-4">
                <li className="text-gray-800">Dashboard</li>
                <li className="text-gray-800"><i className='bx bx-chevron-right'></i></li>
                <li><a className="active text-blue-500" href="#">Home</a></li>
              </ul>
            </div>
          </div>

          <ul className="box-info grid grid-cols-1 md:grid-cols-3 gap-6 mt-9">
            <li className="p-6 bg-white rounded-2xl flex items-center gap-6">
              <div className="w-20 h-20 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className='bx bxs-calendar-check text-blue-500 text-4xl'></i>
              </div>
              <div className="text">
                <h3 className="text-2xl font-semibold text-gray-800">{statData.inventoryCount}</h3>
                <p className="text-gray-800">Total inventories</p>
              </div>
            </li>
            <li className="p-6 bg-white rounded-2xl flex items-center gap-6">
              <div className="w-20 h-20 bg-yellow-100 rounded-lg flex items-center justify-center">
                <i className='bx bxs-group text-yellow-500 text-4xl'></i>
              </div>
              <div className="text">
                <h3 className="text-2xl font-semibold text-gray-800">{statData.itemsCount}</h3>
                <p className="text-gray-800">Items count</p>
              </div>
            </li>
            <li className="p-6 bg-white rounded-2xl flex items-center gap-6">
              <div className="w-20 h-20 bg-orange-100 rounded-lg flex items-center justify-center">
                <i className='bx bxs-dollar-circle text-orange-500 text-4xl'></i>
              </div>
              <div className="text">
                <h3 className="text-2xl font-semibold text-gray-800">{statData.itemsTriggerCount}</h3>
                <p className="text-gray-800">Total Trigers</p>
              </div>
            </li>
          </ul>
          <div className="flex flex-wrap gap-6 mt-9">
            <Order />
          </div>
        </main>
      </section>
    </div>
  );
};

export default Dashboard;
