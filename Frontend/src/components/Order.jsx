import React from 'react';
import 'boxicons/css/boxicons.min.css';

const Order = () => {
  return (
    <div className="order flex-grow bg-white p-6 rounded-2xl">
      <div className="head flex items-center gap-4 mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">Recent Orders</h3>
        <i className='bx bx-search cursor-pointer text-gray-800'></i>
        <i className='bx bx-filter cursor-pointer text-gray-800'></i>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-4 text-gray-800">User</th>
            <th className="py-4 text-gray-800">Date Order</th>
            <th className="py-4 text-gray-800">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-200">
            <td className="py-4 flex items-center gap-3 pl-1.5">
              <img src="img/pic2.png" alt="user" className="w-9 h-9 rounded-full object-cover" />
              <p className="text-gray-800">Amit Shah</p>
            </td>
            <td className="py-4">02-10-2021</td>
            <td className="py-4"><span className="status-process">In Process</span></td>
          </tr>
          <tr className="hover:bg-gray-200">
            <td className="py-4 flex items-center gap-3 pl-1.5">
              <img src="img/pic3.png" alt="user" className="w-9 h-9 rounded-full object-cover" />
              <p className="text-gray-800">Rahul Gupta</p>
            </td>
            <td className="py-4">03-10-2021</td>
            <td className="py-4"><span className="status-pending">Pending</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Order;
