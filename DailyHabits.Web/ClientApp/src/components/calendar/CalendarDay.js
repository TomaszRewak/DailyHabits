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
		if (this.props.events.length) {
			return (
				<div className="calendar-day with-events">
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
				<div className="calendar-day">
					<CalendarDayProgress progress={this.props.ongoingFor} />
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

	addEvent() {
		if (this.props.addEvent)
			this.props.addEvent(this.props.date);
	}
}