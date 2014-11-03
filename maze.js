function createMaze(x, y, z, construct) {
  z = 200
  var start = createCell()
  construct(start)
  start.mapping()
  var current = cells.last()
  return createUnit({
    maxDistance: 6,
    maxMatrixDistance: 700,
    start: start,
    paint: function() {
      ui.transform(x,y,z,0)
      current.paint()
      debugCounter += 1
      ui.circle(0,0,0.1,'red')
      ui.untransform()
    },
    key: function(command) {
      //debug(current.links.map(function(link) {return link.command}))      
      current = current.links.find(function(link) {return link.command == command}).to
      debug(current.id, current.distanceFromStart)
    }
  })
}