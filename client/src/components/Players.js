import React from 'react';
import PageNavbar from './PageNavbar';
import PlayersRow from './PlayersRow';
import GrandSlamWinRow from './GrandSlamWinRow';
import GrandSlamRow from './GrandSlamRow';
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
			gsWins: []
		}

		this.handlePlayerNameChange = this.handlePlayerNameChange.bind(this);
		this.submitPlayer = this.submitPlayer.bind(this);
		this.investigatePlayer = this.investigatePlayer.bind(this);
		this.gsWins = this.gsWins.bind(this);
		this.gsInfo = this.gsInfo.bind(this);
	}

	handlePlayerNameChange(e) {
		this.setState({
			playerName: e.target.value
		});
	}

	investigatePlayer(e) {
		this.setState({
			playerName: e.target.firstChild.nodeValue,
			playerId: e.target.parentElement.parentElement.firstChild.textContent
		},() => {
			//call larger function here
			this.gsWins()
		});
	}

	gsWins() {
		fetch("http://localhost:8081/gswins/" + this.state.playerId,
		{
			method: 'GET' // The type of HTTP request.
		}).then(res => {
			// Convert the response data to a JSON.
			return res.json();
		}, err => {
			// Print the error if there is one.
			console.log(err);
		}).then(playerList => {
			if (!playerList) return;
			let gsWinsDiv = playerList.map((playerObj, i) =>
			<GrandSlamWinRow wins={playerObj.gs_wins} />
			);
			this.setState({
				gsWins: gsWinsDiv
			}, () => {
				//call next function to get W-L
				this.gsInfo()
			});
		}, err => {
			// Print the error if there is one.
			console.log(err);
		});
	}

	gsInfo() {
		fetch("http://localhost:8081/gsinfo/" + this.state.playerId,
		{
			method: 'GET' // The type of HTTP request.
		}).then(res => {
			// Convert the response data to a JSON.
			return res.json();
		}, err => {
			// Print the error if there is one.
			console.log(err);
		}).then(playerList => {
			if (!playerList) return;
			let gsInfoDiv = playerList.map((playerObj, i) =>
			<GrandSlamRow wins={playerObj.wins} losses={playerObj.losses}/>
			);
			this.setState({
				gsInfo: gsInfoDiv
			}, () => {
				document.getElementById('playerinfo-container').style.display = 'inline';
			});
		}, err => {
			// Print the error if there is one.
			console.log(err);
		});
	}

	/* ---- Q2 (Recommendations) ---- */
	// Hint: Name of movie submitted is contained in `this.state.movieName`.
	submitPlayer() {
		fetch("http://localhost:8081/players/" + this.state.playerName,
		{
			method: 'GET' // The type of HTTP request.
		}).then(res => {
			// Convert the response data to a JSON.
			return res.json();
		}, err => {
			// Print the error if there is one.
			console.log(err);
		}).then(playerList => {
			if (!playerList) return;
			// Map each movieObj in movieList to an HTML element:
			let playerDivs = playerList.map((playerObj, i) =>
			<PlayersRow atp_id={playerObj.player_id} name={playerObj.name} hand={playerObj.hand} country={playerObj.country} birthday={playerObj.birthday} investigatePlayer={this.investigatePlayer} />
			);
			// Set the state of the movies list to the value returned by the HTTP response from the server.
			this.setState({
				recPlayers: playerDivs
			});
		}, err => {
			// Print the error if there is one.
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
							<div className="h6">Players with name match ...</div>
							<div className="headers">
								<div className="header"><strong>ATP Id</strong></div>
								<div className="header"><strong>Name</strong></div>
								<div className="header"><strong>Hand</strong></div>
								<div className="header"><strong>Country</strong></div>
								<div className="header"><strong>Birthday</strong></div>
							</div>
							</div>
							<div className="results-container" id="results">
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
							<div className="results-container" id="results">
								{this.state.gsWins}
							</div>
							<div className="header-container">
							<div className="h6"></div>
								<div className="headers">
								<div className="header"><strong>Grand Slam Match Wins</strong></div>
								<div className="header"><strong>Grand Slam Match Losses</strong></div>
							</div>
							</div>
							<div className="results-container" id="results">
								{this.state.gsInfo}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}