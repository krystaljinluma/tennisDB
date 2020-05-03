import React from 'react';
import PageNavbar from './PageNavbar';
import PageNavbar2 from './PageNavbar2';
import Head2headRow from './Head2headRow';
import '../style/Head2head.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';


const customControlStyles =  {control: base => ({
	...base,
    width: "100%",
    cursor: "pointer"
})};

export default class Country extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedPlayer: "",
			selectedCountry: "",
			selectLetter:"",
			players: [],
			results: [],
			countryList: [],
			letterList : ["A","B","C","D","E","F","G","H","I",
			"J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
			optionLetterList : []
		};

		this.submitPlayer = this.submitPlayer.bind(this);
		this.submitPlayerAndCountry = this.submitPlayerAndCountry.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleChange2 = this.handleChange2.bind(this);
	}

	//generate the letter list when program is on load
	componentDidMount() {
		let listOfLetter = [];
		let newCandidateLetter = [];
		for(var j = 0;j<26;j++){
			listOfLetter.push(
			<option key={j} value={this.state.letterList[j]}>
				{this.state.letterList[j]}
			</option>);
			newCandidateLetter.push({value: this.state.letterList[j],label: this.state.letterList[j]});
		}
		this.setState({
			optionLetterList: newCandidateLetter
		  });
	
	}

	handleChange(e) {
		this.setState({
			selectLetter: e.value
		});
		var letter =  e.value;
		fetch(`http://localhost:8081/players2/${letter}`,
		{
		  method: 'GET' 
		}).then(res => {
		  return res.json();
		}, err => {
		  console.log(err);
		}).then(playerlist => {
		  if (!playerlist) return;
		  console.log(playerlist);
		  //adjust the HTML type to fix the value and label of "Select"
		  let newCandidatePlayer = [];
		  for (var i = 0;i<playerlist.length;i++){
		   newCandidatePlayer.push({value: playerlist[i].name,label: playerlist[i].name});
		  }
		  
		  //update the player list1
		  this.setState({
			players: newCandidatePlayer
		  });
		}, err => {
		  // Print the errors
		  console.log(err);
		});

	}

	//update selected country
	handleChange2(e) {
		console.log(e.value);
		this.setState({
			selectedCountry: e.value
		});
	}



	//submit selected player and country to get the historic matches 
	submitPlayerAndCountry(){
		this.setState({
			results: []
		  });
		var selected = this.state.selectedPlayer;
		var selected2 = this.state.selectedCountry;
		fetch(`http://localhost:8081/countries/${selected}/${selected2}`,
		{
		  method: 'GET' 
		}).then(res => {
		  return res.json();
		}, err => {
		  console.log(err);
		}).then(resultlists => {
			console.log(resultlists);
			var genrelist = [];
			//generate the result list 
			for (var i = 0;i<resultlists.length;i=i+2){
				genrelist.push(<Head2headRow tournament={resultlists[i].tournament} 
					name = {resultlists[i].name+"/"+resultlists[i+1].name} date = {resultlists[i].match_date.substring(0,10)} round = {resultlists[i].round} 
					match_id = {resultlists[i].match_id}/>);
			}
			var templist = [];
			//push the title and the result into tempList
			templist.push(
			<div className="matches-container">
			  <div className="matchTitle">
			  <div className="header"><strong>Date</strong></div>
				<div className="header"><strong>Tournament</strong></div>
				<div className="header"><strong>Round</strong></div>
				<div className="header"><strong>Winner/Loser</strong></div>
			  </div>
			  <div className="matches-container" id="results">
				{genrelist}
			  </div>
			</div>);
			//update the results to display them in the webpage
			this.setState({
				results: templist
			  });

		}, err => {
		  // Print the errors
		  console.log(err);
		});


	}

	//submit the name of the player to get all countries he faced in his career
	submitPlayer(e) {
		console.log(e.value);
		this.setState({
			selectedPlayer: e.value
		});
		var selected = e.value;
		console.log('current state is '+selected);
		fetch(`http://localhost:8081/country/${selected}`,
		{
		  method: 'GET'
		}).then(res => {
		  return res.json();
		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		}).then(countrylist => {
		//get the country list that player1 met before
		  console.log(countrylist);
		let newOptionList = [];
		for (var i = 0;i<countrylist.length;i++){
			newOptionList.push({value: countrylist[i].country,label: countrylist[i].country});
		}
	
		//update the country list 
		  this.setState({
			countryList: newOptionList
		  });

		}, err => {
		  // Print the errors
		  console.log(err);
		});
		
	}

	render() {

		return (
			<div className="H2H">
				<PageNavbar active="head2head" />
				<div className="container h2h-container">
			      <div className="jumbotron">
			        <div className="h5">Head-to-Head</div>
					<PageNavbar2 active="H2H between player and Country" />
			        <div className="player-match-container">
			          <div className="dropdown-container">
					  <div className = "Select_bar">
		
					  <Select className = "a" placeholder = "Please Select A Letter!" options = {this.state.optionLetterList} onChange={this.handleChange} styles = {customControlStyles}/>

					  <Select className = "b" placeholder = "Please Select A Player!" options = {this.state.players} onChange={this.submitPlayer} styles = {customControlStyles}/>

					  <Select className = "b" placeholder = "Please Select A Country Name!" options = {this.state.countryList} onChange={this.handleChange2} styles = {customControlStyles}/>
					  
					  <button className="submit-btn" id="h2hSubmitBtn" onClick={this.submitPlayerAndCountry}>Submit</button>
					   </div>


					  </div>
			        </div>
					{this.state.results}
			      </div>
			    </div>
			</div>
		);
	}
}