import React, { useState } from 'react';
  import SidePanel from './SidePanel';
  import Header from './Header';
  import ItemViewBox from './ItemViewBox';
  import axios from 'axios';

  const InventoryItems = () => {
    const [showNotifyForm, setShowNotifyForm] = useState(null);
    const [notificationInfo, setNotificationInfo] = useState({
      triggerAmount: '',
    });
    const [items, setItems] = useState([
      { itemld: '01', itemName: 'Cheese', createdDate: '2024-05-01', stock: 10, inStock: 'Yes', img: 'https://res.cloudinary.com/deyfwd4ge/image/upload/v1716898875/download_3_lcvwbu.jpg' },
      { itemld: '02', itemName: 'Bread', createdDate: '2024-05-02', stock: 0, inStock: 'No', img: 'https://res.cloudinary.com/deyfwd4ge/image/upload/v1716898706/download_2_mhlll7.jpg' }
    ]);
    const [viewItem, setViewItem] = useState(null);

    const handleViewItem = (item) => {
      setViewItem(item);
    };

    const handleCloseView = () => {
      setViewItem(null);
    };

    const handleNotifyClick = (itemId) => {
      setShowNotifyForm(itemId);
    };

    const handleNotificationChange = (e) => {
      const { name, value } = e.target;
      setNotificationInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleSubmitButton = (e) => {
      e.preventDefault();
      // Handle form submission, for example, by making an API call
      e.preventDefault();
    axios.post('http://localhost:8000/whatsapp/send', {
      itemId: showNotifyForm,
      triggerAmount: notificationInfo.triggerAmount,
    })
    .then((response) => {
      console.log('Notification set successfully', response.data);
      setShowNotifyForm(null);
      alert('Message sent on Whatapp Successfully')
    })
    .catch(error => {
      console.error('Error setting notification', error);
      alert('Message has not been sent on Whatapp')
      setShowNotifyForm(null);
    });
  };

    return (
      <div>
        <div className="flex">
          <SidePanel />
          <section id="content" className="relative w-full ml-72 transition-all">
            <Header />
            <main>
              <section className="Item">
                <div id="item-box-1" className="item-view-box hidden"></div>
                <div id="Item-list" className="text-center p-4 bg-white rounded-lg shadow-lg overflow-auto mx-4 my-4">
                  <h1 className="text-2xl font-bold mb-4">Ganpat Store</h1>
                  <table className="w-full table-auto">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 bg-blue-500 text-white">ID</th>
                        <th className="px-4 py-2 bg-blue-500 text-white">Name</th>
                        <th className="px-4 py-2 bg-blue-500 text-white">Created date</th>
                        <th className="px-4 py-2 bg-blue-500 text-white">Quantity left</th>
                        <th className="px-4 py-2 bg-blue-500 text-white">In stock</th>
                        <th className="px-4 py-2 bg-blue-500 text-white">View</th>
                        <th className="px-4 py-2 bg-blue-500 text-white">Notify me</th>
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
                            <button
                              onClick={() => handleViewItem(item)}
                              className="bg-transparent border border-blue-500 text-blue-500 px-2 py-1 rounded hover:bg-blue-500 hover:text-white"
                            >
                              View
                            </button>
                          </td>
                          <td className="px-4 py-2">
                            <button
                              onClick={() => handleNotifyClick(item.itemld)}
                              className="bg-transparent border border-blue-500 text-blue-500 px-2 py-1 rounded hover:bg-blue-500 hover:text-white"
                            >
                              Notify Me
                            </button>
                            {showNotifyForm === item.itemld && (
                            <div className="bg-gray-100 p-5 rounded shadow-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ width: '600px', margin: '150px 0 0' }}>
                              <button onClick={() => setShowNotifyForm(false)} className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-900">
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                              <form onSubmit={handleSubmitButton}>
                                <div className="mb-4">
                                  <label htmlFor="triggerAmount" className="block font-bold text-gray-700 mb-2">Notify via WhatsApp</label>
                                  <input
                                    type="number"
                                    id="triggerAmount"
                                    name="triggerAmount"
                                    placeholder='Trigger Amount'
                                    value={notificationInfo.triggerAmount}
                                    onChange={handleNotificationChange}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                  />
                                </div>
                                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded font-bold hover:bg-blue-700">Submit</button>
                              </form>
                            </div>
                          )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </main>
          </section>
          {viewItem && <ItemViewBox item={viewItem} onClose={handleCloseView} />}
        </div>
      </div>
    );
  }

  export default InventoryItems;