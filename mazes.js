mazes = $.extend(testMazes, {
  levels: [
    function(start) {
      start.room(
        '.###.',
        '#####',
        '##.##',
        '#####',
        '.$##.'
      )
    },
    function(start) {
      maxDistance = 70
      maxPaintingDistance = 700
      start.walk('ruuluurrd')
      cells[3].walk('ru', cells[9])
      cells[1].walk('rrudr')
      cells[8].walk('rrdd').exit()
    },
    function(start) {
      start.walk('rr').exit()
    }
  ],
})