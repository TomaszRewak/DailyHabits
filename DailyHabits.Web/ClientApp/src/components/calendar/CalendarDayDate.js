import React from 'react'

export default props => <div className="calendar-day-date">
	<span>{props.date.format().substring(0, 10)}</span>
</div>