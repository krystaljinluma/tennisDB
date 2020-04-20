import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class PlayersRow extends React.Component {
	constructor(props) {
		super(props);

		/* props looks like:
		{
			atp_id
			name
			hand
			country
			birthday
		}
		*/
	}

	render() {
		return (
			<div className="playerResults">
				<div className="atp_id">{this.props.atp_id}</div>
				<div className="name"><button type="button" className="btn btn-link playerName" onClick={this.props.investigatePlayer}>{this.props.name}</button></div>
				<div className="hand">{this.props.hand}</div>
				<div className="country">{this.props.country}</div>
				<div className="birthday">{this.props.birthday}</div>
			</div>
		);
	}
}
