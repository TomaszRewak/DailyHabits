import React, { Component } from 'react'

import CalendarEvent from './CalendarEvents'

export default class CalendarDay extends Component {
	constructor(props) {
		super(props);

		this.addEvent = this.addEvent.bind(this);
	}

	render() {
		let className = 'calendar-day';

		if (this.props.events.length)
			className = `${className} with-events`;

		return (
			<div className={className}>
				<div className="add-event-button" onClick={this.addEvent}></div>
				{
					!!this.props.events.length &&
					<CalendarEvent
						events={this.props.events}
						deleteEvent={this.props.deleteEvent}
					/>
				}
			</div>
		);
	}

	addEvent() {
		if (this.props.addEvent)
			this.props.addEvent(this.props.date);
	}
}