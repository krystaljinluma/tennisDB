var config = require('./db-config.js');
var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

/* -------------------------------------------------- */
/* ------------------- Route Handlers --------------- */
/* -------------------------------------------------- */



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
function getGSWinsAndRank(req, res) {
  var id = req.params.id;

  var query = `
  WITH player_matches AS(
    SELECT *
	  FROM Stats
	  WHERE player_id = '${id}'
  ),
  player_matches2 AS(
	  SELECT _latin1 '${id}' AS player_id, COUNT(*) AS gs_wins
    FROM player_matches
    JOIN Matches USING(match_id)
    WHERE round = 'The Final' AND winner = 'T'
  )
  SELECT gs_wins, p_rank
  FROM player_matches p1 
  JOIN player_matches2 p2 ON p1.player_id = p2.player_id;;
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
  WITH player_matches AS(
    SELECT player_id, COUNT(*) AS wins
    FROM Stats
    WHERE player_id = '${id}'  
    GROUP BY winner  
    HAVING winner = 'T'
  ),
  player_matches2 AS(
    SELECT player_id, COUNT(*) AS losses
    FROM Stats
    WHERE player_id = '${id}'  
    GROUP BY winner  
    HAVING winner = 'F'
  )
  SELECT wins, losses
  FROM player_matches p1 
  JOIN player_matches2 p2 ON p1.player_id = p2.player_id;`;
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

  var query = `
    SELECT games, event_name, medal
    FROM Olympic
    WHERE player_name = '${name}' AND event_name LIKE 'Tennis M%';
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log("query success")
      res.json(rows);
    }
  });
};

function getMatchStats(req, res) {
  var tournament = req.params.tournament;
  var year = req.params.year;

  var query = 
  `SELECT P.Name, S.p_rank, S.Aces, CASE S.Winner
  WHEN 'T'
  THEN 'WIN'
  WHEN 'F'
  THEN 'LOSE' END AS Result, M.round
  FROM Stats S
  JOIN Matches M ON S.match_id = M.match_id
  JOIN Player P ON P.Player_id = S.Player_id
  WHERE Tournament = "${tournament}"
  AND YEAR(match_date) = ${year}
  ORDER BY M.round DESC`

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}


function getYearsOfTournament(req, res) {
  var tournament = req.params.tournament;

  var query =
  `SELECT DISTINCT YEAR(match_date) AS Year
  FROM Matches
  WHERE tournament = "${tournament}"
  ORDER BY YEAR(match_date) DESC`

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}
function getRounds(req, res) {
  var tournament = req.params.tournament;
  var year = req.params.year;

  var query = 
  `SELECT DISTINCT Round
  FROM Matches
  WHERE Tournament = "${tournament}"
  AND YEAR(match_date) = ${year}
  ORDER BY Round DESC
  `
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
}

function getRoundStats(req, res) {
  var tournament = req.params.tournament;
  var year = req.params.year;
  var round = req.params.round

  var query = 
  `SELECT P.Name, S.p_rank, S.Aces, CASE S.Winner
  WHEN 'T'
  THEN 'WIN'
  WHEN 'F'
  THEN 'LOSE' END AS Result, M.round
  FROM Stats S
  JOIN Matches M ON S.match_id = M.match_id
  JOIN Player P ON P.Player_id = S.Player_id
  WHERE Tournament = "${tournament}"
  AND YEAR(match_date) = ${year}
  AND M.round = "${round}"`

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      res.json(rows);
    }
  });
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


function playersSerachOpp(req, res) {
  var specific_player = req.params.player;
  var players = `
  SELECT DISTINCT name FROM 
(SELECT DISTINCT p.name, s.match_id FROM Player p 
JOIN Stats s ON p.player_id = s.player_id)a 
WHERE a.match_id IN 
(SELECT DISTINCT match_id FROM Stats WHERE player_id IN 
(SELECT player_id FROM Player WHERE name = '${specific_player}') ) 
AND name <> '${specific_player}' ORDER BY name;
`;
connection.query(players, function(err, rows, fields) {
  if (err) console.log(err);
  else {
    res.json(rows);
  }
});

};

function playersSerach(req, res) {;
  var letter = req.params.letter;
  var players = `
  SELECT name FROM Player WHERE
 birthday >= '1980-01-01' AND name LIKE '${letter}%' ORDER BY name;
`;
connection.query(players, function(err, rows, fields) {
  if (err) console.log(err);
  else {
    res.json(rows);
  }
});

};

function getMatchDetails(req, res) {
  var match_id = req.params.match_id;
  var select_query = `
  SELECT * FROM Stats WHERE match_id = '${match_id}' ORDER BY winner;
`;
connection.query(select_query, function(err, rows, fields) {
  if (err) console.log(err);
  else {
    res.json(rows);
  }
});

};

function h2hBetweenPlayers(req, res) {
  var specific_player1 = req.params.p1;
  var specific_player2 = req.params.p2;
  var select_query = `
SELECT m.tournament,m.round, m.match_date, p3.name, s3.match_id FROM Stats s3 JOIN Player p3 ON p3.player_id = s3.player_id 
JOIN Matches m ON m.match_id = s3.match_id
WHERE s3.match_id IN (
SELECT DISTINCT s.match_id FROM Player p 
JOIN Stats s ON p.player_id = s.player_id
WHERE p.name = "${specific_player1}") AND s3.match_id IN (SELECT DISTINCT s2.match_id FROM Player p2 
JOIN Stats s2 ON p2.player_id = s2.player_id
WHERE p2.name = "${specific_player2}") AND s3.winner = "T" ORDER BY match_date;
`;
connection.query(select_query, function(err, rows, fields) {
  if (err) console.log(err);
  else {
    res.json(rows);
  }
});

};

function getCountryList(req, res) {
  var specific_player = req.params.player;
  var countries = `
  WITH differentMatch AS(SELECT DISTINCT match_id FROM Stats 
    WHERE player_id IN (SELECT player_id FROM Player 
    WHERE name = '${specific_player}'))
    SELECT DISTINCT country FROM Player p JOIN Stats s
    ON p.player_id=s.player_id 
    JOIN differentMatch d ON d.match_id = s.match_id WHERE name<>'${specific_player}' ORDER BY country;
`;
connection.query(countries, function(err, rows, fields) {
  if (err) console.log(err);
  else {
    res.json(rows);
  }
});


};

function getCountryAgainestPlayer(req, res) {
  var specific_player = req.params.player;
  var specific_country = req.params.country;
  var select_query = `
  WITH differentMatch AS(SELECT DISTINCT match_id FROM Stats 
    WHERE player_id IN (SELECT player_id FROM Player 
    WHERE name = '${specific_player}')),
country_matches AS(
    SELECT DISTINCT s.match_id FROM Stats s JOIN Player p 
ON p.player_id = s.player_id WHERE p.country = '${specific_country}' 
AND p.name<>'${specific_player}')
SELECT p.name,s.winner,s.match_id,m.match_date,m.tournament,m.round FROM Stats s 
JOIN differentMatch d ON s.match_id=d.match_id
JOIN country_matches c ON s.match_id=c.match_id
JOIN Player p ON s.player_id = p.player_id 
JOIN Matches m ON s.match_id = m.match_id
ORDER BY s.match_id DESC, s.winner DESC;
`;
connection.query(select_query, function(err, rows, fields) {
  if (err) console.log(err);
  else {
    res.json(rows);
  }
});

};

function geth2hBigThree(req, res) {
  var specific_player = req.params.player;
  var select_query = `
  WITH differentMatch AS(SELECT DISTINCT match_id FROM Stats 
    WHERE player_id IN (SELECT player_id FROM Player 
    WHERE name = '${specific_player}')),
country_matches AS( SELECT DISTINCT match_id FROM(
    SELECT DISTINCT s.match_id, p.name FROM Stats s JOIN Player p 
ON p.player_id = s.player_id WHERE p.name = 'Roger Federer' 
OR p.name = 'Rafael Nadal' OR p.name = 'Novak Djokovic')temp
WHERE name<>'${specific_player}')
SELECT p.name,s.winner,s.match_id,m.match_date,m.tournament,m.round FROM Stats s 
JOIN differentMatch d ON s.match_id=d.match_id
JOIN country_matches c ON s.match_id=c.match_id
JOIN Player p ON s.player_id = p.player_id 
JOIN Matches m ON s.match_id = m.match_id
ORDER BY s.match_id DESC, s.winner DESC;
`;
connection.query(select_query, function(err, rows, fields) {
  if (err) console.log(err);
  else {
    res.json(rows);
  }
});

};


// The exported functions, which can be accessed in index.js.
module.exports = {
  getPlayers: getPlayers,
  getGSWinsAndRank: getGSWinsAndRank,
  getGSInfo: getGSInfo,
  getOlympicInfo: getOlympicInfo,
  getDecades: getDecades,
  getAllGenres: getAllGenres,
  getTopInGenre: getTopInGenre,
  bestGenresPerDecade: bestGenresPerDecade,
  getMatchStats: getMatchStats,
  getPlayerStats: getPlayerStats,
  getTopTen: getTopTen,
  summarizeStats: summarizeStats,
  getRounds: getRounds,
  getRoundStats: getRoundStats,
  getYearsOfTournament: getYearsOfTournament,
  playersSerachOpp: playersSerachOpp,
  playersSerach: playersSerach,
  getMatchDetails: getMatchDetails,
  h2hBetweenPlayers: h2hBetweenPlayers,
  getCountryList:getCountryList,
  getCountryAgainestPlayer:getCountryAgainestPlayer,
  geth2hBigThree:geth2hBigThree
}