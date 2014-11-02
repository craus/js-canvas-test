eps = 1e-5

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
  return min + Math.floor(Math.random()*(max-min))
}


