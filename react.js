class ReactiveCell {
  constructor () {
    this.listeners = []
  }

  addListener (computeCell) {
    this.listeners.push(computeCell)
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
    this.value = value
    this.alertListeners()
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
    this.value = cb(inputCellArray)
  }

  alert () {
    const newvalue = this.cb(this.inputCellArray)
    if (newvalue !== this.value) {
      this.value = newvalue
      this.alertListeners()
    }
  }
}

module.exports = {InputCell, ComputeCell, CallbackCell}
