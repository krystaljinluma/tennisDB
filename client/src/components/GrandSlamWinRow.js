import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class PlayersRow extends React.Component {
	constructor(props) {
		super(props);

		/* props looks like:
		{
			p_rank
			wins
		}
		*/
	}

	render() {
		return (
			<div className="gsWins">
				<div className="rank">{this.props.rank}</div>
				<div className="wins">{this.props.wins}</div>
			</div>
		);
	}
}
