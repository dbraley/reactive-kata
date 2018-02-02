class InputCell {
  constructor (value) {
    this.setValue(value)
  }

  setValue (value) {
    this.value = value
  }
}

class CallbackCell {

}

class ComputeCell {
  constructor (inputCellArray, cb) {
    this.value = 2
  }
}

module.exports = {InputCell, ComputeCell, CallbackCell}
