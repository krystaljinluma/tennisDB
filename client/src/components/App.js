import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Dashboard from './Dashboard';
import Players from './Players';
import Matches from './Matches';
import BestGenres from './BestGenres';


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
							path="/head2head"
							render={() => (
								<BestGenres />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}