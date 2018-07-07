import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react';

export default class HabitInformation extends Component {
	render() {
		return (
			<div className="habit-information">
				<Icon name={this.props.habit.icon} />
				<div>{this.props.habit.name}</div>
			</div>
		);
	}
}