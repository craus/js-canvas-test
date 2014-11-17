saveLevel = function() {
  var getLevelData = function() {
    return JSON.stringify(cells)
  }
  $('#levelData').text(getLevelData())
}