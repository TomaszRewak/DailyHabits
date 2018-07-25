import './HistoryManager.css';

import React, { Component } from 'react';

import Calendar from '../calendar/Calendar';
import CalendarConfiguration from '../calendar-configuration/CalendarConfiguration';

class HistoryManager extends Component {
	static displayName = 'HistoryManager';

	render() {
		return (
			<div className="history-manager">
				<CalendarConfiguration />
				<Calendar />
			</div>
		);
	}
}

export default HistoryManager;