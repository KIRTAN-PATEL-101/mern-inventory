import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import SidePanel from "./SidePanelUser";
import Header from "./HeaderUser";
import ItemViewBox from "./ItemViewBox";
import axios from "axios";

const InventoryItemsUser = () => {
  const location = useLocation();
  const item = location.state?.item;

  const [checked, setChecked] = useState(false);
  const [showAdjustQuantityForm, setShowAdjustQuantityForm] = useState(false);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const [message, setMessage] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [showRemoveOptions, setShowRemoveOptions] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState([]);
  const [showNotifyForm, setShowNotifyForm] = useState(false);
  const [notificationInfo, setNotificationInfo] = useState({
    triggerAmount: "",
  });
  const [adjustQuantity, setAdjustQuantity] = useState({
    itemId: "",
    stock: "",
    operation: "", // or 'remove'
  });
  const [viewItem, setViewItem] = useState(null);

  const [items, setItems] = useState([]);

  const [newItem, setNewItem] = useState({
    itemName: "",
    itemId: "",
    pricePerUnit: "",
    stock: "",
    inventoryld: "",
    category: "",
    itemimage: null,
    description: "",
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

  const handleNotifyClick = (itemId) => {
    console.log("Notify clicked for item:", itemId);
    setShowNotifyForm(!showNotifyForm);
    setCurrentItemId([itemId]);
    setShowForm(false);
    setShowRemoveOptions(false);

  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setNewItem({
        ...newItem,
        [name]: files[0],
      });
    } else {
      setNewItem({
        ...newItem,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("itemName", newItem.itemName);
    formData.append("itemId", newItem.itemId);
    formData.append("pricePerUnit", newItem.pricePerUnit);
    formData.append("stock", newItem.stock);
    formData.append("inventoryId", item._id);
    formData.append("category", newItem.category);
    formData.append("itemimage", newItem.itemimage);
    console.log("Form Data:", formData);
    try {
      const response = await axios.post(
        "http://localhost:8000/items/add",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response from backend:", response.data);

      setItems([...items, response.data]);


      setNewItem({
        itemName: "",
        itemId: "",
        pricePerUnit: "",
        stock: "",
        inventoryId: "",
        category: "",
        itemimage: null,
      });

      // reload the items page
     return window.location.reload();

         setShowForm(false);

    } catch (error) {
      console.error("Error posting data to backend:", error);
    }
  };

  const handleNotificationChange = (e) => {
    const { name, value } = e.target;
    setNotificationInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    console.log(value);
    if (selectedItemId.includes(value)) {
      setSelectedItemId(selectedItemId.filter((id) => id !== value));
    } else {
      setSelectedItemId([...selectedItemId, value]);
    }
    console.log(selectedItemId);
  };

  useEffect(() => {
    axios
      .post(
        "http://localhost:8000/items/inventoryItems",
        { inventoryId: item._id },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response.data); // Debug the response
        if (Array.isArray(response.data)) {
          setItems(response.data);
        } else {
          console.error("Expected an array of Items, but got:", response.data);
        }
      })
      .catch((error) => {
        console.error("There was an error fetching the items!", error);
      });
  }, [
    showForm,
    showRemoveOptions,
    setShowRemoveOptions,
    setShowNotifyForm,
    setItems,
    item.inventoryId,
    selectedItemId,
  ]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const itemData = {
  //     itemName: newItem.itemName,
  //     itemId: newItem.itemId,
  //     pricePerUnit: newItem.pricePerUnit,
  //     stock: newItem.stock,
  //     inventoryId: item.inventoryId,
  //     category: newItem.category,
  //     itemimage: newItem.itemimage,
  //   };
  //   try {
  //     // Post the new item data to the backend
  //     console.log("Item Data:", itemData);
  //     const response = await axios.post(
  //       "http://localhost:8000/items/add",
  //       itemData,
  //       { withCredentials: true }
  //     );
  //     //  console.log('done');
  //     console.log("Response from backend:", response.data);

  //     // Update the local state with the new item
  //     setItems([...items, response.data]);

  //     setNewItem({
  //       itemName: "",
  //       itemId: "",
  //       pricePerUnit: "",
  //       stock: "",
  //       inventoryId: "",
  //       category: "",
  //       itemimage: null,
  //     });
  //     setShowForm(false);
  //   } catch (error) {
  //     console.error("Error posting data to backend:", error);
  //   }
  // };

  //   const handleNotificationSubmit = (e) => {
  //     e.preventDefault();
  //     // Implement notification logic here
  //     alert(`Notification set for ${notificationInfo.name}`);
  //     setShowNotifyForm(false);
  //   };

  const handleRemoveItem = () => {
    setItems(items.filter((item) => !selectedItemId.includes(item.itemId)));
    console.log(selectedItemId);
    axios
      .post(
        "http://localhost:8000/items/deletemany",
        { ids: selectedItemId },
        { withCredentials: true }
      )
      .then((response) => {
        console.log("Items removed successfully", response.data);
      })
      .catch((error) => {
        console.error("Error removing items", error);
      });
    setSelectedItemId([]);
    setShowRemoveOptions(false);
    window.location.reload();
  };

  const handleViewItem = (item) => {
    setViewItem(item);
  };

  const handleCloseView = () => {
    setViewItem(null);
  };
  const handleSubmitButton = (e) => {
    // Handle form submission, for example, by making an API call
    e.preventDefault();
    axios
      .post("http://localhost:8000/items/settrigger", {
        itemId: showNotifyForm,
        triggerAmount: notificationInfo.triggerAmount,
        id: currentItemId,
      }, { withCredentials: true })
      .then((response) => {
        console.log("Notification set successfully", response.data);
        setShowNotifyForm(null);
        // alert("Message sent on Whatapp Successfully");
      })
      .catch((error) => {
        console.error("Error setting notification", error);
        // alert("Message has not been sent on Whatapp");
        setShowNotifyForm(null);
      });
  };

  const handleAdjustQuantityClick = (itemId) => {
    const item = items.find((item) => item._id === itemId);
    setCurrentItemId(itemId);
    setCurrentQuantity(item.stock);
    setMessage("");
    setAdjustQuantity({ // Reset the form fields
     // itemId: "",
      stock: "",
      operation: "",
    });
    setShowAdjustQuantityForm(!showAdjustQuantityForm);
    setShowForm(false);
    setShowRemoveOptions(false);
    setShowNotifyForm(false);
  };

  const handleAdjustQuantityInputChange = (e) => {
    const { name, value } = e.target;
    setAdjustQuantity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdjustQuantitySubmit = async (e) => {
    e.preventDefault();
    const data = { ...adjustQuantity, itemId: currentItemId };
    console.log(data);
    if (data.operation === "remove") {
      if (data.stock > currentQuantity) {
        setMessage("Cannot remove more than available quantity");
        return;
      }
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/items/adjustqty",
        data,
        { withCredentials: true }
      );

      console.log("Response from backend:", response.data);
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === response.data._id ? response.data : item
        )
      );

      setAdjustQuantity({
        // itemId: "",
        adjustment: "",
        type: "",
      });
      window.location.reload();
      
      setShowAdjustQuantityForm(false);
    } catch (error) {
      console.error("Error adjusting quantity:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="flex">
      <SidePanel />
      <section id="content" className="relative w-full ml-72 transition-all">
        <Header />
        <main>
          <section className="Item">
            <div id="item-box-1" className="item-view-box hidden"></div>
            <div
              id="Item-list"
              className="text-center p-4 bg-white rounded-lg shadow-lg overflow-auto mx-4 my-4"
            >
              <h1 className="text-2xl font-bold mb-4">{item.inventoryName}</h1>
              <div className="flex justify-end mb-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
                  onClick={handleAddClick}
                >
                  {showForm ? "Close" : "Add"}
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={handleRemoveClick}
                >
                  {showRemoveOptions ? "Cancel" : "Remove"}
                </button>
              </div>
              {showForm && (
                <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
                <div className="relative bg-gray-100 p-5 rounded shadow-lg w-full max-w-lg max-h-screen overflow-auto">
                
                    <form onSubmit={handleSubmit}>
                      <button onClick={() => setShowForm(false)} className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-900">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <div className="mb-4">
                        <label
                          htmlFor="itemName"
                          className="block font-bold text-gray-700 mb-2"
                        >
                          Item Name
                        </label>
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
                      {/* <div className="mb-4">
                        <label
                          htmlFor="itemld"
                          className="block font-bold text-gray-700 mb-2"
                        >
                          Item Id
                        </label>
                        <input
                          type="text"
                          id="itemId"
                          placeholder="Item Id..."
                          name="itemId"
                          value={newItem.itemId}
                          onChange={handleInputChange}
                          className="w-full p-2 border border-gray-300 rounded"
                          required
                        />
                      </div> */}
                      <div className="mb-4">
                        <label
                          htmlFor="pricePerUnit"
                          className="block font-bold text-gray-700 mb-2"
                        >
                          Price per Unit
                        </label>
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
                        <label
                          htmlFor="stock"
                          className="block font-bold text-gray-700 mb-2"
                        >
                          Stock Available
                        </label>
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
                      {/* <div className="mb-4">
                      <label htmlFor="inventoryld" className="block font-bold text-gray-700 mb-2">Inventory ID</label>
                      <input
                        type="text"
                        id="inventoryld"
                        name="inventoryld"
                        placeholder="Inventory ID..."
                        value={newItem.inventoryId}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                      />
                    </div> */}
                      <div className="mb-4">
                        <label
                          htmlFor="category"
                          className="block font-bold text-gray-700 mb-2"
                        >
                          Category
                        </label>
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
                        <label
                          htmlFor="itemimage"
                          className="block font-bold text-gray-700 mb-2"
                        >
                          Upload Item Image
                        </label>
                        <input
                          type="file"
                          id="itemimage"
                          name="itemimage"
                          //value={newItem.itemimage}
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
                      <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded font-bold hover:bg-blue-700"
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              )}
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 bg-blue-500 text-white">Sr No</th>
                    <th className="px-4 py-2 bg-blue-500 text-white">Name</th>
                    <th className="px-4 py-2 bg-blue-500 text-white">
                      Created date
                    </th>
                    <th className="px-4 py-2 bg-blue-500 text-white">
                      Quantity left
                    </th>
                    <th className="px-4 py-2 bg-blue-500 text-white">
                      In stock
                    </th>
                    <th className="px-4 py-2 bg-blue-500 text-white"> Adjust Quantity</th>
                    <th className="px-4 py-2 bg-blue-500 text-white">View</th>
                    <th className="px-4 py-2 bg-blue-500 text-white">
                      Notify me
                    </th>
                    {showRemoveOptions && (
                      <th className="px-4 py-2 bg-blue-500 text-white">
                        Select
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr
                      className={`text-center ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-gray-200`}
                      key={item._id}
                    >
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">{item.itemName}</td>
                      <td className="px-4 py-2">
                        {formatDate(item.createdAt)}
                      </td>
                      <td className="px-4 py-2">{item.stock}</td>
                      <td
                        className={` px-4 py-2 ${item.stock > 0 ? "text-green-500" : "text-red-500"
                          }`}
                      >
                        {item.stock > 0 ? "Yes" : "No"}
                      </td>
                      <td className="px-4 py-2">
                        <button
                          className="bg-transparent border border-blue-500 text-blue-500 px-2 py-1 rounded hover:bg-blue-500 hover:text-white"
                          onClick={() => handleAdjustQuantityClick(item._id)}
                        >
                          Change
                        </button>
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
                          onClick={() => handleNotifyClick(item._id)}
                          
                          className="bg-transparent border border-blue-500 text-blue-500 px-2 py-1 rounded hover:bg-blue-500 hover:text-white"
                        >
                          Notify Me
                        </button>
                        {showNotifyForm && (
                          <div
                            className="bg-gray-100 p-5 rounded shadow-lg  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            style={{ width: "600px", margin: "150px 0 0" }}
                          >
                            <button
                              onClick={() => setShowNotifyForm(false)}
                              className="absolute top-0 right-0 mt-2 mr-2 text-gray-600 hover:text-gray-900"
                            >
                              <svg
                                className="h-6 w-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                            <form onSubmit={handleSubmitButton} className="">
                              <div className="mb-4 ">
                                <label
                                  htmlFor="triggerAmount"
                                  className="block font-bold text-gray-700 mb-2 inline pr-2"
                                >
                                  Notify via WhatsApp
                                </label>
                                <img
                                  src="https://res.cloudinary.com/dgvslio7u/image/upload/v1716985215/jsafdt2rcafx6sl4xsdn.svg"
                                  className="mb-2"
                                  style={{
                                    height: "50px",
                                    width: "50px",
                                    display: "inline",
                                  }}
                                />
                                <input
                                  type="number"
                                  id="triggerAmount"
                                  name="triggerAmount"
                                  placeholder="Trigger Amount"
                                  value={notificationInfo.triggerAmount}
                                  onChange={handleNotificationChange}
                                  className="w-full p-2 border border-gray-300 rounded"
                                  required
                                />
                              </div>
                              <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded font-bold hover:bg-blue-700"
                              >
                                Submit
                              </button>
                            </form>
                          </div>
                        )}
                      </td>
                      {showRemoveOptions && (
                        <td className="px-4 py-2">
                          <input
                            type="checkbox"
                            name="removeItem"
                            value={item._id}
                            onChange={handleCheckboxChange}
                          />
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
              {showAdjustQuantityForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center" style={{ margin: "0 0 0 20%" }}>
                  <div className="bg-white p-4 rounded-lg shadow-lg" style={{ width: "40%" }}>
                    <h2 className="text-xl font-bold mb-4">Adjust Quantity</h2>
                    <h2 className="text-xl  mb-4">Current Quantity: {currentQuantity}</h2>
                    <form onSubmit={handleAdjustQuantitySubmit}>
                      {/* <div className="mb-4">
                        <label className="block mb-2">Item ID</label>
                        <input
                          type="text"
                          name="itemId"
                          value={adjustQuantity.itemId}
                          onChange={handleAdjustQuantityInputChange}
                          className="w-full px-4 py-2 border rounded"
                        />
                      </div> */}
                      <div className="mb-4">
                        <label className="block mb-2">Type</label>
                        <div className="flex justify-center items-center">
                          <label className="mr-4">
                            <input
                              type="radio"
                              name="operation"
                              value="add"
                              checked={adjustQuantity.operation === "add"}
                              onChange={handleAdjustQuantityInputChange}
                              className="mr-2"
                            />
                            Add
                          </label>
                          <label>
                            <input
                              type="radio"
                              name="operation"
                              value="remove"
                              checked={adjustQuantity.operation === "remove"}
                              onChange={handleAdjustQuantityInputChange}
                              className="mr-2"
                            />
                            Remove
                          </label>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block mb-2">Adjustment</label>
                        <input
                          type="number"
                          name="stock"
                          value={adjustQuantity.stock}
                          onChange={handleAdjustQuantityInputChange}
                          className="w-full px-4 py-2 border rounded border-solid"
                        />
                      </div>
                      {message && <p style={{ color: message.includes('successful') ? 'green' : 'red' }}>{message}</p>}
                      <div className="flex justify-end">
                        <button
                          type="button"
                          className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700"
                          onClick={() => setShowAdjustQuantityForm(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"

                        >
                          Adjust
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              {showRemoveOptions && (
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={handleRemoveItem}
                  // disabled={!selectedItemId}
                  >
                    Confirm Remove
                  </button>
                </div>
              )}
            </div>
          </section>
        </main>
      </section>
      {viewItem && <ItemViewBox item={viewItem} onClose={handleCloseView} />}
    </div>
  );
};

export default InventoryItemsUser;
