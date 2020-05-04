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

export default class Head2head extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedPlayer1: "",
			selectedPlayer2:"",
			selectLetter:"",
			playerlist: [],
			results: [],
			player2List: [],
			letterList : ["A","B","C","D","E","F","G","H","I",
			"J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
			optionLetterList : []
		};

		this.submitPlayer1 = this.submitPlayer1.bind(this);
		this.submit2Players = this.submit2Players.bind(this);
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
		console.log(e);
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
		}).then(playerlist1 => {
		  if (!playerlist1) return;
		  console.log(playerlist1);
		  //adjust the HTML type to fix the value and label of "Select"
		   let newCandidatePlayer = [];
		   for (var i = 0;i<playerlist1.length;i++){
			newCandidatePlayer.push({value: playerlist1[i].name,label: playerlist1[i].name});
		   }
		  
		//update the player list1
		  this.setState({
			playerlist: newCandidatePlayer
		  });
		}, err => {
		  // Print the errors
		  console.log(err);
		});

	}

	//update selected player2
	handleChange2(e) {
		console.log(e.value);
		this.setState({
			selectedPlayer2: e.value
		});
	}



	//submit 2 selected players to get the historic matches 
	submit2Players(){
		this.setState({
			results: []
		  });
		var selected = this.state.selectedPlayer1;
		var selected2 = this.state.selectedPlayer2;
		fetch(`http://localhost:8081/players2/${selected}/${selected2}`,
		{
		  method: 'GET' 
		}).then(res => {
		  return res.json();
		}, err => {

		  console.log(err);
		}).then(resultList => {
			console.log(resultList);
			//generate the result list 
			let genrelist = resultList.map((eachGenre,i)=>
			<Head2headRow tournament={eachGenre.tournament} 
			name = {eachGenre.name} date = {eachGenre.match_date.substring(0,10)} round = {eachGenre.round} 
			match_id = {eachGenre.match_id}/>
			);
			var tempList = [];
			//push the title and the result into tempList
			tempList.push(
			<div className="matches-container">
			  <div className="matchTitle">
			  <div className="header"><strong>Date</strong></div>
				<div className="header"><strong>Tournament</strong></div>
				<div className="header"><strong>Round</strong></div>
				<div className="header"><strong>Winner</strong></div>
			  </div>
			  <div className="matches-container" id="results">
				{genrelist}
			  </div>
			</div>);
			//update the results to display them in the webpage
			this.setState({
				results: tempList
			  });

		}, err => {
		  // Print the errors
		  console.log(err);
		});


	}

	//submit the name of player1 to get all opponments in his career
	submitPlayer1(e) {
		console.log(e.value);
		this.setState({
			selectedPlayer1: e.value
		});
		var selected =  e.value;
		console.log('current state is '+selected);
		fetch(`http://localhost:8081/spePlayer/${selected}`,
		{
		  method: 'GET'
		}).then(res => {
		  return res.json();
		}, err => {
		  console.log(err);
		}).then(playerlist2 => {
		  //get the player2 list that player1 met before
		  console.log(playerlist2);
		let newOptionList = [];
		for (var i = 0;i<playerlist2.length;i++){
			newOptionList.push({value: playerlist2[i].name,label: playerlist2[i].name});
		}

		//update the player2 list 
		  this.setState({
			player2List: newOptionList
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
				<div className="container h2hcontainer">
			      <div className="jumbotron">
			        <div className="h5">Head-to-Head</div>
					<PageNavbar2 active="H2H between players" />
			        <div className="player-match-container">
			          <div className="dropdown-container">

					  <div className = "Select_bar">
		
					  <Select className = "a" placeholder = "Please Select A Letter!" options = {this.state.optionLetterList} onChange={this.handleChange} styles = {customControlStyles}/>

					  <Select className = "b" placeholder = "Please Select A Player!" options = {this.state.playerlist} onChange={this.submitPlayer1} styles = {customControlStyles}/>

					  <Select className = "b" placeholder = "Please Select Another Player!" options = {this.state.player2List} onChange={this.handleChange2} styles = {customControlStyles}/>
					  
					  <button className="submit-btn" id="h2hSubmitBtn" onClick={this.submit2Players}>Submit</button>
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