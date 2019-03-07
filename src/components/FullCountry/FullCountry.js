import React, {Component} from 'react';
import axios from 'axios';
import uuid from 'uuid';
import './FullCountry.css';

class FullCountry extends Component {
    state ={
        loadedCountry: null,
        borderNames: null,
        borderCodes: null
    };
    isNeededToGetCountry = () => {
        return this.props.name && (!this.state.loadedCountry || (this.state.loadedCountry.name !== this.props.name));
    };
    getCountryByName = () => {
        const BASE_URL = 'https://restcountries.eu/rest/v2/';
        if (this.isNeededToGetCountry()) {
            axios.get (BASE_URL + 'name/' + this.props.name).then (response => {
                const country = response.data[0];
                const borderCodes = country.borders;
                const borderNames = [];
                if (borderCodes) {
                    borderCodes.map (code => {
                        axios.get (BASE_URL + 'alpha/' + code).then (response => {
                            const border = response.data.name;
                            borderNames.push (border);
                            return borderNames;
                        }).then (borderNames => {
                            this.setState ({borderCodes: country.borders, borderNames});
                        }).catch (error => {
                            console.log (error);
                        });
                    });
                }
                this.setState ({loadedCountry: country, borderCodes: null, borderNames: null});
            }).catch(error => {
                console.log(error);
            });
        }
    };
    componentDidUpdate () {
        this.getCountryByName();
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
                        <p className="FullCountry_Desc"><b>Borders: </b></p>
                        <ul>
                            {
                                this.state.borderNames ?
                                    this.state.borderNames.map (border => <li key={uuid ()}>{border}</li>)
                                    : <p>Borders are unknown</p>
                            }
                        </ul>
                    </div>
                    <img src={this.state.loadedCountry.flag} alt="Flag" />
                </div>
            );
        }
        return <p>Choose country</p>
    }
}

export default FullCountry;