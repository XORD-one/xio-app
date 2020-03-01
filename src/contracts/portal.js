export const PORTAL_ADDRESS = "0x93f6348ec031ed31bdC81807299040B85280b326"
export const PORTAL_ABI = [
	{
		"constant": false,
		"inputs": [],
		"name": "pauseContract",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_rate",
				"type": "uint256"
			}
		],
		"name": "setInterestRate",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_quantity",
				"type": "uint256"
			},
			{
				"name": "_tokensBought",
				"type": "uint256"
			},
			{
				"name": "_duration",
				"type": "uint256"
			},
			{
				"name": "_portalId",
				"type": "uint256"
			},
			{
				"name": "_symbol",
				"type": "string"
			},
			{
				"name": "_outputTokenAddress",
				"type": "address"
			}
		],
		"name": "stakeXIO",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "unPause",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdrawXIO",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_amount",
				"type": "uint256"
			},
			{
				"name": "_outputTokenAddressExchange",
				"type": "address"
			}
		],
		"name": "getETHtoALT",
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
		"constant": true,
		"inputs": [],
		"name": "getInterestRate",
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
		"constant": true,
		"inputs": [
			{
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "getXIOtoETH",
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
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "portalData",
		"outputs": [
			{
				"name": "portalId",
				"type": "uint256"
			},
			{
				"name": "tokenAddress",
				"type": "address"
			},
			{
				"name": "outputTokenSymbol",
				"type": "string"
			},
			{
				"name": "xioStaked",
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
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "stakerData",
		"outputs": [
			{
				"name": "portalId",
				"type": "uint256"
			},
			{
				"name": "publicKey",
				"type": "address"
			},
			{
				"name": "stakeQuantity",
				"type": "uint256"
			},
			{
				"name": "stakeDurationTimestamp",
				"type": "uint256"
			},
			{
				"name": "stakeInitiationTimestamp",
				"type": "uint256"
			},
			{
				"name": "outputTokenSymbol",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalXio",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]