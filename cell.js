(function(){
  var sides = {
    'left': {
      x: -1
    },
    'right': {
      x: 1
    },
    'up': {
      y: -1
    },
    'down': {
      y: 1
    },
  }
  sides.left.back = 'right'
  sides.right.back = 'left'
  sides.up.back = 'down'
  sides.down.back = 'up'
      
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
  
  var bfs = function(painting, set, queue, maxDistance) {
    if (painting.distance > maxDistance) {
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
  
  var id = 0
  
  var cells = []
  
  var paintCount = 0
  
  createCell = function(params) {
    
    result = $.extend({
      c: 'gray',
      id: id,
      links: [],
      add: function(side, cell) {
        cell = cell || createCell()
        
        this.links.push(createLink($.extend({
          to: cell,
          command: side,
        }, sides[side])))
        
        var backSide = sides[side].back
        
        cell.links.push(createLink($.extend({
          to: this,
          command: backSide,
        }, sides[backSide]))) 
        
        return cell
      },
      
      move: function(side) {
        return this.links.find(function(link) {link.command == side}).to
      },
      
      paintCell: function(painted, depth) {
        ui.rect(-0.5, -0.5, 1, 1, this.c)
      },
      
      paint: function() {
        var maxDistance = maze.maxDistance
        
        var q = new Deque()
        q.enqueue({
          cell: this, 
          matrix: ui.transforms.last(),
          distance: 0
        })
        paintCount = 0
        set = {}
        while (!q.isEmpty()) {
          var painting = q.dequeue()
          bfs(painting, set, q, maxDistance)
        }
        
        Object.keys(set).forEach(function(cellId) {
          var cell = cells[cellId]
          var matrices = set[cellId]
          
          matrices.forEach(function(matrix) {
            ui.transformTo(matrix)
            cell.paintCell()
            ui.untransform()
          })
        })
      }
    }, params)
    
    cells[id] = result
    
    id += 1 
    
    return result
  }
})()
