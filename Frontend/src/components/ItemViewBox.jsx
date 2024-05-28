import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ItemViewBox = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[99999999] bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg p-4 m-4 shadow-lg overflow-auto w-full max-w-4xl">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">{item.itemName}</h1>
          <button onClick={onClose} className="w-8 h-8">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div className="flex justify-between mt-4">
          <div className="p-4 m-3 h-[350px] w-[350px] bg-gray-300 shadow-lg">
            <img
              src="img/pic3.jpg"
              alt={item.itemName}
              className="object-cover h-full w-full"
            />
          </div>
          <div className="bg-gray-100 p-4 m-3 h-[350px] w-[500px] flex">
            <div className="text-gray-700 flex flex-col justify-between w-24">
              <span>Name:</span>
              <span>Quantity Left:</span>
              <span>Category:</span>
              <span>Stock</span>
            </div>
            <div className="flex flex-col justify-between ml-4">
              <span>{item.itemName}</span>
              <span>{item.stock}</span>
              <span>{item.category}</span>
              <span className={` px-4 py-2 ${item.stock > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {item.stock > 0 ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemViewBox;
