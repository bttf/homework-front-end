import React, { PureComponent } from 'react';
import './styles.scss';

export default class GifDetails extends PureComponent {
  state = {
    isVisible: false,
  };

  miscDetails = [
    'slug',
    'url',
    'import_datetime',
  ];

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isVisible: true });
    }, 200);
  }

  render() {
    console.log('user', );

    return (
      <div className={`gif-details-container ${this.state.isVisible && ' visible'}`}>
        <div className="close" onClick={this.props.unselectGif}>
          ❌
        </div>
        <div className="gif-details">
          <div className="image">
            <img src={this.props.gif.images.downsized_medium.url} alt="giphy preview" />
          </div>
          <div className="info">
            <div className="details">
              {this.props.gif.user && this.props.gif.user.username &&
                  <div className="user">
                    <div className="label">User:</div>
                    <a href={this.props.gif.user.profile_url}>
                      {this.props.gif.user.avatar_url && <div className="avatar"><img src={this.props.gif.user.avatar_url} alt="avatar" /></div>}
                      <div className="username">
                        {this.props.gif.user.username}
                      </div>
                    </a>
                  </div>
              }
              {this.props.gif.rating &&
                  <div className="rating">
                    Rating: <span className="rating-value">{this.props.gif.rating}</span>
                  </div>
              }
            </div>
            <div className="misc-details">
              <h2>Misc. Details</h2>
              {Object.keys(this.props.gif)
                  .filter(key => this.miscDetails.includes(key))
                  .map((key, index) => (
                    <div key={index} className="detail">
                      <div className="key">{key}: </div>
                      <div className="value">
                        {key === 'url' ? <a href={this.props.gif[key]}>{this.props.gif[key]}</a> : this.props.gif[key].toString()}
                      </div>
                    </div>
                  ))
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
