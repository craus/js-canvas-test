 

window.onload = function() {
  
  triggers = {}
  
  currentLevel = mazes.testMaze014
  
  space = createSpace({
    ticksPerFrame: 1, 
    speed: 0.3,
    inc: function(current, derivative) {
      return current + derivative * this.tickTime
    }
  })
  bounds = createBounds($('#display-div')[0].offsetWidth, $('#display-div')[0].offsetHeight)
  var xc = (bounds.left + bounds.right)/2
  var yc = (bounds.top + bounds.bottom)/2
 
  units = [
    maze = createMaze(xc, yc, 100, currentLevel),
  ]
  
  spaceTick = setInterval(space.tick.bind(space), 5)
  
  realTime = 0
  setInterval(function() {
    realTime += 0.1
    $('#realTime').text(realTime)
    $('#fps').text(space.frameCount / realTime)
    $('#debugInfo').text(JSON.stringify(debugInfo))
    $('#frameCount').text(space.frameCount)
    $('#tickCount').text(space.tickCount)
  }, 100)
  
  var restart = function() {
    units.remove(maze)
    destroyAllCells()
    triggers = {}
    maze = createMaze(xc, yc, 100, currentLevel)
    units.push(maze)
  }
  
  window.onkeydown = function(e) {
    maze.key({
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down',
    }[e.keyCode])
    if (e.keyCode == 82) restart()
  }
}