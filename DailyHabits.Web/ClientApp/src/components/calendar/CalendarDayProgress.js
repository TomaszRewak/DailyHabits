import React from 'react'

export default props => <div className="calendar-day-progress">
	<span>{props.progress >= Number.MAX_SAFE_INTEGER ? '∞' : props.progress}<span className="calendar-day-progress-target"> / {props.target}</span></span>
</div>