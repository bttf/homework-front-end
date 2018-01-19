import React, { PureComponent } from 'react';
import './styles.scss';

class GifDisplay extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      isVisible: false,
      isLoading: true,
      image: null,
    };
  }

  componentDidMount() {
    this.waitForLoading(this.props.imageURL);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.imageURL !== this.props.imageURL) {
      this.waitForLoading(nextProps.imageURL);
    }
  }

  componentWillUnmount() {
    const image = this.state.image;
    image.onload = null;
  }

  waitForLoading(imageURL) {
    const image = new Image();
    this.setState({ isLoading: true, image });
    image.onload = () => { this.setState({ isLoading: false }) };
    image.src = this.props.imageURL;
  }

  render() {
    const style = {
      backgroundImage: `url(${this.props.imageURL})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };

    return (
      <div
        className="gif-display"
        style={style}
        onClick={this.props.selectGif}
      >
        {this.state.isLoading && <div className="loading">Loading...</div>}
      </div>
    );
  }
}

export default GifDisplay;
