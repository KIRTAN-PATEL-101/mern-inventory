import React, { useState } from 'react';

const ItemDetailPage = ({ item }) => {
    // const [values, setValues] = useState(['Value 1', 'Value 2', 'Value 3']);
    // const [prices, setPrices] = useState([
    //     { name: 'Price', value: '100' },
    //     { name: 'Cost', value: '80' },
    //     { name: 'Sell', value: '120' }
    // ]);

    // const handleAddValue = () => {
    //     setValues([...values, `Value ${values.length + 1}`]);
    // };

    // const handleRemoveValue = (index) => {
    //     const updatedValues = [...values];
    //     updatedValues.splice(index, 1);
    //     setValues(updatedValues);
    // };

    return (
        <div>hi</div>
        // <div className="text-center">
        //     <h1 className="text-2xl font-bold bg-blue-500 text-white p-2 mb-4">{item.name} Details</h1>
        //     <p>ID: {item.id}</p>
        //     <p>Created On: {item.createdOn}</p>
        //     <p>Category: {item.category}</p>
        //     <p>Description: {item.description}</p>

        //     <h2 className="text-xl font-bold bg-blue-500 text-white p-2 mb-4">Values</h2>
        //     <table className="table-auto mx-auto">
        //         <thead>
        //             <tr className="bg-blue-500 text-white">
        //                 <th className="p-2">Value</th>
        //                 <th className="p-2">Action</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {values.map((value, index) => (
        //                 <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}>
        //                     <td className="p-2">{value}</td>
        //                     <td className="p-2">
        //                         <button onClick={() => handleRemoveValue(index)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700">
        //                             Remove
        //                         </button>
        //                     </td>
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </table>

        //     <button onClick={handleAddValue} className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700">
        //         Add Value
        //     </button>

        //     <h2 className="text-xl font-bold bg-blue-500 text-white p-2 mt-8 mb-4 mx-auto">Prices</h2>
        //     <table className="table-auto mx-auto">
        //         <thead>
        //             <tr className="bg-blue-500 text-white">
        //                 <th className="p-2">Name</th>
        //                 <th className="p-2">Value</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {prices.map((price, index) => (
        //                 <tr key={index} className={index % 2 === 0 ? 'bg-gray-200' : 'bg-gray-100'}>
        //                     <td className="p-2">{price.name}</td>
        //                     <td className="p-2">{price.value}</td>
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </table>
        // </div>
    );
};

export default ItemDetailPage;
