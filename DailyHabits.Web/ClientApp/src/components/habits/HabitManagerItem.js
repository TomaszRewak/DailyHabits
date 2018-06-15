import React, { Component } from 'react';

class HabitManagerItem extends Component {
	constructor(props) {
		super(props);

		this.state = props;

		this.onChange = this.onChange.bind(this);
		this.onDelete = this.onDelete.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			name: this.props.name,
			icon: this.props.icon
		});
	}

	render() {
		return (
			<div>
				<div>
					<div>{this.state.name}</div>
					<span className={`glyphicon glyphicon-${this.state.icon}`}></span>
				</div>
				<div>
					<button onClick={this.onChange}>Save</button>
					<button onClick={this.onDelete}>Delete</button>
				</div>
			</div>
		);
	}

	onChange() {
		if (this.props.onChange)
			this.props.onChange(
				this.props.id,
				{
					name: this.state.name,
					icon: this.state.icon
				});
	}

	onDelete() {
		if (this.props.onDelete)
			this.props.onDelete(this.props.id);
	}
}

export default HabitManagerItem;