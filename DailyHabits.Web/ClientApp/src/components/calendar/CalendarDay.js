import React, { Component } from 'react';

import CalendarEvent from './CalendarEvent';
import CalendarSeparator from './CalendarSeparator';
import CalendarPlaceholder from './CalendarPlaceholder';
import CalendarUpcoming from './CalendarUpcoming';

class CalendarDay extends Component {
	constructor(props) {
		super(props);

		this.onAddEvent = this.onAddEvent.bind(this);
	}

	render() {
		return (
			<div className="calendar-day">
				{
					//	this.props.day.getDate() == 1 &&
					//	<div className="calendar-day-label"><div>{`${this.props.day.getDate()} - ${this.props.day.getMonth()}`}</div></div>
				}
				<div className="calendar-day-body">
					{
						this.props.events.map(event => {
							switch (event.kind) {
								case 'event':
									return <CalendarEvent
										eventColor={event.event.eventColor}
										icon={event.event.icon}
									/>;
								case 'separator':
									return <CalendarSeparator
										habit={event.separator.habit}
										eventColor={event.separator.eventColor}
										initialColor={event.separator.initialColor}
										finalColor={event.separator.finalColor}
										daysOfInactivity={event.separator.daysOfInactivity}
										target={event.separator.target}
										onClick={this.onAddEvent}
									/>;
								case 'none':
									return <CalendarPlaceholder
										habit={event.placeholder.habit}
										onClick={this.onAddEvent}
									/>;
								case 'upcoming':
									return <CalendarUpcoming />;
								default:
									return null;
							}
						})
					}
				</div>
			</div>
		);
	}

	onAddEvent(habit) {
		if (this.props.onAddEvent)
			this.props.onAddEvent(this.props.day, habit);
	}
}

export default CalendarDay;