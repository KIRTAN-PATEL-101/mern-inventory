import React, { useState,useEffect } from 'react';
import SidePanelUser from './SidePanelUser';
import HeaderUser from './HeaderUser';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Inventory = () => {
    const [showForm, setShowForm] = useState(false);
    const [inventoryItems, setInventoryItems] = useState([]);
    const [newItem, setNewItem] = useState({
        inventoryName: '',
        inventoryId: '',
        address: '',
        country: '',
        mobileNo: '',
        managerName: '',
        category: ''
    });
    const [showRemoveOptions, setShowRemoveOptions] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState('');

    const handleAddClick = () => {
        setShowForm(!showForm);
        setShowRemoveOptions(false);
    };

    useEffect(() => {
        // Fetch user data from the backend
        axios.get('http://localhost:8000/inventory/show',{ withCredentials: true })
          .then(response => {
            console.log(response.data);  // Debug the response
            if (Array.isArray(response.data.data)) {
                setInventoryItems(response.data.data);
            } else {
              console.error('Expected an array of users, but got:', response.data);
            }
          })
          .catch(error => {
            console.error('There was an error fetching the users!', error);
          });
      }, []);

    const handleRemoveClick = () => {
        setShowRemoveOptions(!showRemoveOptions);
        setShowForm(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem({
            ...newItem,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const inventoryData ={
                inventoryName: newItem.inventoryName, 
                inventoryId: newItem.inventoryId, 
                address: newItem.address, country: 
                newItem.country, 
                mobileNo: newItem.mobileNo, 
                ManagerName: newItem.managerName, 
                category: newItem.category
            }
            try {
                // Post the new item data to the backend
                const response = await axios.post('http://localhost:8000/inventory/add', inventoryData, { withCredentials: true });
                console.log('Response from backend:', response.data);
        
                // Update the local state with the new item
                setInventoryItems([...inventoryItems, inventoryData]);
        

                setNewItem({
                    inventoryName: '',
                    inventoryId: '',
                    address: '',
                    country: '',
                    mobileNo: '',
                    managerName: '',
                    category: ''
                });
                setShowForm(false);
            } catch (error) {
                console.error('Error posting data to backend:', error);
            }
        };

        const handleRemoveItem = async () => {
            try {

                const response = await axios.delete(`http://localhost:8000/inventory/delete/${selectedItemId}`, { withCredentials: true });
                console.log('Response from backend:', response.data);
        
                setInventoryItems(inventoryItems.filter(item => item.inventoryId !== selectedItemId));
        
                // Clear the selected item ID and hide remove options
                setSelectedItemId('');
                setShowRemoveOptions(false);
            } catch (error) {
                console.error('Error deleting item from backend:', error);
                // Handle error (optional)
            }
        };

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        };  

    return (
        <div className="flex">
            <SidePanelUser />
            <section id="content" className="relative w-full ml-72 transition-all">
                <HeaderUser />
                <div id="Item-list" className="text-center p-4 bg-white rounded-lg shadow-lg overflow-auto mx-4 my-4">
                    <h1 className="text-2xl font-bold mb-4">Inventory</h1>
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
                    </div>
                    {showForm && (
                        <div className="bg-gray-100 p-5 rounded shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ width: '600px', margin: '25% 0 0 0' }}>
                            <button onClick={() => setShowForm(false)} className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-900">
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="inventoryName" className="block font-bold text-gray-700 mb-2">Inventory Name</label>
                                    <input
                                        type="text"
                                        id="inventoryName"
                                        placeholder='Inventory Name...'
                                        name="inventoryName"
                                        value={newItem.inventoryName}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="inventoryId" className="block font-bold text-gray-700 mb-2">Inventory Id</label>
                                    <input
                                        type="text"
                                        id="inventoryId"
                                        placeholder='Inventory Id...'
                                        name="inventoryId"
                                        value={newItem.inventoryId}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="managerName" className="block font-bold text-gray-700 mb-2">Manager Name</label>
                                    <input
                                        type="text"
                                        id="managerName"
                                        name="managerName"
                                        placeholder='Manager Name...'
                                        value={newItem.managerName}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="mobileNo" className="block font-bold text-gray-700 mb-2">Mobile No</label>
                                    <input
                                        type="text"
                                        id="mobileNo"
                                        name="mobileNo"
                                        placeholder='Mobile No...'
                                        value={newItem.mobileNo}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="category" className="block font-bold text-gray-700 mb-2">Category</label>
                                    <input
                                        type="text"
                                        id="category"
                                        name="category"
                                        placeholder='Category...'
                                        value={newItem.category}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="address" className="block font-bold text-gray-700 mb-2">Address</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        placeholder='Address...'
                                        value={newItem.address}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="country" className="block font-bold text-gray-700 mb-2">Country</label>
                                    <input
                                        type="text"
                                        id="country"
                                        name="country"
                                        placeholder='Country...'
                                        value={newItem.country}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded font-bold hover:bg-blue-700">Submit</button>
                            </form>
                        </div>
                    )}
                    <table className="table-auto w-full mt-4">
                        <thead className="bg-blue-500 text-white">
                            <tr className="text-center">
                                <th className="p-2">Name</th>
                                <th className="p-2">ID</th>
                                <th className="p-2">Manager Name</th>
                                <th className="p-2">Category</th>
                                <th className="p-2">Address</th>
                                <th className="p-2">Created</th>
                                <th className="p-2">View</th>
                                {showRemoveOptions && <th className="p-2">Select</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {inventoryItems.map((item, index) => (
                                <tr className={`text-center ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-200`} key={item.inventoryId}>
                                    <td className="p-2">{item.inventoryName}</td>
                                    <td className="p-2">{item.inventoryId}</td>
                                    <td className="p-2">{item.ManagerName}</td>
                                    <td className="p-2">{item.category}</td>
                                    <td className="p-2">{item.address}</td>
                                    <td className="p-2">{formatDate(item.createdAt)}</td>
                                    <td className="p-2">
                                        <Link to={`/inventory/${item.inventoryId}`} state={{ item }} className="bg-transparent border border-blue-500 text-blue-500 px-2 py-1 rounded hover:bg-blue-500 hover:text-white">
                                            View
                                        </Link>
                                    </td>
                                    {showRemoveOptions && (
                                        <td className="p-2">
                                            <input
                                                type="radio"
                                                name="removeItem"
                                                value={item.inventoryId}
                                                onChange={() => setSelectedItemId(item.inventoryId)}
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
        </div>
    );
};

export default Inventory;