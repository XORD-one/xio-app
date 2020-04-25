import ContractInits from "../config/contractsInit";
import { formattedNum } from "../../utils";
import firebase from "../../config/firebase";
import { ERC20_ABI } from "../../contracts/erc20";

export const getBalance = (address) => {
  return async (dispatch) => {
    try {
      const { web3js } = await ContractInits.init();
      let res = await (await ContractInits.initXioContract()).methods
        .balanceOf(address)
        .call();
        console.log('before ==>',res)
      res = await web3js.utils.fromWei(res.toString())
      console.log('after ==>',res)

      dispatch({ type: "getBalance", payload: res });
    } catch (e) {
      console.log(e);
    }
  };
};

export const getStakerData = (address) => {
  return async (dispatch) => {
    try {
      const portalContract = await ContractInits.initPortalContract();
      const { web3js } = await ContractInits.init();
      let amount = 0;
      const portalInfo = [];
      const timestampToRemove = [];
      const active = await getStakedData(address);
      console.log("active ==>", active);
      for (let i = 0; i < active.length; i++) {
        const res = await portalContract.methods
          .stakerData(address, active[i])
          .call();
        let contract = new web3js.eth.Contract(
          ERC20_ABI,
          res.outputTokenAddress
        );
        let symbol = await contract.methods.symbol().call();
        res.outputTokenSymbol = symbol;
        res.timestamp = active[i];

        console.log("before from WEI ==>", res.quantity);
        res.quantity = await web3js.utils.fromWei(res.quantity.toString());
        //   console.log("after from WEI ==>", res.stakeQuantity);
        res.boughAmount = await web3js.utils.fromWei(res.boughAmount.toString());
        amount = amount + Number(res.quantity);

        res.Days =
          res.durationTimestamp - (Math.round(new Date() / 1000) - active[i]);
        // (24 * 60 * 60);
        console.log("Days ===>", res.Days);
        if (res.Days <= 0) {
          res.Days = 0;
        } else {
          res.Days = Math.ceil(res.Days / 60);
        }
        console.log("res from stakerData ==>", res);

        if (res.unstaked == false) {
          portalInfo.push(res);
        }
        if (res.unstaked == true) {
          timestampToRemove.push(active[i]);
        }
      }
      if (timestampToRemove.length)
        setFilteredTimestamp(active, timestampToRemove, address);
      dispatch({
        type: "stakerData",
        payload: { stakedXio: amount, activePortal: portalInfo },
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const onGetInterestRate = () => {
  return async (dispatch) => {
    try {
      let res = await (await ContractInits.initPortalContract()).methods
        .getInterestRate()
        .call();
      res = await (await ContractInits.init()).web3js.utils.fromWei(
        res.toString()
      );
      res = Math.ceil(res * 365 * 100);
      dispatch({
        type: "getInterest",
        payload: res,
      });
    } catch (e) {
      console.log(e);
    }
  };
};

export const onGetPortalData = () => {
  return async (dispatch) => {
    try {
      const amount = await (await ContractInits.init()).web3js.utils.toWei("1");
      const response = await fetch(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD"
      );
      const conversionRate = await response.json();
      const interestList = [];
      let i = 0;
      while (true) {
        const res = await (await ContractInits.initPortalContract()).methods
          .portalData(i)
          .call();
        //   console.log(res);
        if (res.outputTokenSymbol === "NONE") {
          i++;
          continue;
        }
        if (res.tokenAddress === "0x0000000000000000000000000000000000000000") {
          break;
        }
        let res1 = await (await ContractInits.init()).web3js.eth.getBalance(
          res.tokenExchangeAddress
        );
        res1 = await (await ContractInits.init()).web3js.utils.fromWei(
          res1.toString()
        );
        res.xioStaked = await (await ContractInits.init()).web3js.utils.fromWei(
          res.xioStaked.toString()
        );
        res.xioStaked = formattedNum(Number(res.xioStaked));
        const obj = {
          ...res,
          liquidity: `$${formattedNum(
            Number(res1) * conversionRate.USD * 2,
            true
          )}`,
        };
        interestList.push(obj);
        i++;
      }
      dispatch({
        type: "interestList",
        payload: interestList,
      });
    } catch (e) {
      console.log(e);
      dispatch({
        type: "interestList",
        payload: [],
      });
    }
  };
};

export const getStakedData = (address) => {
  return new Promise((resolve, reject) => {
    try {
      firebase
        .collection("users")
        .where("address", "==", address)
        .get()
        .then((doc) => {
          console.log("res ==>", doc);
          if (doc.empty) {
            console.log("empty ==>", doc.empty);
            resolve([]);
          }
          let editDoc;
          let docID;
          doc.forEach((item) => {
            editDoc = item.data();
            docID = item.id;
          });
          if (editDoc) resolve(editDoc.active);
        });
    } catch (e) {
      reject({ message: e });
    }
  });
};

const setFilteredTimestamp = (active, remove, address) => {
  try {
    for (let i = 0; i < active.length; i++) {
      for (let j = 0; j < remove.length; j++) {
        if (active[i] == remove[j]) {
          active.splice(i, 1);
          break;
        }
      }
    }
    firebase
      .collection("users")
      .where("address", "==", address)
      .get()
      .then((doc) => {
        let editDoc;
        let docID;
        doc.forEach((item) => {
          editDoc = item.data();
          docID = item.id;
        });
        editDoc.active = active;
        firebase
          .collection("users")
          .doc(docID)
          .set(editDoc)
          .then((addedDoc) => {
            console.log("doc updated==>", addedDoc);
          });
      });

    console.log("filtered ==>", active);
  } catch (e) {
    console.log(e);
  }
};
