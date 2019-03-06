import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  getCountriesList = () => {
    axios.get().then(response => {
      return Promise.all(response.data.map(country => {
        console.log(country.name);
        return country.name;
      }));
    }).then(posts => {
      this.setState({posts});
    }).catch(error => {
      console.log(error);
    });
  };
  componentDidMount () {
    this.getCountriesList();
  }

  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
