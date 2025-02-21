const circleCanvas = document.getElementById("heroCanvas");
const ctx_circle = circleCanvas.getContext("2d");

// Resize canvas properly
function resizeCanvas() {
  circleCanvas.width = window.innerWidth;
  circleCanvas.height = 120; // Adjust height for better visibility
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Perlin-like noise function for smooth waves
function noise(x, offset) {
  return (
    Math.sin((x + offset) * 0.02) * 0.5 +
    Math.sin((x + offset) * 0.04) * 0.3 +
    Math.sin((x + offset) * 0.06) * 0.2
  );
}

// Function to draw smooth flowing waves
let waveOffset = 0; // For animation effect

function drawWaves() {
  ctx_circle.clearRect(0, 0, circleCanvas.width, circleCanvas.height);

  let numLines = 6; // Number of waves
  let amplitude = 25; // Wave height
  let spacing = 18; // Distance between waves
  let topOffset = 20; // Prevent top cut-off
  let bottomOffset = 20; // Prevent bottom cut-off

  for (let j = 0; j < numLines; j++) {
    let yOffse;
    t = j * spacing + topOffset;

    ctx_circle.beginPath();
    for (let x = 0; x < circleCanvas.width; x += 2) {
      let y =
        noise(x, waveOffset + j * 50) * amplitude + yOffset + bottomOffset; // Offset prevents cut-off
      ctx_circle.lineTo(x, y);
    }

    // Beautiful pink-violet gradient effect
    ctx_circle.strokeStyle = `rgba(${200 + j * 5}, ${90 + j * 10}, ${
      250 - j * 20
    }, 0.4)`;

    ctx_circle.lineWidth = 2.5;
    ctx_circle.stroke();
  }

  waveOffset += 0.5; // Slow movement for a flowing effect
  requestAnimationFrame(drawWaves);
}

// Start animation
drawWaves();
