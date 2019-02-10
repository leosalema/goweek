import React, { Component } from 'react'
import api from '../settings/api'
import './Tweet.css'
import Likes from '../like.svg'

class Tweet extends Component {
    handleLike = async () => {
        const {_id} = this.props.tweet

        await api.post(`/likes/${_id}`)
    }

    render() {
        return(
            <li className='tweet'>
                <strong>{this.props.tweet.author}</strong>
                <p>{this.props.tweet.content}</p>
                <button type='button' onClick={this.handleLike}>
                    <img src={Likes} alt='Likes'/>
                    <p>{this.props.tweet.likes}</p>
                </button>
            </li>
        )
    }
}

export default Tweet