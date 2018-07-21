import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../store/Calendar'
import moment from 'moment'

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

import { Input, Button, FormField } from 'semantic-ui-react';
import './CalendarConfiguration.css'

class CalendarConfiguration extends Component {
	constructor(props) {
		super(props);

		this.state = {
			days: props.days,
			daysGrouping: props.daysGrouping,
			influenceWindow: props.influenceWindow
		};

		this.onDateChange = this.onDateChange.bind(this);
		this.onDaysChange = this.onDaysChange.bind(this);
		this.onInfluenceWindowChange = this.onInfluenceWindowChange.bind(this);
		this.onSaveConfiguration = this.onSaveConfiguration.bind(this);
	}

	render() {


		return (
			<div className="calendar-configuration">
				<DayPickerInput value={this.props.date.toDate()} onDayChange={this.onDateChange} />
				<div className="calendar-configuration-group ui form">
					<FormField>
						<label>Number of days</label>
						<Input value={this.state.days} size="mini" type="number" onChange={this.onDaysChange} />
					</FormField>
					<FormField>
						<label>Number of accumulated days</label>
						<Input value={this.state.influenceWindow} size="mini" type="number" onChange={this.onInfluenceWindowChange} />
					</FormField>
					<div className="calendar-configuration-button-wprapper">
						{this.renderButtons()}
					</div>
				</div>
			</div>
		);
	}

	renderButtons() {
		if (this.props.days === this.state.days &&
			this.props.influenceWindow === this.state.influenceWindow)
			return <Button size="mini" content="Update" disabled />
		else
			return <Button size="mini" content="Update" primary onClick={this.onSaveConfiguration} />
	}

	onDateChange(day) {
		this.props.setDate(moment(day), null);
	}

	onDaysChange(event, data) {
		this.setState({
			days: Number.parseInt(data.value, 10)
		});
	}

	onInfluenceWindowChange(event, data) {
		this.setState({
			influenceWindow: data.value
		});
	}

	onSaveConfiguration() {
		this.props.setConfiguration({
			days: this.state.days,
			daysGrouping: this.state.daysGrouping,
			influenceWindow: this.state.influenceWindow
		});
	}
}

export default connect(
	state => state.calendar,
	dispatch => bindActionCreators(actionCreators, dispatch)
)(CalendarConfiguration)