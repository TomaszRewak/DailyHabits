import { actionCreators as eventActionCreators } from './Events'
import moment from 'moment'

export const actionCreators = {
	setDate: date => (dispatch, getState) => {
		dispatch({ type: 'SET_DATE', date: date.clone().utc().startOf('day') });
		eventActionCreators.requestEventData()(dispatch, getState);
	},
	setConfiguration: configuration => (dispatch, getState) => {
		dispatch({ type: 'SET_CONFIGURATION', configuration });
		eventActionCreators.requestEventData()(dispatch, getState);
	},
};

const initialState = {
	date: moment().utc().startOf('day').add({ days: 2 }),
	days: 100,
	influenceWindow: 3,
	currentDate: moment().utc().startOf('day')
}

export const reducer = (state, action) => {
	state = state || initialState;

	switch (action.type) {
		case 'SET_DATE':
			return {
				...state,
				date: action.date
			};
		case 'SET_CONFIGURATION':
			return {
				...state,
				...action.configuration
			};
		default:
			return state;
	}
}