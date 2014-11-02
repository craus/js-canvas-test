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
      if (Math.abs(a[i]-b[i]) > eps)
        return false;
    }
    return true;
  }
  
  var inList = function(list) {
    return list.some(function(t) {
      return close(t, ui.transforms.last)
    })
  }  
  
  var id = 0
  
  var paintCount = 0
  
  createCell = function() {
    id += 1 
    return {
      id: id,
      links: [],
      add: function(side) {
        var newCell = createCell()
        
        this.links.push(createLink($.extend({
          to: newCell,
          command: side,
        }, sides[side])))
        
        var backSide = sides[side].back
        
        newCell.links.push(createLink($.extend({
          to: this,
          command: backSide,
        }, sides[backSide]))) 
      },
      
      paintCell: function(painted, depth) {
        if (depth < 1) {
          return
        }

        var list = painted[this.id] = painted[this.id] || []

        if (inList(list)) {
          return
        }
        list.push(ui.transforms.last)
        
        ui.rect(-0.5, -0.5, 1, 1, 'gray')
        paintCount += 1
        this.links.forEach(function(link) {
          ui.transform(link.x, link.y, link.z, link.ang)
          link.to.paintCell(painted, depth-1)
          ui.untransform()
        })
      },
      
      paint: function() {
        paintCount = 0
        this.paintCell({}, 3)
        debug(paintCount)
      }
    }
  }
})()
