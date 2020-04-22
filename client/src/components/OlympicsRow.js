import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class PlayersRow extends React.Component {
	constructor(props) {
		super(props);

		/* props looks like:
		{
			games
			event
			medal
		}
		*/
	}

	render() {
		return (
			<div className="olympicInfo">
				<div className="games">{this.props.games}</div>
				<div className="event">{this.props.event}</div>
				<div className="medal">{this.props.medal}</div>
			</div>
		);
	}
}
