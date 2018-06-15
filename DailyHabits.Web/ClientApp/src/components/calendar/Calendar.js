import './Calendar.css'

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Calendar';

import CalendarDay from './CalendarDay'

class Calendar extends Component {
	constructor(props) {
		super(props);

		this.addEvent = this.addEvent.bind(this);
	}

	componentWillMount() {
		this.props.requestCalendarData();
	}

	render() {
		return (
			<div>
				<h2>Calendar</h2>
				<div className="calendar-body">
					{
						this.props.days.map(day =>
							<CalendarDay day={day.day} events={day.events} onAddEvent={this.addEvent}>
							</CalendarDay>
						)
					}
				</div>
			</div>
		);
	}

	addEvent(date, habit) {
		this.props.addEvent(date, habit);
	}
}

export default connect(
	(state) => {
		let calendar = state.calendar;
		let availableHabits = state.habits.availableHabits;

		let getDay = (date) => Math.round((date.getTime() - calendar.startDate.getTime()) / 1000 / 60 / 60 / 24);
		let getDate = (day) => new Date(calendar.startDate.getTime() + day * 24 * 60 * 60 * 1000);

		let days = getDay(calendar.endDate) + 1;
		let matrix = Array.from({ length: days }, (_, day) => ({
			day: getDate(day),
			events: Array(calendar.displayedHabits.length)
		}));

		let displayerEvents = calendar.events.filter(e =>
			calendar.displayedHabits.indexOf(e.habitId) !== -1 &&
			e.date >= calendar.startDate &&
			e.date <= calendar.endDate
		);

		for (let event of displayerEvents) {
			let dayIndex = getDay(event.date);
			let habitIndex = calendar.displayedHabits.indexOf(event.habitId);
			let habit = availableHabits.find(h => h.habitId === event.habitId);

			matrix[dayIndex].events[habitIndex] = {
				kind: 'event',
				event: {
					eventColor: habit.color,
					icon: habit.icon
				}
			};
		}

		let inactivities = Array(calendar.displayedHabits.length).fill(-1);

		for (let day of matrix) {
			for (let habitIndex in inactivities) {
				let habit = availableHabits.find(h => h.habitId === calendar.displayedHabits[habitIndex]);

				if (day.events[habitIndex] != null)
					inactivities[habitIndex] = 0;
				else if (inactivities[habitIndex] === -1) {
					day.events[habitIndex] = {
						kind: 'none',
						placeholder: {
							habit: habit.habitId
						}
					}
				}
				else {
					inactivities[habitIndex]++;

					day.events[habitIndex] = {
						kind: 'separator',
						separator: {
							daysOfInactivity: inactivities[habitIndex],
							eventColor: habit.color,
							initialColor: habit.initialColor,
							finalColor: habit.finalColor,
							target: habit.target,
							habit: habit.habitId
						}
					}
				}
			}
		}

		for (let day = getDay(new Date()) + 1; day < matrix.length; day++) {
			for (let habitKey in matrix[day].events)
				matrix[day].events[habitKey] = { kind: 'upcoming' };
		}

		return { days: matrix };
	},
	dispatch => bindActionCreators(actionCreators, dispatch)
)(Calendar);