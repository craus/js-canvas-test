function createMaze(x, y, z, construct) {

  var maxDistance = 6
  var maxMatrixDistance = 3.5
  
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
    if (painting.distance > maxDistance) {
      return
    } 
    if (dist(painting.matrix[4], painting.matrix[5]) > maxMatrixDistance) {
      return
    }
    if (current.invisibleCells.indexOf(painting.cell) != -1) {
      return
    }
    var list = set[painting.cell.id] = set[painting.cell.id] || []
    
    if (inList(list, painting.matrix)) {
      return
    }
    list.push(painting.matrix)
    
    painting.cell.links.forEach(function(link) {
      var matrix = transform(painting.matrix, link.x, link.y, link.z, link.ang)
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
  var movedOn = -100500
  var movingTime = 2
  var paintingSet = null
  
  var result = createUnit({
    start: start,
    paint: function() {
      
      ui.transform(x,y,z,0)
      var currentMovingTime = space.time - movedOn
      var k = Math.max(0,1 - currentMovingTime / movingTime)
      if (k > 0) {
        ui.transform(lastLink.x * k, lastLink.y * k, Math.pow(lastLink.z, k), lastLink.ang * k)
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
        ui.untransform()
      }
      
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
      var link = current.links.find(function(link) {return link.command == command})
      if (!link) return
      target = link.to
      if (!target.available()) return
      lastLink = link
      movedOn = space.time
      current = target
      current.visited += 1
      this.moved()
      current.runTriggers()
      var nonvisited = cells.find(function(cell) { return cell.visited == 0 })
      debug(current.id, current.visited, nonvisited ? nonvisited.id : -1)
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