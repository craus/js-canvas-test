function createMaze(x, y, z, construct) {
  var start = createCell()
  construct(start)
  return createUnit({
    start: start,
    paint: function() {
      ui.transform(x,y,z,0)
      start.paint()
      ui.untransform()
    }
  })
}