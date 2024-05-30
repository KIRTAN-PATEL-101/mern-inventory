import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidePanel from './SidePanel';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([
  { id: '01', name: 'Jessica', email: 'Jessica427@gmail.com', phoneno: '9825357891', createdAt: '24-05-2024' },
  { id: '02', name: 'Adriana', email: 'Adriana127@gmail.com', phoneno: '9878357432', createdAt: '25-05-2024' },
  { id: '03', name: 'Carolina ', email: 'Carolina627@gmail.com', phoneno: '9856684690', createdAt: '26-05-2024' },
  { id: '04', name: 'Alejandro ', email: 'Alejandro496@gmail.com', phoneno: '9867895670', createdAt: '27-05-2024' },]);
  const navigate = useNavigate();


  const handleViewItem = (item) => {
    const id = item.id;
    navigate(`/superAdmin/users/${id}/inventory`);
  }

  return (
    <div>
      <div className="flex">
        <SidePanel />
        <section id="content" className="relative w-full ml-72 transition-all">
          <Header />
          <main>
            <section className="Item">
              <div id="item-box-1" className="item-view-box hidden"></div>
              <div id="Item-list" className="text-center p-4 bg-white rounded-lg shadow-lg overflow-auto mx-4 my-4">
                <h1 className="text-2xl font-bold mb-4">Users</h1>
                <table className="w-full table-auto">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 bg-blue-500 text-white">ID</th>
                      <th className="px-4 py-2 bg-blue-500 text-white">Name</th>
                      <th className="px-4 py-2 bg-blue-500 text-white">Email</th>
                      <th className="px-4 py-2 bg-blue-500 text-white">Phone No.</th>
                      <th className="px-4 py-2 bg-blue-500 text-white">Created At</th>
                      <th className="px-4 py-2 bg-blue-500 text-white">View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((item, index) => (
                      <tr className={`text-center ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-200`} key={item.id}>
                        <td className="px-4 py-2">{item.id}</td>
                        <td className="px-4 py-2">{item.name}</td>
                        <td className="px-4 py-2">{item.email}</td>
                        <td className="px-4 py-2">{item.phoneno}</td>
                        <td className="px-4 py-2">{item.createdAt}</td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => handleViewItem(item)}
                            className="bg-transparent border border-blue-500 text-blue-500 px-2 py-1 rounded hover:bg-blue-500 hover:text-white"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </main>
        </section>
      </div>
    </div>
  );
}

export default Users;
