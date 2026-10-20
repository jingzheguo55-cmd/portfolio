class ArchiveWelcome {
  constructor(root, reducedMotion) {
    this.root = root;
    this.stage = root.querySelector('.archive-welcome-stage');
    this.toggle = root.querySelector('.archive-welcome-toggle');
    this.images = [...root.querySelectorAll('.archive-welcome-static img')].map((image) => image.getAttribute('src'));
    this.reducedMotion = reducedMotion;
    this.glyphs = [];
    this.time = 0;
    this.cycleTime = 0;
    this.bend = 0;
    this.bendVelocity = 0;
    this.lastTime = 0;
    this.paused = false;
    this.visible = !('IntersectionObserver' in window);
    this.toggle.addEventListener('click', () => {
      this.paused = !this.paused;
      this.toggle.textContent = this.paused ? '播放动画 ▶' : '暂停动画 Ⅱ';
      this.toggle.setAttribute('aria-label', this.paused ? '播放欢迎动画' : '暂停欢迎动画');
      this.toggle.setAttribute('aria-pressed', String(this.paused));
    });
    if ('IntersectionObserver' in window) {
      this.visibilityObserver = new IntersectionObserver((entries) => {
        this.visible = entries[0].isIntersecting;
      });
      this.visibilityObserver.observe(root);
    }
    if ('ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver(() => this.resize());
      this.resizeObserver.observe(root);
    } else {
      window.addEventListener('resize', () => this.resize());
    }
    this.resize();
  }

  createGlyph(character) {
    const isImage = typeof character === 'object';
    const node = document.createElement(isImage ? 'img' : 'span');
    node.className = 'archive-welcome-glyph';
    if (isImage) {
      node.classList.add('archive-welcome-image');
      node.src = character.src;
      node.alt = '';
      node.draggable = false;
    } else {
      node.textContent = character;
    }
    return node;
  }

  resize() {
    this.lastTime = 0;
    if (this.reducedMotion.matches) {
      this.root.classList.remove('is-animated');
      this.stage.replaceChildren();
      this.glyphs = [];
      return;
    }
    const width = this.root.clientWidth;
    if (!width) return;
    this.width = width;
    this.height = this.root.clientHeight;
    this.root.classList.add('is-animated');
    const pattern = [
      ...'Welcome ', { src: this.images[0] },
      ...' to my ', { src: this.images[1] },
      ...' UI/UX ', { src: this.images[2] },
      ...' portfolio.   ',
    ];
    const samples = pattern.map((character) => this.createGlyph(character));
    this.stage.replaceChildren(...samples);
    const widths = samples.map((node) => node.getBoundingClientRect().width);
    this.unitWidth = widths.reduce((total, size) => total + size, 0);
    if (!this.unitWidth) {
      this.root.classList.remove('is-animated');
      return;
    }
    this.fontSize = parseFloat(getComputedStyle(this.stage).fontSize);
    this.amplitude = Math.min(this.height * .15, this.fontSize * .42);
    this.wavelength = Math.max(width * .9, this.fontSize * 11);
    const previousDuration = this.cycleDuration || 1;
    this.travelDuration = Math.max(6.5, Math.min(9, this.unitWidth / Math.max(90, width * .23)));
    this.cycleDuration = this.travelDuration + .7;
    this.cycleTime = this.cycleTime / previousDuration * this.cycleDuration;
    const copies = Math.ceil(width / this.unitWidth) + 1;
    const fragment = document.createDocumentFragment();
    this.glyphs = [];
    for (let copy = -1; copy <= copies; copy++) {
      let offset = copy * this.unitWidth;
      samples.forEach((sample, index) => {
        const node = sample.cloneNode(true);
        fragment.append(node);
        this.glyphs.push({ node, offset: offset + widths[index] / 2, width: widths[index], image: sample.tagName === 'IMG' });
        offset += widths[index];
      });
    }
    this.stage.replaceChildren(fragment);
    this.render();
  }

  motionAt(cycleTime) {
    const progress = Math.max(0, Math.min(1, (cycleTime - .2) / this.travelDuration));
    const remaining = 1 - progress;
    return {
      distance: progress ** 3 * (10 - 15 * progress + 6 * progress ** 2),
      speed: 16 * progress ** 2 * remaining ** 2,
      acceleration: 60 * progress * remaining * (1 - 2 * progress) / (10 / Math.sqrt(3)),
    };
  }

  render() {
    const motion = this.motionAt(this.cycleTime);
    const travel = motion.distance * this.unitWidth;
    const amplitude = this.amplitude * (.5 + .5 * motion.speed);
    this.glyphs.forEach((glyph) => {
      const position = glyph.offset - travel;
      if (position < -glyph.width || position > this.width + glyph.width) {
        glyph.node.style.visibility = 'hidden';
        return;
      }
      const phase = position / this.wavelength * Math.PI * 2 + Math.sin(this.time * .45) * .2;
      const vertical = this.height / 2 + Math.sin(phase) * amplitude;
      const slope = Math.cos(phase) * amplitude * Math.PI * 2 / this.wavelength;
      const angle = (Math.atan(slope) + this.bend * (glyph.image ? 1.25 : 1)) * 180 / Math.PI;
      glyph.node.style.visibility = 'visible';
      glyph.node.style.transform = `translate3d(${position}px, ${vertical}px, 0) translate(-50%, -50%) rotate(${angle}deg)`;
    });
  }

  tick(timestamp, active) {
    if (!active || !this.visible || this.paused || this.reducedMotion.matches || !this.glyphs.length) {
      this.lastTime = 0;
      return;
    }
    if (this.lastTime) {
      const elapsed = Math.min((timestamp - this.lastTime) / 1000, .06);
      this.time += elapsed;
      this.cycleTime = (this.cycleTime + elapsed) % this.cycleDuration;
      const targetBend = this.motionAt(this.cycleTime).acceleration * .11;
      let remaining = elapsed;
      while (remaining > 0) {
        const step = Math.min(remaining, 1 / 120);
        this.bendVelocity += (90 * (targetBend - this.bend) - 13 * this.bendVelocity) * step;
        this.bend += this.bendVelocity * step;
        remaining -= step;
      }
    }
    this.lastTime = timestamp;
    this.render();
  }
}

window.ArchiveWelcome = ArchiveWelcome;
