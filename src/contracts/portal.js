export const PORTAL_ADDRESS = "0x5ABFC42A4a2081BBeBB3cF72D0740Eb94dA8E4E7"
export const PORTAL_ABI = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_tokenAddress",
                "type": "address"
            },
            {
                "name": "_tokenExchangeAddress",
                "type": "address"
            },
            {
                "name": "_outputTokenSymbol",
                "type": "string"
            }
        ],
        "name": "addPortal",
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
                "name": "_staker",
                "type": "address[]"
            }
        ],
        "name": "addWhiteListAccount",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
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
                "name": "_portalId",
                "type": "uint256"
            }
        ],
        "name": "removePortal",
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
                "name": "_outputTokenAddress",
                "type": "address"
            },
            {
                "name": "_days",
                "type": "uint256"
            },
            {
                "name": "_xioQuantity",
                "type": "uint256"
            },
            {
                "name": "_tokensBought",
                "type": "uint256"
            },
            {
                "name": "_portalId",
                "type": "uint256"
            },
            {
                "name": "_symbol",
                "type": "string"
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
        "name": "unPauseContract",
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
        "outputs": [],
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