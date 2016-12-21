var videofeed;
var img;

var r;
var g;
var b;
var a;

var targetColor = [];
var closestx;
var closesty;




function setup() {
  createCanvas(640, 480);
  videofeed = createCapture(VIDEO);
  videofeed.size(320, 240);

  img = createImage(640, 480);
  img.loadPixels();


  targetColor[0] = 234;
  targetColor[1] = 234;
  targetColor[2] = 234;
  targetColor[3] = 0;

}

function draw() {
  background(255);
  var worldRecord = 500;
  videofeed.loadPixels();


  for (var y = 0; y < videofeed.height; y++) {
    for (var x = 0; x < videofeed.width; x++) {

      var i = (x + y * videofeed.width) * 4;


      r = videofeed.pixels[i];
      g = videofeed.pixels[i + 1];
      b = videofeed.pixels[i + 2];
      a = videofeed.pixels[i + 3];

      var targetR = targetColor[0]
      var targetG = targetColor[1]
      var targetB = targetColor[2]

      var distance = dist(r, g, b, targetR, targetG, targetB);

      if (distance < worldRecord) {
        worldRecord = distance;
        closestx = x;
        closesty = y;
      }
    }
  }


  img.updatePixels();
  image(videofeed, 0, 0);
  
  
  if (worldRecord < 20) {
    fill(targetColor);
    ellipse(closestx, closesty, 15, 15)

  }


}

function mousePressed() {
  targetColor = videofeed.get(mouseX, mouseY);
  console.log(targetColor);
}