toType = function(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

function normAng(ang)
{
  while (ang >= Math.PI) ang -= 2 * Math.PI;
  while (ang < -Math.PI) ang += 2 * Math.PI;
  return ang;
}

function sqr(x) {
  return x*x
}

function dist(x1, y1, x2, y2) {
  return Math.sqrt(sqr(x1-x2)+sqr(y1-y2))
}

function rnd(min, max) {
  return min + Math.random()*(max-min)
}

function transform(old, x,y,z,ang) {
    var a = z * Math.cos(ang)
    var b = z * Math.sin(ang)
    var c = - z * Math.sin(ang)
    var d = z * Math.cos(ang)
    var e = x
    var f = y
    return [
      old[0]*a+old[2]*b,
      old[1]*a+old[3]*b,
      old[0]*c+old[2]*d,
      old[1]*c+old[3]*d,
      old[0]*e+old[2]*f+old[4],
      old[1]*e+old[3]*f+old[5]
    ]
}


