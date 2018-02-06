class ReactiveCell {
  constructor () {
    this.listeners = []
  }

  updateValue (value) {
    if (value !== this.value) {
      this.value = value
      this.alertListeners()
    }
  }

  getValue () {
    return this.value
  }

  addListener (listenerCell) {
    this.listeners.push(listenerCell)
  }

  removeListener (callback) {
    this.listeners = this.listeners.filter(c => c !== callback)
  }

  alertListeners () {
    this.listeners.forEach(listener => listener.alert(this))
  }
}

class InputCell extends ReactiveCell {
  constructor (value) {
    super()
    this.setValue(value)
  }

  setValue (value) {
    this.updateValue(value)
  }
}

class CallbackCell {
  constructor (fn) {
    this.fn = fn
    this.values = []
  }

  alert (cell) {
    this.values.push(this.fn(cell))
  }
}

class ComputeCell extends ReactiveCell {
  constructor (inputCellArray, cb) {
    super()
    inputCellArray.forEach(inputCell => inputCell.addListener(this))
    this.inputCellArray = inputCellArray
    this.cb = cb
    this.alert()
  }

  alert () {
    this.updateValue(this.cb(this.inputCellArray))
  }

  getValue () {
    return this.cb(this.inputCellArray)
  }
}

module.exports = {InputCell, ComputeCell, CallbackCell}
