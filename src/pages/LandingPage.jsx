import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FiArrowDownCircle, FiLock, FiCheckCircle, FiShield } from "react-icons/fi"; 
import { useNavigate } from "react-router-dom";
import data from './data.json';
import Card from "../components/Card";
import toast from "react-hot-toast";
import ABI from "./abi.json";
import {ethers} from "ethers";


const contractAddress = '0x24487e5b701E97196f9eB499AA9EB06e57321083';
const productPurchaseContract = new ethers.Contract(contractAddress, ABI);
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();
  
export const handleBuyItem = async (description, priceInEther) => {
  const account = localStorage.getItem('account');
  if (account) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const productPrice = ethers.parseEther(priceInEther.toString()); 
    productPurchaseContract.connect(signer).buyProduct(signer, ethers.id(description), {
      value: productPrice 
    });
  } else {
    toast.error('Connect your wallet first', {
      position: 'top-center'
    });
  }
}

export const getAllLockData = (setData) => {
  productPurchaseContract.connect(signer).getAllLockData()
  .then((data) => {
    setData(data);
  }).catch((error) => {
    console.log(error);
  })
}

export const unlockMoney = (_key) => {
  productPurchaseContract.connect(signer).unlockMoney(_key);
}


const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen bg-cover bg-center top-0"
      style={{
        backgroundImage: `url(${require("../assets/bg.jpeg")})`,
      }}
    >
      <Navbar onClick={() => {
          navigate("/join");
       }}/>

      {/* Hero Section */}
      <section
        style={{
          backgroundImage: `url('https://i.pinimg.com/474x/e0/6b/b0/e06bb05586b523db0f99db72198d278f.jpg')`,
          backgroundSize: 'cover',       
          backgroundPosition: 'center',  
          height: '100vh',              
          width: '100%',                
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className="text-white text-center py-20"
      >
        <h1 className="text-6xl font-extrabold mb-4">Welcome to BorgaHouse</h1>
        <p className="text-xl mb-8">Your trusted platform for building and construction services.</p>
      </section>
          
      {/* About Section */}
      <section className="bg-transparent text-black my-5 py-16 w-full mb-10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-semibold mb-6">What We Do</h2>
          <p className="text-2xl">
            BorgaHouse is a platform for customers to get access to legit and trusted building and construction services.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-blue-200 text-gray-800 py-20 w-full">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-10">Key Features</h2>
          {/* Feature Cards */}
          <div className="flex flex-wrap justify-center gap-8">
            {/* Feature Card 1 */}
            <div className="p-8 border rounded-lg shadow-lg bg-white w-[300px]">
              {/* Icon */}
              <div className="mb-4 text-blue-400 text-4xl">
                <FiLock />
              </div>
              <h3 className="text-xl font-semibold mb-2">Affordable Building Materials</h3>
              <p className="text-gray-600">
                 Get Affordable Building Materials For Your 
              </p>
            </div>
            
             {/* Feature Card 2 */}
            <div className="p-8 border rounded-lg shadow-lg bg-white w-[300px]">
              {/* Icon */}
              <div className="mb-4 text-blue-400 text-4xl">
                <FiCheckCircle />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy And Fast Payment System</h3>
              <p className="text-gray-600">
                 Transfer Money To Vendors With Ease
              </p>
            </div>
              
             {/* Feature Card 3 */}
            <div className="p-8 border rounded-lg shadow-lg bg-white w-[300px]">
              {/* Icon */}
              <div className="mb-4 text-blue-400 text-4xl">
                <FiShield />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Blockchain Technology</h3>
              <p className="text-gray-600">
                 Utilizing blockchain technology for maximum security and transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-white py-20 w-full">
        <div className="container mx-auto w-full h-auto grid grid-cols-4">
          {data.data.map((product) => {
            return(
                <div className="mx-2 my-3">
                    <Card product={product}/>
                </div>
            )
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-6 w-full">
        <p>&copy; 2023 BogaHouse. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;