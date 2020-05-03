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


/* ---- (Players) ---- */
app.get('/players/:player', routes.getPlayers);


/* ---- (GSWins) ---- */
app.get('/gswins/:id', routes.getGSWinsAndRank);

/* ---- (GSInfo) ---- */
app.get('/gsinfo/:id', routes.getGSInfo);

/* ---- (GSInfo) ---- */
app.get('/olympicinfo/:name', routes.getOlympicInfo);

/* ---- (Tournament Breakdown) ---- */
app.get('/tbd/:id/:tournament/:year', routes.getTournamentBreakdown);

/* ---- (Matches) ---- */

app.get('/rounds/:tournament/:year', routes.getRounds)

/* ---- (Specific Tournament stats) ---- */
app.get('/tournament/:tournament/:year', routes.getMatchStats)

app.get('/years/:tournament', routes.getYearsOfTournament)

app.get('/tournament/:tournament/:year/:round', routes.getRoundStats)


/* ---- (Specific Player stats) ---- */
app.get('/playerstats/:tournament/:year/:player', routes.getPlayerStats)

app.get('/summarizeStats/:tournament/:year/:player', routes.summarizeStats)

app.get('/eliminatedBy/:tournament/:year/:player', routes.getEliminatedBy)


/* ---- (Top10 Player Matches) ---- */

/* ---- (Top10 Player Matches) ---- */
app.get('/summarizetournament/:tournament/:year', routes.summarizeStats)

app.get('/tournamentMatch/:tournament/:year/:round/:player', routes.getTournamentMatch)

app.get('/players2/:p1/:p2', routes.h2hBetweenPlayers);

app.get('/players2/:letter', routes.playersSerach);

app.get('/spePlayer/:player', routes.playersSerachOpp);

app.get('/match/:match_id', routes.getMatchDetails);

app.get('/country/:player', routes.getCountryList);

app.get('/countries/:player/:country',routes.getCountryAgainestPlayer)

app.get('/bigThree/:player',routes.geth2hBigThree)





app.listen(8081, () => {
	console.log(`Server listening on PORT 8081`);
});