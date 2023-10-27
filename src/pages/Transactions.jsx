import React, { useEffect, useState } from 'react';
import { FaSearch, FaLock, FaUnlock } from 'react-icons/fa';
import { getAllLockData } from './LandingPage';

const truncateAddress = (address) => {
    if (!address) return "No Account";
    const match = address.match(
    /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{3})$/
    );
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
};
    
const toHex = (num) => {
    const val = Number(num);
    return "0x" + val.toString(16);
};

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllLockData((data) => {
        setData(data);
    });
  })
  
  return (
    <div className="container mx-auto p-4 pt-24">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-4">Transactions</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search transactions"
            className="w-full py-2 pl-8 pr-3 rounded-full border focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute left-3 top-2">
            <FaSearch className="text-gray-500" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((d, index) => {
        return (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                <h2 className="text-xl font-semibold mb-2">Address {truncateAddress(d.seller)}</h2>
                <p className="text-gray-600">Amount: ${d.amount}</p>
                <button
                    className={`mt-4 w-full bg-${d.locked ? 'blue' : 'blue'}-500 hover:bg-${d.locked ? 'blue' : ''}-700 text-white py-2 rounded-full transition duration-300 flex justify-center items-center`}
                    disabled={!d.locked}
                >
                    {d.locked ? <FaLock className="mr-2" /> : <FaUnlock className="mr-2" /> }
                    {d.locked ? 'Unlock' : 'Completed'}
                </button>
            </div>
        )
    })}
      </div>
    </div>
  );
};

export default Transactions;
