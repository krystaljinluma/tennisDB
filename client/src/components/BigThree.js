import React from 'react';
import PageNavbar from './PageNavbar';
import Head2headRow from './Head2headRow';
import PageNavbar2 from './PageNavbar2';
import '../style/Head2head.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BestGenre extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedDecade: "",
			decades: [],
			genres: []
		};

		this.submitDecade = this.submitDecade.bind(this);
		this.handleChange = this.handleChange.bind(this);
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
		this.setState({
			selectedDecade: e.target.value
		});
	}

	/* ---- Q3b (Best Genres) ---- */
	submitDecade() {
		console.log(this.state.selectedDecade);
		var selected = this.state.selectedDecade;
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
		  avg_rating = {eachGenre.avg_rating} />);
	
		  console.log(genrelist);
		   this.setState({
			genres: genrelist
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
			        <div className="h5">Best Genres</div>
					<PageNavbar2 active="bigThree" />
			        <div className="years-container">
			          <div className="dropdown-container">
			            <select value={this.state.selectedDecade} onChange={this.handleChange} className="dropdown" id="decadesDropdown">
						<option key={-1} value={"null_value"}>
		  				</option>
							{this.state.decades}
			            </select>
			            <button className="submit-btn" id="decadesSubmitBtn" onClick={this.submitDecade}>Submit</button>
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