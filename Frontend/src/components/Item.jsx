import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import SidePanel from './SidePanel';

function ItemList() {
  const [showForm, setShowForm] = useState(false);
  const [showRemoveOptions, setShowRemoveOptions] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [showNotifyForm, setShowNotifyForm] = useState(false);
  const [notificationInfo, setNotificationInfo] = useState({
    name: '',
    notifyByEmail: false,
    notifyBySms: false,
    notifyByWhatsApp: false
  });

  const [items, setItems] = useState([
    { id: '01', name: 'Laptop', owner: 'John Doe', createdDate: '2024-05-01', inventoryName: 'Office Supplies', quantityLeft: 10, inStock: 'Yes', description: 'A powerful laptop' },
    { id: '02', name: 'Desk', owner: 'Jane Smith', createdDate: '2024-05-02', inventoryName: 'Office Furniture', quantityLeft: 0, inStock: 'No', description: 'A sturdy desk' }
  ]);

  const [newItem, setNewItem] = useState({
    id: '',
    name: '',
    owner: '',
    createdDate: '',
    inventoryName: '',
    quantityLeft: '',
    inStock: '',
    description: ''
  });

  const handleAddClick = () => {
    setShowForm(!showForm);
    setShowRemoveOptions(false);
    setShowNotifyForm(false);
  };

  const handleRemoveClick = () => {
    setShowRemoveOptions(!showRemoveOptions);
    setShowForm(false);
    setShowNotifyForm(false);
  };

  const handleNotifyClick = () => {
    setShowNotifyForm(!showNotifyForm);
    setShowForm(false);
    setShowRemoveOptions(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({
      ...newItem,
      [name]: value
    });
  };

  const handleNotificationChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNotificationInfo({
      ...notificationInfo,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setItems([...items, newItem]);
    setNewItem({
      id: '',
      name: '',
      owner: '',
      createdDate: '',
      inventoryName: '',
      quantityLeft: '',
      inStock: '',
      description: ''
    });
    setShowForm(false);
  };

  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    // Implement notification logic here
    alert(`Notification set for ${notificationInfo.name}`);
    setShowNotifyForm(false);
  };

  const handleRemoveItem = () => {
    setItems(items.filter(item => item.id !== selectedItemId));
    setSelectedItemId('');
    setShowRemoveOptions(false);
  };

  return (
    <div className="flex">
      <SidePanel />
      <section id="content" className="relative w-full ml-72 transition-all">
        <Header />
        <main>
          <section className="Item">
            <div id="item-box-1" className="item-view-box hidden"></div>
            <div id="Item-list" className="text-center p-4 bg-white rounded-lg shadow-lg overflow-auto mx-4 my-4">
              <h1 className="text-2xl font-bold mb-4">Items</h1>
              <div className="flex justify-end mb-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
                  onClick={handleAddClick}
                >
                  {showForm ? 'Close' : 'Add'}
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={handleRemoveClick}
                >
                  {showRemoveOptions ? 'Cancel' : 'Remove'}
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={handleNotifyClick}
                  style={{ marginLeft: '7px' }}
                >
                  Notify Me
                </button>
              </div>
              {showForm && (
                <div className="bg-gray-100 p-5 rounded shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ width: '600px', margin: '30% 0 0 0' }}>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="id" className="block font-bold text-gray-700 mb-2">ID:</label>
                      <input
                        type="text"
                        id="id"
                        name="id"
                        value={newItem.id}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="name" className="block font-bold text-gray-700 mb-2">Name:</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={newItem.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="owner" className="block font-bold text-gray-700 mb-2">Owner:</label>
                      <input
                        type="text"
                        id="owner"
                        name="owner"
                        value={newItem.owner}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="createdDate" className="block font-bold text-gray-700 mb-2">Created date:</label>
                      <input
                        type="date"
                        id="createdDate"
                        name="createdDate"
                        value={newItem.createdDate}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="inventoryName" className="block font-bold text-gray-700 mb-2">Inventory Name:</label>
                      <input
                        type="text"
                        id="inventoryName"
                        name="inventoryName"
                        value={newItem.inventoryName}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="quantityLeft" className="block font-bold text-gray-700 mb-2">Quantity left:</label>
                      <input
                        type="number"
                        id="quantityLeft"
                        name="quantityLeft"
                        value={newItem.quantityLeft}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="inStock" className="block font-bold text-gray-700 mb-2">In stock:</label>
                      <input
                        type="text"
                        id="inStock"
                        name="inStock"
                        value={newItem.inStock}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="description" className="block font-bold text-gray-700 mb-2">Description:</label>
                      <textarea
                        id="description"
                        name="description"
                        value={newItem.description}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded h-24"
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded font-bold hover:bg-blue-700">Submit</button>
                  </form>
                </div>
              )}
              {showNotifyForm && (
                <div className="bg-gray-100 p-5 rounded shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ width: '600px', margin: '30% 0 0 0' }}>
                  <form onSubmit={handleNotificationSubmit}>
                    <div className="mb-4">
                      <label htmlFor="name" className="block font-bold text-gray-700 mb-2">Name:</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={notificationInfo.name}
                        onChange={handleNotificationChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block font-bold text-gray-700 mb-2">Notify me by:</label>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="notifyByWhatsApp"
                          name="notifyByWhatsApp"
                          checked={notificationInfo.notifyByWhatsApp}
                          onChange={handleNotificationChange}
                          className="mr-2"
                        />
                        <label htmlFor="notifyByWhatsApp" className="text-gray-700">WhatsApp</label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="notifyByEmail"
                          name="notifyByEmail"
                          checked={notificationInfo.notifyByEmail}
                          onChange={handleNotificationChange}
                          className="mr-2"
                        />
                        <label htmlFor="notifyByEmail" className="text-gray-700">Email</label>
                      </div>
                      <div className="flex items-center mt-2">
                        <input
                          type="checkbox"
                          id="notifyBySms"
                          name="notifyBySms"
                          checked={notificationInfo.notifyBySms}
                          onChange={handleNotificationChange}
                          className="mr-2"
                        />
                        <label htmlFor="notifyBySms" className="text-gray-700">SMS</label>
                      </div>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded font-bold hover:bg-blue-700">Submit</button>
                  </form>
                </div>
              )}
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 bg-blue-500 text-white">ID</th>
                    <th className="px-4 py-2 bg-blue-500 text-white">Name</th>
                    <th className="px-4 py-2 bg-blue-500 text-white">Owner</th>
                    <th className="px-4 py-2 bg-blue-500 text-white">Created date</th>
                    <th className="px-4 py-2 bg-blue-500 text-white">Inventory Name</th>
                    <th className="px-4 py-2 bg-blue-500 text-white">Quantity left</th>
                    <th className="px-4 py-2 bg-blue-500 text-white">In stock</th>
                    <th className="px-4 py-2 bg-blue-500 text-white">Description</th>
                    {showRemoveOptions && <th className="px-4 py-2 bg-blue-500 text-white">Select</th>}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr className={`text-center ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-200`} key={item.id}>
                      <td className="px-4 py-2">{item.id}</td>
                      <td className="px-4 py-2">{item.name}</td>
                      <td className="px-4 py-2">{item.owner}</td>
                      <td className="px-4 py-2">{item.createdDate}</td>
                      <td className="px-4 py-2">{item.inventoryName}</td>
                      <td className="px-4 py-2">{item.quantityLeft}</td>
                      <td className={`px-4 py-2 ${item.inStock === 'Yes' ? 'text-green-500' : 'text-red-500'}`}>{item.inStock}</td>
                      <td className="px-4 py-2">{item.description}</td>
                      {showRemoveOptions && (
                        <td className="px-4 py-2">
                          <input
                            type="radio"
                            name="removeItem"
                            value={item.id}
                            onChange={() => setSelectedItemId(item.id)}
                          />
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              {showRemoveOptions && (
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={handleRemoveItem}
                    disabled={!selectedItemId}
                  >
                    Confirm Remove
                  </button>
                </div>
              )}
            </div>
          </section>
        </main>
      </section>
    </div>
  );
}

export default ItemList;
