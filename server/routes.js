var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */


/* ---- Q1a (Dashboard) ---- */
function getAllGenres(req, res) {
  var query = `
    SELECT DISTINCT genre
    FROM Genres
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};


/* ---- Q1b (Dashboard) ---- */
function getTopInGenre(req, res) {
  var query = `
    SELECT title, rating, vote_count
    FROM Movies
    JOIN Genres ON id = movie_id
    WHERE genre = '${req.params.genre}'
    ORDER BY rating DESC, vote_count DESC
    LIMIT 10
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- (Players) ---- */
function getPlayers(req, res) {
  var name = req.params.player;

  var query = `
    SELECT *
    FROM Player
    WHERE name = '${name}'
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- (GS Tournament Wins) ---- */
function getGSWins(req, res) {
  var id = req.params.id;

  var query = `
    SELECT COUNT(*) AS gs_wins
    FROM (
      SELECT *
      FROM Stats
      WHERE player_id = '${id}'
    ) AS player_matches
    JOIN Matches USING(match_id)
    WHERE round = 'The Final' AND winner = 'T'
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- (GS Wins - Losses) ---- */
function getGSInfo(req, res) {
  var id = req.params.id;

  var query = `
  SELECT COUNT(*) AS wins, losses
  FROM (
    SELECT *
    FROM Stats
    WHERE player_id = '${id}'
  ) AS player_matches
  JOIN (
    (
      SELECT COUNT(*) as losses
      FROM (
      SELECT *
      FROM Stats
      WHERE player_id = '${id}'
    ) AS player_matches
      GROUP BY winner
    HAVING winner = 'F'
      ) AS lose
  )
  GROUP BY winner
  HAVING winner = 'T'
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

/* ---- (GS Wins - Losses) ---- */
function getOlympicInfo(req, res) {
  var name = req.params.name;
  // var data = []
  // data.push({ Games: '2004 Summer', Event: "Tennis Men's Doubles", Medal: "NA"})
  // data.push({ Games: '2008 Summer', Event: "Tennis Men's Singles", Medal: "Gold"})
  // data.push({ Games: '2008 Summer', Event: "Tennis Men's Doubles", Medal: "NA"})
  // data.push({ Games: '2016 Summer', Event: "Tennis Men's Singles", Medal: "NA"})
  // data.push({ Games: '2016 Summer', Event: "Tennis Men's Doubles", Medal: "Gold"})
  // res.json(data);

  var query = `
    SELECT game, event, medal
    FROM Olympic
    WHERE player_name = '${name}';
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

function getMatchStats(req, res) {
  var tournament = req.params.tournament;
  var year = req.params.year;
  var round = req.params.round;
  var data = []
  res.json(data);

// SELECT P.Name, S.Rank, S.Avg_odds, S.Aces, S.Winner
// FROM Match M
// JOIN Stats S ON S.Match_id = M.Match_id
// JOIN Player P ON P.Player_id = S.Player_id
// WHERE Tournament = ‘${tournamentName}$’
// AND Year = ‘${tournamentYear}$’
// AND Round = ‘${Round}$

}

function getPlayerStats(req, res) {
  var tournament = req.params.tournament;
  var year = req.params.year;
  var player = req.params.player;
  var data = []
  res.json(data);

  // WITH tournament AS {
  //   SELECT *
  //   FROM Match M
  //   JOIN Stats S ON M.match_id = S.match_id
  //   WHERE Tournament = ‘${tournamentName}’
  //   AND Year = ‘${Year}’
  //   }, player_matches AS {
  //   SELECT M.match_id, P.Name, P.Rank, T.Round
  //   FROM tournament T
  //   JOIN Stats S on S.match_id = M.match_id
  //   JOIN Player P on P.player_id = S.player_id
  //   WHERE P.Name = ‘${playerName}’
  //   }
    
  //   SELECT PM.Name, PM.Rank, PM.Round, S.Winner
  //   FROM player_matches PM 
  //   JOIN Stats S ON PM.match_id = S.match_id
  //   WHERE PM.Name != ‘${playerName}’

}

function getTopTen(req, res) {

//   SELECT P.Name, P.Rank, S.total_pts, M.tournament, M.year,
// FROM Match M
// JOIN Stats S ON M.match_id = S.match_id
// JOIN Player P ON P.player_id = S.player_id
// WHERE S.player_id IN (SELECT P.player_id
// 				FROM Player P
// 				JOIN Stats S ON P.player_id = S.player_id
// 				WHERE S.Rank <= 10)

}

function summarizeStats(req, res) {

//   WITH won AS (SELECT P.Name, Sum(S.pts) AS pts, SUM(S.Aces) AS Aces, COUNT(*) AS wins
// 			FROM Stats S
// 			JOIN Player P ON P.player_id = S.player_id
// 			JOIN Match M ON M.match_id = S.match_id
// 			WHERE S.Winner = TRUE
// 			AND M.tournament =  ‘${tournamentName}’
// 			AND M.Year = ‘${Year}’
// 	lost AS (SELECT P.Name, Sum(S.pts) AS pts, SUM(S.Aces) AS Aces, COUNT(*) AS losses
// 			FROM Stats S
// 			JOIN Player P ON P.player_id = S.player_id
// 			JOIN Match M ON M.match_id = S.match_id
// 			WHERE S.Winner = FALSE
// AND M.tournament =  ‘${tournamentName}’
// 			AND M.Year = ‘${Year}’
// 			GROUP BY P.Name

// SELECT P.Name, ((L.pts + S.pts) / (losses + wins)) AS average_points, ((L.Aces + S.Aces) / (losses + wins)) AS average_aces, W.wins, L.losses
// FROM Wins W
// JOIN lost L ON L.Name = W.Name

}

/* ---- (Best Genres) ---- */
function getDecades(req, res) {
	var query = `
    SELECT DISTINCT (FLOOR(year/10)*10) AS decade
    FROM (
      SELECT DISTINCT release_year as year
      FROM Movies
      ORDER BY release_year
    ) y
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

/* ---- Q3 (Best Genres) ---- */
function bestGenresPerDecade(req, res) {
  var decade = req.params.decade
  var query = `
  With decade_avg AS (
    SELECT FLOOR(release_year/10)*10 "decade", genre, AVG(rating) "avg_rating"
    FROM Movies
    JOIN Genres ON id = movie_id
    WHERE FLOOR(release_year/10)*10 = ${decade}
    GROUP BY FLOOR(release_year/10)*10, genre
    )
    SELECT DISTINCT genre, IFNULL(avg_rating, 0) AS avg_rating
    FROM Genres
    LEFT JOIN decade_avg USING(genre)
    ORDER BY avg_rating DESC, genre ASC;
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
};

// The exported functions, which can be accessed in index.js.
module.exports = {
  getPlayers: getPlayers,
  getGSWins: getGSWins,
  getGSInfo: getGSInfo,
  getOlympicInfo: getOlympicInfo,
	getAllGenres: getAllGenres,
	getTopInGenre: getTopInGenre,
	getDecades: getDecades,
  bestGenresPerDecade: bestGenresPerDecade,
  getMatchStats: getMatchStats,
  getPlayerStats: getPlayerStats,
  getTopTen: getTopTen,
  summarizeStats: summarizeStats
}