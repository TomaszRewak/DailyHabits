import './HabitManager.css';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../store/Habits';

import HabitManagerItem from './HabitManagerItem'

class HabitManager extends Component {
	constructor(props) {
		super(props);

		this.onChange = this.onChange.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onCreate = this.onCreate.bind(this);
	}

	render() {
		return (
			<div className="habit-manager">
				<div>
					{
						this.props.habits.map(habit =>
							<HabitManagerItem
								id={habit.id}
								name={habit.name}
								icon={habit.icon}
							/>
						)
					}
				</div>
				<button onClick={this.onCreate}>Create</button>
			</div>
		);
	}

	onChange(habitId, newState) {

	}

	onDelete(habitId) {

	}

	onCreate() {
		this.props.createHabit({
			name: 'Temp name'
		});
	}
}

export default connect(
	state => {
		let habits = state.habits.availableHabits;

		return { habits: habits };
	},
	dispatch => bindActionCreators(actionCreators, dispatch)
)(HabitManager);