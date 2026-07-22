// ============================================================
//  Cute Flying Dogs 🐶  — canvas overlay on the landing page
// ============================================================

(function () {
  const canvas = document.getElementById('dogCanvas');
  const ctx    = canvas.getContext('2d');

  // Resize canvas to full viewport
  const resize = () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  // ---- Dog emoji set (cute variety) ----
  const DOG_EMOJIS = ['🐶', '🐕', '🦦', '🐩', '🐺'];

  // ---- Wing flap frames (tiny emoji wings) ----
  const WINGS = ['🐹🐹', '🪶🪶'];

  // ---- Helper: random between min and max ----
  const rnd = (min, max) => Math.random() * (max - min) + min;

  // ---- Dog class ----
  class FlyingDog {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.emoji    = DOG_EMOJIS[Math.floor(Math.random() * DOG_EMOJIS.length)];
      this.size     = rnd(28, 56);          // font size in px
      this.x        = initial ? rnd(0, canvas.width) : -this.size * 2;
      this.y        = rnd(20, canvas.height * 0.85);
      this.speedX   = rnd(0.8, 2.4);        // flies left → right
      this.speedY   = rnd(-0.4, 0.4);       // gentle vertical drift
      this.wobble   = rnd(0, Math.PI * 2);  // phase for sine wobble
      this.wobbleAmp= rnd(6, 18);           // how much it bobs
      this.wobbleSpd= rnd(0.02, 0.05);
      this.flapFrame= 0;
      this.flapTick = 0;
      this.flapRate = Math.floor(rnd(6, 14)); // frames between flaps
      this.rotation = rnd(-0.15, 0.15);      // slight tilt
      this.opacity  = rnd(0.75, 1);
      // cute accessories (random)
      this.hat      = Math.random() < 0.3 ? ['🎩', '👒', '⛑️'][Math.floor(Math.random()*3)] : null;
      this.heart    = Math.random() < 0.25;
    }

    update() {
      this.wobble += this.wobbleSpd;
      this.x      += this.speedX;
      this.y      += this.speedY + Math.sin(this.wobble) * 0.6;
      this.flapTick++;
      if (this.flapTick >= this.flapRate) {
        this.flapTick  = 0;
        this.flapFrame = 1 - this.flapFrame;
      }
      // Reset when off-screen right
      if (this.x > canvas.width + this.size * 2) this.reset();
      // Bounce vertically
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.font        = `${this.size}px serif`;
      ctx.textBaseline= 'middle';

      // Translate to dog position and apply rotation
      ctx.translate(this.x, this.y + Math.sin(this.wobble) * this.wobbleAmp);
      ctx.rotate(this.rotation);

      // Shadow glow for cuteness
      ctx.shadowColor = 'rgba(255, 180, 220, 0.7)';
      ctx.shadowBlur  = 10;

      // Draw tiny wings behind
      ctx.font = `${this.size * 0.55}px serif`;
      ctx.fillText(WINGS[this.flapFrame], -this.size * 0.85, -this.size * 0.1);

      // Draw dog
      ctx.font = `${this.size}px serif`;
      ctx.fillText(this.emoji, 0, 0);

      // Optional hat on top
      if (this.hat) {
        ctx.font = `${this.size * 0.6}px serif`;
        ctx.fillText(this.hat, this.size * 0.1, -this.size * 0.65);
      }

      // Optional floating heart
      if (this.heart) {
        ctx.globalAlpha = this.opacity * Math.abs(Math.sin(this.wobble));
        ctx.font = `${this.size * 0.4}px serif`;
        ctx.fillText('❤️', this.size * 0.5, -this.size * 0.8);
      }

      ctx.restore();
    }
  }

  // ---- Create a pack of 14 dogs ----
  const dogs = Array.from({ length: 14 }, () => new FlyingDog());

  // ---- Animation loop ----
  const loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dogs.forEach(d => { d.update(); d.draw(ctx); });
    requestAnimationFrame(loop);
  };
  loop();
})();
