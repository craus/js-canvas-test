function createLink(params) {
  params = $.extend({ 
    x: 0, 
    y: 0,
    ang: 0,
    z: 1,
  }, params)
  return $.extend({
    matrix: params.matrix || transform(identicalMatrix, params.x, params.y, params.z, params.ang)
  }, params)
}