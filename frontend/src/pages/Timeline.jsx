import React, {Component} from 'react';
import socket from 'socket.io-client';
import api from '../settings/api';
import './Timeline.css';
import Twitter from '../twitter.svg'

import Tweet from '../components/Tweet';

class Timeline extends Component {
  state = {
    tweets: [],
    newTweet: '',
  };

  async componentDidMount () {
    this.subscribeToEvents ();
    const response = await api.get ('/tweets');

    this.setState ({tweets: response.data});
  }

  handleChange = event => {
    this.setState ({...this.state, newTweet: event.target.value});
  };

  handleKeyDown = async event => {
    if (event.keyCode !== 13) return;

    const content = this.state.newTweet;
    const author = localStorage.getItem ('@GoTwitter:username');

    await api.post ('tweets', {content, author});

    this.setState ({...this.state, newTweet: ''});
  };

  subscribeToEvents = () => {
    const io = socket ('http://localhost:3000');

    io.on ('tweet', data => {
      this.setState ({tweets: [data, ...this.state.tweets]});
    });

    io.on ('like', data => {
      this.setState ({
        tweets: this.state.tweets.map (
          tweet => (tweet._id === data._id ? data : tweet)
        ),
      });
    });
  };

  render () {
    return (
      <div className="timeline-wrapper">
        <img src={Twitter} height={24} alt='Twitter'/>
        <form className="timeline-wrapper form">
          <textarea
            className="timeline-wrapper form textarea"
            onChange={this.handleChange}
            value={this.state.newTweet}
            onKeyDown={this.handleKeyDown}
          />
        </form>
        <ul className="tweet-list">
          {this.state.tweets.map (tweet => (
            <Tweet key={tweet._id} tweet={tweet} />
          ))}
        </ul>
      </div>
    );
  }
}

export default Timeline;
