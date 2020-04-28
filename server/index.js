const bodyParser = require('body-parser');
const express = require('express');
var routes = require("./routes.js");
const cors = require('cors');

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/* ---------------------------------------------------------------- */
/* ------------------- Route handler registration ----------------- */
/* ---------------------------------------------------------------- */




/* ---- (Dashboard) ---- */
// The route localhost:8081/genres is registered to the function
// routes.getAllGenres, specified in routes.js.
app.get('/genres', routes.getAllGenres);


/* ---- Q1b (Dashboard) ---- */
app.get('/genres/:genre', routes.getTopInGenre); // Hint: Replace () => {} with the appropriate route handler.



/* ---- (Players) ---- */
app.get('/players/:player', routes.getPlayers);


/* ---- (GSWins) ---- */
app.get('/gswins/:id', routes.getGSWins);

/* ---- (GSInfo) ---- */
app.get('/gsinfo/:id', routes.getGSInfo);

/* ---- (GSInfo) ---- */
app.get('/olympicinfo/:name', routes.getOlympicInfo);


/* ---- (Matches) ---- */

app.get('/rounds/:tournament/:year', routes.getRounds)

/* ---- (Specific Tournament stats) ---- */
app.get('/tournament/:tournament/:year', routes.getMatchStats)

app.get('/years/:tournament', routes.getYearsOfTournament)
app.get('/tournament/:tournament/:year/:round', routes.getRoundStats)



/* ---- (Specific Player stats) ---- */
app.get('/playerstats/:tournament/:year/:player', routes.getPlayerStats)

/* ---- (Top10 Player Matches) ---- */
app.get('/topten', routes.getTopTen)

/* ---- (Top10 Player Matches) ---- */
app.get('/summarizetournament/:tournament/:year', routes.summarizeStats)


/* ---- (Best Genre) ---- */
app.get('/decades', routes.getDecades);



/* ---- Q3b (Best Genre) ---- */
app.get('/decades/:decade', routes.bestGenresPerDecade);



app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});