﻿import './Habit.css'

import React, { Component } from 'react';

import ExpendableIcon from '../controls/ExpendableIcon'
import HabitConfiguration from './HabitConfiguration'

export default class Habit extends Component {
	render() {
		return (
			<ExpendableIcon
				icon={this.props.habit.icon} name={this.props.habit.name}
				className={this.props.className} style={{ backgroundColor: this.props.habit.baseColor }}>
				<HabitConfiguration
					habit={this.props.habit}
					onChange={this.props.onChange}
					onDelete={this.props.onDelete} />
			</ExpendableIcon>
		);
	}
}