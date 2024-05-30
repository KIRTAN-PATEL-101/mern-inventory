import React, { useState } from 'react';
import 'react-credit-cards/es/styles-compiled.css';
import Cards from 'react-credit-cards';
import InputMask from 'react-input-mask';
import SidePanel from './SidePanel';
import Header from './Header';

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiration, setExpiration] = useState('');
  const [cvc, setCvc] = useState('');
  const [country, setCountry] = useState('India');
  const [focus, setFocus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cardNumber.length !== 19) {
      alert('Please enter a valid card number.');
      return;
    }
    // Further validation can be added here
    alert('Payment of €59.99 submitted!');
  };

  return (
   <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
   <Header />
   <div style={{ display: 'flex', flex: 1 }}>
     <div style={{ width: '288px', overflow: 'auto' }}>
       <SidePanel />
     </div>
     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <Cards
        number={cardNumber}
        name=" "
        expiry={expiration}
        cvc={cvc}
        focused={focus}
      />
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-4 relative">
          <label htmlFor="cardNumber" className="block text-gray-700 font-medium mb-2">Card number</label>
          <InputMask
            mask="9999 9999 9999 9999"
            maskChar=" "
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            onFocus={() => setFocus('number')}
            placeholder="1234 1234 1234 1234"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-20"
            required
          />
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-5 mt-7" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5 mt-7" />
          </div>
        </div>
        <div className="mb-4 flex justify-between">
          <div className="w-1/2 pr-2">
            <label htmlFor="expiration" className="block text-gray-700 font-medium mb-2">Expiration</label>
            <InputMask
              mask="99/99"
              maskChar=" "
              value={expiration}
              onChange={(e) => setExpiration(e.target.value)}
              onFocus={() => setFocus('expiry')}
              placeholder="MM / YY"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="w-1/2 pl-2">
            <label htmlFor="cvc" className="block text-gray-700 font-medium mb-2">CVC</label>
            <InputMask
              mask="999"
              maskChar=" "
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              onFocus={() => setFocus('cvc')}
              placeholder="CVC"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="country" className="block text-gray-700 font-medium mb-2">Country</label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="India">India</option>
            <option value="Ecudor">Ecudor</option>
            {/* Add more options here */}
          </select>
        </div>
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Pay Now
        </button>
      </form>
    </div>

   </div>
 </div>
  );
};

export default PaymentForm;