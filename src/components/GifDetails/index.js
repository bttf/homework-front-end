import React, { PureComponent } from 'react';
import './styles.css';

export default class GifDetails extends PureComponent {
  render() {
    console.log('gif details', this.props.gif);
    return (
      <div className="gif-details-container">
        <div className="close" onClick={this.props.unselectGif}>
          ❌
        </div>
        <div className="gif-details">
          <div className="image">
            <img src={this.props.gif.images.downsized_medium.url} alt="" />
          </div>
          <div className="info">
            {this.props.gif.title || this.props.gif.slug}
          </div>
        </div>
      </div>
    );
  }
}
