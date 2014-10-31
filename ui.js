ui = {
  newCircle: function() {
    result = $('#circle')[0].cloneNode(true)
    $('#field')[0].appendChild(result)
    result.style.visibility = 'visible'
    return result
  },
  
  clearDisplay: function() {
    document.getElementById('display').width = document.getElementById('display').width;  
  },
  
  circle: function(x,y,r,c) {
    var canvas = document.getElementById('display');
    var g = canvas.getContext('2d');

    g.beginPath();
    g.arc(x, y, r, 0, 2*Math.PI, false);
    g.fillStyle = c;
    g.fill();
    g.lineWidth = 1;
    g.strokeStyle = c;
    g.stroke();  
  }
}