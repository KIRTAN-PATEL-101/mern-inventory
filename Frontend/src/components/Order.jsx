import React from 'react';

const Order = () => {
  return (
    <div className="order flex-grow bg-white p-6 rounded-2xl">
      <div className="head flex items-center gap-4 mb-6">
        <h3 className="text-2xl font-semibold text-gray-800">Recent Orders</h3>
        {/* <i className='bx bx-search cursor-pointer text-gray-800'></i>
        <i className='bx bx-filter cursor-pointer text-gray-800'></i> */}
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-4 px-2 text-left" style={{background:"#3C91E6",color:"white"}}>User</th>
            <th className="py-4 px-2 text-left" style={{background:"#3C91E6",color:"white"}}>Date Order</th>
            <th className="py-4 px-2 text-left" style={{background:"#3C91E6",color:"white"}}>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-200">
            <td className="py-4 px-2 flex items-center gap-3">
              <p className="text-gray-800">Jessica</p>
            </td>
            <td className="py-4 px-2">02-10-2021</td>
            <td className="py-4 px-2"><span className="status-process bg-yellow-500 text-white px-3 py-1 rounded-full text-xs">In Process</span></td>
          </tr>
          <tr className="hover:bg-gray-200">
            <td className="py-4 px-2 flex items-center gap-3">
              <p className="text-gray-800">Adriana</p>
            </td>
            <td className="py-4 px-2">03-10-2021</td>
            <td className="py-4 px-2"><span className="status-pending bg-orange-500 text-white px-3 py-1 rounded-full text-xs">Pending</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Order;
