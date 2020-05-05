import React from 'react';
import PageNavbar from './PageNavbar';
import PlayersRow from './PlayersRow';
import GrandSlamWinRow from './GrandSlamWinRow';
import GrandSlamRow from './GrandSlamRow';
import OlypmicsRow from './OlympicsRow';
import TournamentBreakdownRow from './TournamentBreakdownRow'
import '../style/Players.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

export default class Players extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			playerName: "",
			playerId: "",
			recPlayers: [],
			gsInfo: [],
			gsWins: [],
			olympicInfo: [],
			tournamentResults: [],
			showModal: false,
			year: "Year",
			tournament: "Tournament", 
		}

		this.handlePlayerNameChange = this.handlePlayerNameChange.bind(this);
		this.submitPlayer = this.submitPlayer.bind(this);
		this.investigatePlayer = this.investigatePlayer.bind(this);
		this.getGSWinsAndRank = this.getGSWinsAndRank.bind(this);
		this.getGSInfo = this.getGSInfo.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleShow = this.handleShow.bind(this);
		this.changeTournament = this.changeTournament.bind(this);
		this.changeYear = this.changeYear.bind(this);
		this.tournamentBreakdown = this.tournamentBreakdown.bind(this);
	}

	handlePlayerNameChange(e) {
		this.setState({
			playerName: e.target.value
		});
	}

	handleShow(e) {
		this.setState({
			showModal: true
		});
	}

	handleClose(e) {
		this.setState({
			showModal: false
		});
	}

	changeTournament = e => {
		this.setState({
			tournament: e.target.textContent
		});
	}

	changeYear = e => {
		this.setState({
			year: e.target.textContent
		});
	}

	tournamentBreakdown(e) {
		fetch("http://localhost:8081/tbd/" + this.state.playerId + "/" + this.state.tournament + "/" + this.state.year,
		{
			method: 'GET'
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(playerList => {
			if (!playerList) return;
			if (playerList.length == 0) {
				document.getElementById('tournDataFound').textContent = 'Player did not participate in tournament.';
				document.getElementById('tournament-container').style.display = 'none';
				return;
			}
			document.getElementById('tournDataFound').textContent = '';
			//can be many rows
			let tournamentDivs = playerList.map((playerObj, i) =>
			<TournamentBreakdownRow round={playerObj.round} opponent={playerObj.opponent} set1={playerObj.set1} opp_set1={playerObj.opp_set1} 
			set2={playerObj.set2} opp_set2={playerObj.opp_set2} set3={playerObj.set3} opp_set3={playerObj.opp_set3} set4={playerObj.set4} opp_set4={playerObj.opp_set4}
			set5={playerObj.set5} opp_set5={playerObj.opp_set5}/>
			);
			this.setState({
				tournamentResults: tournamentDivs
			}, () => {
				//call next function to get W-L
				document.getElementById('tournament-container').style.display = 'inline';
			});
		}, err => {
			console.log(err);
		});
	}

	investigatePlayer(e) {
		document.getElementById('playerinfo-container').style.display = 'none';
		document.getElementById('olympic-container').style.display = 'none';
		document.getElementById('tournament-breakdown').style.display = 'none';
		//make sure states are set for subsequent function calls
		this.setState({
			playerName: e.target.firstChild.nodeValue,
			playerId: e.target.parentElement.parentElement.firstChild.textContent
		},() => {
			//call function to get GS tournament wins
			this.getGSWinsAndRank() 
		});
	}

	getGSWinsAndRank() {
		fetch("http://localhost:8081/gswins/" + this.state.playerId,
		{
			method: 'GET'
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(playerList => {
			if (!playerList) return;
			//will only be one row produced here
			let gsWinsDiv = playerList.map((playerObj, i) =>
			<GrandSlamWinRow wins={playerObj.gs_wins} rank={playerObj.p_rank} />
			);
			this.setState({
				gsWins: gsWinsDiv
			}, () => {
				//call next function to get W-L
				this.getGSInfo()
			});
		}, err => {
			console.log(err);
		});
	}

	getGSInfo() {
		fetch("http://localhost:8081/gsinfo/" + this.state.playerId,
		{
			method: 'GET'
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(playerList => {
			if (!playerList) return;
			//will only be one row produced here
			if (playerList.length == 0) {
				document.getElementById('dataFound').textContent = 'No match data found for this player. Data is only for GS singles matches played from 2000 - 2019.';
				this.getOlympicInfo();
				return;
			}
			let gsInfoDiv = playerList.map((playerObj, i) =>
			<GrandSlamRow wins={playerObj.wins} losses={playerObj.losses}/>
			);
			this.setState({
				gsInfo: gsInfoDiv
			}, () => {
				//reveal player GS stats containers on page
				document.getElementById('playerinfo-container').style.display = 'inline';
				document.getElementById('tournament-breakdown').style.display = 'inline';
				//get olympic info for player
				this.getOlympicInfo();
			});
		}, err => {
			console.log(err);
		});
	}

	getOlympicInfo() {
		fetch("http://localhost:8081/olympicinfo/" + this.state.playerName,
		{
			method: 'GET'
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(playerList => {
			if (!playerList) return;
			//some players will not have olympic info, here we exit
			if (playerList.length == 0) return;
			//player can participate in multiple olympics and events, many rows possible
			let olympicInfoDiv = playerList.map((playerObj, i) =>
			<OlypmicsRow games={playerObj.games} event={playerObj.event_name} medal={playerObj.medal}/>
			);
			this.setState({
				olympicInfo: olympicInfoDiv
			}, () => {
				//reveal olympic container on page
				document.getElementById('olympic-container').style.display = 'inline';
			});
		}, err => {
			console.log(err);
		});
	}

	submitPlayer() {
		document.getElementById('playerHeaders').style.display = 'none';
		document.getElementById('playerResults').style.display = 'none';
		document.getElementById('playerinfo-container').style.display = 'none';
		document.getElementById('olympic-container').style.display = 'none';
		document.getElementById('dataFound').textContent = '';
		document.getElementById('tournament-breakdown').style.display = 'none';
		fetch("http://localhost:8081/players/" + this.state.playerName,
		{
			method: 'GET'
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(playerList => {
			if (!playerList) return;
			//if a name is entered incorrectly or player doesn't exist, we will not reveal other parts of the page or do more calls
			if (playerList.length == 0) {
				document.getElementById('playersFound').textContent = 'No players found.'
				return;
			} else {
				document.getElementById('playersFound').textContent = 'Players with name match ...'
			}
			//there are potentially more than one players that match with name. investigatePlayer is passed to get more info for the selected player
			let playerDivs = playerList.map((playerObj, i) =>
			<PlayersRow atp_id={playerObj.player_id} name={playerObj.name} hand={playerObj.hand} country={playerObj.country} birthday={playerObj.birthday.substring(0,10)} investigatePlayer={this.investigatePlayer} />
			);
			this.setState({
				recPlayers: playerDivs
			}, () => {
				document.getElementById('playerHeaders').style.display = 'flex';
				document.getElementById('playerResults').style.display = 'inline';
			});
		}, err => {
			console.log(err);
		});
	}


	render() {

		return (
			<div className="Recommendations">
				<PageNavbar active="players" />

				<div className="container recommendations-container">
					<div className="jumbotron">
						<div className="h5">Player Search</div>
						<div className="input-container">
							<input type='text' placeholder="Enter Player Name" value={this.state.playerName} onChange={this.handlePlayerNameChange} id="playerName" className="player-input" />
							<button id="submitPlayerBtn" className="submit-btn" onClick={this.submitPlayer}>Submit</button>
						</div>
						<div className="search-container">
							<div className="header-container">
							<div className="h6" id="playersFound"></div>
							<div className="headers" id="playerHeaders">
								<div className="header"><strong>ATP Id</strong></div>
								<div className="header"><strong>Name</strong></div>
								<div className="header"><strong>Hand</strong></div>
								<div className="header"><strong>Country</strong></div>
								<div className="header"><strong>Birthday</strong></div>
							</div>
							</div>
							<div className="results-container" id="playerResults">
								{this.state.recPlayers}
							</div>
							<div className="h6" id="dataFound"></div>
						</div>
						<div id="playerinfo-container">
							<div className="header-container">
							<div className="h6"></div>
								<div className="headers">
								<div className="header"><strong>Highest Career Ranking</strong></div>
								<div className="header"><strong>Grand Slam Tournament Wins</strong></div>
							</div>
							</div>
							<div className="results-container">
								{this.state.gsWins}
							</div>
							<div className="header-container">
							<div className="h6"></div>
								<div className="headers">
								<div className="header"><strong>Grand Slam Match Wins</strong></div>
								<div className="header"><strong>Grand Slam Match Losses</strong></div>
							</div>
							</div>
							<div className="results-container">
								{this.state.gsInfo}
							</div>
						</div>
						<div id="tournament-breakdown">
						<Button variant="link" id="tournButton" onClick={this.handleShow}>
							Tournament Breakdown
						</Button>

						<Modal show={this.state.showModal} onHide={this.handleClose} size="lg">
							<Modal.Header closeButton>
							<Modal.Title>Tournament Breakdown</Modal.Title>
							</Modal.Header>
							<Modal.Body>
							<DropdownButton as={ButtonGroup} variant="secondary" title={this.state.tournament}>
								<Dropdown.Item onClick={this.changeTournament}>Australian Open</Dropdown.Item>
								<Dropdown.Item onClick={this.changeTournament}>French Open</Dropdown.Item>
								<Dropdown.Item onClick={this.changeTournament}>Wimbledon</Dropdown.Item>
								<Dropdown.Item onClick={this.changeTournament}>US Open</Dropdown.Item>
							</DropdownButton>{' '}
							<DropdownButton as={ButtonGroup} variant="secondary" title={this.state.year}>
								<Dropdown.Item onClick={this.changeYear}>2000</Dropdown.Item>
								<Dropdown.Item onClick={this.changeYear}>2001</Dropdown.Item>
								<Dropdown.Item onClick={this.changeYear}>2002</Dropdown.Item>
								<Dropdown.Item onClick={this.changeYear}>2003</Dropdown.Item>
								<Dropdown.Item onClick={this.changeYear}>2004</Dropdown.Item>
								<Dropdown.Item onClick={this.changeYear}>2005</Dropdown.Item>
								<Dropdown.Item onClick={this.changeYear}>2006</Dropdown.Item>
								<Dropdown.Item onClick={this.changeYear}>2007</Dropdown.Item>
								<Dropdown.Item onClick={this.changeYear}>2008</Dropdown.Item>
								<Dropdown.Item onClick={this.changeYear}>2009</Dropdown.Item>
								<Dropdown.Item onClick={this.changeYear}>2010</Dropdown.Item>
								<Dropdown.Item onClick={this.changeYear}>2011</Dropdown.Item>
								<Dropdown.Item onClick={this.changeYear}>2012</Dropdown.Item>
								<Dropdown.Item onClick={this.changeYear}>2013</Dropdown.Item>
								<Dropdown.Item onClick={this.changeYear}>2014</Dropdown.Item>
								<Dropdown.Item onClick={this.changeYear}>2015</Dropdown.Item>
								<Dropdown.Item onClick={this.changeYear}>2016</Dropdown.Item>
								<Dropdown.Item onClick={this.changeYear}>2017</Dropdown.Item>
								<Dropdown.Item onClick={this.changeYear}>2018</Dropdown.Item>
								<Dropdown.Item onClick={this.changeYear}>2019</Dropdown.Item>
							</DropdownButton>
							<div className="h6" id="tournDataFound"></div>
							<div id="tournament-container">
							<div className="header-container">
							<div className="h6"></div>
								<div className="headers">
								<div className="header"><strong>Round</strong></div>
								<div className="header"><strong>Opponent</strong></div>
								<div className="header"><strong>Result</strong></div>
							</div>
							</div>
							<div className="results-container">
								{this.state.tournamentResults}
							</div>
							</div>
							</Modal.Body>
							<Modal.Footer>
							<Button variant="secondary" onClick={this.handleClose}>
								Close
							</Button>
							<Button variant="dark" onClick={this.tournamentBreakdown}>
								Get Results
							</Button>
							</Modal.Footer>
						</Modal>
						</div>
						<div id="olympic-container">
							<div className="header-container">
							<div className="h6"></div>
								<div className="headers">
								<div className="header"><strong>Olympic Games</strong></div>
								<div className="header"><strong>Event</strong></div>
								<div className="header"><strong>Medal Result</strong></div>
							</div>
							</div>
							<div className="results-container">
								{this.state.olympicInfo}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}