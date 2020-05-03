import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const OpponentRow = (props) => {
	const {name, round, game_minutes, point_seconds, set_minutes, showModal} = props

	return (
		<div className="tournamentResults">
			<div className="name">{name}</div>
			<div className="round"><button className="btn btn-link playerName" onClick={showModal}>{round}</button></div>
			<div className="rank">{game_minutes}</div>
			<div className="aces">{point_seconds}</div>
			<div className="winner">{set_minutes}</div>
		</div>
	);

}

export default OpponentRow