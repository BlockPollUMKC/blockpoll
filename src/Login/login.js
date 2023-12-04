// Import necessary dependencies
import React, { useState } from 'react';
import Web3 from 'web3';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    // Connect to Web3 provider (MetaMask)
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);

      try {
        // Request account access from the user
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        // Get the user's Ethereum address
        const accounts = await web3.eth.getAccounts();
        const userAddress = accounts[0];

        // Connect to the deployed LoginSystem contract
        const contractAddress = '0xaba9162241346b38552a04b4678f58d926b14e85'; // Replace with your actual contract address
        const contractABI =
        [
          {
            "constant": false,
            "inputs": [],
            "name": "login",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": false,
            "inputs": [],
            "name": "logout",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
          },
          {
            "constant": true,
            "inputs": [
              {
                "name": "",
                "type": "address"
              }
            ],
            "name": "isLoggedIn",
            "outputs": [
              {
                "name": "",
                "type": "bool"
              }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
          },
          {
            "anonymous": false,
            "inputs": [
              {
                "indexed": true,
                "name": "userId",
                "type": "uint256"
              },
              {
                "indexed": false,
                "name": "username",
                "type": "string"
              },
              {
                "indexed": true,
                "name": "userAddress",
                "type": "address"
              }
            ],
            "name": "UserLoggedIn",
            "type": "event"
          }
        ];
        if (email !== '' && pwd !== '') { 
          // Include the ABI of your LoginSystem contract
          const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
  
          // Call the login function
          await contractInstance.methods.login().send({ from: userAddress });
  
          props.history.push('/home');
            window.location.reload()
        } else if (email === '' && pwd === '') {
            setIsemail(true)
            setIspwd(true)
        }
        else if (email === '') {
            setIsemail(true)
            setIspwd(false)
        }
        else if ( pwd === '') {
            setIspwd(true)
            setIsemail(false)
        }
        // Redirect to the home page after successful login
      } catch (error) {
        console.error('Error during login:', error);
      }
    } else {
      console.error('Web3 not detected. Please install MetaMask or another Web3-enabled browser extension.');
    }
  };

  rreturn (
    <div to='/login'>
    <div className='main-container link-style bg-dark d-flex flex-column justify-content-center align-items-center'>
      <form onSubmit={handleLogin}>
        <div className='mb-2 d-flex flex-column'>
            <label htmlFor='email' className='text-white'>Email</label>
             <input value={email} type='text' id='email' onChange={(e) => setEmail(e.target.value)} />
             {isemail && <p className='fs-6 text-danger'>Email is Required</p>}
        </div>
        <div className='mb-2 d-flex flex-column'>
            <label htmlFor='pwd' className='text-white'>Password</label>
             <input value={pwd} type='password' id='pwd' onChange={(e) => setPwd(e.target.value)} />
             {ispwd && <p className='fs-6 text-danger'>Password is Required</p>}
        </div>
        <button className='btn btn-primary' type='submit'>Submit</button>
       
      </form>
    </div>
    </div>
  )
};

export default Login;
