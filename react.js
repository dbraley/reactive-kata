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
    this.value = this.cb(this.inputCellArray)
    this.alertListeners()
  }
}

module.exports = {InputCell, ComputeCell, CallbackCell}
