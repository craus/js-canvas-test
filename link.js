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

commands = 'ldru'

linkParams = {}

function createLink(params) {
  params = $.extend({
    x: 0,
    y: 0,
    z: 1, 
    globalRotate: 0,
    mirror: false,
    back: function(params) {
      var result = createLink($.extend({}, this, {
        matrix: inverseMatrix(this.matrix),
        command: this.fromSide,
        fromSide: this.command,
      }, params))
      return result
    }
  }, sides[params.command] || {}, linkParams, params)
  params.to = params.to || createCell()
  params.fromSide = params.fromSide || commands[(commands.indexOf(params.command)+42-params.globalRotate) % 4]
  params.globalRotate = commands.indexOf(params.command)+2-commands.indexOf(params.fromSide)
  params.ang = params.ang || -Math.PI /2 * params.globalRotate
  if (!params.matrix) {
    params.matrix = identityMatrix
    if (params.mirror) {
      if (params.command == 'l' || params.command == 'r') {
        params.matrix = transform(params.matrix, 0,0,1, Math.PI/2)
      }
      params.matrix = mirrorTransform(params.matrix)
      if (params.command == 'l' || params.command == 'r') {
        params.matrix = transform(params.matrix, 0,0,1, -Math.PI/2)
      }
    }
    params.matrix = transform(params.matrix, params.x, params.y, params.z, params.ang)    

  }
  return params
}