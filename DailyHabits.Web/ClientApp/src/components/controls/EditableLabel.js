import './EditableLabel.css'

import React, { Component } from 'react'
import { Input, Label, Button } from 'semantic-ui-react';

export default class EditableLabel extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: this.props.value || '',
			underEdition: false
		};

		this.onSave = this.onSave.bind(this);
		this.onChange = this.onChange.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onDelete = this.onDelete.bind(this);
	}

	render() {
		return <div className="editable-label">
			{this.renderContent()}
		</div>;
	}

	renderContent() {
		if (this.state.underEdition)
			return <Input className="editable" size="mini" action>
				<input value={this.state.value} onChange={this.onChange} placeholder={this.props.defaultValue} />
				<Button content="save" size="mini" onClick={this.onSave} primary />
				<Button content="cancel" size="mini" onClick={this.onCancel} />
				<Button content="delete" size="mini" onClick={this.onDelete} negative />
			</Input>
		if (!this.props.value)
			return <Label
				className="default-value"
				content={this.props.defaultValue}
				onClick={this.onEdit} />
		return <Label
			content={this.props.value}
			onClick={this.onEdit} />
	}

	onSave() {
		if (this.props.onChange)
			this.props.onChange(this.state.value);
		this.setState({ underEdition: false });
	}

	onChange(event) {
		this.setState({
			value: event.target.value
		});
	}

	onEdit() {
		this.setState({
			underEdition: true
		});
	}

	onCancel() {
		this.setState({
			underEdition: false,
			value: this.props.value
		});
	}

	onDelete() {
		if (this.props.onDelete)
			this.props.onDelete();
	}
}