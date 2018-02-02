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
    this.value = inputCellArray[0].value + 1
  }
}

module.exports = {InputCell, ComputeCell, CallbackCell}
