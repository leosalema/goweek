import React, { Component } from 'react'
import './Login.css'
import Twitter from '../twitter.svg'

class Login extends Component {
    state = { username: ''}

    handleChange = event => {
        this.setState({ username: event.target.value })
    }

    handleSubmit = event => {
        event.preventDefault()

        const { username } = this.state

        if(!username.length) return

        localStorage.setItem('@GoTwitter:username', username)
        this.props.history.push('/timeline')
    }
    render() {
        return(
            <div className='login-wrapper'>
                <img src={Twitter} alt='Logo Twitter' />
                <form onSubmit={this.handleSubmit}>
                    <input
                        placeholder='Username'
                        onChange={this.handleChange}
                        value={this.state.username}
                    />
                    <button type='submit'>Entrar</button>
                </form>
            </div>
        )
    }
}

export default Login