import ContractInits from "../config/contractsInit";
import { PORTAL_ADDRESS } from "../../contracts/portal";
import { onSetStakeLoading, onSetTransactionMessage,onToast } from "./layoutActions";
import { get64BytesString,getCurrentGasPrices } from "../../utils";
import { XIO_ADDRESS } from "../../contracts/xio";

export const getTokenData = () => {
  return async (dispatch) => {
    try {
      const tokenList = [];
      const tokens = {};
      let index = 0;
      while (true) {
        let res = await (await ContractInits.initPortalContract()).methods
          .portalData(index)
          .call();
        if (res.outputTokenSymbol === "NONE") {
          index++;
          continue;
        }
        if (res.tokenAddress == "0x0000000000000000000000000000000000000000") {
          break;
        }
        if (tokens[res.outputTokenSymbol]) {
        } else {
          tokens[res.outputTokenSymbol] = 1;
          tokenList.push(res);
        }
        index++;
      }
      dispatch({ type: "getTokens", payload: tokenList });
    } catch (e) {
      console.log(e);
    }
  };
};

export const onGetIsUnlock = (address) => {
  return async (dispatch) => {
    try {
      console.log("address in getIsUnlock -->", address);
      const res = await (await ContractInits.initXioContract()).methods
        .allowance(address, PORTAL_ADDRESS)
        .call();
      dispatch({
        type: "getUnlock",
        payload: !!(res != 0),
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const onGetXioLimit = () => {
  return async (dispatch) => {
    try {
      const res = await (await ContractInits.initPortalContract()).methods
        .getXIOStakeQuantity()
        .call();
      const xio = await (await ContractInits.init()).web3js.utils.fromWei(
        res.toString()
      );
      dispatch({
        type: "onXioLimit",
        payload: xio,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const onGetDaysLimit = () => {
  return async (dispatch) => {
    try {
      const res = await (await ContractInits.initPortalContract()).methods
        .getDays()
        .call();
      dispatch({
        type: "onDaysLimit",
        payload: res,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const onGetInterestRate = (
  initial,
  amountXioInput,
  durationDaysInput,
  token
) => {
  return async (dispatch) => {
    try {
      const res = await (await ContractInits.initPortalWithInfura()).methods
        .getInterestRate()
        .call();
      dispatch({
        type: "onInitialInterestRate",
        payload: res,
      });
      const result = await getXIOtoETHsAndETHtoALT(res, token);
      console.log("result ==>", result);
      dispatch({
        type: "onInterestRate",
        payload: result,
      });
      if (initial) {
        console.log("result in ==>", result);
        dispatch({
          type: "onUnitInterestRate",
          payload: result,
        });
        const interests = (
          Number(amountXioInput) *
          Number(durationDaysInput) *
          Number(result)
        ).toFixed(4);
        dispatch({
          type: "onInterestRate",
          payload: interests,
        });
        dispatch({
          type: "onInitial",
          payload: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};

const getXIOtoETHsAndETHtoALT = async (amount, token) => {
  try {
    const res = await (await ContractInits.initPortalWithInfura()).methods
      .getXIOtoETH(amount)
      .call();
    console.log("res of xiotoeth ==>", res);
    let res1 = await (await ContractInits.initPortalWithInfura()).methods
      .getETHtoALT(res, token.tokenExchangeAddress)
      .call();
    console.log("res of ethToAlt ==>", res);
    res1 = await (await ContractInits.init()).web3js.utils.fromWei(
      res1.toString()
    );

    return res1;
  } catch (e) {
    console.log(e);
  }
};

export const onApprove = (isUnlock, address) => {
  return async (dispatch) => {
    try {
      if (isUnlock) {
        dispatch(onToast("Wallet already activated, you can start staking now."));
        return;
      }
      if (address) {
        dispatch(
          onSetTransactionMessage({
            message: "PLEASE CONFIRM PERMISSION TO ACTIVATE YOUR WALLET",
            hash: "",
          })
        );
        dispatch(onSetStakeLoading(true));
        // const amount = await (await ContractInits.init()).web3js.utils.toWei(amountXioInput.toString());
        const functionSelector = "095ea7b3";
        const allowance =
          "f000000000000000000000000000000000000000000000000000000000000000";
        let spender = get64BytesString(PORTAL_ADDRESS);
        if (spender.length !== 64) {
          return null;
        }

        let rawTransaction = {
          from: address,
          to: XIO_ADDRESS,
          value: 0,
          data: `0x${functionSelector}${spender}${allowance}`,
        };

        (await ContractInits.init()).web3js.eth
          .sendTransaction(rawTransaction)
          .on("transactionHash", function (hash) {
            //console.log("hash ==>", hash);
            dispatch(
              onSetTransactionMessage({
                message: "YOUR WALLET ACTIVATION IS PENDING, PLEASE WAIT",
                hash,
              })
            );
          })
          .on("receipt", function (receipt) {
            //console.log("receipt ==>", receipt);
          })
          .on("confirmation", function (confirmationNumber, receipt) {
            if (confirmationNumber == 1) {
              //console.log("confirmation ==>", confirmationNumber);
              dispatch(onGetIsUnlock());
              dispatch(onToast(
                "You have successfully activated your wallet and can now begin staking XIO"
              ));
              dispatch(onSetStakeLoading(false));
              dispatch(onSetTransactionMessage({ message: "", hash: "" }));
            }
          })
          .on("error", function (e) {
            console.log(e);
            dispatch(onSetStakeLoading(false));
            dispatch(onToast("Oops, something went wrong please try again"));
          });
      } else {
        dispatch(onToast("PLEASE CONNECT TO METAMASK WALLET"));
      }
    } catch (e) {}
  };
};

export const onSetInterestRate = (interest) => {
  return {
    type: "onInterestRate",
    payload: interest,
  };
};

export const onSetInitial = () => {
  return {
    type: "onInitial",
    payload: true,
  };
};

export const onSetXio = (xio) => {
  return {
    type: "onXio",
    payload: xio,
  };
};

export const onSetDays = (days) => {
  return {
    type: "onDays",
    payload: days,
  };
};

export const onSetToken = (token) => {
  return {
    type: "onToken",
    payload: token,
  };
};


export const onConfirmStake = (address,balance,amountXioInput,initialRate,durationDaysInput,token) => {
  return async (dispatch) => {
    try {
      const {web3js} = await ContractInits.init()
      console.log('address,balance,amountXioInput,initialRate,durationDaysInput,token ==>',address,balance,amountXioInput,initialRate,durationDaysInput,token)
      if (address) {
        if (Number(balance) < Number(amountXioInput)) {
          dispatch(onToast(
            "You have insuffient amount of XIO to make this transaction."
          ));
          return;
        }
        dispatch(onSetStakeLoading(true));
        dispatch(onSetTransactionMessage({
          message: "PLEASE CONFIRM STAKE TRANSACTION IN YOUR WALLET",
          hash: "",
        }));
        const amount = await web3js.utils.toWei(amountXioInput.toString());
        const rateFromWei = await web3js.utils.fromWei(initialRate.toString());
        let calculatedValue =
          Number(durationDaysInput) *
          Number(amountXioInput) *
          Number(rateFromWei);

        calculatedValue = calculatedValue.toFixed(18);
        let tokensBought = await getXIOtoETHsAndETHtoALT(
          await web3js.utils.toWei(calculatedValue.toString()),token
        );
        let resultA = tokensBought;
        let tempA = (Number(resultA) - Number(resultA * 0.0075)).toFixed(18);
        tokensBought = await web3js.utils.toWei(tempA.toString());
        console.log("tokens bought ==>", tokensBought);

        const params = {
          tokenAddress: token.tokenAddress,
          durationDaysInput,
          amount,
          tokensBought,
          portalId: token.portalId,
          symbol: token.outputTokenSymbol,
        };

        console.log("params ==>", params);

        await (await ContractInits.initPortalContract()).methods
          .stakeXIO(
            token.tokenAddress,
            durationDaysInput,
            amount,
            tokensBought,
            token.portalId
          )
          .send({
            from: address,
            gasLimit: 2000000,
            gasPrice: Number((await getCurrentGasPrices()).high) * 1000000000,
          })
          .on("transactionHash", (hash) => {
            // hash of tx
            console.log(hash);
            dispatch(onSetTransactionMessage({ message: "", hash }));
          })
          .on("confirmation", function (confirmationNumber, receipt) {
            if (confirmationNumber === 1) {
              // tx confirmed
              //console.log(receipt);
              dispatch(onSetStakeLoading(false));
              dispatch(onToast(
                `You have successfully staked ${amountXioInput} XIO and can unlock these tokens after ${durationDaysInput} days.`
              ));
            }
          });
      } else {
        dispatch(onToast("PLEASE CONNECT TO METAMASK WALLET"));
      }
    } catch (e) {
      console.log(e);
      dispatch(onToast("Oops, something went wrong please try again"));
      dispatch(onSetStakeLoading(false));
    }
  }
}