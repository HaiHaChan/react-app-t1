import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import axios from 'axios';
import Qs from 'qs';

window.axios = axios.create({paramsSerializer: params => Qs.stringify(params, {arrayFormat: 'brackets'})});
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.PropTypes = require('prop-types');

const token = document.head.querySelector('meta[name="csrf-token"]');

if (token) {
    window.axios.defaults.headers.common['X-CSRF-TOKEN'] = token.content;
}
  
function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
      return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
  }

class TempInput extends React.Component{
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.props.onTempChange(event.target.value)
  }

  render() {
    return (
      <fieldset>
        <legend>ahihihi</legend>
        <input value={this.props.temp} onChange={this.handleChange}></input>
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      temp: '',
      scale: 'c',
      data: null,
      isLoaded: false,
      error: null
    }

    this.handleChangeCelsius = this.handleChangeCelsius.bind(this)
    this.handleChangeF = this.handleChangeF.bind(this)
  }

  componentDidMount() {
    // fetch('http://viblo.lc:8000/api/v2/posts/newest', {
    //     // headers: {
    //     //   'Access-Control-Allow-Origin': '*',
    //     //   'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    //     //   'Content-Type': 'application/json',
    //     //   "Access-Control-Allow-Credentials": true,
    //     // },
    //     mode: 'no-cors', // no-cors, *cors, same-origin
    //   })
    //   .then(response => response.json())
    //   .then((res) => {
    //     console.log(res);
    //   }).catch(function (error) {
    //     console.log(error)
    // });
    axios.get(`https://cors-anywhere.herokuapp.com/http://viblo.lc:8000/api/v2/posts/newest`,{headers: {'Access-Control-Allow-Origin': '*'}})
      .then(response => console.log(response));
  }

  handleChangeCelsius(temp) {
    this.setState({temp: temp, scale: 'c'})
  }

  handleChangeF(temp) {
    this.setState({temp: temp, scale: 'f'})
  }

  render() {
    const temp = this.state.temp;
    const c = this.state.scale === 'c' ? temp : tryConvert(temp, toCelsius);
    const f = this.state.scale === 'f' ? temp : tryConvert(temp, toFahrenheit);
    const date = new Date();

    return (
      <div className="Calculator">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
          Hello {this.props.name}
          </p>
          <h2>It is { date.toLocaleTimeString() } { date.toDateString() }</h2>
          <TempInput temp={c} onTempChange={this.handleChangeCelsius}/>
          <TempInput temp={f} onTempChange={this.handleChangeF}/>
          { this.state.data }
        </header>
      </div>
    );
  }
}

export default Calculator;
