import './Calendar.css'

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators as calendarActionCreater } from '../../store/Calendar';
import { actionCreators as eventsActionCreator } from '../../store/Events'
import { actionCreators as habitsActionCreator } from '../../store/Habits'

import CalendarWorkspace from './CalendarWorkspace'

class Calendar extends Component {
	constructor(props) {
		super(props);

		this.addEvent = this.addEvent.bind(this);
		this.deleteEvent = this.deleteEvent.bind(this);
		this.editEvent = this.editEvent.bind(this);
	}

	componentWillMount() {
		this.props.requestHabitData();
		this.props.requestEventData();
	}

	render() {
		return (
			<CalendarWorkspace
				flows={this.props.flows}
				currentDate={this.props.currentDate}
				addEvent={this.addEvent}
				editEvent={this.editEvent}
				deleteEvent={this.deleteEvent}
				onHabitChange={this.props.updateHabit}
				onHabitDelete={this.props.deleteHabit}
				onHabitMove={this.props.moveHabit}
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

	editEvent(event) {
		this.props.editEvent(event);
	}

	deleteEvent(eventId) {
		this.props.removeEvent(eventId);
	}
}

export default connect(
	(state) => {
		const days = state.calendar.days;
		const endDate = state.calendar.date;

		let flows = state.habits.map(habit => {
			const events = state.events
				.filter(event => event.habitId === habit.id);

			const influenceWindow = state.calendar.influenceWindow * habit.target;
			const flowDays = days + influenceWindow;

			let flow = Array(flowDays).fill(0).map((_, i) => ({
				ongoingFor: Number.MAX_SAFE_INTEGER,
				events: [],
				date: endDate.clone().add({ days: -i }),
				accumulatedTargetEvents: 0,
			}));
			let previousEvents = [];

			for (let event of events) {
				let eventDay = endDate.diff(event.timestamp.startOf('day'), 'days');

				if (eventDay >= flowDays) {
					previousEvents.push(event);
					flow[flowDays - 1].ongoingFor = Math.min(
						flow[flowDays - 1].ongoingFor,
						eventDay - flowDays + 1
					);
				}
				else if (0 <= eventDay && eventDay < flowDays) {
					flow[eventDay].events.push(event);
					flow[eventDay].ongoingFor = 0;
				}
			}

			for (let day = flowDays - 2; day >= 0; day--)
				flow[day].ongoingFor = Math.min(
					flow[day].ongoingFor,
					flow[day + 1].ongoingFor + 1
				);

			for (let day = flowDays - 1; day >= 0; day--) {
				flow[day].accumulatedTargetEvents = flow[day].events.length;

				if (day + 1 < flowDays)
					flow[day].accumulatedTargetEvents += flow[day + 1].accumulatedTargetEvents;

				if (day + influenceWindow < flowDays)
					flow[day].accumulatedTargetEvents -= flow[day + influenceWindow].events.length;
			}

			return {
				habit: habit,
				days: flow.slice(0, days),
				previousEvents: previousEvents,
				maxTargetEvents: Math.max(...flow.map(day => day.accumulatedTargetEvents))
			};
		});

		return {
			flows,
			currentDate: state.calendar.currentDate
		};
	},
	dispatch => bindActionCreators({
		...calendarActionCreater,
		...eventsActionCreator,
		...habitsActionCreator
	}, dispatch)
)(Calendar);