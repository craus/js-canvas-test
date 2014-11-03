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
    start.add('right').add('right', start).add('up').add('up', start)
  },
  
  testMaze005: function(start) {
    start.right().left().up().down().left().left().right().down().up().right()
  },
  
  testMaze006: function(start) {
    b = start.right().down()
    b.down().
      left().
      down().
      left().
      down().down(start).up().up().
      left().
      up().
      left().left(b).right().right().
      up().
      right().
      up().
      right(start)
  },
  
  testMaze007: function(start) {
    start.go('right', 9).right(start).go('down', 9).down(start)
    var b = createCell()
    var m = start.go('right', 5)
    b.go('right', 9).right(b).go('down', 4).down(m).go('down', 4).down(b)
  },
  
  testMaze008: function(start) {
    start.
      walk('rrddllu').up(start).
      walk('rr').
      walk('rrddl').left(start.walk('rrdd')).
      right().
      walk('ddllu').up(start.walk('ddr')).
      walk('ddr').
      walk('ddrdddll').left(start.walk('rrrrd')).
      walk('rrrrddldllddl').left(start.walk('ddrddrddr')).
      walk('rruurrdrdd').down(start.right()).
      walk('uuur').up(start.walk('dll')).
      up(start.walk('dlldlluurr'))
  },
  
  testMaze009: function(start) {
    mazes.testMaze008(start)
    cells[19].walk('lldll')
    cells[34].walk('drr').right(cells[48])
    cells[32].walk('uul')
    cells[46].walk('dd').down(cells[54])
  }
}