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

	componentWillMount() {
		this.props.requestHabitData();
	}

	render() {
		return (
			<div className="habit-manager">
				<div>
					{
						this.props.habits.map(habit =>
							<HabitManagerItem
								key={habit.id}
								habit={habit}
								onChange={this.onChange}
								onDelete={this.onDelete}
							/>
						)
					}
				</div>
				<button onClick={this.onCreate}>Create</button>
			</div>
		);
	}

	onChange(habit) {
		this.props.updateHabit(habit);
	}

	onDelete(habitId) {
		this.props.deleteHabit(habitId);
	}

	onCreate() {
		this.props.createHabit({
			name: 'Temp name'
		});
	}
}

export default connect(
	state => {
		let habits = state.habits;

		return { habits: habits };
	},
	dispatch => bindActionCreators(actionCreators, dispatch)
)(HabitManager);