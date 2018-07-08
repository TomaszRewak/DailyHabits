import './ExpendableIcon.css'

import React, { Component } from 'react'
import { Icon } from 'semantic-ui-react';

export default class ExpendableIcon extends Component {
	constructor(props) {
		super(props);

		this.state = {
			hovered: false,
			selected: false
		};

		this.mouseEntered = this.mouseEntered.bind(this);
		this.mouseLeft = this.mouseLeft.bind(this);
		this.clicked = this.clicked.bind(this);
	}

	render() {
		let className = `${this.props.className} expandable-icon`;

		if (this.state.hovered)
			className += ' hovered'
		if (this.state.selected)
			className += ' selected'

		return (
			<div
				className={className}
				onMouseEnter={this.mouseEntered} onMouseLeave={this.mouseLeft}
			>
				<div className="expandable-icon-body" style={this.props.style}>
					<div className="expendable-icon-header" onClick={this.clicked}>
						<Icon name={this.props.icon} size="small" />
						{(this.state.hovered || this.state.selected) &&
							<span className="expandable-icon-name">{this.props.name}</span>
						}
					</div>
					{this.state.selected &&
						<div className="expandable-icon-content">
							{this.props.children}
						</div>
					}
				</div>
			</div>
		);
	}

	mouseEntered() {
		this.setState({ hovered: true });
	}

	mouseLeft() {
		this.setState({ hovered: false });
	}

	clicked() {
		this.setState(state => ({
			selected: !state.selected
		}));
	}
}