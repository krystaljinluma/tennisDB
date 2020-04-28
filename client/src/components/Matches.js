import React from 'react';
import PageNavbar from './PageNavbar';
import MatchRow from './MatchRow';
import '../style/Matches.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Matches extends React.Component {
	constructor(props) {
		super(props);

		// State maintained by this React component is the selected movie name,
		// and the list of recommended movies.
		this.state = {
			tournament: "",
            year: "",
			players: [],
			rounds: [],
			selectedRound: "",
			years: []
		}
	
		this.handleTournamentChange = this.handleTournamentChange.bind(this);
		this.handleYearChange = this.handleYearChange.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.submit = this.submit.bind(this);

    }
	
	componentDidMount() {
		document.getElementById('tournamentHeaders').style.display = 'none';
	}

    handleTournamentChange = e => {
        this.setState({
			tournament: e.target.value
		});

		fetch("http://localhost:8081/years/" + e.target.value,
		{
		method: "GET"
		}).then(res => {
		return res.json();
		}, err => {
		  console.log(err);
		}).then(years => {
			let yearDivs = years.map((yearObj, i) =>
		  		<option value={yearObj.Year}>{yearObj.Year}</option>     
		  	);

			this.setState({
				years: yearDivs
			});

		}); 

		


    }

    handleYearChange = e => {
        this.setState({
			year: e.target.value
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
			console.log(this.state.tournament);
			console.log(this.state.year);

			let playerDivs = tournamentMatches.map((player, i) => 
			<MatchRow name={player.Name} rank={player.p_rank} aces={player.Aces} winner={player.Result} round={player.round} />
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
		  <option value={roundObj.Round}>{roundObj.Round}</option>     
		  );

		  this.setState({
			rounds: roundDivs
		  });
		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		});
	}

	getYears() {
		
	}

	handleChange = e => {
		fetch("http://localhost:8081/tournament/" + this.state.tournament + "/" + this.state.year + "/" + e.target.value,
		{
		method: "GET"
		}).then(res => {
		return res.json();
		}, err => {
		  console.log(err);
		}).then(tournamentMatches => {
			let playerRoundDivs = tournamentMatches.map((player, i) => 
			<MatchRow name={player.Name} rank={player.p_rank} aces={player.Aces} winner={player.Result} round={player.round} />
			);

			console.log(playerRoundDivs);


			this.setState({
				players: playerRoundDivs
			});

		}); 
	  }

	render() {

		return (
			<div className="Recommendations">
				<PageNavbar active="recommendations" />

			    <div className="container recommendations-container">
			    	<div className="jumbotron">
			    		<div className="h5">Tournament Result</div>
			    		<br></br>
			    		<div className="input-container">
							<select value={this.state.tournament} onChange={this.handleTournamentChange} className="dropdown" id="tournamentDropdown">
								<option select value> -- Select a Tournament -- </option>
									<option value="Australian Open">Australian Open</option>     
									<option value="Wimbledon">Wimbledon</option>     
									<option value="French Open">French Open</option>     
									<option value="US Open">Open Open</option>     
								</select>

							<select value={this.state.year} onChange={this.handleYearChange} className="dropdown" id="yearDropdown">
								<option select value> -- Select a Year -- </option>
								{this.state.years}
							</select>
							
                            <button id="submitMovieBtn" className="submit-btn" onClick={this.submit}>Submit</button>

							<select value={this.state.selectedRound} onChange={this.handleChange} className="dropdown" id="roundDropdown">
							<option select value> -- Select a Round -- </option>
								{this.state.rounds}
							</select>
							
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
			    </div>
		    </div>
		);
	}
}