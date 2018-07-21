import React, { Component } from 'react';

import ExpendableIcon from '../controls/ExpendableIcon';
import CalendarEvents from '../calendar-events/CalendarEvents';

export default class CalendarMark extends Component {
	constructor(props) {
		super(props);

		this.deleteFirstEvent = this.deleteFirstEvent.bind(this);
	}

	render() {
		return (
			<div className="calendar-mark" >
				<div
					className="calendar-mark-dot"
					style={{ backgroundColor: this.props.habit.initialColor }}
					onDoubleClick={this.deleteFirstEvent} />
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
							date={this.props.habit.date}
							events={this.props.events}
							addEvent={this.props.addEvent}
							editEvent={this.props.editEvent}
							deleteEvent={this.props.deleteEvent}
						/>
					</ExpendableIcon>
				</div>
			</div>
		);
	}

	deleteFirstEvent() {
		if (this.props.deleteEvent)
			this.props.deleteEvent(this.props.events[0].id);
	}
}