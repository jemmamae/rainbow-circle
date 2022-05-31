// Code borrowed from https://codepen.io/jonobr1/pen/vYRzge

var _ = Two.Utils;
var two = new Two({
    fullscreen: true,
    autostart: true
}).appendTo(document.body);

var colors = [
  'red', 'orange', 'yellow', 'green',
  'blue', 'indigo', 'violet'
];

var sky = two.makeRectangle(two.width / 2, two.height / 2, two.width, two.height);
sky.fill = 'lightblue';
sky.noStroke();

Two.Resolution = 64;
var linewidth = 20;
var rainbow = two.makeGroup(_.map(colors.reverse(), function(color, i) {
  var semicircle = makeSemiCircle(two, 0, 0, (i + 1) * linewidth);
  semicircle.noFill();
  semicircle.stroke = color;
  semicircle.linewidth = linewidth;
  return semicircle;
}));

rainbow.translation.set(two.width / 2, two.height / 2);

two.bind('update', function(frameCount, timeDelta) {
  
  if (!timeDelta) {
    return;
  }
  
  rainbow.beginning -= rainbow.beginning * 0.0625;
  if (rainbow.beginning <= 0.0001) {
    rainbow.beginning = 1;
  }
  
});

function makeSemiCircle(two, x, y, r) {
  var points = _.map(_.range(Two.Resolution), function (i) {
      var pct = i / (Two.Resolution - 1);
      
      var theta = 2 * -Math.PI * pct;
    
      var x = r * Math.cos(theta);
      var y = r * Math.sin(theta);
      return new Two.Anchor(x, y);
  });
  return two.makeCurve(points, true);
}