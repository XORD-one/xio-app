const initState = {
    unstakeAmount: 0,
    unstakeableXIO: 0
  };
  
  const unstakeReducer = (state = initState, action) => {
    switch (action.type) {
      case "onUnStakeAmount":
        return {
          ...state,
          unstakeAmount: action.payload,
        };
      case "unstakeableXIO":
        return {
          ...state,
          unstakeableXIO: action.payload
        }
  
      default:
        return state;
    }
  };
  
  export default unstakeReducer;
  