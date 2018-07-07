import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react';

export default class CalendarMark extends Component {
	render() {
		return (
			<div className="calendar-mark" style={{ backgroundColor: this.props.color }}>
				<Icon name={this.props.icon} size="small" />
			</div>
		);
	}
}