import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor() {
    super()

    this.state = {
      username: '',
      password: '',
      error: '',
      loggedIn: ''
    }
  }

  login() {
    const { username, password } = this.state
    if (username && password) {
      axios.post('/api/login', { username: username.toLowerCase(), password: password }).then(res => {
        console.log(res.data)
        if (res.data.length !== 0) {
          this.setState({ error: res.data })
        } else {
          this.setState({ loggedIn: 'You logged in successfully!~~', error: '' })
        }
      })
    } else {
      this.setState({ error: 'Please fill in both fields' })
    }
  }

  register() {
    const { username, password } = this.state
    if (username && password) {
      axios.post('/api/register', { username: username.toLowerCase(), password: password }).then(res => {
        if (res.data.length !== 0) {
          console.log(res.data)
          this.setState({ error: res.data })
        } else {
          this.setState({ loggedIn: 'You are now registered and have logged in successfully!', error: '' })
          //this.props.history.push(/redirect URL)
        }
      })
    } else {
      this.setState({ error: 'Please fill in both fields' })
    }
  }

  render() {
    return (
      <div className="App">
        <h3>Username</h3>
        <input onChange={e => this.setState({ username: e.target.value })} />
        <h3>Password</h3>
        <input onChange={e => this.setState({ password: e.target.value })} />
        <br /><br />
        <button onClick={() => this.login()}>Login</button>
        <button onClick={() => this.register()}>Register</button>
        <br />
        <h4>{this.state.error}</h4>
        <h2>{this.state.loggedIn}</h2>

      </div>
    );
  }
}

export default App;
