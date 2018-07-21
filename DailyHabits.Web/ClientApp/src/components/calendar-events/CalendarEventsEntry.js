import React, { Component } from 'react'

import EditableLabel from '../controls/EditableLabel'

export default class CalendarEventsEntry extends Component {
	constructor(props) {
		super(props);

		this.onDelete = this.onDelete.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	render() {
		return <div className="calendar-events-entry">
			<EditableLabel
				onChange={this.onChange}
				onDelete={this.onDelete}
				value={this.props.event.description}
				defaultValue="Event" />
		</div>;
	}

	onChange(value) {
		if (this.props.editEvent)
			this.props.editEvent({
				...this.props.event,
				description: value
			});
	}

	onDelete() {
		if (this.props.deleteEvent)
			this.props.deleteEvent(this.props.event.id);
	}
}