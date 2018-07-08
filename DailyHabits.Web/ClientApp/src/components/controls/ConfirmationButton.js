import React, { Component } from 'react'
import { Button } from 'semantic-ui-react';

export default class ConfirmationButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			waiting: false,
			enabled: false
		};

		this.startWaiting = this.startWaiting.bind(this);
	}

	render() {
		if (this.state.enabled)
			return <Button
				content={this.props.finalText}
				size={this.props.size}
				color={this.props.color}
				onClick={this.props.onClick} />;
		else if (this.state.waiting)
			return <Button
				content={this.props.waitingText}
				size={this.props.size}
				color={this.props.color}
				onClick={this.onDelete}
				disabled />;
		else
			return <Button
				content={this.props.initialText}
				size={this.props.size}
				color={this.props.color}
				onClick={this.startWaiting} />;
	}

	startWaiting() {
		this.setState({
			waiting: true
		})

		setTimeout(() => {
			this.setState({
				enabled: true
			})
		}, 2000);
	}
}