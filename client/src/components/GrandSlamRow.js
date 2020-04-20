import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class PlayersRow extends React.Component {
	constructor(props) {
		super(props);

		/* props looks like:
		{
			wins
			losses
		}
		*/
	}

	render() {
		return (
			<div className="gsInfo">
				<div className="wins">{this.props.wins}</div>
				<div className="losses">{this.props.losses}</div>
			</div>
		);
	}
}
