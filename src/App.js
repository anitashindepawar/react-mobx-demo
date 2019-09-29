import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import './App.css';

@inject('AppStartStore', 'incomeUiStore')
@observer
class App extends Component {
  handleChange=(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    this.props.AppStartStore.LookupObj[name]=value;
  }

  validateInput=(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    this.props.AppStartStore.validateInput(name,value);
  }

  handleNext=()=>{
this.props.AppStartStore.stepNext();
  }

  handleBack=()=>{
    this.props.AppStartStore.stepBack();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>First Name</p><input type="text" value={this.props.AppStartStore.LookupObj.firstname} name={'firstname'} 
          onChange={this.handleChange} onBlur={this.validateInput}/>
          <p>SurName</p><input type="text" value={this.props.AppStartStore.LookupObj.surname} name={'surname'} 
          onChange={this.handleChange} onBlur={this.validateInput}/>
          <p>address</p><input type="text" value={this.props.AppStartStore.LookupObj.address} name={'address'} 
          onChange={this.handleChange} onBlur={this.validateInput}/>
          <button type="button" onClick={this.handleNext} disabled={!this.props.AppStartStore.enableNextBtn}>Next</button>
          <button type="button" onClick={this.handleBack} >Back</button>
        </header>
      </div>
    );
  }

  getCalculation () {
    if (!this.props.incomeUiStore.shouldShowCalculations) return null

    return (
      <div>
        <p>Income before tax: ${this.props.AppStartStore.incomeBeforeTax}.00</p>
        <p>Tax percentage: {this.props.AppStartStore.calculatedTaxPercentage}%</p>
        <p>Income after tax: ${this.props.AppStartStore.calculatedIncomeAfterTax}</p>
      </div>
    )
  }
}

export default App;
