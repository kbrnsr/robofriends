import React, {Component} from 'react';
import CardList from '../components/CardList';
import Searchbox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
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
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });
    return !robots.length ?
      (
      <div className="tc">
        <h1 className="f1">Loading</h1>
      </div>
      ):
      (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <Searchbox searchChange={ this.onChangeSearch } />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={ filteredRobots }/>
          </ErrorBoundry>
        </Scroll>
      </div>
      )
  }
}

export default App;