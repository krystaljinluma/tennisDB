------- SQL DDL -------

CREATE TABLE Player(
	player_id VARCHAR(10),
	name VARCHAR(60),
	hand VARCHAR(1),
	country VARCHAR(3),
	birthday DATE,
	PRIMARY KEY (player_id)
);

CREATE TABLE Matches(
	match_id VARCHAR(15),
	round VARCHAR(15),
	match_date DATE,
	avg_minutes_game FLOAT,
	avg_seconds_point FLOAT,
	avg_minutes_set FLOAT,
	tournament VARCHAR(30),
	match_year INT,
	match_minutes INT,
	PRIMARY KEY (match_id)
);

CREATE TABLE Stats(
	match_id VARCHAR(15) NOT NULL,
	player_id VARCHAR(10) NOT NULL,
	pts INT,
	p_rank INT,
	winner VARCHAR(1),
	num_sets INT,
	set1 INT,
	set2 INT,
	set3 INT,
	set4 INT,
	set5 INT,
	avg_odds FLOAT,
	max_odds FLOAT,
	total_pts INT,
	service_pts INT,
	return_pts INT,
	aces INT,
	bp_saved INT,
	bp_faced INT,
	first_serve_rtn_won INT,
	second_serve_rtn_won INT,
	first_service_in INT,
	dbl_faults INT,
	first_serve_per FLOAT,
	FOREIGN KEY (match_id) REFERENCES Matches(match_id),
	FOREIGN KEY (player_id) REFERENCES Player(player_id)
);


CREATE TABLE Olympic(
	player_name VARCHAR(60),
	sex VARCHAR(1),
	age INT,
	team VARCHAR(60),
	noc VARCHAR(3),
	games VARCHAR(20),
	year INT,
	season VARCHAR(10),
	city VARCHAR(60),
	sport VARCHAR(250),
	event VARCHAR(250),
	medal VARCHAR(20),
	PRIMARY KEY (player_name, games, event)
);

----- Data ingestion -----
-- Csv files imported using MySQL Workbench's Data Import Wizard --

------- Data modification -------

ALTER TABLE Olympic
DROP sex, 
DROP age, 
DROP year, 
DROP season, 
DROP city,
DROP team,
DROP noc,
DROP sport;

ALTER TABLE Matches
DROP match_year;

------- Entity resolution -------
-- Entity resolution was performed manually (could not figure out a good way to do it with code).
-- Using Excel, filter Olympic to Male athletes who have Tennis as their sport. Then, 
-- open Player in another Excel window and manually search for each player in Olympic until all
-- players have been exhausted. It may be helpful to limit the rows in Player to only those with
-- the same country code as the current player in Olympic (sort the Olympic table on country code
-- to avoid having to sort Player repeatedly).


------- Functional dependencies ------

-- {match_id → round, match_date, avg_minutes_game, avg_seconds_point, avg_minutes_set, tournament, match_minutes}
-- {player_id → name, hand, country, birthday}
-- {match_id, player_id → pts, p_rank, winner, num_sets, set1, set2, set3, set4, set5, avg_odds, max_odds, total_pts, service_pts, return_pts, aces, bp_saved, bp_faced, first_serve_rtn_won, second_serve_rtn_won, first_service_in, dbl_faults, first_serve_per}
-- {player_name, game, event → medal}
