const initState = {
    unstakeAmount: 0
  };
  
  const unstakeReducer = (state = initState, action) => {
    switch (action.type) {
      case "onUnStakeAmount":
        return {
          ...state,
          unstakeAmount: action.payload,
        };

  
      default:
        return state;
    }
  };
  
  export default unstakeReducer;
  