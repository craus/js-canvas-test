

window.onload = function() {
  
  triggers = {}
  
  allLevels = mazes.levels
  allLevels = Object.values(testMazes)
  availableLevels = allLevels
  currentLevel = availableLevels[1]
  currentLevel = testMazes.testMaze011

  operationSeparator = {}
  operations = []
  //currentLevel = function(){}
  
  maze = null
  
  var destroyMaze = function() {
    units.remove(maze)
    destroyAllCells()
    triggers = {}
  }
  
  var buildMaze = function(level = currentLevel) {
    units.push(maze = createMaze(xc, yc, 100, level))  
  }
    
  var restart = function() {
    destroyMaze()
    buildMaze()
  }

  var clearMaze = function() {
    destroyMaze()
    units.push(maze = createMaze(xc, yc, 100, () => {}))  
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


  meta = false
  var metaset = function() {

  }
  window.onkeydown = function(e) {
    var mazeKeys = {}
    mazeKeys[keycodes.left] = 'l'
    mazeKeys[keycodes.up] = 'u'
    mazeKeys[keycodes.right] = 'r'
    mazeKeys[keycodes.down] = 'd'
    maze.key(mazeKeys[e.keyCode], e)
    
    if (e.keyCode == keycodes.character('R')) restart()
    if (e.keyCode == keycodes.character('C')) clearMaze()
    if (e.keyCode == keycodes.pageDown) maze.setCurrent(cells[(maze.getCurrent().id+1) % cells.length])
    if (e.keyCode == keycodes.del) maze.setCurrent(cells[(maze.getCurrent().id-1+cells.length) % cells.length])
    if (e.keyCode == keycodes.home) maze.setCurrent(dev.selectedCell)
    if (e.keyCode == keycodes.closeBracket) moveLevel()
    if (e.keyCode == keycodes.openBracket) moveLevel(-1)
    if (e.keyCode == keycodes.character('Z') && (e.ctrlKey || meta)) dev.undo()
    if (e.keyCode == keycodes.character('S') && (e.ctrlKey || meta)) { writeLevel(); e.preventDefault(); }
    if (e.keyCode == keycodes.character('L') && (e.ctrlKey || meta)) { readLevel(); e.preventDefault(); }
    if (e.keyCode == keycodes.esc) dev.cancel()
    if (e.keyCode == keycodes.space) dev.mirrorSelection()
    if (e.keyCode == keycodes.plus) { dev.zoomSelectionUp() }
    if (e.keyCode == keycodes.minus) { dev.zoomSelectionDown() }
    if (e.key == "Meta") {
      meta = true
    }
    console.log(e)
  }
  window.onkeyup = function(e) {
    if (e.key == "Meta") {
      meta = false
    }
  }
}