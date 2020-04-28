import React from 'react';
import '../style/Dashboard.css';
import PageNavbar from './PageNavbar';
import News from './News';
import RankTable from './RankTable';

import { Row, Col, Container, Image, Table } from 'react-bootstrap'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    // The state maintained by this React Component. This component maintains the list of genres,
    // and a list of movies for a specified genre.
    this.state = {
      news: [],
      centerpiece: "",
      centerpieceSource: "",
      bottompiece: "",
      bottompieceSource: "",
      ranked: []
    }

  }

  // React function that is called when the page load.
  componentDidMount() {
    // Send an HTTP request to the server.
    fetch('http://newsapi.org/v2/everything?' +
    'language=en&' +
    'q=tennis&' +
    'apiKey=e0b471a442354e0fb5413d50f1e7545f',
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(newsList => {
      if (!newsList) return;
      // Map each movieObj in movieList to an HTML element:

      let newsDivs = newsList.articles.slice(1, 4).map((article, i) => 
        
			<News url={article.url} source={article.source} title={article.title} description={article.description} urlToImage={article.urlToImage} content={article.content} />
      );

      this.setState({
        centerpiece: newsList.articles[0],
        centerpieceSource: newsList.articles[0].source.name,
        bottompiece: newsList.articles[4],
        bottompieceSource: newsList.articles[4].source.name,
        news: newsDivs
      });

    }, err => {
      // Print the error if there is one.
      console.log(err);
    });


    fetch('https://vbarbaresi.opendatasoft.com/api/records/1.0/search/?dataset=atp-rankings&sort=-current_rank&facet=current_rank&facet=player_country',
    {
      method: 'GET' // The type of HTTP request.
    }).then(res => {
      // Convert the response data to a JSON.
      return res.json();
    }, err => {
      // Print the error if there is one.
      console.log(err);
    }).then(rankList => {

      let rankDivs = rankList.records.map((player, i) => 
      
			<RankTable rank={player.fields.current_rank} name={player.fields.player_name} country={player.fields.player_country} />
      );

      this.setState({
        ranks: rankDivs
      })

    }, err => {
      // Print the error if there is one.
      console.log(err);
    });
  }

  render() {    
    return (
      <div className="Dashboard">

        <PageNavbar active="dashboard" />

        <br></br>
        <div className="container movies-container">
          <div className="jumbotron">
            <h5 style={{textAlign: "center", fontSize: "2em"}}>Live Tennis News Feed</h5>
              <Container className="news-container">
                <Row>
                  <Col md={7}>
                    <div class="card" style={{marginTop: "1em"}}>
                      <div class="card-body">
                        <Row>
                          <Image fluid src={this.state.centerpiece.urlToImage} style={{padding: "1em"}}/>
                        </Row>
                        <Row>
                          <Col class="main-article">
                            <h3 style={{fontSize: "1.5em"}}>{this.state.centerpiece.title}</h3>
                            <h5 class="card-subtitle" style={{fontSize: "1.2em", marginBottom: "8px", marginTop: "3px"}}>Source: {this.state.centerpieceSource}</h5>

                            <p class="card-text">{this.state.centerpiece.description}</p>
                          </Col>
                        </Row>
                        <a href={this.state.centerpiece.url} class="stretched-link"></a>
                      </div>
                    </div>
                  
                    <div class="card" style={{marginTop: "1em"}}>
                      <h5 class="card-header">{this.state.bottompiece.title}</h5>
                      <div class="card-body">
                        <Row>
                          <Col xs={6}>
                              <Image fluid src={this.state.bottompiece.urlToImage} />
                          </Col>
                          <Col xs={6}>
                              <h5 class="card-subtitle"  style={{fontSize: "1.2em", marginBottom: "8px", marginTop: "3px"}}>Source: {this.state.bottompieceSource}</h5>
                              <p class="card-text">{this.state.bottompiece.description}</p>
                          </Col>
                        </Row>
                        <a href={this.state.bottompiece.url} class="stretched-link"></a>
                      </div>
                    </div>
                    <br></br>
                    <h5 style={{marginBottom: "1em"}}><strong>Live Rankings</strong></h5>
                    <Table striped bordered hover >
                      <thead>
                        <tr>
                          <th>Rank</th>
                          <th>Name</th>
                          <th>Country</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.ranks}
                      </tbody>
                    </Table>
                  </Col>
                <Col style={{paddingTop: "1em"}}>
                  {this.state.news}
                </Col>
              </Row>
            </Container>
          </div>

        </div>
      </div>
    );
  }
}
