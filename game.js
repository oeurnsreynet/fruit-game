const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
class Fruit {
    constructor(x, y, radius, speedX, speedY, image) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.speedX = speedX;
      this.speedY = speedY;
      this.image = image;
    }
  
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
  
      // Apply "gravity"
      this.speedY += 0.1; 
  
      // Basic bounce off the bottom
      if (this.y + this.radius > canvas.height) {
        this.y = canvas.height - this.radius;
        this.speedY *= -0.8; // Reduce bounce height
      }
    }
  
    draw() {
      ctx.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    }
}

const fruits = [];
const fruitImages = [
  // Load your fruit images here
  // Example:
  { name: 'apple', src: 'apple-img.png' },  // Replace with your image paths
      { name: 'banana', src: 'banana-img.png' },
      { name: 'orange', src: 'orange-img.png' },
      { name: 'bomb', src: 'boom.webp' },
  // ... more fruits
].map(fruit => {
    const img = new Image();
    img.src = fruit.src;
    return { name: fruit.name, image: img };
});

function createFruit() {
    const randomFruit = fruitImages[Math.floor(Math.random() * fruitImages.length)];
    const radius = 30;
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = canvas.height + radius; // Start below the canvas
    const speedX = (Math.random() - 0.5) * 5;
    const speedY = -Math.random() * 10 - 5; // Initial upward speed
    fruits.push(new Fruit(x, y, radius, speedX, speedY, randomFruit.image));
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  
    for (let i = fruits.length - 1; i >= 0; i--) {
      fruits[i].update();
      fruits[i].draw();
  
      if (fruits[i].y > canvas.height * 1.5) {
          fruits.splice(i, 1); // Remove fruit if it goes off-screen
      }
    }
  
      if (Math.random() < 0.02) { // Adjust for fruit frequency
          createFruit();
      }
  
    requestAnimationFrame(gameLoop);
}
  
gameLoop();


