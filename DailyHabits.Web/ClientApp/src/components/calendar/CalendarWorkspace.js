import React, { Component } from 'react'

import CalendarFlow from './CalendarFlow'

export default class CalendarWorkspace extends Component {
	render() {
		return (
			<div className="calendar-workspace">
				{
					this.props.flows.map(flow =>
						<CalendarFlow
							key={flow.habit.id}
							{...flow}
							addEvent={this.props.addEvent}
							deleteEvent={this.props.deleteEvent}
						/>
					)
				}
			</div>
		);
	}
}