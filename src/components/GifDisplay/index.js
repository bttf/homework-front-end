import React, { Component } from 'react';
import './styles.css';

class GifDisplay extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isLoading: true,
      image: null,
      imageURL: this.getImageURL(props.gif),
    };

    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    this.waitForLoading(this.state.imageURL);
  }

  componentWillReceiveProps(nextProps) {
    const imageURL = this.getImageURL(nextProps.gif);
    this.setState({ imageURL });
    this.waitForLoading(imageURL);
  }

  componentWillUnmount() {
    const image = this.state.image;
    image.onload = null;
  }

  waitForLoading(imageURL) {
    const image = new Image();
    this.setState({ isLoading: true, image });
    image.onload = () => { this.setState({ isLoading: false }) };
    image.src = this.state.imageURL;
  }

  getImageURL(gif) {
    return gif.images.downsized_medium.url;
  }

  clickHandler() {
    this.props.selectGif(this.props.gif);
  }

  render() {
    const style = {
      backgroundImage: `url(${this.state.imageURL})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };

    return (
      <div className="gif-display" style={style} onClick={this.clickHandler}>
        {this.state.isLoading && <div className="loading">Loading...</div>}
      </div>
    );
  }
}

export default GifDisplay;
