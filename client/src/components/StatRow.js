import React from 'react';
import { Row, Col, Container } from 'react-bootstrap'

const StatRow = (props) => {
	return (
		<div style={{margin: "1em"}}>
			<Row >
				<Col  xs={6}>
					<div className="pts" style={{marginBottom: ".8em"}}><strong>Average Points:</strong> {props.pts}</div>
					<div className="aces"><strong>Average Number of Aces:</strong> {props.aces}</div>
				</Col>
				<Col xs={6}>
					<div className="wins" style={{marginBottom: ".8em"}}><strong>Wins: </strong>{props.wins}</div>
					<div className="losses"><strong>Losses:</strong> {props.losses}</div>
				</Col>
			</Row>
		</div>
	);
	
}

export default StatRow