let img1;
let img2;
let increment, tileSize;
let increments = [5, 10, 15]; // tile size increments
let currentIncrement = 0;

function setup() {
  createCanvas(750, 750);
  increment = increments[currentIncrement];
  tileSize = increment;
  loadImages();
}

function loadImages() {
  img1 = loadImage("flower.png", function() {
    img1.resize(width / 2, height / 2); // Resize the original image
    img1.loadPixels(); // Load pixels of the resized original image
    drawImage(img1, 0);
  });
  img2 = loadImage("kiwi.jpg", function() {
    img2.resize(width / 2, height / 2); // Resize the original image
    img2.loadPixels(); // Load pixels of the resized original image
    drawImage(img2, height / 2);
  });
}

function drawImage(img, yOffset) {
  // Reset translation to the default state
  resetMatrix();
  
  // Display the original image
  image(img, 0, yOffset);

  // Draw the image generated with pixels
  // Begin drawing from the right side of the canvas
  translate(width / 2, yOffset);

  // Loop through each pixel of the image
  for (let j = 0; j < img.height; j += increment) {
    for (let i = 0; i < img.width; i += increment) {
      const pixelIndex = (i + j * img.width) * 4;
      // Extract color values
      const r = img.pixels[pixelIndex + 0];
      const g = img.pixels[pixelIndex + 1];
      const b = img.pixels[pixelIndex + 2];

      // Set fill color based on pixel color
      fill(r, g, b);
      
      ellipse(i + increment / 2, j + increment / 2, tileSize, tileSize);
    }
  }
}

function mousePressed() {
  // Cycle through different increments
  currentIncrement = (currentIncrement + 1) % increments.length;
  increment = increments[currentIncrement];
  tileSize = increment;
  redrawCanvas();
}

function redrawCanvas() {
  clear(); // Clear the canvas
  loadImages(); // Load images again with the updated increment
}
