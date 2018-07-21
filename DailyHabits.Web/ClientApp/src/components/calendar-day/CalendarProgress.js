import React, { Component } from 'react'
import interpolate from 'color-interpolate'

export default class CalendarProgress extends Component {
	render() {
		const progressColor = interpolate([this.props.initialColor, this.props.finalColor])(this.props.progress / this.props.target);

		return (
			<div className="calendar-progress" style={{ background: progressColor }} />
		);
	}
}