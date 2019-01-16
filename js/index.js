var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var CalcController = function () {
  function CalcController() {_classCallCheck(this, CalcController);
    this._lastOperator = '';
    this._lastNumber = '';
    this._displayCalcEl = document.querySelector('#output');
    this._operation = [];
    this.initButtonsEvents();
    this.initialize();
  }_createClass(CalcController, [{ key: 'initialize', value: function initialize()

    {
      this.setLastNumberToDisplay();
    } }, { key: 'initButtonsEvents', value: function initButtonsEvents()
 {var _this = this;
      var buttons = document.querySelectorAll('.btn');
      buttons.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          var textBtn = btn.id.replace('btn-', '');
          _this.execBtn(textBtn);
        });
      });
    } }, { key: 'execBtn', value: function execBtn(

    value) {
      switch (value) {
        case 'ac':
          this.allClear();
          break;
        case 'ce':
          this.cancelEntry();
          break;
        case 'plus':
          this.addOperation('+');
          break;
        case 'minus':
          this.addOperation('-');
          break;
        case 'multiply':
          this.addOperation('*');
          break;
        case 'divide':
          this.addOperation('/');
          break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          this.addOperation(parseInt(value));
          break;
        case 'dot':
          this.addDot(value);
          break;
        case 'result':
          this.calc();
          break;
        default:
          this.setError();
          break;}

    } }, { key: 'allClear', value: function allClear()

    {
      this._operation = [];
      this._lastNumber = '';
      this._lastOperator = '';
      this.setLastNumberToDisplay();
    } }, { key: 'cancelEntry', value: function cancelEntry()

    {
      this._operation.pop();
      this.setLastNumberToDisplay();
    } }, { key: 'setError', value: function setError()

    {
      this.displayCalc = 'ERROR';
    } }, { key: 'addDot', value: function addDot()

    {
      var lastOperation = this.getLastOperation();
      if (typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;
      if (this.isOperator(lastOperation) || !lastOperation) {
        this.pushOperation('0.');
      } else {
        this.setLastOperation(lastOperation.toString() + '.');
      }
      this.setLastNumberToDisplay();

    } }, { key: 'setLastOperation', value: function setLastOperation(

    value) {
      this._operation[this._operation.length - 1] = value;
    } }, { key: 'getLastOperation', value: function getLastOperation()

    {
      return this._operation[this._operation.length - 1];
    } }, { key: 'isOperator', value: function isOperator(

    value) {
      return ['+', '-', '/', '*'].indexOf(value) > -1;
    } }, { key: 'pushOperation', value: function pushOperation(

    value) {
      this._operation.push(value);
      if (this._operation.length > 3) {
        this.calc();
      } else {

      }
    } }, { key: 'getLastItem', value: function getLastItem()

    {var isOperator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var lastItem = void 0;
      for (var i = this._operation.length - 1; i >= 0; i--) {
        if (this.isOperator(this._operation[i]) == isOperator) {
          lastItem = this._operation[i];
          break;
        }
      }
      if (!lastItem) {
        lastItem = isOperator ? this._lastOperator : this._lastNumber;
      }
      return lastItem;
    } }, { key: 'setLastNumberToDisplay', value: function setLastNumberToDisplay()

    {
      var lastNumber = this.getLastItem(false);
      if (!lastNumber) lastNumber = 0;
      this.displayCalc = lastNumber;
    } }, { key: 'getResult', value: function getResult()

    {var _this2 = this;
      try {
        return eval(this._operation.join(''));
      } catch (e) {
        setTimeout(function () {
          _this2.setError();
        }, 1);
      }
    } }, { key: 'calc', value: function calc()

    {
      var last = '';
      this._lastOperator = this.getLastItem();
      if (this._operation.length < 3) {
        var firtItem = this._operation[0];
        this._operation = [firtItem, this._lastOperator, this._lastNumber];
      }
      if (this._operation.length > 3) {
        last = this._operation.pop();
        this._lastNumber = this.getResult();
      } else if (this._operation.length == 3) {
        this._lastNumber = this.getLastItem(false);
      }
      var result = this.getResult();
      this._operation = [result];
      if (last) this._operation.push(last);
      this.setLastNumberToDisplay();
    } }, { key: 'addOperation', value: function addOperation(

    value) {
      if (isNaN(this.getLastOperation())) {
        if (this.isOperator(value)) {
          this.setLastOperation(value);
        } else {
          this.pushOperation(value);
          this.setLastNumberToDisplay();
        }
      } else {
        if (this.isOperator(value)) {
          this.pushOperation(value);
        } else {
          var newValue = this.getLastOperation().toString() + value.toString();
          this.setLastOperation(newValue);
          this.setLastNumberToDisplay();
        }
      }
    } }, { key: 'displayCalc', get: function get() {return this._displayCalcEl.innerHTML;}, set: function set(value) {if (value.toString().length > 16) {this.setError();return false;}this._displayCalcEl.innerHTML = value;} }]);return CalcController;}();


var calculator = new CalcController();
