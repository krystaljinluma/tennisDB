import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class BestGenreRow extends React.Component {
	constructor(props) {
		super(props);

		/* props looks like:
		{
			genre
			rating
		}
		*/
	}

	render() {
		return (
			<div className="movieResults">
				<div className="genre">{this.props.genre}</div>
				<div className="rating">{this.props.rating}</div>
			</div>
		);
	}
}
