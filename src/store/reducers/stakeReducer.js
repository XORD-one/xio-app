const initState = {
  tokenList: [],
  token: {},
  isUnlock: true,
  xioLimit: 5000,
  daysLimit: 30,
  initialRate: 0,
  interestRate:0,
  unitRate: 0,
  initial: true,
  xioAmount: 1,
  days: 1
};

const stakeReducer = (state = initState, action) => {
  switch (action.type) {
    case "getTokens":
      return {
        ...state,
        tokenList: action.payload,
        token: action.payload[0],
      };
    case "getUnlock":
      console.log('unlock -->',action.payload)
      return {
        ...state,
        isUnlock: action.payload,
      };
    case "onXioLimit":
      return{
        ...state,
        xioLimit: action.payload
      };
    case "onDaysLimit":
      return{
        ...state,
        daysLimit: action.payload
      };
    case "onInitialInterestRate":
      return{
        ...state,
        initialRate: action.payload
      };
    case "onInterestRate": 
      return{
        ...state,
        interestRate: action.payload
      }
    case "onUnitInterestRate":
      return{
        ...state,
        unitRate: action.payload
      };
    case "onInitial":
      return{
        ...state,
        initial: action.payload
      };
    case "onXio":
      return {
        ...state,
        xioAmount: action.payload
      };
    case "onDays":
      return {
        ...state,
        days: action.payload
      }
    case "onToken":
      return {
        ...state,
        token: action.payload
      }
    default:
      return state;
  }
};

export default stakeReducer;
