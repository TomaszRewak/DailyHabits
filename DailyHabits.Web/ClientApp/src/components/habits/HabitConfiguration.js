import React, { Component } from 'react';

import { Input, Dropdown } from 'semantic-ui-react';
import { iconOptions } from '../../utils/Icons';
import { colorOptions } from '../../utils/Colors'

export default class HabitConfiguration extends Component {
	constructor(props) {
		super(props);

		this.nameChanged = this.nameChanged.bind(this);
		this.iconChanged = this.iconChanged.bind(this);

		this.baseColorChanged = this.baseColorChanged.bind(this);
		this.initialColorChanged = this.initialColorChanged.bind(this);
		this.finalColorChanged = this.finalColorChanged.bind(this);
	}

	render() {
		return (
			<div className="habit-configuration">
				<Input
					value={this.props.habit.name}
					onChange={this.nameChanged}
					size="mini" />
				<Dropdown
					value={this.props.habit.icon}
					options={iconOptions}
					onChange={this.iconChanged}
					fluid search selection className="mini" />
				<Dropdown
					value={this.props.habit.baseColor}
					options={colorOptions}
					onChange={this.baseColorChanged}
					fluid search selection className="mini fitted" />
				<Dropdown
					value={this.props.habit.initialColor}
					options={colorOptions}
					onChange={this.initialColorChanged}
					fluid search selection className="mini fitted" />
				<Dropdown
					value={this.props.habit.finalColor}
					options={colorOptions}
					onChange={this.finalColorChanged}
					fluid search selection className="mini fitted" />
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
		if (this.props.onChange)
			this.props.onChange({
				...this.props.habit,
				...changes
			})
	}
}