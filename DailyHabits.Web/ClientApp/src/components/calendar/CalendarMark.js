import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react';

export default class CalendarMark extends Component {
	render() {
		return (
			<div className="calendar-mark" >
				<div className="calendar-mark-dot" style={{ backgroundColor: this.props.eventColor }} />
				<div className="calendar-mark-bubble" style={{ backgroundColor: this.props.flowColor }}>
					<Icon name={this.props.icon} size="small" />
				</div>
			</div>
		);
	}
}