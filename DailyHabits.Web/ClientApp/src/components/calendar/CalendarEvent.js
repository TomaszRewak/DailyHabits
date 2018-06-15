import React, { Component } from 'react';

class CalendarEvent extends Component {
	render() {
		return (
			<div className="calendar-event">
				<div
					className="calendar-event-indicator"
					style={{ backgroundColor: this.props.eventColor }}
				>
					<span className={`glyphicon glyphicon-${this.props.icon}`}></span>
				</div>
			</div>
		);
	}
}

export default CalendarEvent;