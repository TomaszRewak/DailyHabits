﻿import React from 'react'

import './CalendarDayLabel.css'

export default props => <div className="calendar-day-date">
	<span>{props.date.format().substring(0, 10).replace(/-/g, '.')}</span>
</div>