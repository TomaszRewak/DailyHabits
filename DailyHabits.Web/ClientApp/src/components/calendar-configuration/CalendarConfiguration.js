import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Calendar'

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import './CalendarConfiguration.css'

class CalendarConfiguration extends Component {
	constructor(props) {
		super(props);

		this.onStartDateChange = this.onStartDateChange.bind(this);
		this.onEndDateChange = this.onEndDateChange.bind(this);
	}

	render() {
		return (
			<div>
				<DayPickerInput value={this.props.startDate} onDayChange={this.onStartDateChange} />
				<DayPickerInput value={this.props.endDate} onDayChange={this.onEndDateChange} />
			</div>
		);
	}

	onStartDateChange(day) {
		this.props.setInterval(day, null);
	}

	onEndDateChange(day) {
		this.props.setInterval(null, day);
	}
}

export default connect(
	state => state.calendar,
	dispatch => bindActionCreators(actionCreators, dispatch)
)(CalendarConfiguration)