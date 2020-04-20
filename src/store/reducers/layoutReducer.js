const initState = {
  address: null,
  network: "main",
  stakeLoading: false,
  stakeTransactionMessage: { message: "", hash: "" },
  unStakeLoading: false,
  toastState: false,
  toastMessage: "",
};

const LayoutReducer = (state = initState, action) => {
  switch (action.type) {
    case "checkWeb3":
      return {
        ...state,
        address: action.payload.address,
        network: action.payload.network,
      };
    case "onStakeLoad":
      return {
        ...state,
        stakeLoading: action.payload,
      };
    case "onStakeMessage":
      return {
        ...state,
        stakeTransactionMessage: action.payload,
      };
    case "onUnStakeLoad":
      return {
        ...state,
        unStakeLoading: action.payload,
      };
    case "onToastOpen":
      return {
        ...state,
        toastMessage: action.payload.message,
        toastState: action.payload.open,
      };
    case "onHandleToastClose":
      return {
        ...state,
        toastState: action.payload,
      };
    default:
      return state;
  }
};

export default LayoutReducer;
