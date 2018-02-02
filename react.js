class InputCell {
  constructor (value) {
    this.computeCell = []
    this.setValue(value)
  }

  setValue (value) {
    this.value = value
    this.computeCell.forEach(computeCell => computeCell.recompute())
  }

  setComputeCell (computeCell) {
    this.computeCell.push(computeCell)
  }
}

class CallbackCell {

}

class ComputeCell {
  constructor (inputCellArray, cb) {
    inputCellArray.forEach(inputCell => inputCell.setComputeCell(this))
    this.inputCellArray = inputCellArray
    this.cb = cb
    this.value = cb(inputCellArray)
  }

  recompute () {
    this.value = this.cb(this.inputCellArray)
  }
}

module.exports = {InputCell, ComputeCell, CallbackCell}
