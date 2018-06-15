export const actionCreators = {
	setStartDate: (date) => (dispatch, getState) => {
		dispatch({ type: 'SET_START_DATE_ACTION', date: date });
	},
	setEndDate: (date) => (dispatch, getState) => {
		dispatch({ type: 'SET_END_DATE_ACTION', date: date });
	},
	requestCalendarData: () => (dispatch, getState) => {
		dispatch({ type: 'REQUEST_CALENDAR_DATA_ACTION' });
	},
	addEvent: (date, habit) => (dispatch, getState) => {
		dispatch({ type: 'ADD_EVENT_ACTION', date: date, habit: habit });
	},
	removeEvent: (date, habit) => (dispatch, getState) => {
		dispatch({ type: 'REMOVE_EVENT_ACTION', date: date, habit: habit });
	}
};

const initialState = {
	startDate: new Date(2018, 1, 1),
	endDate: new Date(2018, 6, 30),
	events: [
		{
			eventId: 3,
			habitId: 123,
			date: new Date(2018, 2, 15)
		},
		{
			eventId: 4,
			habitId: 123,
			date: new Date(2018, 4, 15)
		},
		{
			eventId: 5,
			habitId: 248,
			date: new Date(2018, 3, 15)
		}
	],
	displayedHabits: [
		123, 248
	]
}

export const reducer = (state, action) => {
	state = state || initialState;

	switch (action.type) {
		case 'SET_START_DATE_ACTION':
			return Object.assign({}, state, {
				startDate: action.date
			});
		case 'SET_END_DATE_ACTION':
			return Object.assign({}, state, {
				endDate: action.date
			});
		case 'ADD_EVENT_ACTION':
			return Object.assign({}, state, {
				events: [...state.events,
				{
					habitId: action.habit,
					date: action.date,
				}
				]
			});
		case 'REMOVE_EVENT_ACTION':
			return Object.assign({}, state, {
				events: state.events.filter(e => e.date !== action.date || e.habitId !== action.habit)
			});
		default:
			return state
	}
}