import { useState,useEffect } from 'react';
import SidePanel from './SidePanel';
import Header from './Header';
import { Link } from 'react-router-dom';
import axios from 'axios';
const InventoryComponent = () => {
    const [showForm, setShowForm] = useState(false);
    const [inventoryItems, setInventoryItems] = useState([]);
    const [newItem, setNewItem] = useState({
        name: '',
        ownerName: '',
        id: '',
        createdOn: '',
        category: '',
        description: ''
    });
    useEffect(() => {
        // Fetch user data from the backend
        axios.get('http://localhost:8000/superAdmin/inventory',{ withCredentials: true })
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
    const [showRemoveOptions, setShowRemoveOptions] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState('');

    // const handleAddClick = () => {
    //     setShowForm(!showForm);
    //     setShowRemoveOptions(false);
    // };

    // const handleRemoveClick = () => {
    //     setShowRemoveOptions(!showRemoveOptions);
    //     setShowForm(false);
    // };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem({
            ...newItem,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setInventoryItems([
            ...inventoryItems,
            { name: newItem.name, id: newItem.id, createdOn: newItem.createdOn }
        ]);
        setNewItem({
            name: '',
            ownerName: '',
            id: '',
            createdOn: '',
            category: '',
            description: ''
        });
        setShowForm(false);
    };

    const handleRemoveItem = () => {
        setInventoryItems(inventoryItems.filter(item => item.id !== selectedItemId));
        setSelectedItemId('');
        setShowRemoveOptions(false);
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
            <SidePanel />
            <section id="content" className="relative w-full ml-72 transition-all">
                <Header />
                <div id="Item-list" className="text-center p-4 bg-white rounded-lg shadow-lg overflow-auto mx-4 my-4">
                    <h1 className="text-2xl font-bold mb-4">All Inventory</h1>
                    <div className="flex justify-end mb-4">
                        {/* <button
                            className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
                            onClick={handleAddClick}
                        >
                            {showForm ? 'Close' : 'Add'}
                        </button> */}
                        {/* <button
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                            onClick={handleRemoveClick}
                        >
                            {showRemoveOptions ? 'Cancel' : 'Remove'}
                        </button> */}
                    </div>
                    {showForm && (
                        <div
                            className="bg-gray-100 p-5 rounded shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            style={{ width: '600px', margin: "20% 0 0 0" }}
                        >
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block font-bold text-gray-700 mb-2">
                                        Inventory Name:
                                    </label>
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
                                    <label htmlFor="ownerName" className="block font-bold text-gray-700 mb-2">
                                        Owner Name:
                                    </label>
                                    <input
                                        type="text"
                                        id="ownerName"
                                        name="ownerName"
                                        value={newItem.ownerName}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="id" className="block font-bold text-gray-700 mb-2">
                                        Inventory ID:
                                    </label>
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
                                    <label htmlFor="createdOn" className="block font-bold text-gray-700 mb-2">
                                        Created on Date:
                                    </label>
                                    <input
                                        type="date"
                                        id="createdOn"
                                        name="createdOn"
                                        value={newItem.createdOn}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="category" className="block font-bold text-gray-700 mb-2">
                                        Category:
                                    </label>
                                    <input
                                        type="text"
                                        id="category"
                                        name="category"
                                        value={newItem.category}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="description" className="block font-bold text-gray-700 mb-2">
                                        Description:
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={newItem.description}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded h-24"
                                        required
                                    ></textarea>
                                </div>
                                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded font-bold hover:bg-blue-700">
                                    Submit
                                </button>
                            </form>
                        </div>
                    )}
                    <table className="table-auto w-full mt-4">
                        <thead className="bg-blue-500 text-white">
                            <tr className="text-center">
                            <th className="p-2">Name</th>
                                <th className="p-2">ID</th>
                                <th className="p-2">Owner Name</th>
                                <th className="p-2">Category</th>
                                <th className="p-2">Loaction</th>
                                <th className="p-2">Created</th>
                                <th className="p-2">View</th>
                                {showRemoveOptions && <th className="p-2">Select</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {inventoryItems.map((item, index) => (
                                <tr className={`text-center ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-200`} key={item.id}>
                                    <td className="p-2">{item.inventoryName}</td>
                                    <td className="p-2">{item.inventoryId}</td>
                                    <td className="p-2">{item.ManagerName}</td>
                                    <td className="p-2">{item.category}</td>
                                    <td className="p-2">{item.address}</td>
                                    <td className="p-2">{formatDate(item.createdAt)}</td>
                                    <td className="p-2">
                                        <Link to={`/superAdmin/inventory/${item.inventoryId}`}  state={{ item }}  className="bg-transparent border border-blue-500 text-blue-500 px-2 py-1 rounded hover:bg-blue-500 hover:text-white">
                                            View
                                        </Link>
                                    </td>
                                    {showRemoveOptions && (
                                        <td className="p-2">
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
        </div>
    );
};

export default InventoryComponent;
