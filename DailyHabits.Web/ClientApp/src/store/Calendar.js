import { actionCreators as eventActionCreators } from './Events'

export const actionCreators = {
	setInterval: (startDate, endDate) => (dispatch, getState) => {
		dispatch({ type: 'SET_INTERVAL', interval: { startDate, endDate } });

		eventActionCreators.requestEventData(startDate, endDate)(dispatch, getState);
	}
};

const initialState = {
	startDate: new Date(),
	endDate: new Date(),
	daysGrouping: 1
}

export const reducer = (state, action) => {
	state = state || initialState;

	switch (action.type) {
		case 'SET_INTERVAL':
			return {
				...state,
				...action.interval
			}
		default:
			return state;
	}
}