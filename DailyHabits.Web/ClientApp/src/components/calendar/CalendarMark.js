import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react';

import ExpendableIcon from '../controls/ExpendableIcon'
import CalendarEvents from './CalendarEvents'

export default class CalendarMark extends Component {
	render() {
		return (
			<div className="calendar-mark" >
				<div className="calendar-mark-dot" style={{ backgroundColor: this.props.habit.initialColor }} />
				<div className="calendar-mark-bubble">
					<ExpendableIcon
						icon={this.props.habit.icon}
						style={{ backgroundColor: this.props.habit.baseColor }}
						name={
							<span>{this.props.habit.name}
								<span className="events-number-indicator">{this.props.events.length}</span>
							</span>
						}
					>
						<CalendarEvents
							events={this.props.events}
							deleteEvent={this.props.deleteEvent}
						/>
					</ExpendableIcon>
				</div>
			</div>
		);
	}
}