import ContractInits from "../config/contractsInit";

export const checkWeb3 = () => {
  return async (dispatch) => {
    dispatch({
      type: "checkWeb3",
      payload: await ContractInits.init(),
    });
  };
};

export const onSetStakeLoading = (load) => {
  return {
    type: "onStakeLoad",
    payload: load,
  };
};

export const onSetTransactionMessage = (message) => {
  return {
    type: "onStakeMessage",
    payload: message,
  };
};

export const onSetUnStakeLoading = (load) => {
  return {
    type: "onUnStakeLoad",
    payload: load,
  };
};

export const onToast = (message) => {
  return {
    type: "onToastOpen",
    payload: { message, open: true },
  };
};

export const handleToastClose = () => {
  return {
    type: "onHandleToastClose",
    payload: false,
  };
};
