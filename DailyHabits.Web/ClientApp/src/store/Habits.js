export const actionCreators = {
	requestHabitData: () => async (dispatch, getState) => {
		dispatch({ type: 'GET_HABITS_REQUEST' });

		const response = await fetch(
			'api/habit',
			{
				method: 'GET'
			}
		);
		const result = await response.json();

		if (result.success)
			dispatch({ type: 'GET_HABITS', habits: result.payload })
		else
			dispatch({ type: 'GET_HABITS_ERROR' });
	},
	createHabit: (habit) => async (dispatch, getState) => {
		dispatch({ type: 'CREATE_HABIT_REQUEST' });

		const response = await fetch(
			'api/habit',
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(habit)
			}
		);
		const result = await response.json();

		if (result.success)
			dispatch({ type: 'CREATE_HABIT', habit: { ...habit, id: result.payload } });
		else
			dispatch({ type: 'CREATE_HABIT_ERROR' });
	},
	deleteHabit: (id) => async (dispatch, getState) => {
		dispatch({ type: 'DELETE_HABIT_REQUEST' });

		const response = await fetch(
			`api/habit/${id}`,
			{
				method: 'DELETE',
			}
		);
		const result = await response.json();

		if (result.success)
			dispatch({ type: 'DELETE_HABIT', id: id });
		else
			dispatch({ type: 'DELETE_HABIT_ERROR' });
	},
	updateHabit: (habit) => async (dispatch, getState) => {
		dispatch({ type: 'UPDATE_HABIT_REQUEST', habit });

		const response = await fetch(
			'api/habit',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(habit)
			}
		);
		const result = await response.json();

		if (result.success)
			dispatch({ type: 'UPDATE_HABIT', habit });
		else
			dispatch({ type: 'UPDATE_HABIT_ERROR' });
	},
	moveHabit: (id, position) => async (dispatch, getState) => {
		dispatch({ type: 'MOVE_HABIT_REQUEST', id });

		const response = await fetch(
			'api/habit/change_order',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ id, position })
			}
		);
		const result = await response.json();

		if (result.success)
			dispatch({ type: 'MOVE_HABIT', id, position });
		else
			dispatch({ type: 'MOVE_HABIT_ERROR', id });
	}
}

const initialState = [];

export const reducer = (state, action) => {
	state = state || initialState;

	switch (action.type) {
		case 'GET_HABITS':
			return action.habits;
		case 'CREATE_HABIT':
			return [...state, action.habit];
		case 'DELETE_HABIT':
			return state.filter(habit => habit.id !== action.id);
		case 'UPDATE_HABIT':
			return state.map(habit => habit.id === action.habit.id ? action.habit : habit);
		case 'MOVE_HABIT':
			let orderedHabits = state.map((habit, index) => ({ habit, index }));
			let currentPosition = state.findIndex(habit => habit.id === action.id);

			if (currentPosition == -1)
				return;

			if (action.position < currentPosition)
				orderedHabits[currentPosition].index = action.position - 0.5;
			else
				orderedHabits[currentPosition].index = action.position + 0.5;

			return orderedHabits.sort((a, b) => a.index > b.index).map(element => element.habit);
		default:
			return state;
	}
}