import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Image} from 'react-bootstrap'

export default class PageNavbar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			navDivs: []
		}
	}

	componentDidMount() {
		const pageList = ['Dashboard', 'players', 'matches', 'head2head'];

		let navbarDivs = pageList.map((page, i) => {
			if (this.props.active === page) {
				return <a className="nav-item nav-link active" key={i} href={"/" + page}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
			}
			else {
				return <a className="nav-item nav-link" key={i} href={"/" + page}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
			}
		})

		this.setState({
			navDivs: navbarDivs
		});
	}

	render() {
		return (
			<div className="PageNavbar">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<Image fluid style={{width: "1.7em", marginRight: ".5em"}} src={'https://clipartart.com/images/black-and-white-clipart-of-tennis-ball.png'} />

			      <a href={"/Dashboard"} className="nav-item nav-link active" className="navbar-brand center">Tennis DB</a>
			      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
			        <div className="navbar-nav">
			        {this.state.navDivs}
			        </div>
			      </div>
			    </nav>
			</div>
        );
	}
}