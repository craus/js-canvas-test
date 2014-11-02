mazes = {
  testMaze001: function(start){
    var x = start.add('right')
    x = x.add('up')
    var center = x.add('left')
    center.add('down', start)
    x = x.add('up')
    x = x.add('left')
    center.add('up', x)
    x = x.add('left')
    x = x.add('down')
    center.add('left', x)
  },
  
  testMaze002: function(start) {
    start.add('right', start)
  },

  testMaze003: function(start) {
    start.add('right').add('up', start)
  },
  
  testMaze004: function(start) {
    start.add('right', createCell({c:'blue'})).add('right', start).add('up', createCell({c:'green'})).add('up', start)
  },
}