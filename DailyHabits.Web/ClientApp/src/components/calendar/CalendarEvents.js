import React, { Component } from 'react'

import CalendarEvent from './CalendarEvent'
import { Icon } from 'semantic-ui-react';

export default class CalendarEvents extends Component {
	render() {
		return (
			<div className="calendar-events">
				{
					this.props.events.map(event =>
						<CalendarEvent
							key={event.id}
							{...event}
							deleteEvent={this.props.deleteEvent}
						/>
					)
				}
				<div className="calendar-event">
					<Icon name="plus" onClick={this.props.addEvent} />
				</div>
			</div>
		);
	}
}