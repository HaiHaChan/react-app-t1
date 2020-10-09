import React from 'react';
import { Select, Input } from 'antd';
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
        <Input prefix="$" suffix={this.props.currencyName} value={this.props.money} onChange={this.handleChange} />
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

  handleChangeCurrency(value) {
    this.setState({
      currencyCode: value,
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
    const { Option } = Select;
    const money = this.state.money;
    const VND = this.state.encode ? tryConvert(money, this.state.currencyCode, true) : money;
    const notVND = this.state.encode ? money : tryConvert(money, this.state.currencyCode, false);

    return (
      <div className="Calculator">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />

          <h2>It is { date.toLocaleTimeString() } { date.toDateString() }</h2>

          <div>
            <Select defaultValue="USD" className="select-box" style={{ width: '300px' }} onChange={this.handleChangeCurrency}>
              <Option value="USD">Đô la Mỹ - USD</Option>
              <Option value="AUD">Đô la Úc - AUD</Option>
              <Option value="CAD">Đô la Canada - CAD</Option>
              <Option value="CHF">Đồng Frank Thụy Sĩ - CHF</Option>
              <Option value="JPY">Đồng Yên Nhật - JPY</Option>
              <Option value="EUR">Đồng Euro - EUR</Option>
              <Option value="NZD">Đô la New Zealand - NZD</Option>
              <Option value="GBP">Bảng Anh - GBP</Option>
              <Option value="SEK">Đồng Thụy Điển - SEK</Option>
              <Option value="DKK">Đồng Đan Mạch - DKK</Option>
              <Option value="NOK">Krone Na Uy - NOK</Option>
              <Option value="SGD">Đồng đô la Singapore - SGD</Option>
              <Option value="CZK">Cron Séc - CZK</Option>
              <Option value="HKD">Đô la Hồng Công - HKD</Option>
              <Option value="MXN">Peso Mehico - MXN</Option>
              <Option value="PLN">Zloto Ba Lan - PLN</Option>
              <Option value="RUB">Rúp Nga - RUB</Option>
              <Option value="TRY">Lir Thổ Nhĩ Kỳ - TRY</Option>
              <Option value="ZAR">Rand của Nam Phi - ZAR</Option>
              <Option value="CNH">CNH - CNH</Option>
              <Option value="CNY">Nhân dân tệ TQ - CNY</Option>
              <Option value="INR">INDIAN RUPEE - INR</Option>
              <Option value="KWD">UWAITI DINAR - KWD</Option>
              <Option value="MYR">MALAYSIAN RINGGIT - MYR</Option>
              <Option value="SAR">SAUDI RIAL - SAR</Option>
              <Option value="THB">THAI BAHT - THB</Option>
              <Option value="KRW">SOUTH KOREAN WON - KRW</Option>
            </Select>
          </div>

          <div className="form-input">
            <CurrencyInput currencyName={this.state.currencyCode} money={notVND} onMoneyChange={this.handleChangeVNDEncode}/>
            ~
            <CurrencyInput currencyName="VND" money={VND} onMoneyChange={this.handleChangeVNDDecode}/>
          </div>
        </header>
      </div>
    );
  }
}

export default Calculator;
