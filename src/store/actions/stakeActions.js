import ContractInits from "../config/contractsInit";

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
      dispatch({ type: "getBalance", payload: tokenList });
    } catch (e) {
      console.log(e);
    }
  };
};
