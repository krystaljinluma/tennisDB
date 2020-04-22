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
  bestGenresPerDecade: bestGenresPerDecade
}