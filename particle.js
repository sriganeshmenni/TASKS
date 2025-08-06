const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

const mouse = {
  x: null,
  y: null,
  radius: 250
};

window.addEventListener('mousemove', e => {
  mouse.x = e.x;
  mouse.y = e.y;
});

class Particle {
  constructor(x, y, dirX, dirY, size, color) {
    this.x = x;
    this.y = y;
    this.dirX = dirX;
    this.dirY = dirY;
    this.size = size;
    this.baseSize = size;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 15;
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  update() {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) {
      this.dirX = -this.dirX;
    }
    if (this.y + this.size > canvas.height || this.y - this.size < 0) {
      this.dirY = -this.dirY;
    }

    this.x += this.dirX;
    this.y += this.dirY;

    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < mouse.radius) {
      if (this.size < 8) this.size += 0.4;
    } else {
      if (this.size > this.baseSize) this.size -= 0.2;
    }

    this.draw();
  }
}

function init() {
  particlesArray = [];
  let num = (canvas.height * canvas.width) / 9000;
  for (let i = 0; i < num; i++) {
    let size = Math.random() * 2 + 1;
    let x = Math.random() * (canvas.width - size * 2);
    let y = Math.random() * (canvas.height - size * 2);
    let dirX = (Math.random() - 0.5) * 1.2;
    let dirY = (Math.random() - 0.5) * 1.2;
    let color = `rgba(${Math.floor(Math.random()*200+55)},${Math.floor(Math.random()*200+55)},${Math.floor(Math.random()*200+55)},0.8)`;
    particlesArray.push(new Particle(x, y, dirX, dirY, size, color));
  }
}

function connectLines() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a + 1; b < particlesArray.length; b++) {
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = dx * dx + dy * dy;

      if (distance < 16000) {
        let opacity = 1 - distance / 16000;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => p.update());
  connectLines();
}

window.addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  init();
});

init();
animate();
