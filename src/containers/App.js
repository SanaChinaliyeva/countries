import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid';
import './App.css';

class App extends Component {
    state = {
        countries: []
    }
  getCountriesList = () => {
      let countries = [...this.state.countries];
    axios.get().then(response => {
      return Promise.all(response.data.map(country => {
        countries.push(country.name);
          this.setState({countries});
      }));
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
            <div className="choicePanel">
                {
                    (this.state.countries).map (country => {
                        return <h2 key={uuid()}>{country}</h2>
                    })
                }
            </div>
      </div>
    );
  }
}

export default App;
