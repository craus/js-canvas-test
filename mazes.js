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
  },
  
  decorate: function() {
    cells.forEach(function(cell) {
      cell.links.push(createLink({
        x: rnd(-1,1),
        y: rnd(-1,1), 
        z: rnd(0.05,0.5),
        ang: rnd(0, Math.PI),
        to: createCell({decorative: true})
      }))
    })  
  },
  
  testMaze010: function(start) {
    mazes.testMaze009(start)
    decorate()
  },
  
  testMaze011: function(start) {
    mazes.testMaze010(start)
    cells[4].addTrigger(colors.red, 'on', false)
    cells[5].addTrigger(colors.red, 'off', false)
    cells[6].addTrigger(colors.red, 'on-off', false)
    cells[0].addCondition(colors.red, false)
    return cells[3]
  },
  
  testMaze012: function(start) {
    start.left().close('blue').left().onoff('red').right().right().right().open('red').
      right().close('yellow').down().onoff('blue')
    start.right().up().open('blue').up().onoff('yellow').down().left().close('red').down(start).
      up().left().down(start.left())
    start.left().up().up().open('yellow').up()
    start.right().down().close('blue').left().up(start)
    start.walk('rrd').left(start.walk('rd'))
    mazes.decorate()
    return null
  },
  
  testMaze013: function(start) {
    var r = start.down().open('green').walk('uuuuu')
    var r2 = r.walk('llluuuurrrrrrddddlll')
    r2.walk('dddddd').on('green')
    r2.walk('lluuuuuurrrrddddddl').left(r)
    mazes.decorate()
  }
}