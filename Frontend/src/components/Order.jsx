import React from 'react';

const OrdersTable = () => {
  const orders = [
    { user: 'Amit Shah', dateOrder: '02-10-2021', status: 'In Process' },
    { user: 'Rahul Gupta', dateOrder: '03-10-2021', status: 'Pending' },
  ];

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Date Order</th>
            <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img className="h-10 w-10 rounded-full" src="path_to_user_avatar" alt="" />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm leading-5 font-medium text-gray-900">{order.user}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-900">{order.dateOrder}</div>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-orange-100 text-orange-800'>
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;