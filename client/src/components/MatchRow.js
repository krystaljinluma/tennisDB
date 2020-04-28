import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MatchRow = (props) => {
	return (
		<div className="tournamentResults">
			<div className="round">{props.round}</div>
			<div className="name">{props.name}</div>
			<div className="rank">{props.rank}</div>
			<div className="aces">{props.aces}</div>
			<div className="winner">{props.winner}</div>
		</div>
	);
	
}

export default MatchRow