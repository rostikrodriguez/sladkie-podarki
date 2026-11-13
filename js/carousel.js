// Барабан: палец и мышь двигают ленту, после отпускания она доезжает по инерции
// и встаёт ровно на позицию. Резкий жест проскакивает несколько делений,
// но не больше maxInertia за один бросок.

const REEL_DECAY = 0.0034;
const REEL_SLOW_COAST = 0.5;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function landingTarget(startPos, pos, velocity, maxInertia) {
  const coast = clamp(velocity / REEL_DECAY, -maxInertia, maxInertia);
  const dragged = pos - startPos;
  if (Math.abs(coast) < REEL_SLOW_COAST) {
    if (Math.abs(dragged) >= 0.5) return Math.round(pos);
    if (Math.abs(dragged) > 0.06) return Math.round(startPos) + Math.sign(dragged);
    return Math.round(pos);
  }
  return Math.round(pos + coast);
}

class Reel {
  constructor(viewport, items, options) {
    this.viewport = viewport;
    this.items = items;
    this.n = items.length;
    this.maxInertia = options.maxInertia;
    this.onIndex = options.onIndex;
    this.onTap = options.onTap;
    this.pos = 0;
    this.spacing = 1;
    this.dragging = false;
    this.pointerId = null;
    this.dragDistance = 0;
    this.anim = null;
    this.animTarget = null;
    this.reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this._build();
    this._bind();
    this._measure();
    this._render();
    this._observer = new ResizeObserver(() => {
      this._measure();
      this._render();
    });
    this._observer.observe(viewport);
  }

  get index() {
    return ((Math.round(this.pos) % this.n) + this.n) % this.n;
  }

  _build() {
    this.cards = this.items.map((item) => {
      const card = document.createElement("article");
      card.className = "card";
      const img = document.createElement("img");
      img.alt = "";
      img.draggable = false;
      img.src = item.image;
      card.append(img);
      this.viewport.append(card);
      return card;
    });
  }

  _measure() {
    const width = this.viewport.clientWidth;
    if (width > 0) this.spacing = width * 0.58;
  }

  _delta(index) {
    let delta = index - this.pos;
    delta %= this.n;
    if (delta > this.n / 2) delta -= this.n;
    if (delta < -this.n / 2) delta += this.n;
    return delta;
  }

  _render() {
    for (let i = 0; i < this.n; i += 1) {
      const delta = this._delta(i);
      const card = this.cards[i];
      const distance = Math.abs(delta);
      if (distance > 2.35) {
        card.style.visibility = "hidden";
        continue;
      }
      const x = delta * this.spacing;
      const rot = clamp(delta * -16, -28, 28);
      const scale = distance < 0.05 ? 1.12 : Math.max(0.62, 1 - Math.min(distance, 1.8) * 0.34);
      const depth = (1 - Math.min(distance, 2) / 2) * 58;
      card.style.visibility = "visible";
      card.style.opacity = String(Math.max(0.3, 1 - distance * 0.36));
      card.style.zIndex = String(Math.round((3 - distance) * 10));
      card.style.transform =
        "translate3d(calc(-50% + " + x + "px), -46%, " + depth + "px) rotateY(" + rot + "deg) scale(" + scale + ")";
    }
    this.onIndex(this.index);
  }

  _bind() {
    const viewport = this.viewport;
    viewport.addEventListener("pointerdown", (event) => {
      if (event.button !== 0) return;
      this._stopAnim();
      this.dragging = true;
      this.pointerId = event.pointerId;
      this.lastX = event.clientX;
      this.lastT = performance.now();
      this.samples = [];
      this.startPos = this.pos;
      this.dragDistance = 0;
      viewport.classList.add("is-dragging");
      try { viewport.setPointerCapture(event.pointerId); } catch (error) { /* синтетические события */ }
      event.preventDefault();
    });
    viewport.addEventListener("pointermove", (event) => {
      if (!this.dragging || event.pointerId !== this.pointerId) return;
      const now = performance.now();
      const dx = event.clientX - this.lastX;
      const dt = now - this.lastT;
      this.dragDistance += Math.abs(dx);
      this.pos -= dx / this.spacing;
      if (dt > 0) {
        this.samples.push({ v: (-dx / this.spacing) / dt, t: now });
        const cutoff = now - 90;
        this.samples = this.samples.filter((sample) => sample.t >= cutoff);
      }
      this.lastX = event.clientX;
      this.lastT = now;
      this._render();
    });
    const end = (event) => {
      if (!this.dragging || event.pointerId !== this.pointerId) return;
      this._finish();
    };
    viewport.addEventListener("pointerup", end);
    viewport.addEventListener("pointercancel", end);
    viewport.addEventListener("lostpointercapture", end);
  }

  _finish() {
    if (!this.dragging) return;
    this.dragging = false;
    this.viewport.classList.remove("is-dragging");
    if (this.dragDistance < 10 && this.onTap) {
      this.pos = this.startPos;
      this._normalize();
      this._render();
      this.onTap(this.index);
      return;
    }
    const now = performance.now();
    const recent = (this.samples || []).filter((sample) => now - sample.t < 100);
    let velocity = 0;
    if (recent.length) {
      velocity = recent.reduce((sum, sample) => sum + sample.v, 0) / recent.length;
    }
    const target = landingTarget(this.startPos, this.pos, velocity, this.maxInertia);
    this._animateTo(target);
  }

  step(direction) {
    const origin = this.animTarget == null ? Math.round(this.pos) : this.animTarget;
    this._animateTo(origin + direction);
  }

  _animateTo(target) {
    this._stopAnim();
    const from = this.pos;
    const distance = target - from;
    if (distance === 0) {
      this.pos = target;
      this._normalize();
      this._render();
      return;
    }
    const duration = this.reduceMotion
      ? 1
      : Math.min(1100, Math.max(340, Math.abs(distance) * 150));
    const started = performance.now();
    this.animTarget = target;
    const tick = (now) => {
      const t = Math.min(1, (now - started) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      this.pos = from + distance * eased;
      this._render();
      if (t < 1) {
        this.anim = requestAnimationFrame(tick);
      } else {
        this.pos = target;
        this.anim = null;
        this.animTarget = null;
        this._normalize();
        this._render();
      }
    };
    this.anim = requestAnimationFrame(tick);
  }

  _stopAnim() {
    if (this.anim) cancelAnimationFrame(this.anim);
    this.anim = null;
    this.animTarget = null;
  }

  _normalize() {
    this.pos = ((this.pos % this.n) + this.n) % this.n;
  }
}
