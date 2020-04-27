import ContractInits from "../config/contractsInit";
import { getCurrentGasPrices } from "../../utils";
import { PORTAL_ADDRESS } from "../../contracts/portal";
import { ERC20_ABI } from "../../contracts/erc20";
import { onSetUnStakeLoading } from "./layoutActions";
import { getStakerData, getStakedData } from "./dashboardActions";
import {
  onSetStakeLoading,
  onSetTransactionMessage,
  onToast,
} from "./layoutActions";

export const onCalculateUnstakeXIO = (address) => {
  return async (dispatch) => {
    try {
      const portalContract = await ContractInits.initPortalContract();
      const { web3js } = await ContractInits.init();
      let amount = 0;
      const active = await getStakedData(address);
      console.log("active ==>", active);
      for (let i = 0; i < active.length; i++) {
        const res = await portalContract.methods
          .stakerData(address, active[i])
          .call();
        console.log("before from WEI ==>", res.quantity);
        res.quantity = await web3js.utils.fromWei(res.quantity.toString());
        //   console.log("after from WEI ==>", res.stakeQuantity);

        res.Days =
          (res.durationTimestamp -
            (Math.round(new Date() / 1000) - active[i])) /
          (24 * 60 * 60);
        console.log("Days ===>", res.Days);
        if (res.Days <= 0 && res.unstaked == false) {
          res.Days = 0;
          amount = amount + Number(res.quantity);
        }
      }
      dispatch({
        type: "unstakeableXIO",
        payload: amount,
      });
    } catch (e) {
      console.log(e)
    }
  };
};

export const onUnStakeXio = (address, timestampArray ,amount) => {
  return async (dispatch) => {
    try {
      const { web3js } = await ContractInits.init();
      const portalContract = await ContractInits.initPortalContract();
      if (address) {
        if (amount && Number(amount) < 1) {
          dispatch(onToast("Please enter the amount of XIO you want to unstake."));
          return;
        }
        dispatch(onSetUnStakeLoading(true));
        console.log('dataaa ==>',address,timestampArray,amount)
        const timestampses = calculateTimestampArray(timestampArray,amount)
        const amountToSend = await web3js.utils.toWei(amount.toString());
        console.log("amountToSend and amount",timestampses, amountToSend, amount);
        let rawTransaction = {
          from: address,
          to: PORTAL_ADDRESS,
          value: 0,
          // gasLimit: 1000000,
          gasPrice: Number((await getCurrentGasPrices()).high) * 1000000000,
          data: portalContract.methods.withdrawXIO(timestampses,amountToSend).encodeABI(),
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
              dispatch(onCalculateUnstakeXIO(address));
              setTimeout(() => {
                dispatch(onSetUnStakeAmount(0))
                dispatch(onSetUnStakeLoading(false));
                dispatch(onToast("Staked XIO Successfully Unstaked."));
              }, 3000);
              console.log("confirmation ==>", confirmationNumber);
            }
          })
          .on("error", (e) => {
            console.log(e);
            dispatch(onSetUnStakeLoading(false));
            dispatch(onToast("Oops, something went wrong please try again."));
          });
      } else {
        dispatch(onToast("PLEASE CONNECT TO METAMASK WALLET !!"));
      }
    } catch (e) {
      console.log(e);
      dispatch(onSetUnStakeLoading(false));
      dispatch(onToast("Oops, something went wrong please try again."));
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

const calculateTimestampArray = (_timestampArray,_amount) => {
  console.log('valuess ==>',_timestampArray)
  const returedArray = [];
  for (let i = 0; i < _timestampArray.length; i++) {
  console.log('valuess inn ==>',_timestampArray[i])
    if ( _timestampArray[i].Days == 0 ) {
            returedArray.push(_timestampArray[i].timestamp)
            if (
                _amount >
                _timestampArray[i].quantity
            ) {
                _amount = _amount - 
                    _timestampArray[i].quantity
            } else if (
                _amount ==
                _timestampArray[i].quantity
            ) {
                break;
            } else if (
                _amount <
                _timestampArray[i].quantity
            ) {
                break;
            }
        }
    }
    return returedArray
}