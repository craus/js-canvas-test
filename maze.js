function createMaze(x, y, z, construct) {

  var maxDistance = 6
  maxPaintingDistance = 3.5
  var movingTime = 2
  mazeZoom = 1
  
  var close = function(a, b) {
    for(var i = a.length; i--;) {
      if (Math.abs(a[i]-b[i]) > 1e-10)
        return false;
    }
    return true;
  }
  
  var inList = function(list, value) {
    return list.some(function(t) {
      return close(t, value)
    })
  }  
  
  var bfs = function(painting, set, queue) {
    if (!painting.cell.visible) return
    if (painting.distance > maxDistance) {
      return
    }
    if (dist(painting.matrix[4], painting.matrix[5]) > maxPaintingDistance) return
    if (current.invisibleCells.indexOf(painting.cell) != -1) return
    
    var list = set[painting.cell.id] = set[painting.cell.id] || []
    
    if (inList(list, painting.matrix)) {
      return
    }
    list.push(painting.matrix)
    
    painting.cell.links.forEach(function(link) {
      var matrix = transformByMatrix(painting.matrix, link.matrix)
      queue.enqueue({
        cell: link.to, 
        matrix: matrix,
        distance: painting.distance+1
      })
    })
  }

  z = 200
  var start = createCell()
  var current = construct(start) || start
  start.mapping()
  var lastLink = current.links.last().to.links.find(function(link) { return link.to == current })
  var currentMoveTime = movingTime
  var movedOn = -100500
  paintingSet = null
  var viewTransform = identityMatrix
  var animationMatrix = null
  var mirrored = false
  
  var commandTransform = {
    u: 'u',
    r: 'r',
    d: 'd',
    l: 'l'
  }
  
  var result = createUnit({
    start: start,
    getCurrent: function() { return current },
    paint: function() {
      
      ui.transform(x,y,z * mazeZoom,0)
      
      ui.transformByMatrix(viewTransform) // viewTransform
      
      var currentMovingTime = space.time - movedOn
      var k = Math.max(0,1 - currentMovingTime / currentMoveTime)
      if (k > 0) {
        ui.transformByMatrix(matrixPow(animationMatrix, k)) // animation matrix
      }
      
      Object.keys(paintingSet).forEach(function(cellId) {
        var cell = cells[cellId]
        var matrices = paintingSet[cellId]

        matrices.forEach(function(matrix) {
          ui.transformByMatrix(matrix)
          
          cell.paintCell()
          ui.untransform()
        })
      })
      
      if (k > 0) {
        ui.untransform() // animation matrix
      }
      
      ui.untransform() // viewTransform
      
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
      if (!command) return
      var originalCommand = command
      command = commandTransform[command]
      var link = current.links.find(function(link) {return link.command == command})
      if (!link) return
      target = link.to
      if (!target.available()) return
      lastLink = link
      
      animationMatrix = identityMatrix

      animationMatrix = transform(animationMatrix, 0,0,1, link.globalRotate * Math.PI / 2)

      
      var turns = link.globalRotate
      if (mirrored) turns = -turns
      if (turns < 0) turns += 4
      for (var i = 0; i < turns; i++) {
        commandTransform = transformMap(commandTransform, singleCommandTransform)
      }      
      
      if (link.mirror) {
        mirrored = !mirrored
        if (link.command == 'l' || link.command == 'r') {
          viewTransform = transform(viewTransform, 0,0,1,Math.PI/2)
          animationMatrix = transform(animationMatrix, 0,0,1,Math.PI/2)
        }
        if (originalCommand == 'l' || originalCommand == 'r') {
          commandTransform = transformMap(commandTransform, singleCommandTransform)
        }
        animationMatrix = mirrorTransform(animationMatrix, link.mirror)   
        viewTransform = mirrorTransform(viewTransform)
        commandTransform = transformMap(commandTransform, mirrorCommandTransform)
        
        if (originalCommand == 'l' || originalCommand == 'r') {
          for (var i = 0; i < 3; i++) {
            commandTransform = transformMap(commandTransform, singleCommandTransform)
          }
        }
        if (link.command == 'l' || link.command == 'r') {
          animationMatrix = transform(animationMatrix, 0,0,1,-Math.PI/2)
          viewTransform = transform(viewTransform, 0,0,1,-Math.PI/2)
        }        
      }
      animationMatrix = transformByMatrix(animationMatrix, link.matrix)    

      viewTransform = transform(viewTransform, 0, 0, 1, -link.globalRotate * Math.PI / 2)

      movedOn = space.time
      currentMoveTime = link.movingTime || movingTime
      current = target
      current.visited += 1
      this.moved()
      current.runTriggers()
      var nonvisited = cells.find(function(cell) { return cell.visited == 0 })
      debug(current.id, commandTransform, mirrored)
    },
    moved: function() {
      var q = new Deque()
      q.enqueue({
        cell: current, 
        matrix: [1,0,0,1,0,0],
        distance: 0
      })
      paintingSet = {}
      while (!q.isEmpty()) {
        var painting = q.dequeue()
        bfs(painting, paintingSet, q)
      }     
    }
  })
  result.moved()
  return result
}