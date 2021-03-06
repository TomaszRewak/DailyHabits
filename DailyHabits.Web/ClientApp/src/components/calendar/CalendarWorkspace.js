﻿import React, { Component } from 'react';

import CalendarFlow from './CalendarFlow';
import Habit from '../habits/Habit';

export default class CalendarWorkspace extends Component {
	static displayName = 'CalendarWorkspace';

	constructor(props) {
		super(props);

		this.state = {
			newHabitTemplate: {
				name: 'New habit',
				icon: 'plus',
				target: 7,
				baseColor: '#9e9e9e',
				initialColor: '#d50000',
				finalColor: '#2979ff'
			}
		};
	}

	render() {
		return (
			<div className="calendar-workspace">
				{
					this.props.flows.map((flow, index) =>
						<CalendarFlow
							key={flow.habit.id}
							habit={flow.habit}
							{...flow}
							currentDate={this.props.currentDate}
							addEvent={this.props.addEvent}
							editEvent={this.props.editEvent}
							deleteEvent={this.props.deleteEvent}
							onHabitChange={this.props.onHabitChange}
							onHabitDelete={this.props.onHabitDelete}
							onHabitMove={this.props.onHabitMove}
							order={index}
						/>
					)
				}
				<Habit
					habit={this.state.newHabitTemplate}
					onCreate={this.props.createHabit}
					className="new-habit"
					newHabit
				/>
			</div>
		);
	}
}