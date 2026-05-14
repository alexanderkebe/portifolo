export function initParticleTrail() {
  const canvas = document.createElement('canvas');
  canvas.id = 'cursor-trail';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9998'; // Just below the cursor dot
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width, height;
  const particles = [];

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 2;
      this.speedY = (Math.random() - 0.5) * 2;
      this.color = `rgba(96, 165, 250, ${Math.random() * 0.5 + 0.2})`;
      this.life = 1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life -= 0.02;
      if (this.size > 0.2) this.size -= 0.1;
    }

    draw() {
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.life;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  window.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 2; i++) {
      particles.push(new Particle(e.clientX, e.clientY));
    }
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      if (particles[i].life <= 0) {
        particles.splice(i, 1);
        i--;
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
}
