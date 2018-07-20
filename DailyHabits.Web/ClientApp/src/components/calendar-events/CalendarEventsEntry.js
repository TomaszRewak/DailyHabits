import React, { Component } from 'react'

import { Icon } from 'semantic-ui-react'

export default class CalendarEventsEntry extends Component {
	constructor(props) {
		super(props);

		this.deleteEvent = this.deleteEvent.bind(this);
	}

	render() {
		return (
			<div className="calendar-event">
				<Icon name="trash" onClick={this.deleteEvent}/>
			</div>
		);
	}

	deleteEvent() {
		if (this.props.deleteEvent)
			this.props.deleteEvent(this.props.id);
	}
}