import React, { Component } from 'react';

import CalendarDay from '../calendar-day/CalendarDay';

import Habit from '../habits/Habit';

export default class CalendarFlow extends Component {
	static displayName = 'CalendarFlow';

	constructor(props) {
		super(props);

		this.addEvent = this.addEvent.bind(this);
	}

	addEvent(date) {
		if (this.props.addEvent)
			this.props.addEvent(this.props.habit.id, date);
	}

	render() {
		return (
			<div className="calendar-flow">
				<Habit
					className="calendar-flow-description"
					habit={this.props.habit}
					onChange={this.props.onHabitChange}
					onDelete={this.props.onHabitDelete}
					onMove={this.props.onHabitMove}
					order={this.props.order}
				/>
				<div
					className="calendar-flow-days"
					style={{ borderColor: this.props.habit.baseColor }}
				>
					{
						this.props.days.map(day =>
							<CalendarDay
								key={day.date}
								habit={this.props.habit}
								{...day}
								maxTargetEvents={this.props.maxTargetEvents}
								isCurrentDate={day.date.isSame(this.props.currentDate, 'day')}
								addEvent={this.addEvent}
								editEvent={this.props.editEvent}
								deleteEvent={this.props.deleteEvent}
							/>
						)
					}
				</div>
			</div>
		);
	}
}