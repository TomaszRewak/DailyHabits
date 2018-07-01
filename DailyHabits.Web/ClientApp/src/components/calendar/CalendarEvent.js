import React, { Component } from 'react'

export default class CalendarEvent extends Component {
	constructor(props) {
		super(props);

		this.deleteEvent = this.deleteEvent.bind(this);
	}

	render() {
		return (
			<div className="calendar-event">
				<div class="delete-event-button" onClick={this.deleteEvent}>x</div>
			</div>
		);
	}

	deleteEvent() {
		if (this.props.deleteEvent)
			this.props.deleteEvent(this.props.id);
	}
}