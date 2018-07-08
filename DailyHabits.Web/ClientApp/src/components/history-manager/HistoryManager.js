import './HistoryManager.css'

import React, { Component } from 'react';

import Calendar from '../calendar/Calendar';

class HistoryManager extends Component {
	render() {
		return (
			<div className="history-manager">
				<Calendar />
			</div>
		);
	}
}

export default HistoryManager;