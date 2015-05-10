keycodes = {
  del: 46,
  pageDown: 34,
  left: 37,
  up: 38, 
  right: 39,
  down: 40,
  character: function(c) { return c.charCodeAt(0) },
  closeBracket: 221,
  openBracket: 219,
  home: 36,
  esc: 27,
  space: 32, // this possibly should be character(' ')
}
