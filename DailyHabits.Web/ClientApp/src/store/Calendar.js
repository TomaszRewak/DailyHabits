import { actionCreators as eventActionCreators } from './Events'
import moment from 'moment'

export const actionCreators = {
	setDate: date => (dispatch, getState) => {
		dispatch({ type: 'SET_DATE', date: date.clone().utc().startOf('day') });
		eventActionCreators.requestEventData()(dispatch, getState);
	},
	setDays: days => (dispatch, getState) => {
		dispatch({ type: 'SET_DAYS', days });
		eventActionCreators.requestEventData()(dispatch, getState);
	},
	setDaysGrouping: daysGrouping => (dispatch, getState) => {
		dispatch({ type: 'SET_DAYS_GROUPING', daysGrouping });
		eventActionCreators.requestEventData()(dispatch, getState);
	}
};

const initialState = {
	date: moment().utc().startOf('day').add({ days: 2 }),
	days: 100,
	daysGrouping: 1,
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
		case 'SET_DAYS':
			return {
				...state,
				days: action.days
			};
		case 'SET_DAYS_GROUPING':
			return {
				...state,
				daysGrouping: action.daysGrouping
			}
		default:
			return state;
	}
}