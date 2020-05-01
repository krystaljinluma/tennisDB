import React from 'react';
import PageNavbar from './PageNavbar';
import PageNavbar2 from './PageNavbar2';
import Head2headRow from './Head2headRow';
import '../style/Head2head.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BestGenre extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedDecade: "",
			selectGenre: "",
			selectLetter:"",
			decades: [],
			genres: [],
			genereSelectList: [],
			letterList : ["A","B","C","D","E","F","G","H","I",
			"J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
			optionLetterList : []
		};

		this.submitDecade = this.submitDecade.bind(this);
		this.submitGenre = this.submitGenre.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleChange2 = this.handleChange2.bind(this);
	}

	/* ---- Q3a (Best Genres) ---- */
	componentDidMount() {
		let listOfLetter = [];
		for(var j = 0;j<26;j++){
			listOfLetter.push(
			<option key={j} value={this.state.letterList[j]}>
				{this.state.letterList[j]}
			</option>);
		}
		this.setState({
			optionLetterList: listOfLetter
		  });
		
	
	}

	handleChange(e) {
		this.setState({
			selectLetter: e.target.value
		});
		var letter =  e.target.value;
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
		  <option key={i} value={eachdecade.name}>
			  {eachdecade.name}
		  </option>
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

	handleChange2(e) {
		console.log(e.target.value);
		this.setState({
			selectedGenre: e.target.value
		});
	}




	submitGenre(){
		//console.log(this.state.selectedDecade);
		//console.log(this.state.selectedGenre);
		this.setState({
			genres: []
		  });
		var selected = this.state.selectedDecade;
		var selected2 = this.state.selectedGenre;
		fetch(`http://localhost:8081/countries/${selected}/${selected2}`,
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
			let genrelist = bestGenre.map((eachGenre,i)=>
			
			<Head2headRow tournament={eachGenre.tournament} 
			name = {eachGenre.name+"("+eachGenre.winner+")"} date = {eachGenre.match_date.substring(0,10)} round = {eachGenre.round} 
			match_id = {eachGenre.match_id}/>
			);
			var templist = [];
			templist.push(
			<div className="movies-container">
			  <div className="movie">
			  <div className="header"><strong>date</strong></div>
				<div className="header"><strong>tournament</strong></div>
				<div className="header"><strong>round</strong></div>
				<div className="header"><strong>name(win or not)</strong></div>
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

	/* ---- Q3b (Best Genres) ---- */
	submitDecade(e) {
		console.log(e.target.value);
		this.setState({
			selectedDecade: e.target.value
		});
		var selected =  e.target.value;
		console.log('current state is '+selected);
		fetch(`http://localhost:8081/country/${selected}`,
		{
		  method: 'GET' // The type of HTTP request.
		}).then(res => {
		  // Convert the response data to a JSON.
		  return res.json();
		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		}).then(bestGenre => {
		  // Set the state of the genres list to the value returned by the HTTP response from the server.
		  // this.setState({
		  //   genres: genreDivs
		  // });
		  //console.log(top10movie);
		  console.log(bestGenre);
		//   let genrelist = bestGenre.map((eachGenre,i)=>
		//   <BestGenreRow genre={eachGenre.genre} 
		//   avg_rating = {eachGenre.avg_rating} />
		//   );

		  let newOptionList = bestGenre.map((eachGenre, j) =>
		  <option key={j} value={eachGenre.country}>
			  {eachGenre.country}
		  </option>
		   );
	
		//   console.log(genrelist);
		//    this.setState({
		// 	genres: genrelist
		//   });
		  this.setState({
			genereSelectList: newOptionList
		  });

		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		});
		
	}

	render() {

		return (
			<div className="BestGenres">
				<PageNavbar active="head2head" />
				<div className="container bestgenres-container">
			      <div className="jumbotron">
			        <div className="h5">Player-Country Head-to-Head</div>
					<PageNavbar2 active="head2head" />
			        <div className="years-container">
			          <div className="dropdown-container">
					  {this.state.testMap}
					  <select value={this.state.selectLetter} onChange={this.handleChange} className="dropdown" id="decadesDropdown">
						<option key={-1} value={"null_value"}>
		  				</option>
							{this.state.optionLetterList}
			            </select>
			            <select value={this.state.selectedDecade} onChange={this.submitDecade} className="dropdown" id="decadesDropdown">
						<option key={-1} value={"null_value"}>
						Please select a player!
		  				</option>
							{this.state.decades}
			            </select>
						<select value={this.state.selectedGenre} onChange={this.handleChange2} className="dropdown" id="decadesDropdown2">
						<option key={-1} value={"null_value"}>
							Please select a country!
		  				</option>
						  {this.state.genereSelectList}
			            </select>
						<button className="submit-btn" id="genreSubmitBtn" onClick={this.submitGenre}>Submit</button>
					  </div>
			        </div>
					{this.state.genres}
			      </div>
			    </div>
			</div>
		);
	}
}