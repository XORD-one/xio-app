import Web3 from "web3";
import { XIO_ABI, XIO_ADDRESS_MAINNET } from "./xio";

let web3js = "";
let contract = "";
let accounts = "";
let address = "";
let network = "";
let ethereum = window.ethereum;
export const init = () => {
  if (ethereum) {
    checkWeb3();
  }
};

export const checkWeb3 = async () => {
  // Use Mist/MetaMask's provider.
  web3js = new Web3(window.web3.currentProvider);
  console.log(web3js);
  //get selected account on metamask
  accounts = await web3js.eth.getAccounts();
  console.log(accounts);
address = accounts[0]
  //get network which metamask is connected too
  network = await web3js.eth.net.getNetworkType();
  console.log(network);
};

export const onConnect = async () => {
  await ethereum.enable();
  if (!ethereum || !ethereum.isMetaMask) {
    // throw new Error('Please install MetaMask.')
    alert(`METAMASK NOT INSTALLED!!`);
  } else {
    checkWeb3();
  }
};

export const initXioContract = () => {
  contract = new web3js.eth.Contract(XIO_ABI, XIO_ADDRESS_MAINNET);
};

export const getXioBalance = () => {
  const balance = contract.method.balanceOf(accounts[0]);
  return balance;
};

export const getAddress = () => {
    console.log('in the getAddress ==>',accounts[0])
 return accounts[0];   
}
