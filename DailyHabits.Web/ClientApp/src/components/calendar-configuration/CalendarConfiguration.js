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
			daysGrouping: props.daysGrouping,
			influenceWindow: props.influenceWindow
		};

		this.onDateChange = this.onDateChange.bind(this);
		this.onDaysChange = this.onDaysChange.bind(this);
		this.onDaysGroupingChange = this.onDaysGroupingChange.bind(this);
		this.onInfluenceWindowChange = this.onInfluenceWindowChange.bind(this);
		this.onSaveConfiguration = this.onSaveConfiguration.bind(this);
	}

	render() {


		return (
			<div className="calendar-configuration">
				<DayPickerInput value={this.props.date.toDate()} onDayChange={this.onDateChange} />
				<div className="calendar-configuration-group">
					<Input value={this.state.days} size="mini" type="number" onChange={this.onDaysChange} />
					<Input value={this.state.daysGrouping} size="mini" type="number" onChange={this.onDaysGroupingChange} />
					<Input value={this.state.influenceWindow} size="mini" type="number" onChange={this.onInfluenceWindowChange} />
					{this.renderButtons()}
				</div>
			</div>
		);
	}

	renderButtons() {
		if (this.props.days === this.state.days &&
			this.props.daysGrouping === this.state.daysGrouping &&
			this.props.influenceWindow === this.state.influenceWindow)
			return <div>
				<Button size="mini" content="Save" disabled />
			</div>
		else
			return <div>
				<Button size="mini" content="Save" primary onClick={this.onSaveConfiguration} />
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