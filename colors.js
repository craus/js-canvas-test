function rgba(c) {
  result = c
  if (c && Object.prototype.toString.call(c) === '[object Array]') {
    result = 'rgba('+c[0]+', '+c[1]+', '+c[2]+', '+c[3]+')'
  }
  return result
}

colors = {
  red: [255,0,0,1],
  green: [0,255,0,1],
  blue: [0,0,255,1],
  yellow: [255,255,0,1],
  
  mix: function(c, c2, k) {
    
    result = [
      Math.floor(c[0]*(1-k)+c2[0]*k),
      Math.floor(c[1]*(1-k)+c2[1]*k),
      Math.floor(c[2]*(1-k)+c2[2]*k),
      1.0 * c[3]*(1-k)+1.0 * c2[3]*k  
    ]
    return result
  },
  
  rnd: function() {
    return [
      Math.floor(rnd(0,256)),
      Math.floor(rnd(0,256)),
      Math.floor(rnd(0,256)),
      1
    ]
  }
}

