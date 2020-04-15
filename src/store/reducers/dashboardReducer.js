const initState = {
  balance: 0,
  stakedXio: 0,
  activePortal: [],
  interest: 0,
  interestList: [],
  loading: true,
};

const dashboardReducer = (state = initState, action) => {
  switch (action.type) {
    case "getBalance":
      return {
        ...state,
        balance: action.payload,
      };
    case "stakerData":
      return {
        ...state,
        stakedXio: action.payload.stakedXio,
        activePortal: action.payload.activePortal,
      };
    case "getInterest":
      return {
        ...state,
        interest: action.payload,
      };
    case "interestList":
      return {
        ...state,
		interestList: action.payload,
		loading: false
      };

    default:
      return state;
  }
};

export default dashboardReducer;
