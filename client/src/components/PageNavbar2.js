import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/PageNavbar2.css';

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
                    return <li><a className="nav-item nav-link active" key={i} href={"/Head2head"}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a></li>
                }
                else if(i==1){
                    return <li><a className="nav-item nav-link active" key={i} href={"/Country"}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a></li>
                }
                else{
                    return <li><a className="nav-item nav-link active" key={i} href={"/bigThree"}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a></li>
                }
			}
			else {
				if(i==0){
                    return <li><a className="nav-item nav-link" key={i} href={"/Head2head"}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a></li>
                }
                else if(i==1){
                    return <li><a className="nav-item nav-link" key={i} href={"/Country"}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a></li>
                }
                else{
                    return <li><a className="nav-item nav-link" key={i} href={"/bigThree"}>{page.charAt(0).toUpperCase() + page.substring(1, page.length)}</a></li>
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
				  <img style={{width: "1.7em", marginRight: ".5em"}} src={'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/95743670_2556723301258242_8166102288608264192_n.jpg?_nc_cat=102&_nc_sid=8024bb&_nc_ohc=cZZ3MtCn8OgAX_rQabo&_nc_ht=scontent-lga3-1.xx&oh=c90a7b6a9e4afec5db60c278b5ed4211&oe=5ED382CD'}/>
					<div className="navbar-nav">
					<ul>
			        {this.state.navDivs}
					</ul>
			        </div>
			      </div>
			    </nav>
			</div>
        );
	}
}