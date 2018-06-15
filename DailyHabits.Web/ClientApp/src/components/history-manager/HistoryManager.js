import './HistoryManager.css'

import React, { Component } from 'react';

import Calendar from '../calendar/Calendar';
import HabitManager from '../habits/HabitManager';

class HistoryManager extends Component {
	render() {
		return (
			<div className="history-manager">
				<HabitManager />
				<Calendar />
			</div>
		);
	}
}

export default HistoryManager;