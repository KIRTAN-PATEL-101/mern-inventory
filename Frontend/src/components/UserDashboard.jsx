  import React, { useState, useEffect } from 'react';
  import 'boxicons/css/boxicons.min.css';
  import SidePanelUser from './SidePanelUser';
  import HeaderUser from './HeaderUser';
  import Order from './Order';
  import axios from 'axios';

  const Dashboard = () => {
    const [items, setItems] = useState([]);
    const [statData, setStatData] = useState({});
    const [showTable, setShowTable] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
      axios.get('http://localhost:8000/users/dashboard', { withCredentials: true })
        .then(response => {
          const data = response.data.data;
          setStatData(data);
          console.log(data);
          setItems(data.items);
          console.log(data.items);
        })
        .catch(error => {
          console.log(error);
        });
    }, []);

    const handleItemClick = (item) => {
      setSelectedItem(item);
      setShowTable(true);
    };

    const handleClose = () => {
      setShowTable(false);
      setSelectedItem(null);
    };

    return (
      <div className="flex flex-col lg:flex-row">
        <SidePanelUser />
        <section id="content" className="relative w-full lg:ml-72 transition-all">
          <HeaderUser />
          <main className="p-4 lg:p-9 font-poppins max-h-[calc(100vh-3.5rem)] overflow-y-auto bg-gray-200 w-full">
            <div className="head-title flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 flex-wrap">
              <div className="left">
                <h1 className="text-2xl lg:text-3xl font-semibold text-gray-800">Dashboard</h1>
                <ul className="breadcrumb flex items-center gap-4">
                  <li className="text-gray-800">Dashboard</li>
                  <li className="text-gray-800"><i className='bx bx-chevron-right'></i></li>
                  <li><a className="active text-blue-500" href="#">Home</a></li>
                </ul>
              </div>
            </div>

            <ul className="box-info grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-9">
              <li className="p-6 bg-white rounded-2xl flex items-center gap-6">
                <div className="w-16 lg:w-20 h-16 lg:h-20 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className='bx bxs-calendar-check text-blue-500 text-3xl lg:text-4xl'></i>
                </div>
                <div className="text">
                  <h3 className="text-xl lg:text-2xl font-semibold text-gray-800">{statData.inventoryCount}</h3>
                  <p className="text-gray-800">Total inventories</p>
                </div>
              </li>
              <li className="p-6 bg-white rounded-2xl flex items-center gap-6">
                <div className="w-16 lg:w-20 h-16 lg:h-20 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <i className='bx bxs-group text-yellow-500 text-3xl lg:text-4xl'></i>
                </div>
                <div className="text">
                  <h3 className="text-xl lg:text-2xl font-semibold text-gray-800">{statData.itemsCount}</h3>
                  <p className="text-gray-800">Items count</p>
                </div>
              </li>
              <li className="p-6 bg-white rounded-2xl flex items-center gap-6" onClick={() => handleItemClick(statData)}>
                <div className="w-16 lg:w-20 h-16 lg:h-20 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className='bx bxs-dollar-circle text-orange-500 text-3xl lg:text-4xl'></i>
                </div>
                <div className="text">
                  <h3 className="text-xl lg:text-2xl font-semibold text-gray-800">{statData.itemsTriggerCount}</h3>
                  <p className="text-gray-800">Total Triggers</p>
                </div>
              </li>
            </ul>
            <div className="flex flex-wrap gap-6 mt-9">
              <Order />
            </div>
            <div className='w-full lg:w-3/6 flex justify-center overflow-hidden'>
            </div>
          </main>
        </section>

        {showTable && selectedItem && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-sm w-full ">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={handleClose}
              >
                &times;
              </button>
              <h2 className="text-2xl font-semibold mb-4 text-center">Inventory Details</h2>
              <table className="min-w-full bg-white text-center">
                <thead>
                  <tr>
                  <th className="py-2 px-4 border-b">Inventory</th>
                    <th className="py-2 px-4 border-b">Item</th>
                    <th className="py-2 px-4 border-b">Stock</th>
                    <th className="py-2 px-4 border-b">Trigger Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => (
                    <tr key={item.id} onClick={() => handleItemClick(item)}>
                      <td className="py-2 px-4 border-b">-</td>
                      <td className="py-2 px-4 border-b">{item.itemName}</td>
                      <td className="py-2 px-4 border-b">{item.stock}</td>
                      <td className="py-2 px-4 border-b">{item.triggerAmount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default Dashboard;
