import React, { Component } from 'react';

import { Input, Dropdown, Button, Label, ButtonGroup } from 'semantic-ui-react';
import { iconOptions } from '../../utils/Icons';
import { colorOptions } from '../../utils/Colors'
import ConfirmationButton from '../controls/ConfirmationButton'

export default class HabitConfiguration extends Component {
	constructor(props) {
		super(props);

		this.state = {
			habit: this.props.habit,
			changed: false
		}

		this.nameChanged = this.nameChanged.bind(this);
		this.iconChanged = this.iconChanged.bind(this);

		this.baseColorChanged = this.baseColorChanged.bind(this);
		this.initialColorChanged = this.initialColorChanged.bind(this);
		this.finalColorChanged = this.finalColorChanged.bind(this);
		this.targetChanged = this.targetChanged.bind(this);

		this.onSave = this.onSave.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onDelete = this.onDelete.bind(this);
		this.onCreate = this.onCreate.bind(this);
		this.onMoveUp = this.onMoveUp.bind(this);
		this.onMoveDown = this.onMoveDown.bind(this);
	}

	render() {
		return (
			<div className="habit-configuration">
				<Label content="Name" />
				<Input
					value={this.state.habit.name}
					onChange={this.nameChanged}
					size="mini" />
				<Label content="Icon" />
				<Dropdown
					value={this.state.habit.icon}
					options={iconOptions}
					onChange={this.iconChanged}
					fluid search selection className="mini" />
				<Label content="Base color" />
				<Dropdown
					value={this.state.habit.baseColor}
					options={colorOptions}
					onChange={this.baseColorChanged}
					fluid search selection className="mini fitted" />
				<Label content="Transition color" />
				<div className="transition-colors">
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
				</div>
				<Label content="Target" />
				<Input
					value={this.state.habit.target}
					type="number"
					onChange={this.targetChanged}
					size="mini" />
				{this.props.newHabit === undefined &&
					<Label content="Order" />
				}
				{this.props.newHabit === undefined &&
					<Button.Group size="mini">
						<Button basic size="mini" labelPosition='left' icon='up chevron' content='Move up' onClick={this.onMoveUp} />
						<Button basic size="mini" labelPosition='right' icon='down chevron' content='Move down' onClick={this.onMoveDown} />
					</Button.Group>
				}
				{this.props.newHabit === undefined &&
					<ButtonGroup size="mini" className="habit-configuration-options">
						<Button content="Save" size="mini" onClick={this.onSave} primary disabled={!this.state.changed} />
						<Button content="Undo" size="mini" onClick={this.onCancel} disabled={!this.state.changed} />
						<ConfirmationButton
							initialText="Delete" waitingText="Wait" finalText="Confirm"
							size="mini" color="red" onClick={this.onDelete} />
					</ButtonGroup>
				}
				{this.props.newHabit !== undefined &&
					<ButtonGroup size="mini" className="habit-configuration-options">
						<Button content="Create" size="mini" onClick={this.onCreate} positive />
					</ButtonGroup>
				}
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

	targetChanged(event, data) {
		this.onChange({ target: data.value });
	}

	onChange(changes) {
		this.setState({
			habit: {
				...this.state.habit,
				...changes
			},
			changed: true
		});
	}

	onSave() {
		if (this.props.onChange)
			this.props.onChange(this.state.habit);

		this.setState({
			changed: false
		});
	}

	onCancel() {
		this.setState({
			habit: this.props.habit,
			changed: false
		});
	}

	onDelete() {
		if (this.props.onDelete)
			this.props.onDelete(this.props.habit.id);
	}

	onCreate() {
		if (this.props.onCreate)
			this.props.onCreate(this.state.habit);
	}

	onMoveUp() {
		if (this.props.onMove)
			this.props.onMove(this.props.habit.id, this.props.order - 1);
	}

	onMoveDown() {
		if (this.props.onMove)
			this.props.onMove(this.props.habit.id, this.props.order + 1);
	}
}