 

window.onload = function() {
  
  triggers = {}
  
  allLevels = mazes.levels
  availableLevels = allLevels
  currentLevel = availableLevels[0]
  currentLevel = testMazes.testMaze032
  
  dev = {
    on: true,
    selectedCell: null,
    selectedSide: null,
  }
  operationSeparator = {}
  operations = []
  currentLevel = function(){}
  
  maze = null
  
  var destroyMaze = function() {
    units.remove(maze)
    destroyAllCells()
    triggers = {}
  }
  
  var buildMaze = function() {
    units.push(maze = createMaze(xc, yc, 100, currentLevel))  
  }
    
  var restart = function() {
    destroyMaze()
    buildMaze()
  }
  
  loadLevel = function(level) {
    currentLevel = level
    restart()
  }
  
  moveLevel = function(delta) {
    loadLevel(next(availableLevels, currentLevel, delta))
  }
  
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
 
  units = []
  restart()
  
  spaceTick = setInterval(space.tick.bind(space), 5)
  
  realTime = 0
  var secondTime = 0
  
  setInterval(function() {
    realTime += 0.1
    secondTime += 1
    
    $('#realTime').text(realTime)
    
    if (secondTime == 10) {
      $('#fps').text(space.frameCount)
      space.frameCount = 0
      secondTime = 0
    }
    $('#debugInfo').text(JSON.stringify(debugInfo))
    $('#frameCount').text(space.frameCount)
    $('#tickCount').text(space.tickCount)
  }, 100)

  undo = function() {
    while (operations.last() != operationSeparator) {
      operations.pop()()
    }
    operations.pop()
    if (operations.length == 0) {
      operations.push(operationSeparator)
    }
    maze.moved()
  }
  
  cancel = function() {
    dev.selectedCell = dev.selectedSide = null
  }
  
  window.onkeydown = function(e) {
    maze.key({
      37: 'l',
      38: 'u',
      39: 'r',
      40: 'd',
    }[e.keyCode], e)
    if (e.keyCode == 82) restart()
    if (e.keyCode == 68) maze.setCurrent(cells[(maze.getCurrent().id+1) % cells.length])
    if (e.keyCode == 65) maze.setCurrent(cells[(maze.getCurrent().id-1+cells.length) % cells.length])
    if (e.keyCode == 221) moveLevel()
    if (e.keyCode == 219) moveLevel(-1)
    if (e.keyCode == 90 && e.ctrlKey) undo()
    if (e.keyCode == 83 && e.ctrlKey) { saveLevel(); e.preventDefault(); }
    if (e.keyCode == 27) cancel()
  }
}