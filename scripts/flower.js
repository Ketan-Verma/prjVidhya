const canvas = document.getElementById("flowerCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let flowers = [];
const flowerImages = [
  // Replace with actual paths
  "assets/flowers/flower2.png",
  "assets/flowers/flower3.png",
  "assets/flowers/flower4.png",
  "assets/flowers/flower5.png",
  "assets/flowers/flower6.png",
]; // Array of flower image paths

// Linear interpolation function
function lerp(start, end, t) {
  return start + (end - start) * t;
}

// Flower class that randomly selects an image
class Flower {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height; // Start above screen
    this.size = Math.random() * 10 + 5; // Adjust image size
    this.speed = Math.random() * 2 + 1;
    this.angle = Math.random() * Math.PI * 2;
    this.swing = Math.random() * 2;

    // Randomly select an image
    this.image = new Image();
    const randomImagePath =
      flowerImages[Math.floor(Math.random() * flowerImages.length)];
    this.image.src = randomImagePath;
  }

  update() {
    this.y += this.speed;
    this.x += Math.sin(this.angle) * this.swing; // Swinging effect

    // Calculate the t value for lerp based on the y position
    let t = Math.min(1, this.y / canvas.height); // Prevent t from going over 1
    // Use lerp to calculate opacity, starting from 1 (top) to 0 (bottom)
    this.opacity = lerp(1, 0, t);

    if (this.y > canvas.height) {
      this.y = -20; // Reset position to top
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.globalAlpha = this.opacity; // Apply the opacity
    ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
    ctx.globalAlpha = 1; // Reset globalAlpha to 1 for other elements
  }
}

function createFlowers() {
  for (let i = 0; i < 15; i++) {
    flowers.push(new Flower());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  flowers.forEach((flower) => {
    flower.update();
    flower.draw();
  });
  requestAnimationFrame(animate);
}

flowerImages.forEach((imgSrc) => {
  const img = new Image();
  img.src = imgSrc; // Preload all images
});

createFlowers();
animate();
