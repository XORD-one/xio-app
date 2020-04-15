import ContractInits from "../config/contractsInit";

export const checkWeb3 = () => {
  return async (dispatch) => {
    dispatch({
      type: "checkWeb3",
      payload: await ContractInits.init(),
    });
  };
};
