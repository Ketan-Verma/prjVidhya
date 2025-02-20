const canvas = document.getElementById("flowerCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let flowers = [];
const flowerImg = new Image();
flowerImg.src = "../assets/flowers/pink flower 2.png"; //"../assets/flowers/flower.png"; // Replace with the correct path

class Flower {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height; // Start above screen
    this.size = Math.random() * 20 + 5; // Adjust image size
    this.speed = Math.random() * 2 + 1;
    this.angle = Math.random() * Math.PI * 2;
    this.swing = Math.random() * 2;
  }

  update() {
    this.y += this.speed;
    this.x += Math.sin(this.angle) * this.swing; // Swinging effect
    if (this.y > canvas.height) {
      this.y = -20; // Reset position to top
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.drawImage(flowerImg, this.x, this.y, this.size, this.size);
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

flowerImg.onload = () => {
  createFlowers();
  animate();
};
