import React, { useState } from 'react';
import SidePanel from './SidePanel';
import Header from './Header';
import { Link } from 'react-router-dom';

const Inventory = () => {
    const [showForm, setShowForm] = useState(false);
    const [inventoryItems, setInventoryItems] = useState([
        { name: 'Supermaxi Cuenca', id: '01',location:"Cuenca,010150",ownerName:"Adriana",category:"Grocery", createdOn: '2024-05-03' },
        { name: 'Don angel Super Market', id: '02',location:"Don angel,040301",ownerName:"Adriana",category:"Grocery", createdOn: '2024-05-03' },
    ]);
    const [newItem, setNewItem] = useState({
        name: '',
        ownerName: '',
        id: '',
        createdOn: '',
        category: '',
        description: ''
    });
    const [showRemoveOptions, setShowRemoveOptions] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState('');

    const handleAddClick = () => {
        setShowForm(!showForm);
        setShowRemoveOptions(false);
    };

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

    return (
        <div className="flex">
            <SidePanel />
            <section id="content" className="relative w-full ml-72 transition-all">
                <Header />
                <div id="Item-list" className="text-center p-4 bg-white rounded-lg shadow-lg overflow-auto mx-4 my-4">
                    <h1 className="text-2xl font-bold mb-4">Inventory</h1>
                    
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
                                    <td className="p-2">{item.name}</td>
                                    <td className="p-2">{item.id}</td>
                                    <td className="p-2">{item.ownerName}</td>
                                    <td className="p-2">{item.category}</td>
                                    <td className="p-2">{item.location}</td>
                                    <td className="p-2">{item.createdOn}</td>
                                    <td className="p-2">
                                        <Link to={`/superAdmin/users/01/inventory/${item.id}`}  state={{ item }}  className="bg-transparent border border-blue-500 text-blue-500 px-2 py-1 rounded hover:bg-blue-500 hover:text-white">
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

export default Inventory;
