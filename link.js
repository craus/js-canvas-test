var sides = {
  'l': {
    x: -1
  },
  'r': {
    x: 1
  },
  'u': {
    y: -1
  },
  'd': {
    y: 1
  },
}

var commands = 'ldru'

linkParams = {}

function createLink(params) {
  params = $.extend({
    x: 0,
    y: 0,
    z: 1, 
    ang: 0,
    globalRotate: 0,
    back: function(params) {
      var result = createLink($.extend({}, this, {
        matrix: inverseMatrix(this.matrix),
        globalRotate: -this.globalRotate,
        command: commands[(commands.indexOf(this.command)+42-this.globalRotate)%4]
      }, params))
      return result
    },
  }, sides[params.command] || {}, linkParams, params)
  params.to = params.to || createCell()
  params.matrix = params.matrix || transform(identityMatrix, params.x, params.y, params.z, params.ang)
  return params
}