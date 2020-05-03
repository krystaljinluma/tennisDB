import React from 'react';
import PageNavbar from './PageNavbar';
import Head2headRow from './Head2headRow';
import PageNavbar2 from './PageNavbar2';
import '../style/Head2head.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import DropdownButton from 'react-bootstrap/DropdownButton'
import { Dropdown, Button, Row, Col, Container} from 'react-bootstrap';

export default class BigThree extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedDecade: "",
			decades: [],
			genres: [],
			selectLetter:"",
			letterList : ["A","B","C","D","E","F","G","H","I",
			"J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
			optionLetterList : []
		};

		this.submitDecade = this.submitDecade.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleChange2 = this.handleChange2.bind(this);
		}

	/* ---- Q3a (Best Genres) ---- */
	componentDidMount() {
		let listOfLetter = [];
		for(var j = 0;j<26;j++){
			listOfLetter.push(
				<Dropdown.Item onClick={this.handleChange2}>{this.state.letterList[j]}</Dropdown.Item>);
		}
		this.setState({
			optionLetterList: listOfLetter
		  });
		
	
	}

	handleChange(e) {
		this.setState({
			selectedDecade: e.target.textContent
		});
	}

	handleChange2(e){
		this.setState({
			selectLetter: e.target.textContent
		});
		var letter =  e.target.textContent;
		fetch(`http://localhost:8081/players2/${letter}`,
		{
		  method: 'GET' // The type of HTTP request.
		}).then(res => {
		  // Convert the response data to a JSON.
		  return res.json();
		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		}).then(decadelist => {
		  if (!decadelist) return;
		  console.log(decadelist);
		  // Map each genreObj in genreList to an HTML element:
		  // A button which triggers the showMovies function for each genre.
		  let decadeDivs = decadelist.map((eachdecade, i) =>
		  <Dropdown.Item onClick={this.handleChange}>{eachdecade.name}</Dropdown.Item>
		   );
		   console.log(decadeDivs);
		  
	
		  // Set the state of the genres list to the value returned by the HTTP response from the server.
		  this.setState({
			decades: decadeDivs
		  });
		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		});


	}

	/* ---- Q3b (Best Genres) ---- */
	submitDecade() {
		//console.log(this.state.selectedDecade);
		//console.log(this.state.selectedGenre);
		this.setState({
			genres: []
		  });
		var selected = this.state.selectedDecade;
		fetch(`http://localhost:8081/bigThree/${selected}`,
		{
		  method: 'GET' // The type of HTTP request.
		}).then(res => {
		  // Convert the response data to a JSON.
		  return res.json();
		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		}).then(bestGenre => {
			console.log(bestGenre);
			var genrelist = [];
			for (var i = 0;i<bestGenre.length;i=i+2){
				genrelist.push(<Head2headRow tournament={bestGenre[i].tournament} 
					name = {bestGenre[i].name+"/"+bestGenre[i+1].name} date = {bestGenre[i].match_date.substring(0,10)} round = {bestGenre[i].round} 
					match_id = {bestGenre[i].match_id}/>);
			}
			var templist = [];
			templist.push(
			<div className="movies-container">
			  <div className="movie">
			  <div className="header"><strong>date</strong></div>
				<div className="header"><strong>tournament</strong></div>
				<div className="header"><strong>round</strong></div>
				<div className="header"><strong>winner/loser</strong></div>
			  </div>
			  <div className="movies-container" id="results">
				{genrelist}
			  </div>
			</div>);
			this.setState({
				genres: templist
			  });

		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		});


		
	}

	render() {

		return (
			<div className="BestGenres">
				<PageNavbar active="Head2head" />
				<div className="container bestgenres-container">
			      <div className="jumbotron">
			        <div className="h5">Head-to-Head with Big Three</div>
					<PageNavbar2 active="H2H between player and big three" />
			        <div className="years-container">
			          <div className="dropdown-container">
					  <DropdownButton as={ButtonGroup} style={{marginRight: "1em"}}  title = "Select A Letter!" variant="secondary" id="letterDropdown">
								{this.state.optionLetterList}
					</DropdownButton>
					<DropdownButton as={ButtonGroup} style={{marginRight: "1em"}}  title = "Please select a player!" variant="secondary" id="play1Dropdown">
								{this.state.decades}
					</DropdownButton>
			            <button className="submit-btn" id="decadesSubmitBtn" onClick={this.submitDecade}>Submit</button>
			          </div>
					  {this.state.genres}
			        </div>
			      </div>
			    </div>
			</div>
		);
	}
}