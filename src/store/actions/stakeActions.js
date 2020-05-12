import ContractInits from "../config/contractsInit";
import { PORTAL_ADDRESS } from "../../contracts/portal";
import {
  onSetStakeLoading,
  onSetTransactionMessage,
  onToast,
} from "./layoutActions";
import {getStakerData} from "./dashboardActions"
import { get64BytesString, getCurrentGasPrices } from "../../utils";
import { XIO_ADDRESS } from "../../contracts/xio";
import firebase from "../../config/firebase";
import { ERC20_ABI } from "../../contracts/erc20";

export const getTokenData = () => {
  return async (dispatch) => {
    try {
      const { web3js } = await ContractInits.init();
      const portalContract = await ContractInits.initPortalContract();
      const addresses = await portalContract.methods.getPortalHistory().call();
      const tokenList = [];
      for(let i = 0; i<addresses.length ; i++ ){
        const obj = await portalContract.methods.portalData(addresses[i]).call();
        let contract = new web3js.eth.Contract(ERC20_ABI, obj.tokenAddress);
        let symbol = await contract.methods.symbol().call();
        obj.outputTokenSymbol = symbol;
        console.log('symbol in getTokenData -->',symbol)
        if (obj.active === true) {
          tokenList.push(obj);
        }
      };
      // Promise.all(promises).then((res) => {
        if (tokenList.length) {
          dispatch({ type: "getTokens", payload: tokenList });
        }
      // });
    } catch (e) {
      console.log(e);
    }
  };
};

