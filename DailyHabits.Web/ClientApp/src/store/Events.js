import moment from 'moment';

export const actionCreators = {
	requestEventData: (startDate, endDate) => async (dispatch, getState) => {
		const state = getState();
		const startDate = state.calendar.date.clone().add({ days: -state.calendar.days });
		const endDate = state.calendar.date;
		const influenceWindow = state.calendar.influenceWindow;

		dispatch({ type: 'GET_EVENTS_REQUEST' });

		const response = await fetch(
			`api/event?from=${startDate.toJSON()}&to=${endDate.toJSON()}&window=${influenceWindow}`,
			{
				method: 'GET'
			}
		);
		var result = await response.json();

		if (result.success)
			dispatch({
				type: 'GET_EVENTS',
				events: result.payload.map(event => ({
					...event,
					timestamp: moment.utc(event.timestamp)
				}))
			});
		else
			dispatch({ type: 'GET_EVENTS_ERROR' });
	},
	addEvent: (event) => async (dispatch, getState) => {
		dispatch({ type: 'ADD_EVENT_REQUEST', event: event });

		const response = await fetch(
			'api/event',
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(event)
			}
		);
		var result = await response.json();

		if (result.success)
			dispatch({ type: 'ADD_EVENT', event: { ...event, id: result.payload } });
		else
			dispatch({ type: 'ADD_EVENT_ERROR' });
	},
	editEvent: (event) => async (dispatch, getState) => {
		dispatch({ type: 'EDIT_EVENT_REQUEST', event: event });

		const response = await fetch(
			'api/event',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(event)
			}
		);

		var result = await response.json();
		if (result.success)
			dispatch({ type: 'EDIT_EVENT', event: event });
		else
			dispatch({ type: 'EDIT_EVENT_ERROR' });
	},
	removeEvent: (id) => async (dispatch, getState) => {
		dispatch({ type: 'REMOVE_EVENT_REQUEST' });

		var response = await fetch(
			`api/event/${id}`,
			{
				method: 'DELETE'
			}
		);
		var result = await response.json();

		if (result.success)
			dispatch({ type: 'REMOVE_EVENT', id: id });
		else
			dispatch({ type: 'REMOVE_EVENT_ERROR' });
	}
};

const initialState = [];

export const reducer = (state, action) => {
	state = state || initialState;

	switch (action.type) {
		case 'GET_EVENTS':
			return action.events;
		case 'ADD_EVENT':
			return [...state, action.event];
		case 'EDIT_EVENT':
			return state.map(e => e.id !== action.event.id ? e : action.event);
		case 'REMOVE_EVENT':
			return state.filter(e => e.id !== action.id);
		default:
			return state;
	}
};