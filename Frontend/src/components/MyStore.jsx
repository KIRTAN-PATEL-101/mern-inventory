import React, { useState } from 'react';
import SidePanel from './SidePanel';
import Header from './Header';

const InventoryComponent = () => {
    const [showForm, setShowForm] = useState(false);

    const handleAddClick = () => {
        setShowForm(!showForm);
    };

    return (
      <div className="flex">
      <SidePanel />
      <section id="content" className="relative w-full ml-72 transition-all">
          <Header />
          <div id="Item-list" className="text-center p-4 rounded-lg shadow-lg overflow-auto mx-4 my-4" style={{background:"#F9F9F9"}}>
              <h1 className="text-2xl font-bold mb-4">Inventory</h1>
              <div className="flex justify-end mb-4">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700" onClick={handleAddClick}>
                      {showForm ? 'Close' : 'Add'}
                  </button>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Remove</button>
              </div>
              {showForm && (
                  <div className="bg-gray-100 p-5 rounded shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ width: '600px', margin: "20% 0 0 0" }}>
                      <form action="submit_form.php" method="POST">
                                <div className="mb-4">
                                    <label htmlFor="inventoryName" className="block font-bold text-gray-700 mb-2">Inventory Name:</label>
                                    <input type="text" id="inventoryName" name="inventoryName" className="w-full p-2 border border-gray-300 rounded" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="ownerName" className="block font-bold text-gray-700 mb-2">Owner Name:</label>
                                    <input type="text" id="ownerName" name="ownerName" className="w-full p-2 border border-gray-300 rounded" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="inventoryId" className="block font-bold text-gray-700 mb-2">Inventory ID:</label>
                                    <input type="text" id="inventoryId" name="inventoryId" className="w-full p-2 border border-gray-300 rounded" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="createdOnDate" className="block font-bold text-gray-700 mb-2">Created on Date:</label>
                                    <input type="date" id="createdOnDate" name="createdOnDate" className="w-full p-2 border border-gray-300 rounded" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="category" className="block font-bold text-gray-700 mb-2">Category:</label>
                                    <input type="text" id="category" name="category" className="w-full p-2 border border-gray-300 rounded" required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="description" className="block font-bold text-gray-700 mb-2">Description:</label>
                                    <textarea id="description" name="description" className="w-full p-2 border border-gray-300 rounded h-24" required></textarea>
                                </div>
                                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded font-bold hover:bg-blue-700">Submit</button>
                            </form>
                        </div>
                    )}
                    <table className="table-auto w-full mt-4">
                        <thead className="bg-blue-500 text-white rounded">
                            <tr className="text-center">
                                <th className="p-2">Name</th>
                                <th className="p-2">ID</th>
                                <th className="p-2">Created</th>
                                <th className="p-2">View</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="text-center bg-white hover:bg-gray-200">
                                <td className="p-2">Gajanan store</td>
                                <td className="p-2">01</td>
                                <td className="p-2">03-5-24</td>
                                <td className="p-2">
                                    <button className="bg-transparent border border-blue-500 text-blue-500 px-2 py-1 rounded hover:bg-blue-500 hover:text-white">View</button>
                                </td>
                            </tr>
                            <tr className="text-center bg-white hover:bg-gray-200">
                                <td className="p-2">Harikrishna Store</td>
                                <td className="p-2">02</td>
                                <td className="p-2">03-5-24</td>
                                <td className="p-2">
                                    <button className="bg-transparent border border-blue-500 text-blue-500 px-2 py-1 rounded hover:bg-blue-500 hover:text-white">View</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default InventoryComponent;
