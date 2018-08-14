import React, { Component } from 'react';

class LearnMore extends Component {
  state = {
    imgs: [],
    articles: []
  }

  componentDidMount() {
    fetch(`https://api.unsplash.com/search/photos?page=1&query='dm'`,{
      headers: {
        Authorization: 'Client-ID ed4ea3b388f4503fa9a5817e2e5250171fd92b3b61ff520ff9f6027cff251a67'
      }
    }).then(response => {
      var result = response.json();
      return result;
    }).then(data => {
      this.setState({ imgs: data.results });
    }).catch(err => {
      console.log('Error happened during fetching!', err);
    });

    fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=New+York&api-key=0fd16f9ca25b4e0ea140b5e5aa1aa085` ,{
    }).then(response => {
      var result = response.json();
      return result;
    }).then(data => this.addArticle(data));
  }

  addArticle = (data) => {
    let htmlContent = '';
    const articles = data.response.docs;
    this.setState({
      articles: articles
    });
  }
  render() {
    console.log(this.state)
    if(this.state.imgs.articles === 0) {
      return (<button>Learnmore</button>)
    } else {
      return (
        <div>
          {this.state.imgs.map((image) => <img src={image.urls.small} key={image.id}/>)}
          <ul>
          {this.state.articles.map((article) =>
            <li><h2><a href={article.web_url}>{article.snippet}</a></h2></li>
          )}
          </ul>
        </div>
      )
    }
  }
}

export default LearnMore;
