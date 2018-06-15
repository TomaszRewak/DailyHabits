export const actionCreators = {
	requestHabitDate: () => (dispatch, getState) => {
		dispatch({ type: 'REQUEST_HABIT_DATA_ACTION' });
	},
	createHabit: (habit) => async (dispatch, getState) => {
		dispatch({
			type: 'HABIT_CREATION_REQUEST_ACTION'
		});

		const response = await fetch(
			`api/habit/create`,
			{
				method: 'POST',
				body: JSON.stringify({
					Name: habit.name
				})
			}
		);
		const result = await response.json();

		if (result.Success) {
			dispatch({
				type: 'HABIT_CREATION_DONE_ACTION',
				habit: Object.assign({}, habit, { id: result.Payload })
			});
		}
		else {
			dispatch({
				type: 'HABIT_CREATION_ERROR_ACTION'
			});
		}
	}
}

const initialState = {
	availableHabits: [
		{
			habitId: 123,

			name: 'Some habit',
			icon: 'knight',

			color: 'yellow',
			initialColor: 'red',
			finalColor: 'green',

			target: 14
		},
		{
			habitId: 248,

			name: 'Some habit',
			icon: 'flash',

			color: '#d3e5c2',
			initialColor: 'red',
			finalColor: 'gray',

			target: 20
		}
	]
};

export const reducer = (state, action) => {
	state = state || initialState;

	switch (action.type) {
		case 'HABIT_CREATION_DONE_ACTION':
			return Object.assign({}, state, {
				availableHabits: [
					...state.availableHabits,
					action.habit
				]
			});
		default:
			return state;
	}
}