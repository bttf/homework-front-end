import React, { Component } from 'react';
import SearchBar from './components/SearchBar';
import GifDisplay from './components/GifDisplay';
import GifDetails from './components/GifDetails';
import { API_KEY } from './config';
import './App.scss';

class App extends Component {
  state = {
    gifs: [],
    currentQuery: null,
    selectedGif: null,
  }

  constructor(props) {
    super(props);

    this.searchGifs = this.searchGifs.bind(this);
    this.selectGif = this.selectGif.bind(this);
  }

  componentDidMount() {
    this.fetchTrendingGifs();
  }

  searchGifs(query = '') {
    this.setState({ currentQuery: query, gifs: [] });

    if (!query.length) {
      return this.fetchTrendingGifs();
    }

    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${query}`)
      .then(response => response.json())
      .then(json => this.setState({ gifs: json.data }));
  }

  fetchTrendingGifs() {
    return fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(json => this.setState({ gifs: json.data }));
      // .then(json => {
      //   this.setState({
      //     gifs: json.data,
      //     selectedGif: json.data[0],
      //   });
      // });
  }

  selectGif(gif) {
    this.setState({ selectedGif: gif });
    fetch(`https://api.giphy.com/v1/gifs/${gif.id}?api_key=${API_KEY}`)
      .then(response => response.json())
      .then(json => this.setState({ selectedGif: json.data }));
  }

  render() {
    return (
      <div className="application">
        <SearchBar search={this.searchGifs} />

        <h1>{this.state.currentQuery ? `Results for \'${this.state.currentQuery}\'` : 'What\'s Trending'}</h1>

        <div className="gifs">
          {this.state.gifs.map((gif, index) => (
            <GifDisplay
              key={index}
              index={index}
              imageURL={gif.images.downsized_medium.url}
              selectGif={this.selectGif.bind(this, gif)}
            />
          ))}
        </div>

        {this.state.selectedGif &&
            <GifDetails
              gif={this.state.selectedGif}
              unselectGif={gif => this.setState({
                selectedGif: null,
              })}
            />
        }
      </div>
    );
  }
}

export default App;
