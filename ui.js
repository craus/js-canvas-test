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
  
  color: function(c) {
    c = rgba(c)
    this.g.fillStyle = this.g.strokeStyle = c
  },
  
  circle: function(x,y,r,c) {
    var g = this.g
    c = rgba(c)
    g.beginPath()
    g.arc(x, y, r, 0, 2*Math.PI, false)
    g.fillStyle = c
    g.fill()
    g.lineWidth = 1.0 / this.transforms.last()[0]
    g.strokeStyle = c
    g.stroke()
  },
  
  circle0: function(x,y,r,c,w) {
    var g = this.g
    c = rgba(c)
    w = w || 1
    g.beginPath()
    g.arc(x, y, r, 0, 2*Math.PI, false)
    g.lineWidth = 1.0 * w / this.transforms.last()[0]
    g.strokeStyle = c
    g.stroke()
  },
  
  line: function(x1,y1,x2,y2,w,c) {
    var g = this.g
    c = rgba(c)
    g.beginPath()
    g.moveTo(x1,y1)
    g.lineTo(x2,y2)
    g.lineWidth = w
    g.strokeStyle = c
    g.stroke()
  },
  
  rect: function(l,t,w,h,c) {
    c = rgba(c)
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
    var last = this.transforms[this.transforms.length-1]
    var next = transform(last,x,y,z,ang)
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
  
  transformByMatrix: function(matrix) {
    var last = this.transforms.last()
    var next = transformByMatrix(last,matrix)
    this.transforms.push(next)
    this.setTransform(next)
  },
  
  gradient: function() {
    this.g.rect(0, 0, this.width(), this.height())
    this.transform(this.width()/2, this.height()/2,400,0)
    var grd=this.g.createRadialGradient(0,0,0,0,0,1);
    grd.addColorStop(0,"transparent");
    //grd.addColorStop(0.7,"transparent");
    grd.addColorStop(1,"rgba(255,255,255,1)");

    this.g.fillStyle=grd;
    this.g.fill()
    this.untransform()
  },
  
  symbolycGrid: function(params) {
    params.r = params.r || 0.045
    params.d = params.d || 0.12
    params.alpha = params.alpha || 0.9
    for (var i = -2; i <= 2; i++) {
      for (var j = -2; j <= 2; j++) {
        var print = false
        var lighted = false
        var cross = Math.abs(i) == Math.abs(j)
        var zero = 1.99 <= dist(i,j) && dist(i,j) <= 2.8
        
        if (params.print(cross, zero)) {
          var cp = params.c
          if (!params.lighted(cross, zero)) {
            cp = colors.mix(cp, [0,0,0,0], params.alpha)
          }
          ui.circle(i * params.d, j*params.d, params.r, cp)
        }
      }
    }  
  },
  
  paintMan: function() {
    ui.color('purple')
    ui.circle(0,-0.3,0.1)
    ui.line(0,-0.3, 0,0, 0.03)
    ui.line(0.1,0.3, 0,0, 0.03)
    ui.line(-0.1,0.3, 0,0, 0.03)
    ui.line(0.1,0, 0,-0.2, 0.03)
    ui.line(-0.1,0, 0,-0.2, 0.03)
  },
}