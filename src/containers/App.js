import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid';
import './App.css';

import FullCountry from '../components/FullCountry/FullCountry';

class App extends Component {
    state = {
        countries: [],
        selectedCountry: null
    }
  getCountriesList = () => {
      let countries = [...this.state.countries];
    axios.get().then(response => {
      return Promise.all(response.data.map(country => {
        countries.push(country.name);
          this.setState({countries});
          return country;
      }));
    }).catch(error => {
      console.log(error);
    });
  };
  componentDidMount () {
    this.getCountriesList();
  }

  handleClick = (country) => {
      console.log(country);
      this.setState({selectedCountry: country})
  };

  render() {
    return (
      <div className="App">
            <div className="choicePanel">
                {
                    (this.state.countries).map (country => {
                        return <h2 onClick={() => this.handleClick(country)} className="countryName" key={uuid()}>{country}</h2>
                    })
                }
            </div>
          <FullCountry name={this.state.selectedCountry} />
      </div>
    );
  }
}

export default App;