export const onGetIsUnlock = (address) => {
  return async (dispatch) => {
    try {
      if(address){
        console.log("address in getIsUnlock -->", address);
        const res = await (await ContractInits.initXioContract()).methods
        .allowance(address, PORTAL_ADDRESS)
        .call();
        dispatch({
          type: "getUnlock",
          payload: !!(res != 0),
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const onGetXioLimit = () => {
  return async (dispatch) => {
    try {
      const portalContract = await ContractInits.initPortalWithInfura()
      const {web3js} = await ContractInits.init()
      const res = await portalContract.methods
        .getxioQuantity()
        .call();
        console.log('res xio quantity -->',res)
      const xio = await web3js.utils.fromWei(
        res.toString()
      );
      console.log('res after from wei -->',xio)
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
  token,
  onSetInitial
) => {
  return async (dispatch) => {
    try {
      console.log('console on render ==>',  initial,
      amountXioInput,
      durationDaysInput,
      token)
      const res = await (await ContractInits.initPortalWithInfura()).methods
        .getInterestRate()
        .call();
      console.log("initial interest ==>", res);
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
        onSetInitial()
      }
    } catch (e) {
      console.log(e);
    }
  };
};

const getXIOtoETHsAndETHtoALT = async (amount, token) => {
  try {
    console.log("amount ==>", amount);
    console.log("token ==>", token);
    const infuraPortal = await ContractInits.initPortalWithInfura();
    const res = await infuraPortal.methods.getXIOtoETH(amount).call();
    console.log("res of xiotoeth ==>", res);
    let res1 = await infuraPortal.methods
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
      if (!address) {
        dispatch(
          onToast("PLEASE CONNECT TO METAMASK TO CONTINUE")
        );
        return;
      }
      if (isUnlock) {
        dispatch(
          onToast("Wallet already activated, you can start staking now.")
        );
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
              dispatch(onGetIsUnlock(address));
              dispatch(
                onToast(
                  "You have successfully activated your wallet and can now begin staking XIO"
                )
              );
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

export const onConfirmStake = (
  address,
  balance,
  amountXioInput,
  initialRate,
  durationDaysInput,
  token,
  isUnlock
) => {
  return async (dispatch) => {
    try {
      const { web3js } = await ContractInits.init();
      console.log(
        "address,balance,amountXioInput,initialRate,durationDaysInput,token ==>",
        address,
        balance,
        amountXioInput,
        initialRate,
        durationDaysInput,
        token
      );
      if (address) {
        console.log('isUnlock on confirm ==>',isUnlock)
        if(!isUnlock){
          dispatch(
            onToast(
              "Activate Wallet to continue."
            )
          );
          return;
        }
        if (Number(balance) < Number(amountXioInput)) {
          dispatch(
            onToast(
              "You have insuffient amount of XIO to make this transaction."
            )
          );
          return;
        }
        dispatch(onSetStakeLoading(true));
        dispatch(
          onSetTransactionMessage({
            message: "PLEASE CONFIRM STAKE TRANSACTION IN YOUR WALLET",
            hash: "",
          })
        );
        console.log("amount before ==>", amountXioInput);
        const amount = await web3js.utils.toWei(amountXioInput.toString());
        console.log("amount after ==>", amount);
        const rateFromWei = await web3js.utils.fromWei(initialRate.toString());
        let calculatedValue =
          Number(durationDaysInput) *
          Number(amountXioInput) *
          Number(rateFromWei);

        calculatedValue = calculatedValue.toFixed(18);
        let tokensBought = await getXIOtoETHsAndETHtoALT(
          await web3js.utils.toWei(calculatedValue.toString()),
          token
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
          .stakeXIO(token.tokenAddress, durationDaysInput, amount, tokensBought)
          .send({
            from: address,
            // gasLimit: 2000000,
            gasPrice: Number((await getCurrentGasPrices()).high) * 1000000000,
          })
          .on("transactionHash", async (hash) => {
            // hash of tx
            console.log(hash);
            await storeTransactions(address,hash)
            dispatch(onSetTransactionMessage({ message: "", hash }));
          })
          .on("confirmation", async function (confirmationNumber, receipt) {
            if (confirmationNumber === 1) {
              // tx confirmed
              console.log("recipt ==>", receipt);
              console.log("confirm ==>", confirmationNumber);
              dispatch(onSetXio(1))
              dispatch(onSetDays(1))
              dispatch(onSetInterestRate(0))
              dispatch(onSetStakeLoading(false));
              dispatch(getStakerData(address))
              dispatch(
                onToast(
                  `You have successfully staked ${amountXioInput} XIO and can unlock these tokens after ${durationDaysInput} days.`
                )
              );
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
  };
};

const fetchEvent = async (address, blocknumber) => {
  try {
    console.log("number =>", blocknumber);
    const portalContract = await ContractInits.initPortalContract();
    await portalContract
      .getPastEvents("StakeCompleted", {
        fromBlock: blocknumber - 1,
        toBlock: blocknumber,
      })
      .then((events) => {
        console.log("eventss ==>", events);
        // events.forEach(async (event) => console.log('event ==>',event));
        storeStakedData(address, events[0].returnValues.timestamp);
      });
  } catch (e) {
    console.log(e);
  }
};

export const storeStakedData = (address, timestamp) => {
  try {
    firebase
      .collection(process.env.REACT_APP_COLLECTION)
      .where("address", "==", address.toLowerCase())
      .get()
      .then((doc) => {
        try{

          console.log("res ==>", doc);
          if (doc.empty) {
            console.log("empty ==>", doc.empty);
          firebase
          .collection(process.env.REACT_APP_COLLECTION)
            .add({ address: address.toLowerCase(), history: [timestamp], active: [timestamp] })
            .then((data) => {
              console.log("data ==>", data);
              return;
            });
        }
        let editDoc;
        let docID;
        doc.forEach((item) => {
          editDoc = item.data();
          docID = item.id;
        });
        console.log("edit doc ==>", editDoc);
        editDoc.history.push(timestamp);
        editDoc.active.push(timestamp);
        editDoc.hashes.pop()
        firebase
        .collection(process.env.REACT_APP_COLLECTION)
        .doc(docID)
        .set(editDoc).then((addedDoc)=>{
          console.log('doc updated==>',addedDoc)
        })
      }
      catch(e){
        console.log(e)
      }
      });
  } catch (e) {
    console.log(e);
  }
};


const storeTransactions = (address, hash) => {
  try {
    firebase
      .collection(process.env.REACT_APP_COLLECTION)
      .where("address", "==", address.toLowerCase())
      .get()
      .then((doc) => {
        try{

          console.log("res ==>", doc);
          if (doc.empty) {
            console.log("empty ==>", doc.empty);
          firebase
          .collection(process.env.REACT_APP_COLLECTION)
            .add({ address: address.toLowerCase(), hashes: [{hash,status:'pending'}] })
            .then((data) => {
              console.log("data ==>", data);
              return;
            });
        }
        let editDoc;
        let docID;
        doc.forEach((item) => {
          editDoc = item.data();
          docID = item.id;
        });
        console.log("edit doc ==>", editDoc);
        if(editDoc.hashes && editDoc.hashes.length){
          editDoc.hashes.push({hash,status:'pending'});
        }
        else{
          editDoc.hashes = [{hash,status:'pending'}]
        }
        firebase
        .collection(process.env.REACT_APP_COLLECTION)
        .doc(docID)
        .set(editDoc).then((addedDoc)=>{
          console.log('doc updated==>',addedDoc)
        })
      }
      catch(e){
        console.log(e)
      }
      });
  } catch (e) {
    console.log(e);
  }
};
