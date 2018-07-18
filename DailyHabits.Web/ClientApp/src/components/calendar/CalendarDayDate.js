import React from 'react'

export default props => <div className="calendar-day-date">
	<span>{props.date.toISOString().substring(0, 10)}</span>
</div>