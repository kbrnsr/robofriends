import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import Searchbox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';

const App = () => {
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState(
    ''
  );
  useEffect(() => {
    fetch(
      'https://jsonplaceholder.typicode.com/users'
    )
      .then((response) => response.json())
      .then((users) => setRobots(users));
  }, []);

  const onChangeSearch = (event) => {
    setSearchfield(event.target.value);
  };

  const filteredRobots = robots.filter((robot) => {
    return robot.name
      .toLowerCase()
      .includes(searchfield.toLowerCase());
  });
  return !robots.length ? (
    <div className="tc">
      <h1 className="f1">Loading</h1>
    </div>
  ) : (
    <div className="tc">
      <h1 className="f1">RoboFriends</h1>
      <Searchbox searchChange={onChangeSearch} />
      <Scroll>
        <ErrorBoundry>
          <CardList robots={filteredRobots} />
        </ErrorBoundry>
      </Scroll>
    </div>
  );
};

export default App;
