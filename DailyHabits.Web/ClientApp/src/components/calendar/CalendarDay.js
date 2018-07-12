import React, { Component } from 'react'

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
					<div className="add-event-button" onDoubleClick={this.deleteFirstEvent}>
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
				<div className="calendar-day with-events">
					<div className="add-event-button" onClick={this.addEvent}>
						<CalendarProgress
							initialColor={this.props.habit.initialColor}
							finalColor={this.props.habit.finalColor}
							progress={this.props.ongoingFor}
							target={this.props.habit.target}
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