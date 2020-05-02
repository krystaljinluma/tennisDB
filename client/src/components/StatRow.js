import React from 'react';
import { Row, Col, Container } from 'react-bootstrap'

const StatRow = (props) => {
	return (
		<div>
			<Row>
				<Col xs={6}>
					<div className="pts"><strong>Average Points:</strong> {props.pts}</div>
					<div className="aces"><strong>Average Number of Aces:</strong> {props.aces}</div>
				</Col>
				<Col xs={6}>
					<div className="wins"><strong>Wins: </strong>{props.wins}</div>
					<div className="losses"><strong>Losses:</strong> {props.losses}</div>
				</Col>
			</Row>
		</div>
	);
	
}

export default StatRow