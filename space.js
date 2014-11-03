function createSpace(params) {
  return $.extend({
    tickTime: params.speed / params.ticksPerFrame,
    frameCount: 0,
    tickCount: 0,
    time: 0,
    paint: function() {
      debugCounter = 0
      ui.clearDisplay()
      ui.context()
      units.forEach(call('paint')) 
      ui.gradient()
    },
    tick: function() {
      for (var i = 0; i < this.ticksPerFrame; i++) {
        this.tickCount++
        this.time += this.tickTime
        units.forEach(call('tick'))
      }
      this.paint()
      this.frameCount++
      $('#frameCount').text(this.frameCount)
      $('#tickCount').text(this.tickCount)
    }
  }, params)
}