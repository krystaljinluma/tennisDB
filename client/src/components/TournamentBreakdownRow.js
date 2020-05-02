import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class PlayersRow extends React.Component {
	constructor(props) {
		super(props);

		/* props looks like:
		{
			round
			opponent
			set1
			opp_set1
			set2
			opp_set2
			set3
			opp_set3
			set4
			opp_set4
			set5
			opp_set5
		}
		*/
	}

	prettyPrintResult() {
		var m_result = ""
		if (this.props.set1 != "0" && this.props.opp_set1 != 0) {
			m_result += this.props.set1 + "-" + this.props.opp_set1;
		}
		if (this.props.set2 != "0" && this.props.opp_set2 != 0) {
			m_result += " " + this.props.set2 + "-" + this.props.opp_set2;
		}
		if (this.props.set3 != "0" && this.props.opp_set3 != 0) {
			m_result += " " + this.props.set3 + "-" + this.props.opp_set3;
		}
		if (this.props.set4 != "0" && this.props.opp_set4 != 0) {
			m_result += " " + this.props.set4 + "-" + this.props.opp_set4;
		}
		if (this.props.set5 != "0" && this.props.opp_set5 != 0) {
			m_result += " " + this.props.set5 + "-" + this.props.opp_set5;
		}
		console.log(m_result)
		return m_result
	}

	render() {
		return (
			<div className="tournamentBreakdown">
				<div className="round">{this.props.round}</div>
				<div className="opponent">{this.props.opponent}</div>
				<div className="result">{this.prettyPrintResult()}</div>
			</div>
		);
	}
}
