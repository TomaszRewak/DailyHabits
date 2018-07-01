import React, { Component } from 'react';

import CalendarDay from './CalendarDay'

export default class CalendarFlow extends Component {
	constructor(props) {
		super(props);

		this.addEvent = this.addEvent.bind(this);
	}

	render() {
		return (
			<div className="calendar-flow">
				{
					this.props.days.map(day =>
						<CalendarDay
							key={day.date}
							{...day}
							addEvent={this.addEvent}
							deleteEvent={this.props.deleteEvent}
						/>
					)
				}
			</div>
		);
	}

	addEvent(date) {
		if (this.props.addEvent)
			this.props.addEvent(this.props.habit.id, date);
	}
}