﻿import './Calendar.css'

import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import moment from 'moment'
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
		const days = state.calendar.days;
		const endDate = state.calendar.date;

		let flows = state.habits.map(habit => {
			let events = state.events
				.filter(event => event.habitId === habit.id);

			console.dir(events);

			let flow = Array(days).fill(0).map((_, i) => ({
				ongoingFor: Number.MAX_SAFE_INTEGER,
				events: [],
				date: endDate.clone().add({ days: -i })
			}));
			let previousEvents = [];

			for (let event of events) {
				let eventDay = endDate.diff(moment(event.timestamp).startOf('day'), 'days');

				console.dir(eventDay)

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