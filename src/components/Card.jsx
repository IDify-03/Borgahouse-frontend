import React from 'react';
import { FaBed, FaBath, FaCar, FaDollarSign } from 'react-icons/fa';
import { handleBuyItem } from '../pages/LandingPage';

const Card = ({ product }) => {
  const { productName, price, image, description, productOwner } = product;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg text-black">
        <div className='h-[300px] w-[400px]'>
          <img src={image} alt={productName} className="w-[100%] h-[100%] object-cover" />
        </div>
      <div className="px-6 py-1">
        <div className="font-bold text-xl mb-2">{productName}</div>
        <div className="flex items-center">
          <span className="ml-2 font-semibold text-xl">{price} Eth</span>
        </div>
        <p className="text-gray-700 my-4 flex">
          {
            description
          }
        </p>
      </div>
      <div className="px-6 py-1">
        <button
          onClick={() => {
            handleBuyItem(description, price);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full"
        >
          Buy
        </button>
      </div>
      <div className="px-6 py-4">
        <p className="text-gray-600">Product Owner: {productOwner}</p>
      </div>
    </div>
  );
};

export default Card;
