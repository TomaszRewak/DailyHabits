import './Calendar.css'

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators as calendarActionCreater } from '../../store/Calendar';
import { actionCreators as eventsActionCreator } from '../../store/Events'
import { actionCreators as habitsActionCreator } from '../../store/Habits'
import { getDaysOffset, addDays, resetTime } from '../../utils/Date'

import CalendarWorkspace from './CalendarWorkspace'

class Calendar extends Component {
	constructor(props) {
		super(props);

		this.addEvent = this.addEvent.bind(this);
		this.deleteEvent = this.deleteEvent.bind(this);
	}

	componentWillMount() {
		this.props.requestHabitData();
		this.props.setInterval(
			resetTime(addDays(new Date(), -100)),
			resetTime(addDays(new Date(), 5))
		);
	}

	render() {
		return (
			<CalendarWorkspace
				flows={this.props.flows}
				addEvent={this.addEvent}
				deleteEvent={this.deleteEvent}
				onHabitChange={this.props.updateHabit}
				onHabitDelete={this.props.deleteHabit}
				createHabit={this.props.createHabit}
			/>
		);
	}

	addEvent(habitId, date) {
		this.props.addEvent({
			habitId: habitId,
			timestamp: date
		});
	}

	deleteEvent(eventId) {
		this.props.removeEvent(eventId);
	}
}

export default connect(
	(state) => {
		const startDate = state.calendar.startDate;
		const endDate = state.calendar.endDate;

		const days = getDaysOffset(startDate, endDate);

		let flows = state.habits.map(habit => {
			let events = state.events
				.filter(event => event.habitId === habit.id);

			let flow = Array(days).fill(0).map((_, i) => ({
				ongoingFor: Number.MAX_SAFE_INTEGER,
				events: [],
				date: addDays(startDate, i)
			}));
			let previousEvents = [];

			for (let event of events) {
				let eventDay = getDaysOffset(startDate, event.timestamp);

				if (eventDay < 0) {
					previousEvents.push(event);
					flow[0].ongoingFor = Math.min(
						flow[0].ongoingFor,
						-eventDay
					);
				}
				else if (eventDay < days) {
					flow[eventDay].events.push(event);
					flow[eventDay].ongoingFor = 0;
				}
			}

			for (let day = 1; day < flow.length; day++)
				flow[day].ongoingFor = Math.min(
					flow[day].ongoingFor,
					flow[day - 1].ongoingFor + 1
				);

			return {
				habit: habit,
				days: flow,
				previousEvents: previousEvents
			};
		});

		return { flows };
	},
	dispatch => bindActionCreators({
		...calendarActionCreater,
		...eventsActionCreator,
		...habitsActionCreator
	}, dispatch)
)(Calendar);