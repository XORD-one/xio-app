import Web3 from "web3";
import { PORTAL_ABI, PORTAL_ADDRESS } from "../../contracts/portal";
import { XIO_ABI, XIO_ADDRESS } from "../../contracts/xio";

export default class ContractInit {
  static init = async () => {
    try {
      this.web3js = new Web3(window.web3.currentProvider);
      this.accounts = await this.web3js.eth.getAccounts();
      this.getNetwork = await this.web3js.eth.net.getNetworkType();
      return {
        web3js: this.web3js,
        address: this.accounts[0],
        network: this.getNetwork,
      };
    } catch (e) {
      console.log(e);
    }
  };

  static initPortalContract = async () => {
    try {
      this.portalContract = new this.web3js.eth.Contract(
        PORTAL_ABI,
        PORTAL_ADDRESS
      );
      return this.portalContract;
    } catch (e) {
      console.log(e);
    }
  };

  static initXioContract = async () => {
    try {
      this.contract = new this.web3js.eth.Contract(XIO_ABI, XIO_ADDRESS);
      return this.contract;
    } catch (e) {
      console.log(e);
    }
  };

  static initPortalWithInfura = () => {
    try {
      const OPTIONS = {
        // defaultBlock: "latest",
        transactionConfirmationBlocks: 1,
        transactionBlockTimeout: 5,
      };
      this.InfuraWeb3 = new Web3(
        "https://mainnet.infura.io/v3/ff4d778692ad42f7966a456564283e9d",
        null,
        OPTIONS
      );
      this.infuraPortal = new this.InfuraWeb3.eth.Contract(
        PORTAL_ABI,
        PORTAL_ADDRESS
      );
      return this.infuraPortal;
    } catch (e) {
      console.log(e);
    }
  };
}
