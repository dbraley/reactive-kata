class ReactiveCell {
  constructor () {
    this.listeners = []
  }

  addListener (computeCell) {
    this.listeners.push(computeCell)
  }

  alertListeners () {
    this.listeners.forEach(listener => listener.alert())
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

  apply (cell) {
    this.values.push(this.fn(cell))
  }
}

class ComputeCell extends ReactiveCell {
  constructor (inputCellArray, cb) {
    super()
    this.callbackCells = []
    inputCellArray.forEach(inputCell => inputCell.addListener(this))
    this.inputCellArray = inputCellArray
    this.cb = cb
    this.value = cb(inputCellArray)
  }

  alert () {
    this.value = this.cb(this.inputCellArray)
    this.alertListeners()
    this.callbackCells.forEach(callbackCell => callbackCell.apply(this))
  }

  addCallback (callbackCell) {
    this.callbackCells.push(callbackCell)
  }
}

module.exports = {InputCell, ComputeCell, CallbackCell}
