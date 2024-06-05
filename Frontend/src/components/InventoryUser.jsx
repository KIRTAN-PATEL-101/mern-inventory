    import React, { useState, useEffect } from 'react';
    import Modal from 'react-modal';
    import SidePanelUser from './SidePanelUser';
    import HeaderUser from './HeaderUser';// Import the Geolocation component
    import { Link } from 'react-router-dom';
    import axios from 'axios';
    import TestMap from './TestMap'

    const Inventory = () => {
        const [location, setLocation] = useState({});
        let kirtan = {}// Add location state
        const [showForm, setShowForm] = useState(false);
        const [inventoryItems, setInventoryItems] = useState([]);
        const [newItem, setNewItem] = useState({
            inventoryName: '',
            inventoryId: '',
            address: '',
            country: '',
            mobileNo: '',
            managerName: '',
            category: '',
            location: null, // Add location state
        });
        const [showRemoveOptions, setShowRemoveOptions] = useState(false);
        const [selectedItemId, setSelectedItemId] = useState('');
        const [isMapModalOpen, setIsMapModalOpen] = useState(false); // State for map modal

        const handleAddClick = () => {
            setShowForm(!showForm);
            setShowRemoveOptions(false);
        };
        

        useEffect(() => {
            // Fetch user data from the backend
            axios.get('http://localhost:8000/inventory/show', { withCredentials: true })
                .then(response => {
                    console.log(response.data); // Debug the response
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
            console.log('location', location);
            const inventoryData = {
                inventoryName: newItem.inventoryName,
                inventoryId: newItem.inventoryId,
                address: newItem.address,
                country: newItem.country,
                mobileNo: newItem.mobileNo,
                ManagerName: newItem.managerName,
                category: newItem.category,
                latitude: location.lat,
                longitude: location.lng, // Include location in data
            };
            try {
                // Post the new item data to the backend
                console.log('Posting data to backend:', inventoryData);
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
                    category: '',
                    location: null,
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

        const openMapModal = () => {
            setIsMapModalOpen(true);
        };

        const closeMapModal = () => {
            setLocation(kirtan);
            setIsMapModalOpen(false);
        };

        const handleLocationSelect = async (loc) => {
            console.log('Location selected:', loc);
            kirtan = loc
            console.log('Location selected:', loc);
            console.log(kirtan);
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
                            <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
                                <div className="relative bg-gray-100 p-5 rounded shadow-lg w-full max-w-lg max-h-screen overflow-auto">
                                <button onClick={() => setShowForm(false)} className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-900">
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                <h2 className="text-2xl font-bold mb-4">Add Inventory</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="inventoryName" className="block font-bold text-gray-700 mb-2">Name</label>
                                        <input
                                            type="text"
                                            id="inventoryName"
                                            name="inventoryName"
                                            placeholder='Name...'
                                            value={newItem.inventoryName}
                                            onChange={handleInputChange}
                                            className="w-full p-2 border border-gray-300 rounded"
                                            required
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="inventoryId" className="block font-bold text-gray-700 mb-2">ID</label>
                                        <input
                                            type="text"
                                            id="inventoryId"
                                            name="inventoryId"
                                            placeholder='ID...'
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
                                        <label htmlFor="location" className="block font-bold text-gray-700 mb-2">Location</label>
                                        <button
                                            type='button'
                                            className='justify-between border-2 w-full border-black color-white rounded-2xl inline'
                                            onClick={openMapModal}
                                        >
                                            <span className='pl-2'>Click here to add your Location</span>
                                            <img className='inline pl-1'
                                                src='https://res.cloudinary.com/deyfwd4ge/image/upload/v1717233009/pngegg_nni7mq.png'
                                                height={'30px'}
                                                width={'30px'}
                                            />

                                            <button onClick={() => openMapModal(false)} className="flex justify-end text-gray-600 hover:text-gray-900">
                                                
                                            </button>
                                        </button>
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
                    <Modal
                        isOpen={isMapModalOpen}
                        onAfterOpen={handleLocationSelect}
                        onRequestClose={closeMapModal}
                        contentLabel="Map Modal"
                        className="modal-content flex justify-center items-center h-1/6 z-51"
                        overlayClassName="modal-overlay"
                    >
                        <div /* onClick={closeMapModal}*/>
                            {/* <button onClick={closeMapModal} className="absolute mt-2 mr-2 text-gray-600 hover:text-gray-900 z-51 cursor-pointer" style={{top:"46%", right:"28%"}}>
                                    <svg className="h-6 w-6 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button> */}
                        </div>
                        <TestMap handleLocationSelect={handleLocationSelect} setIsMapModalOpen={setIsMapModalOpen}/>
                    </Modal> 
                </section>
            </div>
        );
    };

    export default Inventory;
