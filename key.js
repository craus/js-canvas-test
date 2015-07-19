function createKey(params) {
  return createItem($.extend({
    type: 'key', 
    paint: function() {
      ui.circle0(0,0,1,colors.white,4)
      this.paintCode()
    }
  }, params))
}