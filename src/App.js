import React, {Component} from 'react';
import CardList from './CardList';
import Searchbox from './SearchBox';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: ""
    }
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(users => this.setState( {robots: users} ));
  }

  onChangeSearch = (event) => {
    this.setState( {searchfield: event.target.value} );
  }

  render() {
    const filteredRobots = this.state.robots.filter(robot => {
      return robot.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
    });
    if (this.state.robots.length === 0) {
      return (
        <div className="tc">
          <h1 className="f1">Loading</h1>
        </div>
      );
    } else {
      return (
        <div className="tc">
          <h1 className="f1">RoboFriends</h1>
          <Searchbox searchChange={ this.onChangeSearch } />
          <CardList robots={ filteredRobots }/>
        </div>
      );
    }
  }
}

export default App;