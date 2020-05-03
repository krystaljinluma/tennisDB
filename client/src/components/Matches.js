import React from 'react';
import PageNavbar from './PageNavbar';
import MatchRow from './MatchRow';
import Modal from 'react-bootstrap/Modal'

import StatRow from './StatRow';
import OpponentRow from './OpponentRow';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'

import '../style/Matches.css';
import { Dropdown, Button, Row, Col, Container} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

export default class Matches extends React.Component {
	constructor(props) {
		super(props);

		// State maintained by this React component is the selected movie name,
		// and the list of recommended movies.
		this.state = {
			tournament: "Tournament",
			year: "Year",
			eliminatedPlayer: "",
			players: [],
			rounds: [],
			selectedRound: "Round",
			years: [],
			selectedPlayer: "",
			stats: [],
			opponents: [],
			showModal: false,
			matchMinutes: 0,
			matchDetails: []
		}

		this.getTournamentPlayer = this.getTournamentPlayer.bind(this);
		this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.handleTournamentChange = this.handleTournamentChange.bind(this);
		this.handleYearChange = this.handleYearChange.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.submit = this.submit.bind(this);

    }
	handleShow(e) {
		this.setState({
			showModal: true,
		});

		fetch("http://localhost:8081/tournamentMatch/" + this.state.tournament + '/' + this.state.year + 
										'/' + e.target.parentElement.parentElement.children[1].textContent + '/' + this.state.selectedPlayer,
		{
		method: "GET"
		}).then(res => {
		return res.json();
		}, err => {
		  console.log(err);
		}).then(details => {
			let detailDivs = details.map((detail, i) =>
				<div className="tournamentResults">
					<div className="name">{detail.Name}</div>
					<div className="round">{detail.num_sets}</div>
					<div className="round">{detail.first_serve_rtn_won}</div>
					<div className="rank">{detail.dbl_faults}</div>
					<div className="aces">{detail.bp_saved} - {detail.bp_faced}</div>
				</div>
			);

			this.setState({
				matchDetails: detailDivs
			});

			this.setState({
				matchMinutes: details[0].match_minutes
			});
			
		}); 

	}

	handleClose() {
		this.setState({
			showModal: false
		});
	}

	getTournamentPlayer = e => {


		document.getElementById('tournamentHeaders').style.display = 'none';
		// document.getElementById('summaryStats').style.display = 'flex';

		document.getElementById('results').style.display = 'none';
		document.getElementById('results1').style.display = 'inline';

		fetch("http://localhost:8081/eliminatedBy/" + this.state.tournament + '/' + this.state.year + '/' + e.target.firstChild.nodeValue,
		{
		method: "GET"
		}).then(res => {
		return res.json();
		}, err => {
		  console.log(err);
		}).then(player => {
			if (player[0]) {
				this.setState({
					eliminatedPlayer: player[0].Name
				});
			} else {
				this.setState({
					eliminatedPlayer: "N/A"
				});
			}

			
		}); 

		this.setState({
			selectedPlayer: e.target.firstChild.nodeValue
		});


		fetch("http://localhost:8081/playerstats/" + this.state.tournament + '/' + this.state.year + '/' + e.target.firstChild.nodeValue,
		{
		method: "GET"
		}).then(res => {
		return res.json();
		}, err => {
		  console.log(err);
		}).then(opps => {
			let oppDivs = opps.map((opp, i) =>
			<OpponentRow showModal={this.handleShow} name={opp.Name} round={opp.round} game_minutes={opp.avg_minutes_game} point_seconds={opp.avg_seconds_point} set_minutes={opp.avg_minutes_set}/>
			);
			this.setState({
				opponents: oppDivs
			});

		}); 

		fetch("http://localhost:8081/summarizeStats/" + this.state.tournament + '/' + this.state.year + '/' + e.target.firstChild.nodeValue,
		{
		method: "GET"
		}).then(res => {
		return res.json();
		}, err => {
		  console.log(err);
		}).then(stats => {
			
			let statDivs = stats.map((stat, i) =>
			<StatRow pts={stat.pts} aces={stat.Aces} wins={stat.wins} losses={stat.losses} />
			);

			this.setState({
				stats: statDivs
			});
		}); 

		
	}

	componentDidMount() {
		document.getElementById('roundDropdown').style.display = 'none';
		document.getElementById('tournamentHeaders').style.display = 'none';

		// document.getElementById('playerSpecificStats').style.display = 'none';

	}

    handleTournamentChange = e => {
        this.setState({
			tournament: e.target.textContent
		});

		fetch("http://localhost:8081/years/" + e.target.textContent,
		{
		method: "GET"
		}).then(res => {
		return res.json();
		}, err => {
		  console.log(err);
		}).then(years => {
			let yearDivs = years.map((yearObj, i) =>
			<Dropdown.Item onClick={this.handleYearChange}>{yearObj.Year}</Dropdown.Item>

		  	);

			this.setState({
				years: yearDivs
			});
		}); 
    }

    handleYearChange = e => {
        this.setState({
			year: e.target.textContent
		});
    }


