import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react'

import { Button } from 'semantic-ui-react'
import HabitConfiguration from './HabitConfiguration'
import HabitInformation from './HabitInformation'

class HabitManagerItem extends Component {
	constructor(props) {
		super(props);

		this.state = {
			editable: false,
			edited: props.habit
		};

		this.onEditableChange = this.onEditableChange.bind(this);

		this.onChange = this.onChange.bind(this);
		this.onSave = this.onSave.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onDelete = this.onDelete.bind(this);
	}

	render() {
		if (this.state.editable)
			return (
				<div>
					<div>
						<HabitConfiguration habit={this.state.edited} onChange={this.onEditableChange} />
					</div>
					<div>
						<Button onClick={this.onSave} content="Save" size="mini" />
						<Button onClick={this.onCancel} content="Cancel" size="mini" />
						<Button onClick={this.onDelete} content="Delete" size="mini" color="red" />
					</div>
				</div>
			);
		else
			return (
				<div>
					<div>
						<HabitInformation habit={this.props.habit} />
					</div>
					<div>
						<Button onClick={this.onChange} content="Edit" size="mini" />
					</div>
				</div>
			);
	}

	onEditableChange(newValues) {
		this.setState({
			edited: newValues
		});
	}

	onChange() {
		this.setState({
			editable: true
		});
	}

	onSave() {
		if (this.props.onChange)
			this.props.onChange(this.state.edited);

		this.setState({
			editable: false
		});
	}

	onCancel() {
		this.setState({
			editable: false,
			edited: this.props
		});
	}

	onDelete() {
		if (this.props.onDelete)
			this.props.onDelete(this.props.id);
	}
}

export default HabitManagerItem;