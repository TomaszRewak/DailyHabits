import React, { Component } from 'react'

export default class CalendarProgress extends Component {
	render() {
		const initialColor = `${this.props.initialColor} ${-(this.props.progress - 1) * 100}%`;
		const finalColor = `${this.props.finalColor} ${(this.props.target - this.props.progress) * 100}%`;

		const progressColor = `linear-gradient(to right, ${initialColor}, ${finalColor})`;

		return (
			<div className="calendar-progress" style={{ background: progressColor }} />
		);
	}
}