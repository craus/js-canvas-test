ui = {
  newCircle: function() {
    result = $('#circle')[0].cloneNode(true)
    $('#field')[0].appendChild(result)
    result.style.visibility = 'visible'
    return result
  },
  
  clearDisplay: function() {
    var canvas = this.canvas()
    var w = document.getElementById('display-div').offsetWidth
    var h = document.getElementById('display-div').offsetHeight
    canvas.width = w
    canvas.height = h
  },
  
  circle: function(x,y,r,c) {
    var g = this.g
    
    g.beginPath()
    g.arc(x, y, r, 0, 2*Math.PI, false)
    g.fillStyle = c
    g.fill()
    g.lineWidth = 1
    g.strokeStyle = c
    g.stroke()
  },
  
  rect: function(l,t,w,h,c) {
    this.g.fillStyle = c
    this.g.fillRect(l,t,w,h,c)
  },
  
  canvas: function() { return document.getElementById('display') },
  
  context: function() { this.g = this.canvas().getContext('2d') },
  
  width: function() { return this.canvas().width },
  height: function() { return this.canvas().height },
  
  g: null, 
  
  transforms: [[1,0,0,1,0,0]],
  
  setTransform: function(t) {
    this.g.setTransform(t[0], t[1], t[2], t[3], t[4], t[5])
  },
  
  transform: function(x,y,z,ang) {
    var a = z * Math.cos(ang)
    var b = z * Math.sin(ang)
    var c = - z * Math.sin(ang)
    var d = z * Math.cos(ang)
    var e = x
    var f = y
    var last = this.transforms[this.transforms.length-1]
    var next = [
      last[0]*a+last[2]*b,
      last[1]*a+last[3]*b,
      last[0]*c+last[2]*d,
      last[1]*c+last[3]*d,
      last[0]*e+last[2]*f+last[4],
      last[1]*e+last[3]*f+last[5]
    ]
    this.transforms.push(next)
    this.setTransform(next)
  },
  
  untransform: function() {
    this.transforms.pop()
    var last = this.transforms[this.transforms.length-1]
    this.setTransform(last)
  },
  
  move: function(x, y) {
    this.transform(x,y,1,0)
  },
  
  zoom: function(z) {
    this.transform(0,0,z,0)
  },
  
  rotate: function(ang) {
    this.transform(0,0,1,ang)
  },
  
  gradient: function() {
    this.g.rect(0, 0, this.width(), this.height())
    this.transform(this.width()/2, this.height()/2,200,0)
    var grd=this.g.createRadialGradient(0,0,0,0,0,1);
    grd.addColorStop(0,"transparent");
    grd.addColorStop(0.7,"transparent");
    grd.addColorStop(1,"rgba(0,0,0,0.5)");

    this.g.fillStyle=grd;
    this.g.fill()
    this.untransform()
  },
}