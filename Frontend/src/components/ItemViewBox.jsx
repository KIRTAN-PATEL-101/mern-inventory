import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import SidePanel from './SidePanel';

const ItemViewBox = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
        <main className="flex-1 p-4 ml-64">
          {/* Adjust the ml-64 based on your SidePanel width */}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={toggleVisibility}
          >
            View
          </button>
          {isVisible && (
            <div className="fixed top-16 left-1/2 transform -translate-x-1/2 text-dark w-auto h-auto max-h-[calc(100vh-64px)] z-[99999999] rounded-lg p-4 m-4 bg-white shadow-lg overflow-auto">
              <div className="flex justify-between">
                <h1 className="text-xl font-bold">Coffee Table</h1>
                <button onClick={toggleVisibility} className="w-8 h-8">
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>

              <div className="flex justify-between mt-4">
                <div className="p-4 m-3 h-[350px] w-[350px] bg-gray-300 shadow-lg">
                  <img
                    src="img/pic3.jpg"
                    alt="Coffee Table"
                    className="object-cover h-full w-full"
                  />
                </div>

                <div className="bg-gray-100 p-4 m-3 h-[350px] w-[500px] flex">
                  <div className="text-gray-700 flex flex-col justify-between w-24">
                    <span>Name:</span>
                    <span>Quantity Left:</span>
                    <span>Category:</span>
                    <span>Trigger amount:</span>
                  </div>
                  <div className="flex flex-col justify-between ml-4">
                    <span>{item.name}</span>
                    <span>{}</span>
                    <span>{}</span>
                    <span>{}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
    </div>
  );
};

export default ItemViewBox;
