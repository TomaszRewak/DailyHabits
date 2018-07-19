import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Calendar'
import moment from 'moment'

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import './CalendarConfiguration.css'

class CalendarConfiguration extends Component {
	constructor(props) {
		super(props);

		this.ondateChange = this.ondateChange.bind(this);
	}

	render() {
		return (
			<div>
				<DayPickerInput value={this.props.date.toDate()} onDayChange={this.ondateChange} />
			</div>
		);
	}

	ondateChange(day) {
		this.props.setDate(moment(day), null);
	}
}

export default connect(
	state => state.calendar,
	dispatch => bindActionCreators(actionCreators, dispatch)
)(CalendarConfiguration)