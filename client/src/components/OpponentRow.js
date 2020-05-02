import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const OpponentRow = (props) => {
	const {name, round, game_minutes, point_seconds, set_minutes, winner} = props

	return (
		<div className="opponentInfo">
			<div className="name">{name}</div>
			<div className="round">{round}</div>
			<div className="game_minutes">{game_minutes}</div>
			<div className="point_seconds">{point_seconds}</div>
			<div className="set_minutes">{set_minutes}</div>
			<div className="winner">{winner}</div>
		</div>
	);

}

export default OpponentRow