dev = {
  on: true,
  selectedCell: null,
  selectedSide: null,
  selectedLink: function() {
    if (this.selectedCell == null) return null
    var side = this.selectedSide
    return this.selectedCell.links.find(function(link) { return link.command[0] == side })
  },
  mirrorSelection: function() {
    var link = this.selectedLink()
    var back = link.findBackLink(this.selectedCell)
    var mirroring = function() {
      link.mirror = !link.mirror
      link.mirrorTransform()
      if (back != null) {
        back.mirror = !back.mirror
        back.mirrorTransform()
      }
    }
    mirroring()
    operations.push(operationSeparator)
    operations.push(mirroring)
    maze.moved()
  },
  zoomPerCommand: 1.05,
  zoomSelectionUp: function() { this.zoomSelection(this.zoomPerCommand) },
  zoomSelectionDown: function() { this.zoomSelection(1.0 / this.zoomPerCommand) },
  zoomSelection: function(k) {
    var link = this.selectedLink()
    var back = link.findBackLink(this.selectedCell)
    link.matrix = transform(link.matrix, 0, 0, k, 0)
    if (back != null) {
    
      back.matrix = inverseMatrix(link.matrix)
      
      console.log('zoom')
    }
    maze.moved()
  },
  
  undo: function() {
    while (operations.last() != operationSeparator) {
      operations.pop()()
    }
    operations.pop()
    if (operations.length == 0) {
      operations.push(operationSeparator)
    }
    maze.moved()
  },
  cancel: function() {
    dev.selectedCell = dev.selectedSide = null
  }
}