	submit() {
		
		fetch("http://localhost:8081/tournament/" + this.state.tournament + "/" + this.state.year,
		{
			method: "GET"
		}).then(res => {
			return res.json();
		}, err => {
			console.log(err);
		}).then(tournamentMatches => {


			let playerDivs = tournamentMatches.map((player, i) => 
			<MatchRow name={player.Name} rank={player.p_rank} aces={player.Aces} winner={player.Result} round={player.round} getTournamentPlayer={this.getTournamentPlayer}/>
			);

			this.setState({
				players: playerDivs
			}, () => {
				document.getElementById('tournamentHeaders').style.display = 'flex';
				document.getElementById('results').style.display = 'inline';
			});
		});

		fetch("http://localhost:8081/rounds/" + this.state.tournament + "/" + this.state.year,
		{
		  method: 'GET' // The type of HTTP request.
		}).then(res => {
		  // Convert the response data to a JSON.
		  return res.json();
		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		}).then(roundList => {
		  if (!roundList) return;
		  let roundDivs = roundList.map((roundObj, i) =>
		  <Dropdown.Item onClick={this.handleChange}>{roundObj.Round}</Dropdown.Item>

		  );

		  this.setState({
			rounds: roundDivs
		  });
		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		});
		document.getElementById('roundDropdown').style.display = 'inline';

	}

	handleChange = e => {
		fetch("http://localhost:8081/tournament/" + this.state.tournament + "/" + this.state.year + "/" + e.target.textContent,
		{
		method: "GET"
		}).then(res => {
		return res.json();
		}, err => {
		  console.log(err);
		}).then(tournamentMatches => {
			let playerRoundDivs = tournamentMatches.map((player, i) => 
			<MatchRow name={player.Name} rank={player.p_rank} aces={player.Aces} winner={player.Result} round={player.round} getTournamentPlayer={this.getTournamentPlayer}/>
			);


			this.setState({
				players: playerRoundDivs
			});

		}); 
	  }



	render() {

		return (
			<div className="Recommendations">
				<PageNavbar active="matches" />

			    <div className="container recommendations-container">
			    	<div className="jumbotron" id="overallTournament">
			    		<div className="h5">Tournament Results</div>
			    		<br></br>
			    		<div className="input-container">
							<DropdownButton as={ButtonGroup} variant="secondary" title={this.state.tournament} id="tournamentDropdown">
								<Dropdown.Item onClick={this.handleTournamentChange}>Australian Open</Dropdown.Item>
								<Dropdown.Item onClick={this.handleTournamentChange}>French Open</Dropdown.Item>
								<Dropdown.Item onClick={this.handleTournamentChange}>Wimbledon</Dropdown.Item>
								<Dropdown.Item onClick={this.handleTournamentChange}>US Open</Dropdown.Item>
							</DropdownButton>{' '}

							<DropdownButton as={ButtonGroup} style={{marginRight: "1em"}}  variant="secondary" title={this.state.year} id="yearDropdown">
								{this.state.years}
							</DropdownButton>

							<Button id="submitMovieBtn" className="submit-btn" onClick={this.submit} variant="dark">Submit</Button>
							
							<DropdownButton as={ButtonGroup} style={{marginLeft: "1em"}}  variant="secondary" title={this.state.selectedRound} onChange={this.handleChange} id="roundDropdown">
								{this.state.rounds}
							</DropdownButton>

			    		</div>
			    		<div className="header-container">
			    			<div className="headers" id="tournamentHeaders">
								<div className="header"><strong>Round</strong></div>
								<div className="header"><strong>Player Name</strong></div>
								<div className="header"><strong>Rank</strong></div>
								<div className="header"><strong>Aces</strong></div>
								<div className="header"><strong>Result</strong></div>
							</div>
			    		</div>
			    		<div className="results-container" id="results">
			    			{this.state.players}
			    		</div>
			    	</div>

					

					<div style={{paddingTop: "2.5em"}} className="jumbotron" id="playerSpecificStats">
						<div className="h5" >Player Specific Tournament Statistics - <b>{this.state.selectedPlayer}</b></div>
					
						<div style={{paddingTop: ".8em"}} className="h6">Eliminated By: {this.state.eliminatedPlayer}</div>

						{this.state.stats}
						

			    		<div className="header-container">
			    			<div className="headers" >
								<div className="header"><strong>Opponent</strong></div>
								<div className="header"><strong>Round</strong></div>
								<div className="header"><strong>Minutes per Game</strong></div>
								<div className="header"><strong>Seconds per Point</strong></div>
								<div className="header"><strong>Minutes per Set</strong></div>
							</div>
			    		</div>
			    		<div className="results-container" id="results1">
			    			{this.state.opponents}
			    		</div>

						<Modal show={this.state.showModal} onHide={this.handleClose} size="lg">
							<Modal.Header closeButton>
							<Modal.Title>Match-Specific Statistics</Modal.Title>
							</Modal.Header>

							<Modal.Body>
								<div style={{paddingTop: ".8em"}} className="h6">Match Minutes: {this.state.matchMinutes}</div>

								<div className="header-container">

								<div className="headers" >
									<div className="header"><strong>Name</strong></div>
									<div className="header"><strong>Sets</strong></div>
									<div className="header"><strong>First Serve Won</strong></div>
									<div className="header"><strong>Double Faults</strong></div>
									<div className="header"><strong>Breakpoint Faced - Breakpoint Saved</strong></div>
								</div>
							</div>
							<div className="results-container" id="results">
								{this.state.matchDetails}
							</div>

							</Modal.Body>
							<Modal.Footer>
							<Button variant="secondary" onClick={this.handleClose}>
								Close
							</Button>
							
							</Modal.Footer>
						</Modal>
						
			    	</div>
			    </div>
		    </div>
		);
	}
}