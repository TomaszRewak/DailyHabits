import React, { Component } from 'react'

import CalendarEvents from './CalendarEvents'
import CalendarProgress from './CalendarProgress'
import CalendarMark from './CalendarMark'

export default class CalendarDay extends Component {
	constructor(props) {
		super(props);

		this.addEvent = this.addEvent.bind(this);
		this.deleteFirstEvent = this.deleteFirstEvent.bind(this);
	}

	render() {
		if (this.props.events.length) {
			return (
				<div className="calendar-day with-events">
					<div className="add-event-button" onClick={this.deleteFirstEvent}>
						<CalendarMark
							flowColor={this.props.habit.baseColor}
							eventColor={this.props.habit.initialColor}
							icon={this.props.habit.icon}
						/>
					</div>
					<CalendarEvents
						events={this.props.events}
						deleteEvent={this.props.deleteEvent}
					/>
				</div>
			);
		}
		else {
			return (
				<div className="calendar-day with-events">
					<div className="add-event-button" onClick={this.addEvent}>
						<CalendarProgress
							initialColor={this.props.habit.initialColor}
							finalColor={this.props.habit.finalColor}
							progress={this.props.ongoingFor}
							target={14}
						/>
					</div>
				</div>
			);
		}
	}

	addEvent() {
		if (this.props.addEvent)
			this.props.addEvent(this.props.date);
	}

	deleteFirstEvent() {
		if (this.props.deleteEvent)
			this.props.deleteEvent(this.props.events[0].id);
	}
}