function createMaze(x, y, z, construct) {
  z = 200
  var start = createCell()
  construct(start)
  start.mapping()
  var current = cells.last()
  var previous = current.links.last().to
  var movedOn = -100500
  var movingTime = 2
  return createUnit({
    maxDistance: 6,
    maxMatrixDistance: 700,
    start: start,
    paint: function() {
      ui.transform(x,y,z,0)
      var currentMovingTime = space.time - movedOn
      var k = Math.max(0,1 - currentMovingTime / movingTime)
      var link = previous.links.find(function(link) { return link.to == current })
      ui.transform(link.x * k, link.y * k, Math.pow(link.z, k), link.ang * k)
      current.paint()
      ui.untransform()
      
      
      debugCounter += 1
      ui.color('purple')
      ui.circle(0,-0.3,0.1)
      ui.line(0,-0.3, 0,0, 0.03)
      ui.line(0.1,0.3, 0,0, 0.03)
      ui.line(-0.1,0.3, 0,0, 0.03)
      ui.line(0.1,0, 0,-0.2, 0.03)
      ui.line(-0.1,0, 0,-0.2, 0.03)
      ui.untransform()
    },
    key: function(command) {
      //debug(current.links.map(function(link) {return link.command}))      
      var target = current.links.find(function(link) {return link.command == command}).to
      if (!target) return
      previous = current
      movedOn = space.time
      current = target
      debug(current.id, current.distanceFromStart)
    }
  })
}