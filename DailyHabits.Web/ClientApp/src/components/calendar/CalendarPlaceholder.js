import React, { Component } from 'react';

class CalendarPlaceholder extends Component {
	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	render() {
		return (
			<div className="calendar-placeholder" onClick={this.onClick}>
			</div>
		);
	}

	onClick() {
		if (this.props.onClick)
			this.props.onClick(this.props.habit);
	}
}

export default CalendarPlaceholder;