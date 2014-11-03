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
  
  var bfs = function(painting, set, queue, maxDistance, startMatrix, maxMatrixDistance) {
    if (painting.distance > maxDistance) {
      return
    } 
    if (dist(painting.matrix[4], painting.matrix[5], startMatrix[4], startMatrix[5]) > maxMatrixDistance) {
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
  
  cells = []
  
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
      
      move: function(side, cell) {
        
        link = this.links.find(function(link) {return link.command == side})
        if (link != null) {
          return link.to
        } else {
          return this.add(side, cell)
        }
      },
      
      left: function(cell) { return this.move('left', cell) },
      up: function(cell) { return this.move('up', cell) },
      right: function(cell) { return this.move('right', cell) },
      down: function(cell) { return this.move('down', cell) },
      
      go: function(side, count) { 
        if (count == 0) return this
        return this.move(side).go(side, count-1)
      },
      
      walk: function(path) {
        if (path.length == 0) return this
        return this.move({
          'l': 'left',
          'r': 'right',
          'u': 'up',
          'd': 'down'
        }[path[0]]).walk(path.substring(1))
      },
      
      paintCell: function(painted, depth) {
        ui.rect(-0.51, -0.51, 1.02, 1.02, this.c)
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
          bfs(painting, set, q, maxDistance, ui.transforms.last(), maze.maxMatrixDistance)
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
      },
      
      mapping: function() {
        var q = new Deque()
        q.enqueue({
          cell: this, 
          distance: 0
        })
        set = {}
        while (!q.isEmpty()) {
          var el = q.dequeue()
          var f = function(){
            if (!!set[el.cell.id] || set[el.cell.id] == 0) return
            set[el.cell.id] = el.distance
            el.cell.links.forEach(function(link) {
              q.enqueue({
                cell: link.to,
                distance: el.distance+1
              })
            })
          }
          f()
        }
        
        Object.keys(set).forEach(function(cellId) {
          var cell = cells[cellId]
          cell.distanceFromStart = set[cellId]
        })      
      }
    }, params)
    
    cells[id] = result
    
    id += 1 
    
    return result
  }
})()
