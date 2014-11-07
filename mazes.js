mazes = {
  testMaze001: function(start){
    var x = start.add('r')
    x = x.add('u')
    var center = x.add('l')
    center.add('d', start)
    x = x.add('u')
    x = x.add('l')
    center.add('u', x)
    x = x.add('l')
    x = x.add('d')
    center.add('l', x)
  },
  
  testMaze002: function(start) {
    start.add('r', start)
    mazes.decorate()
    mazes.decorate()
    mazes.decorate()
  },

  testMaze003: function(start) {
    start.add('r').add('u', start)
  },
  
  testMaze004: function(start) {
    start.add('r').add('r', start).add('u').add('u', start)
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
    start.go('r', 9).right(start).go('d', 9).down(start)
    var b = createCell()
    var m = start.go('right', 5)
    b.go('r', 9).right(b).go('d', 4).down(m).go('d', 4).down(b)
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
    mazes.decorate()
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
  },
  
  testMaze014: function(start) {
    start.walk('rrrddd').down(start.walk('ru'))
    start.walk('dddrrr').right(start.walk('dl'))
    start.walk('dllddld').left(start.walk('rrr'))
    start.walk('ruullld').left(start.walk('ruuurr')).walk('rdd').down(start.walk('dddrrruu'))
    cells[21].walk('uuuu').left(cells[26].walk('rr'))
    var a = cells[31].walk('rrruuu')
    cells[32].walk('uul').up(cells[37])
    cells[42].walk('rr').right(a)
    cells[39].walk('rruuulll')
    cells[45].walk('uuluullldddddd')
    cells[58].walk('rrrdd')
    cells[64].walk('rrrrr')
    cells[72].walk('rr').right(cells[67])
    cells[48].walk('rrrdd').down(cells[77])
    cells[53].left(cells[83])
    cells[55].open('red')
    cells[23].open('blue')
    cells[11].open('green')
    cells[60].open('yellow')
    cells[18].close('red')
    cells[42].close('blue')
    cells[70].close('blue')
    cells[33].close('green')
    cells[63].close('yellow')
    cells[4].onoff('yellow')
    cells[29].on('red')
    cells[8].off('red')
    cells[68].off('red')
    cells[15].on('blue')
    cells[50].off('blue')
    cells[75].onoff('green')
    cells[48].onoff('green')
    mazes.decorate()
  },
  
  testMaze015: function(start) {
    start.walk('uuurrddd')
    cells[1].link({x: 2, to: cells[7]})
  },
  
  testMaze016: function(start) {
    linkParams.movingTime = 20
    start.link({x: 2, ang: -0.2, command: 'r'}).link({x: 2, y: 0.5, ang: -0.1, command: 'r'})
    start.link({z: 1.2, y: 1.4, ang: -0.2, command: 'd'})
    .link({z: 1.2, x: 1.6, ang: -0.2, command: 'r'}).walk('dd')
    start.walk('dr').linkPath('lur', {command: 'u'})
    start.walk('ruu')
    //.link({y: -1.5, to: start, command: 'up'})
  },
  
  testMaze017: function(start) {
    start.left().on('red').walk('rr').open('red').walk('rrr')
  },
  
  testMaze018: function(start) {
    linkParams.movingTime = 5
    maxPaintingDistance = 5
    var center = start.link({y: -5, to: createCell({visible: false})})
    var firstCenter = center
    var current = start
    for (var i = 0; i < 6; i++) {
      nextCenter = center.link({ang: -Math.PI / 12, to: createCell({visible: false})})
      var next = nextCenter.link({y: 5})
      current.linkThru([center, nextCenter, next], {command: 'r'})
      current = next
      center = nextCenter
    }
    var last = current
    current = start
    for (var i = 0; i < 4; i++) {
      current = current.link({y: -1.25, command: 'u'})
    }
    center = current
    current = last
    for (var i = 0; i < 3; i++) {
      current = current.link({y: -1.25, command: 'u'})
    }   
    center.linkPath('ddddrrrrrruuu', {globalRotate: 1, command: 'r'})
  },
  
  // squaare of start with rotating 
  testMaze019: function(start) {
    linkParams.movingTime = 5
    start.link({x: 1, ang: -Math.PI / 2, to: start, command: 'r', globalRotate: 1})
    mazes.decorate()
    mazes.decorate()
    mazes.decorate()
  },
  
  // skull with rotating tunnel from bottom to right
  testMaze020: function(start) {
    linkParams.movingTime = 5
    var a = start.walk('rrddllu').up(start).walk('rr')
    a = a.walk('rrddl').left(a.walk('dd')).walk('r')
    a = a.walk('ddllu').up(a.walk('ll'))
    a.walk('ddrdddddd').link({
      y: 1, ang: -Math.PI/2, to: a.walk('rrru'), command: 'd', globalRotate: 1
    })    
  },
  
  // infinite spiral of 1 cell
  testMaze021: function(start) {
    maxPaintingDistance = 70
    linkParams.movingTime = 10
    start.link({to: start, x: -1, z: 0.5, ang: -1.7, command: 'l', globalRotate: 1})
  },
  
  testMaze022: function(start) {
    maxPaintingDistance = 5
    linkParams.movingTime = 10
    var a = start
    for (var i = 0; i < 5; i++) {
      a = a.link({y: -2, z: 2, ang: 0.1, command: 'u'})
    }
    a = a.link({to: start, y: -2, z: 2, ang: 0.1, command: 'u'})
    for (var i = 0; i < 5; i++) {
      a = a.link({x: -2, z: 2, ang: 0.1, command: 'l'})
    }
    a = a.link({to: start, x: -2, z: 2, ang: 0.1, command: 'l'})
    start.linkPath('uuuu', {})
    start.linkPath('llll', {})
    //start.link({to: start, x: -2, z: 1, ang: 0.1, command: 'l'})
  },
  
  testMaze023: function(s) {
    s.walk('rrddddrrruuurr').right(s)
    cells[14].walk('uuulluu').up(cells[8])
    cells[6].walk('llllddddlll').left(cells[17])
    cells[19].walk('lllllllddddrrrrr').right(cells[12])
    cells[33].walk('dddddlll').left(cells[3])
    cells[32].walk('uuuuu').up(cells[22])
    cells[35].walk('uuuuurrrddd').down(cells[24])
  },
  
  testMaze024: function(s) {
    s.walk('rrrddd').down(s, 'l')
  },

}