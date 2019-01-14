class CalculatorModel {
  constructor(input){
    this._decimalAdded = false;
    this._operators = ['+', '-', 'x', '÷'];
    this._input = input;
  }

  get decimalAdded() {
    console.log(this);
    return this._decimalAdded;
  }
  
  set decimalAdded(value){
    if ( !(typeof value == 'boolean' || value instanceof boolean) ){
      throw new TypeError('decimalAdded must be a boolean type!', "someFile.js", 14);
    }
    this._decimalAdded = value; 
  }
  
  get input() {
    return this._input;
  }
  
  set input(value) {
    if ( !(typeof value == 'string' || value instanceof String) ){
      throw new TypeError('input must be a String type!', "someFile.js", 25);
    }
    this._input = value;
  }
  
  get lastChar() {
    return this._input.slice(-1);
  }
  
  get operators() {
    return this._operators;
  }
}

class CalculatorPresenter {

  constructor(inputScreen){
    this._inputScreen = inputScreen;
    this._model = new CalculatorModel(this._inputScreen.innerHTML);
  }
  
  get inputScreen(){
    return this._inputScreen;
  }
    
  get model(){
    return this._model;
  }
  
  addOperator(event) {
    const operator = event.target.innerHTML;
    if(this.model.input !== '' && this.model.operators.indexOf(this.model.lastChar) === -1){
      this.inputScreen.innerHTML += operator;
      this.model.input = this.inputScreen.innerHTML;
    } else if(this.model.input === '' && operator === '-') {
      this.inputScreen.innerHTML += operator;
      this.model.input = this.inputScreen.innerHTML;
    }
    
    if(this.model.operators.indexOf(this.model.lastChar) > -1 && this.model.input.length > 1) {
      this.inputScreen.innerHTML = this.model.input.replace(/.$/, operator);
      this.model.input = this.inputScreen.innerHTML;
    }
    this.model.decimalAdded = false;
  }
  
  addNumeric(event) {
    const number = event.target.innerHTML;
    this.inputScreen.innerHTML += number;
    this.model.input = this.inputScreen.innerHTML;
  }
  
  addDecimal() {
    if( !this.model.decimalAdded ){
      this.inputScreen.innerHTML += '.';
      this.model.input = this.inputScreen.innerHTML;
      this.model.decimalAdded = true;
    }
  }
  
  evaulateExpression() {
    this.model.input = this.model.input.replace(/x/g, '*').replace(/÷/g, '/');
    if(this.model.operators.indexOf(this.model.lastChar) > -1 || this.model.lastChar === '.'){
          this.model.input = this.model.input.replace(/.$/, '');
    }
    if(this.model.input) {
      this.inputScreen.innerHTML = eval(this.model.input);
      this.model.input = this.inputScreen.innerHTML;
    }
    this.model.decimalAdded = false;
  }
  
  clearScreen() {
    this.inputScreen.innerHTML = "";
    this.model.input = this.inputScreen.innerHTML;
    this.model.decimalAdded = false;
  }
}

const presenter = new CalculatorPresenter(document.querySelector('#screen'));