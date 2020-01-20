import React from 'react';
import logo from '../logo.svg';
import '../App.scss';
import ratesData from '../rates.json';

function tryConvert(money, code, encode = true) {
    const input = parseFloat(money);
    if (Number.isNaN(input)) {
      return '';
    }
    const currency = ratesData.rates[0].value.find(item => item.code === code);
    if (!currency) {
      return '';
    }
    const sell = parseFloat(currency.sell.replace(',', ''))
    const output = encode ? input*sell : input/sell;
    const rounded = Math.round(output * 1000)/1000;
    return rounded.toString();
  }

class CurrencyInput extends React.Component{
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.props.onMoneyChange(event.target.value)
  }

  render() {
    return (
      <fieldset>
        <legend>Enter { this.props.currencyName }</legend>
        <input value={this.props.money} onChange={this.handleChange}></input>
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currencyCode: 'USD',
      money: '',
      encode: true,
    }

    this.handleChangeCurrency = this.handleChangeCurrency.bind(this)
    this.handleChangeVNDEncode = this.handleChangeVNDEncode.bind(this)
    this.handleChangeVNDDecode = this.handleChangeVNDDecode.bind(this)
  }

  handleChangeCurrency(event) {
    this.setState({
      currencyCode: event.target.value,
      encode: true,
      money: '',
    })
  }

  handleChangeVNDEncode(money) {
    this.setState({ 
      money: money,
      encode: true,
    })
  }

  handleChangeVNDDecode(money) {
    this.setState({ 
      money: money,
      encode: false,
    })
  }

  render() {
    const date = new Date();
    const money = this.state.money;
    const VND = this.state.encode ? tryConvert(money, this.state.currencyCode, true) : money;
    const notVND = this.state.encode ? money : tryConvert(money, this.state.currencyCode, false);

    return (
      <div className="Calculator">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <h2>It is { date.toLocaleTimeString() } { date.toDateString() }</h2>

          <div>
            <select className="select-box" onChange={this.handleChangeCurrency}>
              <option value="USD">Đô la Mỹ - USD</option>
              <option value="AUD">Đô la Úc - AUD</option>
              <option value="CAD">Đô la Canada - CAD</option>
              <option value="CHF">Đồng Frank Thụy Sĩ - CHF</option>
              <option value="JPY">Đồng Yên Nhật - JPY</option>
              <option value="EUR">Đồng Euro - EUR</option>
              <option value="NZD">Đô la New Zealand - NZD</option>
              <option value="GBP">Bảng Anh - GBP</option>
              <option value="SEK">Đồng Thụy Điển - SEK</option>
              <option value="DKK">Đồng Đan Mạch - DKK</option>
              <option value="NOK">Krone Na Uy - NOK</option>
              <option value="SGD">Đồng đô la Singapore - SGD</option>
              <option value="CZK">Cron Séc - CZK</option>
              <option value="HKD">Đô la Hồng Công - HKD</option>
              <option value="MXN">Peso Mehico - MXN</option>
              <option value="PLN">Zloto Ba Lan - PLN</option>
              <option value="RUB">Rúp Nga - RUB</option>
              <option value="TRY">Lir Thổ Nhĩ Kỳ - TRY</option>
              <option value="ZAR">Rand của Nam Phi - ZAR</option>
              <option value="CNH">CNH - CNH</option>
              <option value="CNY">Nhân dân tệ TQ - CNY</option>
              <option value="INR">INDIAN RUPEE - INR</option>
              <option value="KWD">UWAITI DINAR - KWD</option>
              <option value="MYR">MALAYSIAN RINGGIT - MYR</option>
              <option value="SAR">SAUDI RIAL - SAR</option>
              <option value="THB">THAI BAHT - THB</option>
              <option value="KRW">SOUTH KOREAN WON - KRW</option>
            </select>
          </div>

          <div className="form-input">
            <CurrencyInput currencyName={this.state.currencyCode} money={notVND} onMoneyChange={this.handleChangeVNDEncode}/>
            <CurrencyInput currencyName="VND" money={VND} onMoneyChange={this.handleChangeVNDDecode}/>
          </div>
        </header>
      </div>
    );
  }
}

export default Calculator;
