import React from 'react'
import SidePanel from './SidePanel'
import Header from './Header'
import { useState } from 'react';
import ItemViewBox from './ItemViewBox';

const InventoryItems = () => {

   const [items, setItems] = useState([
      { itemld: '01', itemName: 'Cheese', createdDate: '2024-05-01', stock: 10, inStock: 'Yes' },
      { itemld: '02', itemName: 'Bread', createdDate: '2024-05-02', stock: 0, inStock: 'No' }
    ]);

    const [viewItem, setViewItem] = useState(null);

    const handleViewItem = (item) => {
      setViewItem(item);
    };
  
    const handleCloseView = () => {
      setViewItem(null);
    };

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
              <h1 className="text-2xl font-bold mb-4">Ganpat Store</h1>
              
              
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 bg-blue-500 text-white">ID</th>
                    <th className="px-4 py-2 bg-blue-500 text-white">Name</th>
                    <th className="px-4 py-2 bg-blue-500 text-white">Created date</th>
                    <th className="px-4 py-2 bg-blue-500 text-white">Quantity left</th>
                    <th className="px-4 py-2 bg-blue-500 text-white">In stock</th>
                    <th className="px-4 py-2 bg-blue-500 text-white">View</th>

                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr className={`text-center ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-200`} key={item.itemld}>
                      <td className="px-4 py-2">{item.itemld}</td>
                      <td className="px-4 py-2">{item.itemName}</td>
                      <td className="px-4 py-2">{item.createdDate}</td>
                      <td className="px-4 py-2">{item.stock}</td>
                      <td className={` px-4 py-2 ${item.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {item.stock > 0 ? 'Yes' : 'No'}
                      </td>
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
      {viewItem && <ItemViewBox item={viewItem} onClose={handleCloseView} />}
    </div>
    </div>
  )
}

export default InventoryItems
