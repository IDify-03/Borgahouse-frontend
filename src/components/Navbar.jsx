import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {Link} from 'react-router-dom';

const Navbar = ({onClick}) => {
    const [account, setAccount] = useState('');

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

    const connect = () => {
        toast.success('Connecting Wallet ......', {
            position: 'top-center'
        })
        try {
            window.ethereum.request({
                method: 'eth_requestAccounts'
            }).then((address) => {
                setAccount(address[0]);
                localStorage.setItem('account', address[0]);
            }).catch((error) => {
                console.log(error);
            }) 

            toast.success("Wallet Connected", {
                position: 'top-center'
            })

        } catch(error) {
            toast.error("something went wrong", {
                position: 'top-center'
            })
            toast.dismiss();
            console.log(error);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('account')) {
            setAccount(localStorage.getItem('account'));
        } else {
            if (window.ethereum) {
                toast.success("Please connect your wallet", {
                    position: 'top-center'
                })
            } else {
                toast.error("Please get a metamask wallet", {
                    position: 'top-center'
                });
            }
        }
    })

    return (
        <>
    	<div className="w-[100vw] h-[100px] px-32 flex items-center justify-between fixed top-0 left-0">
        	<div className="h-[50px] w-[100px] cursor-pointer text-black text-4xl font-bold">
            	BorgaHouse
            </div>

            <div className="flex w-[200px] justify-between text-xl">
                <Link to={'/'}>Home</Link>
                <Link to={'/transactions'}>Transactions</Link>
            </div>
            
            <div
                onClick={() => {
                    connect();
                }}
                className="text-black border-2 border-black text-xl font-bold w-40 h-[50px] flex justify-center items-center rounded-[5px] cursor-pointer">
           		{
                    account ? 
                    <span>{truncateAddress(account)}</span>
                    :
                    <span className="text-black">connect wallet</span>
                }
            </div>
        </div>
     </>
    )
}

export default Navbar