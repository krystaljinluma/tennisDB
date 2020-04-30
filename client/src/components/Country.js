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
			decades: [],
			genres: [],
			genereSelectList: []
		};

		this.submitDecade = this.submitDecade.bind(this);
		this.submitGenre = this.submitGenre.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleChange2 = this.handleChange2.bind(this);
	}

	/* ---- Q3a (Best Genres) ---- */
	componentDidMount() {
		fetch("http://localhost:8081/decades",
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
		  <option key={i} value={eachdecade.decade}>
			  {eachdecade.decade}
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

	handleChange(e) {
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
		var selected = this.state.selectedDecade;
		var selected2 = this.state.selectedGenre;
		fetch(`http://localhost:8081/decades/${selected}/${selected2}`,
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
			<Head2headRow genre={eachGenre.genre} 
			avg_rating = {eachGenre.avg_rating} />
			);
			this.setState({
				genres: genrelist
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
		fetch(`http://localhost:8081/decades/${selected}`,
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
		  let genrelist = bestGenre.map((eachGenre,i)=>
		  <Head2headRow genre={eachGenre.genre} 
		  avg_rating = {eachGenre.avg_rating} />
		  );

		  let newOptionList = bestGenre.map((eachGenre, j) =>
		  <option key={j} value={eachGenre.genre}>
			  {eachGenre.genre}
		  </option>
		   );
		   newOptionList.push(<option key='unique' value='Big Three'>Big Three</option>);
	
		  console.log(genrelist);
		   this.setState({
			genres: genrelist
		  });
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
				<PageNavbar active="Head2head" />
				<div className="container bestgenres-container">
			      <div className="jumbotron">
			        <div className="h5">Best Genres: This is Country</div>
					<PageNavbar2 active="Country" />
			        <div className="years-container">
			          <div className="dropdown-container">
			            <select value={this.state.selectedDecade} onChange={this.submitDecade} className="dropdown" id="decadesDropdown">
						<option key={-1} value={"null_value"}>
		  				</option>
							{this.state.decades}
			            </select>
						<select value={this.state.selectedGenre} onChange={this.handleChange2} className="dropdown" id="decadesDropdown2">
						<option key={-1} value={"null_value"}>
							Please Select Another Player!
		  				</option>
						  {this.state.genereSelectList}
			            </select>
						<button className="submit-btn" id="genreSubmitBtn" onClick={this.submitGenre}>Submit</button>
					  </div>
			        </div>
			      </div>
			      <div className="jumbotron">
			        <div className="movies-container">
			          <div className="movie">
			            <div className="header"><strong>Genre</strong></div>
			            <div className="header"><strong>Average Rating</strong></div>
			          </div>
			          <div className="movies-container" id="results">
			            {this.state.genres}
			          </div>
			        </div>
			      </div>
			    </div>
			</div>
		);
	}
}