import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class PageNavbar2 extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			navDivs: []
		}
	}

	componentDidMount() {
		const pageList = ['H2H between players', 'H2H between player and Country', 'H2H between player and big three'];

		let navbarDivs = pageList.map((page, i) => {
            if (this.props.active === page) {
                if(i==0){
                    return <a className="nav-item nav-link active" key={i} href={"/Head2head"}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
                }
                else if(i==1){
                    return <a className="nav-item nav-link active" key={i} href={"/Country"}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
                }
                else{
                    return <a className="nav-item nav-link active" key={i} href={"/bigThree"}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
                }
			}
			else {
				if(i==0){
                    return <a className="nav-item nav-link" key={i} href={"/Head2head"}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
                }
                else if(i==1){
                    return <a className="nav-item nav-link" key={i} href={"/Country"}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
                }
                else{
                    return <a className="nav-item nav-link" key={i} href={"/bigThree"}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a>
                }
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