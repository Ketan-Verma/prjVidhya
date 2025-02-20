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
  "../assets/flowers/flower2.png",
  "../assets/flowers/flower3.png",
  "../assets/flowers/flower4.png",
  "../assets/flowers/flower5.png",
  "../assets/flowers/flower6.png",
]; // Array of flower image paths

// Linear interpolation function
function lerp(start, end, t) {
  return start + (end - start) * t;
}

// Flower class that randomly selects an image or draws a circle if image fails to load
class Flower {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height; // Start above screen
    this.size = Math.random() * 10 + 5; // Adjust image size
    this.speed = Math.random() * 2 + 1;
    this.angle = Math.random() * Math.PI * 2;
    this.swing = Math.random() * 2;

    // Randomly select an image from the preloaded images
    this.image = new Image();
    const randomImagePath =
      flowerImages[Math.floor(Math.random() * flowerImages.length)];
    this.image.src = randomImagePath;

    // Set an onerror handler to fall back to drawing a circle if the image fails
    this.image.onerror = () => {
      this.isImageLoaded = false;
    };

    // Track if the image has loaded successfully
    this.isImageLoaded = true;
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

    // If image is not loaded, draw a circle as fallback
    if (this.isImageLoaded) {
      ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
    } else {
      ctx.globalAlpha /= 2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size / 2, 0, Math.PI * 2); // Draw a circle instead of the image
      ctx.fillStyle = "#fff"; // Set the circle color (or any color you prefer)
      ctx.fill();
    }

    ctx.globalAlpha = 1; // Reset globalAlpha to 1 for other elements
  }
}

// Function to preload all images and start the animation once done
function preloadImages(imagePaths, callback) {
  let loadedImages = 0;
  const images = [];

  // Loop through image paths and preload each image
  imagePaths.forEach((src, index) => {
    const img = new Image();
    img.onload = () => {
      loadedImages++;
      if (loadedImages === imagePaths.length) {
        // Once all images are loaded, invoke the callback
        callback();
      }
    };
    img.src = src;
    images.push(img);
  });

  return images;
}

// Once all images are loaded, start the flower creation and animation
preloadImages(flowerImages, () => {
  createFlowers();
  animate();
});

// Function to create flower objects
function createFlowers() {
  for (let i = 0; i < 15; i++) {
    flowers.push(new Flower());
  }
}

// Function to animate the flowers
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  flowers.forEach((flower) => {
    flower.update();
    flower.draw();
  });
  requestAnimationFrame(animate);
}
