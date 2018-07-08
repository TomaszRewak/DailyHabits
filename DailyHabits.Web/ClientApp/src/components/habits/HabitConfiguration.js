import React, { Component } from 'react';

import { Input, Dropdown, Button } from 'semantic-ui-react';
import { iconOptions } from '../../utils/Icons';
import { colorOptions } from '../../utils/Colors'

export default class HabitConfiguration extends Component {
	constructor(props) {
		super(props);

		this.state = {
			habit: this.props.habit
		}

		this.nameChanged = this.nameChanged.bind(this);
		this.iconChanged = this.iconChanged.bind(this);

		this.baseColorChanged = this.baseColorChanged.bind(this);
		this.initialColorChanged = this.initialColorChanged.bind(this);
		this.finalColorChanged = this.finalColorChanged.bind(this);

		this.onSave = this.onSave.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onDelete = this.onDelete.bind(this);
	}

	render() {
		return (
			<div className="habit-configuration">
				<Input
					value={this.state.habit.name}
					onChange={this.nameChanged}
					size="mini" />
				<Dropdown
					value={this.state.habit.icon}
					options={iconOptions}
					onChange={this.iconChanged}
					fluid search selection className="mini" />
				<Dropdown
					value={this.state.habit.baseColor}
					options={colorOptions}
					onChange={this.baseColorChanged}
					fluid search selection className="mini fitted" />
				<Dropdown
					value={this.state.habit.initialColor}
					options={colorOptions}
					onChange={this.initialColorChanged}
					fluid search selection className="mini fitted" />
				<Dropdown
					value={this.state.habit.finalColor}
					options={colorOptions}
					onChange={this.finalColorChanged}
					fluid search selection className="mini fitted" />
				<div className="habit-configuration-options">
					<Button content="Save" size="mini" onClick={this.onSave} />
					<Button content="Cancel" size="mini" onClick={this.onCancel} />
					<Button content="Delete" size="mini" color="red" onClick={this.onDelete} />
				</div>
			</div>
		);
	}

	nameChanged(evant, data) {
		this.onChange({ name: data.value });
	}

	iconChanged(evant, data) {
		this.onChange({ icon: data.value });
	}

	baseColorChanged(evant, data) {
		this.onChange({ baseColor: data.value });
	}

	initialColorChanged(evant, data) {
		this.onChange({ initialColor: data.value });
	}

	finalColorChanged(evant, data) {
		this.onChange({ finalColor: data.value });
	}

	onChange(changes) {
		this.setState({
			habit: {
				...this.state.habit,
				...changes
			}
		});
	}

	onSave() {
		if (this.props.onChange)
			this.props.onChange(this.state.habit);
	}

	onCancel() {
		this.setState({ habit: this.props.habit });
	}

	onDelete() {
		if (this.props.onDelete)
			this.props.onDelete(this.props.habit.id);
	}
}