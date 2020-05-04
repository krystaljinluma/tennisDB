import React from 'react';
import PageNavbar from './PageNavbar';
import Head2headRow from './Head2headRow';
import PageNavbar2 from './PageNavbar2';
import '../style/Head2head.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';


const customControlStyles =  {control: base => ({
	...base,
    width: "100%",
    cursor: "pointer"
})};

export default class BigThree extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedPlayer: "",
			players: [],
			results: [],
			selectLetter:"",
			letterList : ["A","B","C","D","E","F","G","H","I",
			"J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
			optionLetterList : []
		};

		this.submitPlayer = this.submitPlayer.bind(this);
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
			selectedPlayer: e.value
		});
	}

	handleChange2(e){
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

	//submit the selected player to get his historic matchs with big three
	submitPlayer() {
		this.setState({
			results: []
		  });
		var selected = this.state.selectedPlayer;
		fetch(`http://localhost:8081/bigThree/${selected}`,
		{
		  method: 'GET' 
		}).then(res => {
		  return res.json();
		}, err => {
		  console.log(err);
		}).then(matchDetails => {
			console.log(matchDetails);
			//generate the result list 
			var genrelist = [];
			for (var i = 0;i<matchDetails.length;i=i+2){
				genrelist.push(<Head2headRow tournament={matchDetails[i].tournament} 
					name = {matchDetails[i].name+"/"+matchDetails[i+1].name} date = {matchDetails[i].match_date.substring(0,10)} round = {matchDetails[i].round} 
					match_id = {matchDetails[i].match_id}/>);
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

	render() {
		return (
			<div className="H2H">
				<PageNavbar active="Head2head" />
				<div className="container h2h-container">
			      <div className="jumbotron">
			        <div className="h5">Head-to-Head</div>
					<PageNavbar2 active="H2H between player and big three" />
			        <div className="player-match-container">
			          <div className="dropdown-container">
					  <div className = "Select_bar">
		                <Select className = "a" placeholder = "Please Select A Letter!" options = {this.state.optionLetterList} onChange={this.handleChange2} styles = {customControlStyles}/>
		                <Select className = "b" placeholder = "Please Select A Player!" options = {this.state.players} onChange={this.handleChange} styles = {customControlStyles}/>
		                 <button className="submit-btn" id="h2hSubmitBtn" onClick={this.submitPlayer}>Submit</button>
		               </div>
			          </div>
					  {this.state.results}
			        </div>
			      </div>
			    </div>
			</div>
		);
	}
}