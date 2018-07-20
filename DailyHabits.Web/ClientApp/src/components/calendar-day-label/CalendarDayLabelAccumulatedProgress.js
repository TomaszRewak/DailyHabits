import React from 'react'

import './CalendarDayLabelAccumulatedProgress.css'

export default props => <div className="calendar-day-accumulated-progress">
	<div
		className="calendar-day-accumulated-progress-bar"
		style={{ height: `${100 * props.accumulatedTargetEvents / props.maxTargetEvents}%` }} />
</div>