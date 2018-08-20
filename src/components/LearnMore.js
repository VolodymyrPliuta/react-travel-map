import React, { Component } from 'react';

let unsplashStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '90%',
  margin: 'auto'
}

let imageWidth = '90%';

if(window.screen.width > 1024) {
  imageWidth = '80%'
}


class LearnMore extends Component {
	state = {
		imgs: [],
		articles: []
	}

  componentDidMount() {
		const query = window.location.search.split('=')[1]
    fetch(`https://api.unsplash.com/search/photos?page=1&query=${query}`,{
      headers: {
        Authorization: 'Client-ID ed4ea3b388f4503fa9a5817e2e5250171fd92b3b61ff520ff9f6027cff251a67'
      }
    }).then(response => {
      return response.json();
    }).then(data => {
      this.setState({
        imgs: data.results
      });
    }).catch(err => {
      console.log('Error happened during fetching!', err);
    });

    fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=0fd16f9ca25b4e0ea140b5e5aa1aa085` ,{
    }).then(response => {
      return response.json();
    }).then(data => {
      this.addArticle(data)
    });
  }

  addArticle = (data) => {
    const articles = [];
    data.response.docs.map((article) => {
      articles.push(<li key={article._id}><h2><a href={article.web_url}>{article.snippet}</a></h2></li>)
    })
    this.setState({
      articles: articles
    });
  }

  render() {
		console.log(this.props)
    if(this.state.imgs.articles === 0) {
      return <button>Learnmore</button>
    } else {
      return (
        <div style = {unsplashStyle}>
          {this.state.imgs.map((image) => {
            return <img style={{margin: '3px', width: imageWidth}} src={image.urls.regular} key={image.id}/>
          })}
          <ul>
          {this.state.articles}
          </ul>
        </div>
      )
    }
  }
}

export default LearnMore;
