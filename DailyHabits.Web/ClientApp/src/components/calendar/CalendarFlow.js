import React, { Component } from 'react';

import CalendarDay from '../calendar-day/CalendarDay'

import Habit from '../habits/Habit'

export default class CalendarFlow extends Component {
	constructor(props) {
		super(props);

		this.addEvent = this.addEvent.bind(this);
	}

	render() {
		return (
			<div className="calendar-flow">
				<Habit
					className="calendar-flow-description"
					habit={this.props.habit}
					onChange={this.props.onHabitChange}
					onDelete={this.props.onHabitDelete}
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