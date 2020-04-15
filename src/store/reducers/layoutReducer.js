
const initState = {
    address: null,
    network: 'main',
};

const LayoutReducer = (state = initState, action) => {
	switch (action.type) {
		case 'checkWeb3':
			return {
				...state,
                address: action.payload.address,
                network: action.payload.network
			};

		default:
			return state;
	}
};

export default LayoutReducer;
