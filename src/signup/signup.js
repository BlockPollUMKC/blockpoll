import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const Signup = (props) => {
  const [info, setInfo] = useState({
    'name': '',
    'mobile': '',
    'email': '',
    'password': '',
    'isname': false,
    'ismobile': false,
    'isemail': false,
    'ispassword': false
  });

  const sigup_Array = [
    { 'label': 'name', 'type': 'text' },
    { 'label': 'mobile', 'type': 'Number' },
    { 'label': 'email', 'type': 'text' },
    { 'label': 'password', 'type': 'password' }
  ];

  // Initialize Web3 and the contract instance
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const contractAddress = '0x9e2fe52f30e74c92df07d541a2840737b1f4d20f'; 
  const contractABI = 
  [
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "candidates",
        "outputs": [
            {
                "name": "id",
                "type": "uint256"
            },
            {
                "name": "name",
                "type": "string"
            },
            {
                "name": "voteCount",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
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
        "name": "hasVoted",
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
        "constant": true,
        "inputs": [],
        "name": "candidatesCount",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "_name",
                "type": "string"
            }
        ],
        "name": "addCandidate",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "name": "_candidateId",
                "type": "uint256"
            }
        ],
        "name": "vote",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

  useEffect(() => {
    async function initializeWeb3() {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
        setWeb3(web3Instance);
        setContract(contractInstance);
      } else {
        console.log('Web3 not detected. Please install MetaMask or another Web3-enabled browser extension.');
      }
    }

    initializeWeb3();
  }, []);

  const SignUpForm = async (event) => {
    event.preventDefault();

    if (info.email !== '' && info.password !== '' && info.mobile !== '' && info.name !== '') {
      if (web3 && contract) {
        try {
          const accounts = await web3.eth.requestAccounts();
          const sender = accounts[0];

          // Call the registration function of the smart contract.
          await contract.methods.register().send({ from: sender });

          // Redirect to the login page after successful registration.
          props.history.push('/login');
          window.location.reload();
        } catch (error) {
          console.error('Error registering user:', error);
        }
      } else {
        console.error('Web3 or contract not initialized.');
      }
    } else {
      // Handle form validation errors as you were doing before.
      // You can keep this part of your code for form validation.
    }
  }

  return (
    <div to='/signup'>
      <div className='main-container link-style bg-dark d-flex flex-column justify-content-center align-items-center'>
        <form onSubmit={SignUpForm}>
          {sigup_Array.map(each => {
            const setInfoValues = (event, item) => {
              const nameVal = item.label;
              console.log(nameVal);
              setInfo({ ...info, [nameVal]: event.target.value });
            }

            return (
              <div className='mb-2 d-flex flex-column' key={each.label}>
                <label htmlFor={each.label} className='text-white text-capitalize'>{each.label}</label>
                <input value={info[each.label]} type={each.type} id={each.label} onChange={(e) => setInfoValues(e, each)} />
                {info[`is${each.label}`] && <p className='fs-6 text-danger text-capitalize'>{each.label} is Required</p>}
              </div>
            )
          })}
          <button className='btn btn-primary' type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Signup;
