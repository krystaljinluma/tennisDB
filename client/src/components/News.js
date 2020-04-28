import React from 'react';
import { Row, Col, Container, Image } from 'react-bootstrap'

const News = (props) => {
    const {url, title, description, source, urlToImage} = props;
	return (
    <div style={{marginBottom: "1em"}}>
        <div class="card" style={{paddingTop: "1em"}}>
          <Image fluid src={urlToImage} style={{marginTop: "0.3em", maxWidth: "80%", marginLeft: "auto", marginRight: "auto"}}/>
            <div class="card-body">
              <h5 class="card-title" style={{fontSize: "1.1em"}}>{title}</h5>
              <h4 class="card-subtitle" style={{fontSize: ".9em", marginBottom: "8px"}}>Source: {source.name}</h4>

              <p class="card-text" style={{fontSize: ".8em"}}>{description}</p>
              <a href={url} class="stretched-link"></a>

            </div>
        </div>
      </div>
	);
	
}

export default News