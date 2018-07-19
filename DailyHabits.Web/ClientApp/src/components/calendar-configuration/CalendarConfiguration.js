import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Calendar'
import moment from 'moment'

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import './CalendarConfiguration.css'
import { Input, Button } from 'semantic-ui-react';

class CalendarConfiguration extends Component {
	constructor(props) {
		super(props);

		this.state = {
			days: props.days,
			daysGrouping: props.daysGrouping
		};

		this.onDateChange = this.onDateChange.bind(this);
		this.onDaysChange = this.onDaysChange.bind(this);
		this.onDaysGroupingChange = this.onDaysGroupingChange.bind(this);
		this.onSaveDays = this.onSaveDays.bind(this);
	}

	render() {


		return (
			<div>
				<DayPickerInput classNames="ui input" value={this.props.date.toDate()} onDayChange={this.onDateChange} />
				<Input value={this.state.days} size="mini" type="number" onChange={this.onDaysChange} />
				<Input value={this.state.daysGrouping} size="mini" type="number" onChange={this.onDaysGroupingChange} />
				{this.renderButtons()}
			</div>
		);
	}

	renderButtons() {
		if (this.props.days == this.state.days && this.props.daysGrouping == this.state.daysGrouping)
			return <div>
				<Button size="mini" content="Save" disabled />
			</div>
		else
			return <div>
				<Button size="mini" content="Save" primary onClick={this.onSaveDays} />
			</div>
	}

	onDateChange(day) {
		this.props.setDate(moment(day), null);
	}

	onDaysChange(event, data) {
		this.setState({
			days: Number.parseInt(data.value)
		});
	}

	onDaysGroupingChange(event, data) {
		this.setState({
			daysGrouping: Number.parseInt(data.value)
		});
	}

	onSaveDays() {
		if (this.state.days !== this.props.days)
			this.props.setDays(this.state.days);
		if (this.state.daysGrouping !== this.props.daysGrouping)
			this.props.setDaysGrouping(this.state.daysGrouping);
	}
}

export default connect(
	state => state.calendar,
	dispatch => bindActionCreators(actionCreators, dispatch)
)(CalendarConfiguration)