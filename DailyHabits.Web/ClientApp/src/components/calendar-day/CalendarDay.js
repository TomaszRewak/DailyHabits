import React, { Component } from 'react'

import './CalendarDay.css'

import CalendarProgress from './CalendarProgress'
import CalendarMark from './CalendarMark'
import CalendarDayDate from '../calendar-day-label/CalendarDayLabelDate'
import CalendarDayProgress from '../calendar-day-label/CalendarDayLabelProgress'
import CalendarDayAccumulatedProgress from '../calendar-day-label/CalendarDayLabelAccumulatedProgress';
import CalendarDayLabelAccumulatedProgress from '../calendar-day-label/CalendarDayLabelAccumulatedProgress';

export default class CalendarDay extends Component {
	constructor(props) {
		super(props);

		this.addEvent = this.addEvent.bind(this);
	}

	render() {
		let className = 'calendar-day';
		if (this.props.isCurrentDate)
			className += ' current-date';

		if (this.props.events.length) {
			className += ' with-events';

			return (
				<div className={className}>
					{this.renderAccumulatedProgress()}
					<div className="add-event-button">
						<CalendarMark
							habit={this.props.habit}
							events={this.props.events}
							deleteEvent={this.props.deleteEvent}
							addEvent={this.addEvent}
						/>
					</div>
					<CalendarDayDate date={this.props.date} />
				</div>
			);
		}
		else {
			return (
				<div className={className}>
					<CalendarDayProgress progress={this.props.ongoingFor} target={this.props.habit.target} />
					{this.renderAccumulatedProgress()}
					<div className="add-event-button" onClick={this.addEvent}>
						<CalendarProgress
							initialColor={this.props.habit.initialColor}
							finalColor={this.props.habit.finalColor}
							progress={this.props.ongoingFor}
							target={this.props.habit.target}
						/>
					</div>
					<CalendarDayDate date={this.props.date} />
				</div>
			);
		}
	}

	renderAccumulatedProgress() {
		return <CalendarDayLabelAccumulatedProgress
			accumulatedTargetEvents={this.props.accumulatedTargetEvents}
			maxTargetEvents={this.props.maxTargetEvents}
		/>
	}

	addEvent() {
		if (this.props.addEvent)
			this.props.addEvent(this.props.date);
	}
}