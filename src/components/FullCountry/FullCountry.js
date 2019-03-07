import React, {Component} from 'react';
import axios from 'axios';
import './FullCountry.css';

class FullCountry extends Component {
    state ={
        loadedCountry: null
    };
    isNeededToGetCountry = () => {
        return this.props.name && (!this.state.loadedCountry || (this.state.loadedCountry.name !== this.props.name));
    };
    componentDidUpdate () {
        const BASE_URL = 'https://restcountries.eu/rest/v2/name/';
        if (this.isNeededToGetCountry()) {
            axios.get (BASE_URL + this.props.name)
                .then (response => {
                    this.setState ({loadedCountry: response.data[0]});
                });
        }
    }
    render () {
        if (this.state.loadedCountry) {
            return (
                <div className="FullCountry">
                    <div>
                    <h1 className="FullCountry_name">{this.state.loadedCountry.name}</h1>
                        <p className="FullCountry_Desc"><b>Capital: </b>{this.state.loadedCountry.capital}</p>
                        <p className="FullCountry_Desc"><b>Population: </b> {this.state.loadedCountry.population}</p>
                        <p className="FullCountry_Desc"><b>Alternative: </b> {this.state.loadedCountry.altSpellings.join(", ")}</p>
                    </div>
                    <img src={this.state.loadedCountry.flag} alt="Flag" />
                </div>
            );
        }
        return <p>Choose country</p>
    }
}

export default FullCountry;