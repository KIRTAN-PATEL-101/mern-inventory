import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SidePanel from './SidePanel';
import Header from './Header';

const ItemDetailPage = () => {
    const location = useLocation();
    const item = location.state?.item;

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
        { itemld: '01', itemName: 'Cheese', createdDate: '2024-05-01', stock: 10, inStock: 'Yes' },
        { itemld: '02', itemName: 'Bread', createdDate: '2024-05-02', stock: 0, inStock: 'No' }
    ]);

    const [newItem, setNewItem] = useState({
        itemName: '',
        itemld: '',
        pricePerUnit: '',
        stock: '',
        inventoryld: '',
        category: '',
        itemimage: null,
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
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setNewItem({
                ...newItem,
                [name]: files[0]
            });
        } else {
            setNewItem({
                ...newItem,
                [name]: value
            });
        }
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
            itemName: '',
            itemld: '',
            pricePerUnit: '',
            stock: '',
            inventoryld: '',
            category: '',
            itemimage: null,
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
        setItems(items.filter(item => item.itemld !== selectedItemId));
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
                            <h1 className="text-2xl font-bold mb-4">{item.name}</h1>
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
                                <div className="bg-gray-100 p-5 rounded shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ width: '600px', margin: "250px 0 0 0" }}>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-4">
                                            <label htmlFor="itemName" className="block font-bold text-gray-700 mb-2">Item Name</label>
                                            <input
                                                type="text"
                                                id="itemName"
                                                placeholder="Item Name..."
                                                name="itemName"
                                                value={newItem.itemName}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border border-gray-300 rounded"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="itemld" className="block font-bold text-gray-700 mb-2">Item Id</label>
                                            <input
                                                type="text"
                                                id="itemld"
                                                placeholder="Item Id..."
                                                name="itemld"
                                                value={newItem.itemld}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border border-gray-300 rounded"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="pricePerUnit" className="block font-bold text-gray-700 mb-2">Price per Unit</label>
                                            <input
                                                type="text"
                                                id="pricePerUnit"
                                                name="pricePerUnit"
                                                placeholder="Price per Unit..."
                                                value={newItem.pricePerUnit}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border border-gray-300 rounded"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="stock" className="block font-bold text-gray-700 mb-2">Stock Available</label>
                                            <input
                                                type="num"
                                                id="stock"
                                                name="stock"
                                                placeholder="Stock Available"
                                                value={newItem.stock}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border border-gray-300 rounded"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="inventoryld" className="block font-bold text-gray-700 mb-2">Inventory ID</label>
                                            <input
                                                type="text"
                                                id="inventoryld"
                                                name="inventoryld"
                                                placeholder="Inventory ID..."
                                                value={newItem.inventoryld}
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
                                                placeholder="Category..."
                                                value={newItem.category}
                                                onChange={handleInputChange}
                                                className="w-full p-2 border border-gray-300 rounded"
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="itemimage" className="block font-bold text-gray-700 mb-2">Upload Item Image</label>
                                            <input
                                                type="file"
                                                id="itemimage"
                                                name="itemimage"
                                                onChange={handleInputChange}
                                                className="w-full p-2 border border-gray-300 rounded"
                                                style={{ backgroundColor: "#edf5f3" }}
                                                required
                                            />
                                        </div>
                                        {/* <div className="mb-4">
                                    <label htmlFor="description" className="block font-bold text-gray-700 mb-2">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        placeholder="Description..."
                                        value={newItem.description}
                                        onChange={handleInputChange}
                                        className="w-full p-2 border border-gray-300 rounded h-24"
                                        required
                                    ></textarea>
                                </div> */}
                                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded font-bold hover:bg-blue-700">Submit</button>
                                    </form>
                                </div>
                            )}
                            {showNotifyForm && (
                                <div className="bg-gray-100 p-5 rounded shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ width: '600px' }}>
                                    <form onSubmit={handleNotificationSubmit}>
                                        <div className="mb-4">
                                            <label htmlFor="name" className="block font-bold text-gray-700 mb-2">Name</label>
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
                                            <label className="block font-bold text-gray-700 mb-2">Notify me by</label>
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
                                        <th className="px-4 py-2 bg-blue-500 text-white">Created date</th>
                                        <th className="px-4 py-2 bg-blue-500 text-white">Quantity left</th>
                                        <th className="px-4 py-2 bg-blue-500 text-white">In stock</th>
                                        <th className="px-4 py-2 bg-blue-500 text-white">View</th>
                                        {showRemoveOptions && <th className="px-4 py-2 bg-blue-500 text-white">Select</th>}
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
                                                <Link to={`/item/detail/${item.itemld}`} state={{ item }} className="bg-transparent border border-blue-500 text-blue-500 px-2 py-1 rounded hover:bg-blue-500 hover:text-white">
                                                    View
                                                </Link>
                                            </td>
                                            {showRemoveOptions && (
                                                <td className="px-4 py-2">
                                                    <input
                                                        type="radio"
                                                        name="removeItem"
                                                        value={item.itemld}
                                                        onChange={() => setSelectedItemId(item.itemld)}
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
};

export default ItemDetailPage;
