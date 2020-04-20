import ContractInits from "../config/contractsInit";
import { formattedNum } from "../../utils";

export const getBalance = (address) => {
  return async (dispatch) => {
    try{
      let res = await (await ContractInits.initXioContract()).methods
      .balanceOf(address)
      .call();
      dispatch({ type: "getBalance", payload: res });
    }
    catch(e){
      console.log(e)
    }
  };
};

export const getStakerData = (address) => {
  return async (dispatch) => {
    let amount = 0;
    const portalInfo = [];
    const len = await (await ContractInits.initPortalContract()).methods
      .getArrayLengthOfStakerData(address)
      .call();
    for (let i = 0; i < len; i++) {
      const res = await (await ContractInits.initPortalContract()).methods
        .stakerData(address, i)
        .call();
      console.log(res);
    //   console.log("before from WEI ==>", res.stakeQuantity);
      res.stakeQuantity = await (
        await ContractInits.init()
      ).web3js.utils.fromWei(res.stakeQuantity.toString());
	//   console.log("after from WEI ==>", res.stakeQuantity);
	//   if(res.stakeQuantity != "38139616255565092315595030544923549366331929171149274075525.632187701261238278" && res.stakeQuantity != "30872622590356025101965439967658961449911655061062658493477.352019454282694662")
      amount = amount + Number(res.stakeQuantity);

      res.Days =
        res.stakeDurationTimestamp -
        (Math.round(new Date() / 1000) - res.stakeInitiationTimestamp);
      //console.log("Days ===>", res.Days);
      if (res.Days <= 0) {
        res.Days = 0;
      } else {
        res.Days = Math.ceil(res.Days / 60);
      }

      if (res.publicKey !== "0x0000000000000000000000000000000000000000") {
        portalInfo.push(res);
      }
    }
    dispatch({
      type: "stakerData",
      payload: { stakedXio: amount, activePortal: portalInfo },
    });
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
