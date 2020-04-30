import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Dashboard from './Dashboard';
import Players from './Players';
import Matches from './Matches';
import Head2head from './Head2head';
import BigThree from './BigThree';
import Country from './Country';


export default class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={() => (
								<Dashboard />
							)}
						/>
						<Route
							exact
							path="/dashboard"
							render={() => (
								<Dashboard />
							)}
						/>
						<Route
							path="/players"
							render={() => (
								<Players />
							)}
						/>
						<Route
							path="/matches"
							render={() => (
								<Matches />
							)}
						/>
						<Route
							path="/Head2head"
							render={() => (
								<Head2head />
							)}
						/>
						<Route
							path="/bigThree"
							render={() => (
								<BigThree />
							)}
						/>
						<Route
							path="/Country"
							render={() => (
								<Country />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}