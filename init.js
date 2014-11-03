 

window.onload = function() {
  
  space = createSpace({
    ticksPerFrame: 300, 
    speed: 0.3,
    inc: function(current, derivative) {
      return current + derivative * this.tickTime
    }
  })
  bounds = createBounds($('#display-div')[0].offsetWidth, $('#display-div')[0].offsetHeight)
  var xc = (bounds.left + bounds.right)/2
  var yc = (bounds.top + bounds.bottom)/2
 
  units = [
    
    bounds, 
    
    tank = createTank({
      skid: 0.1, 
      angularSkid: 0.1, 
      rotateRadius: 10,
      speed: 0,
      canStop: true,
      x: xc,
      y: yc,
    }),
    
    ball = createMovingUnit({
      details: [
        circleDetail({x:5}),
        circleDetail({y:5}),
        circleDetail({x:5,y:5}),
        circleDetail(),
      ],
      vx: 20,
      vy: 10,
      vd: 0.02
    }),
    
    maze = createMaze(xc, yc, 100, mazes.testMaze008)
    
  ]
  
  spaceTick = setInterval(space.tick.bind(space), 5)
  
  realTime = 0
  setInterval(function() {
    realTime += 0.1
    $('#realTime').text(realTime)
    $('#fps').text(space.frameCount / realTime)
    $('#debugInfo').text(JSON.stringify(debugInfo))
  }, 100)
  
  window.onkeydown = function(e) {
    maze.key({
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    }[e.keyCode])
  }
}