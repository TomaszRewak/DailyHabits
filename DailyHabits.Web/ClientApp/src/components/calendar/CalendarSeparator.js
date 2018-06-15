import React, { Component } from 'react';

class CalendarSeparator extends Component {
	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	render() {
		return (
			<div
				className="calendar-separator"
				style={{ backgroundColor: this.props.eventColor }}
				onClick={this.onClick}
			>
				<div
					className="calendar-separator-event-indicator"
					style={{ backgroundColor: this.props.eventColor }}
				></div>
				<div
					className="calendar-separator-progress-indicator"
					data-day={this.props.daysOfInactivity}
					style={{ background: `linear-gradient(to right, ${this.props.initialColor} ${-100 * this.props.daysOfInactivity}%, ${this.props.finalColor} ${100 * (this.props.target - this.props.daysOfInactivity - 1)}%)` }}
				></div>
				<div
					className="calendar-separator-event-indicator"
					style={{ backgroundColor: this.props.eventColor }}
				></div>
			</div>
		);
	}

	onClick() {
		if (this.props.onClick)
			this.props.onClick(this.props.habit)
	}
}

export default CalendarSeparator;