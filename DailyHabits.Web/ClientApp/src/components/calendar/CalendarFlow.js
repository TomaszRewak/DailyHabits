import React, { Component } from 'react';

import CalendarDay from './CalendarDay'
import { Icon } from 'semantic-ui-react';

export default class CalendarFlow extends Component {
	constructor(props) {
		super(props);

		this.addEvent = this.addEvent.bind(this);
	}

	render() {
		return (
			<div className="calendar-flow">
				<div className="calendar-flow-description">
					<Icon name={this.props.habit.icon} />
				</div>
				<div
					className="calendar-flow-days"
					style={{ backgroundColor: this.props.habit.baseColor }}
				>
					{
						this.props.days.map(day =>
							<CalendarDay
								key={day.date}
								habit={this.props.habit}
								{...day}
								addEvent={this.addEvent}
								deleteEvent={this.props.deleteEvent}
							/>
						)
					}
				</div>
			</div>
		);
	}

	addEvent(date) {
		if (this.props.addEvent)
			this.props.addEvent(this.props.habit.id, date);
	}
}