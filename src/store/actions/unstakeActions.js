import ContractInits from "../config/contractsInit";
import { getCurrentGasPrices } from "../../utils";
import { PORTAL_ADDRESS } from "../../contracts/portal";
import { onSetUnStakeLoading } from "./layoutActions";
import { getStakerData } from "./dashboardActions";

export const onUnStakeXio = (address, amount) => {
  return async (dispatch) => {
    try {
      const { web3js } = await ContractInits.init();
      const portalContract = await ContractInits.initPortalContract();
      if (address) {
        if (amount && Number(amount) < 1) {
          alert("Please enter the amount of XIO you want to unstake.");
          return;
        }
        dispatch(onSetUnStakeLoading(true));
        const amountToSend = await web3js.utils.toWei(amount.toString());
        console.log("amountToSend and amount", amountToSend, amount);
        let rawTransaction = {
          from: address,
          to: PORTAL_ADDRESS,
          value: 0,
          gasLimit: 1000000,
          gasPrice: Number((await getCurrentGasPrices()).high) * 1000000000,
          data: portalContract.methods.withdrawXIO(amountToSend).encodeABI(),
        };
        console.log(rawTransaction);
        web3js.eth
          .sendTransaction(rawTransaction)
          .on("transactionHash", function (hash) {
            console.log("hash ==>", hash);
          })
          .on("receipt", function (receipt) {
            console.log("receipt ==>", receipt);
          })
          .on("confirmation", function (confirmationNumber, receipt) {
            if (confirmationNumber == 1) {
              dispatch(getStakerData(address));
              setTimeout(() => {
                dispatch(onSetUnStakeLoading(false));
                alert("Staked XIO Successfully Unstaked.");
              }, 3000);
              console.log("confirmation ==>", confirmationNumber);
            }
          })
          .on("error", (e) => {
            console.log(e);
            dispatch(onSetUnStakeLoading(false));
            alert("Oops, something went wrong please try again.");
          });
      } else {
        alert("PLEASE CONNECT TO METAMASK WALLET !!");
      }
    } catch (e) {
      console.log(e);
      dispatch(onSetUnStakeLoading(false));
      alert("Oops, something went wrong please try again.");
    }
  };
};

export const onSetUnStakeAmount = (amount) => {
  return {
    type: "onUnStakeAmount",
    payload: amount,
  };
};

export const onSetWarning = (warn) => {
  return {
    type: "onWarning",
    payload: warn,
  };
};

export const onAllowedUnstake = (allowed) => {
  return {
    type: "onAllowed",
    payload: allowed,
  };
};
