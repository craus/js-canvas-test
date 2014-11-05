defaultLinkParams = { 
  x: 0, 
  y: 0,
  ang: 0,
  z: 1,
  globalRotate: 0,
}

linkParams = $.extend({}, defaultLinkParams)

function createLink(params) {
  params = $.extend(null, linkParams, params)
  params.to = params.to || createCell()
  return $.extend({
    matrix: params.matrix || transform(identityMatrix, params.x, params.y, params.z, params.ang)
  }, params)
}