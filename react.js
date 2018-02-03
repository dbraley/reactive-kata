class InputCell {
  constructor (value) {
    this.listeners = []
    this.setValue(value)
  }

  setValue (value) {
    this.value = value
    this.listeners.forEach(computeCell => computeCell.recompute())
  }

  addListener (computeCell) {
    this.listeners.push(computeCell)
  }
}

class CallbackCell {

}

class ComputeCell {
  constructor (inputCellArray, cb) {
    this.listeners = []
    inputCellArray.forEach(inputCell => inputCell.addListener(this))
    this.inputCellArray = inputCellArray
    this.cb = cb
    this.value = cb(inputCellArray)
  }

  recompute () {
    this.value = this.cb(this.inputCellArray)
    this.listeners.forEach(listener => listener.recompute())
  }

  addListener (computeCell) {
    this.listeners.push(computeCell)
  }
}

module.exports = {InputCell, ComputeCell, CallbackCell}
