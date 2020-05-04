import React from 'react';
import MapContainer  from './MapContainer';
//import 'bootstrap/dist/css/bootstrap.min.css';

export default class Head2headRow extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			details:[],
			map:[]
		}
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(e){
		console.log(this.props.tournament);
		let id_of_match = this.props.match_id;
		fetch(`http://localhost:8081/match/${id_of_match}`,
		{
		  method: 'GET' // The type of HTTP request.
		}).then(res => {
		  // Convert the response data to a JSON.
		  return res.json();
		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		}).then(matchdetails => {
			console.log(matchdetails);
			var templist = [];
		templist.push(<table className = "details">
		<tr>
		  <td>{matchdetails[1].set1}</td>
		  <td>Set1</td>
		  <td>{matchdetails[0].set1}</td>
		</tr>
		<tr>
		  <td>{matchdetails[1].set2}</td>
		  <td>Set2</td>
		  <td>{matchdetails[0].set2}</td>
		</tr>
		<tr>
		  <td>{matchdetails[1].set3}</td>
		  <td>Set3</td>
		  <td>{matchdetails[0].set3}</td>
		</tr>
		<tr>
		  <td>{matchdetails[1].set4}</td>
		  <td>Set4</td>
		  <td>{matchdetails[0].set4}</td>
		</tr>
		<tr>
		  <td>{matchdetails[1].set5}</td>
		  <td>Set5</td>
		  <td>{matchdetails[0].set5}</td>
		</tr>
		
	  </table>);
	  var t = this.props.tournament;
	  if(t=="Australian Open"){
	  	var testCenter =  {
			lat: -37.8197,
			lng: 144.9737
		  };
		  var testZoom = 10;
		  var testtest = [];
		  testtest.push(<MapContainer className = "maps" center = {testCenter} zoom = {testZoom} />);
		  this.setState({
			map: testtest
		  });
		}
		else if(t=="French Open"){
				var testCenter =  {
				  lat: 48.8417,
				  lng: 2.2412
				};
				var testZoom = 10;
				var testtest = [];
				testtest.push(<MapContainer className = "maps" center = {testCenter} zoom = {testZoom} />);
				this.setState({
				  map: testtest
				});
		}
			else if(t=="Wimbledon"){
				var testCenter =  {
				  lat: 51.4336,
				  lng: -0.2084
				};
				var testZoom = 10;
				var testtest = [];
				testtest.push(<MapContainer className = "maps" center = {testCenter} zoom = {testZoom} />);
				this.setState({
				  map: testtest
				});
		}
		else if(t=="US Open"){
			var testCenter =  {
			  lat: 40.7432,
			  lng: -73.8410
			};
			var testZoom = 10;
			var testtest = [];
			testtest.push(<MapContainer className = "maps" center = {testCenter} zoom = {testZoom} />);
			this.setState({
			  map: testtest
			});
	}
			this.setState({
				details: templist
			  });

		}, err => {
		  // Print the error if there is one.
		  console.log(err);
		});



	}

	render() {
		return (
			<div className = "eachRow">
			<div className="detailResults" onClick={this.handleChange}>
				<div className="h2hinfo">{this.props.date}</div>
				<div className="h2hinfo">{this.props.tournament}</div>
				<div className = "h2hinfo">{this.props.round}</div>
		        <div className = "h2hinfo">{this.props.name}</div>
			</div>
			<div className = "test">
			{this.state.details}
			{this.state.map}
			</div>
			</div>
		);
	}
}
