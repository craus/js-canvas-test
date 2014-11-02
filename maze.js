function createMaze(x, y, z, construct) {
  var start = createCell()
  construct(start)
  return createUnit({
    maxDistance: 7,
    start: start,
    z: 50,
    paint: function() {
      ui.transform(x,y,z,0)
      start.paint()
      debugCounter += 1
      ui.circle(0,0,0.1,'red')
      ui.untransform()
    }
  })
}