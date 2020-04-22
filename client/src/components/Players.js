import React from 'react';
import PageNavbar from './PageNavbar';
import PlayersRow from './PlayersRow';
import GrandSlamWinRow from './GrandSlamWinRow';
import GrandSlamRow from './GrandSlamRow';
import OlypmicsRow from './OlympicsRow';
import '../style/Players.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Players extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			playerName: "",
			playerId: "",
			recPlayers: [],
			gsInfo: [],
			gsWins: [],
			olympicInfo: []
		}

		this.handlePlayerNameChange = this.handlePlayerNameChange.bind(this);
		this.submitPlayer = this.submitPlayer.bind(this);
		this.investigatePlayer = this.investigatePlayer.bind(this);
		this.getGSWins = this.getGSWins.bind(this);
		this.getGSInfo = this.getGSInfo.bind(this);
	}

	handlePlayerNameChange(e) {
		this.setState({
			playerName: e.target.value
		});
	}

	investigatePlayer(e) {
		//make sure states are set for subsequent function calls
		this.setState({
			playerName: e.target.firstChild.nodeValue,
			playerId: e.target.parentElement.parentElement.firstChild.textContent
		},() => {
			//call function to get GS tournament wins
			this.getGSWins() 
		});
	}

	getGSWins() {
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
			<GrandSlamWinRow wins={playerObj.gs_wins} />
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
			let gsInfoDiv = playerList.map((playerObj, i) =>
			<GrandSlamRow wins={playerObj.wins} losses={playerObj.losses}/>
			);
			this.setState({
				gsInfo: gsInfoDiv
			}, () => {
				//reveal player GS stats containers on page
				document.getElementById('playerinfo-container').style.display = 'inline';
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
			<OlypmicsRow games={playerObj.Games} event={playerObj.Event} medal={playerObj.Medal}/>
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
			<PlayersRow atp_id={playerObj.player_id} name={playerObj.name} hand={playerObj.hand} country={playerObj.country} birthday={playerObj.birthday} investigatePlayer={this.investigatePlayer} />
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
						</div>
						<div id="playerinfo-container">
							<div className="header-container">
							<div className="h6"></div>
								<div className="headers">
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