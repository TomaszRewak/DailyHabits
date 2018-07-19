import React, { Component } from 'react'

import CalendarProgress from './CalendarProgress'
import CalendarMark from './CalendarMark'
import CalendarDayDate from './CalendarDayDate'
import CalendarDayProgress from './CalendarDayProgress'

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
					<CalendarDayDate date={this.props.date} />
					<div className="add-event-button">
						<CalendarMark
							habit={this.props.habit}
							events={this.props.events}
							deleteEvent={this.props.deleteEvent}
							addEvent={this.addEvent}
						/>
					</div>
				</div>
			);
		}
		else {
			return (
				<div className={className}>
					<CalendarDayDate date={this.props.date} />
					<div className="add-event-button" onClick={this.addEvent}>
						<CalendarProgress
							initialColor={this.props.habit.initialColor}
							finalColor={this.props.habit.finalColor}
							progress={this.props.ongoingFor}
							target={this.props.habit.target}
						/>
					</div>
					<CalendarDayProgress progress={this.props.ongoingFor} />
				</div>
			);
		}
	}

	addEvent() {
		if (this.props.addEvent)
			this.props.addEvent(this.props.date);
	}
}