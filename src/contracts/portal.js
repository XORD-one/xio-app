export const PORTAL_ADDRESS = "0x0F604fe238E6b0Ed5BB75D4e92a2044B2B7ED9B1"
export const PORTAL_ABI = [
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
		"constant": false,
		"inputs": [],
		"name": "allowXIO",
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
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getArrayLengthOfStakerData",
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
				"name": "tokenExchangeAddress",
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
		"name": "getTotalXIOStaked",
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
		"constant": false,
		"inputs": [
			{
				"name": "_quantity",
				"type": "uint256"
			},
			{
				"name": "_soldXIO",
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
			},
			{
				"name": "_days",
				"type": "uint256"
			},
			{
				"name": "_oneDaySoldQuantity",
				"type": "uint256"
			},
			{
				"name": "_tokenExchangeAddress",
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
		"constant": true,
		"inputs": [
			{
				"name": "_amount",
				"type": "uint256"
			},
			{
				"name": "_staker",
				"type": "address"
			}
		],
		"name": "canWithdrawXIO",
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
		"constant": false,
		"inputs": [
			{
				"name": "_amount",
				"type": "uint256"
			}
		],
		"name": "withdrawXIO",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_xioToken",
				"type": "address"
			},
			{
				"name": "_xioExchange",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "staker",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "portalId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "quanitity",
				"type": "uint256"
			}
		],
		"name": "DataEntered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "staker",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "portalId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "quanitity",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "symbol",
				"type": "string"
			}
		],
		"name": "Tranferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "staker",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "portalId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_tokensBought",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "symbol",
				"type": "string"
			}
		],
		"name": "Bought",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "NotTransfer",
		"type": "event"
	}
]