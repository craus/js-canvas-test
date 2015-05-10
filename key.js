function createKey(params) {
  return createItem($.extend({
    type: 'key', 
    paint: function() {
      var g = ui.g
      var c = 'red'
      g.beginPath()
      g.arc(0, -0.66, 0.2, Math.PI, 0)
      g.arc(0.2, -0.46, 0.2, -Math.PI/2, Math.PI/2)
      g.lineTo(0.15, -0.26)
      g.lineTo(0.1, -0.2)
      g.lineTo(0.1, 0.75)
      g.lineTo(0, 0.87)
      g.lineTo(-0.15, 0.7)
      g.lineTo(-0.15, -0.1)
      g.lineTo(-0.2, -0.1)
      g.lineTo(-0.2, -0.26)
      g.arc(-0.2, -0.46, 0.2, Math.PI/2, -Math.PI/2)
      g.closePath()
      g.beginPath()
      
      g.lineTo(-0.1, -0.6)
      g.arc(-0.1, -0.7, 0.1, Math.PI/2, -Math.PI/2)
      
      g.lineWidth = 2.0 / ui.transforms.last()[0]
      g.strokeStyle = c
      g.fillStyle = c
      g.stroke()
      g.fill()
    }
  }, params))
}