class ProjectPaperTransition {
  constructor(dialog, gallery, reducedMotion) {
    this.dialog = dialog;
    this.gallery = gallery;
    this.reducedMotion = reducedMotion;
    this.sequence = 0;
    this.animations = [];
    this.layer = null;
    this.sources = [];
    this.renderer = null;
  }

  capture(slug) {
    return [...document.querySelectorAll('.archive-card')]
      .filter((card) => card.dataset.project === slug && !card.hidden)
      .map((card) => {
        const image = card.querySelector('img');
        return { card, image, picture: card.dataset.picture, rect: this.rectangle(card.querySelector('.archive-card-image')) };
      })
      .filter((source) => source.rect.width > 0 && source.rect.height > 0);
  }

  rectangle(element) {
    const rect = element.getBoundingClientRect();
    return { left: rect.left, top: rect.top, width: rect.width, height: rect.height };
  }

  animate(element, keyframes, options) {
    const animation = element.animate(keyframes, { fill: 'both', ...options });
    this.animations.push(animation);
    return animation.finished.catch(() => {});
  }

  cancel() {
    const flying = this.renderer?.bounds() || new Map();
    this.layer?.querySelectorAll('.paper-sheet').forEach((sheet) => {
      flying.set(sheet.dataset.picture, this.rectangle(sheet));
    });
    this.sequence += 1;
    this.renderer?.dispose();
    this.renderer = null;
    this.animations.forEach((animation) => animation.cancel());
    this.animations = [];
    this.layer?.remove();
    this.layer = null;
    this.dialog.classList.remove('is-paper-transition', 'is-paper-closing', 'is-paper-preparing');
    this.dialog.removeAttribute('aria-busy');
    document.querySelectorAll('.paper-source-hidden').forEach((element) => element.classList.remove('paper-source-hidden'));
    return flying;
  }

  createLayer() {
    this.layer = document.createElement('div');
    this.layer.className = 'paper-transition-layer';
    this.layer.setAttribute('aria-hidden', 'true');
    this.dialog.append(this.layer);
    this.dialog.classList.add('is-paper-transition');
    this.dialog.setAttribute('aria-busy', 'true');
    try {
      this.renderer = new ProjectPaperRenderer(this.layer);
    } catch {
      this.renderer = null;
    }
  }

  sheet(source) {
    const sheet = document.createElement('div');
    sheet.className = 'paper-sheet';
    sheet.dataset.picture = source.picture;
    const image = source.image.cloneNode();
    image.removeAttribute('loading');
    image.alt = '';
    sheet.append(image);
    this.layer.append(sheet);
    return sheet;
  }

  frame(rect, angle = 0, turn = 0, shadow = 0) {
    return {
      width: `${Math.max(1, rect.width)}px`,
      height: `${Math.max(1, rect.height)}px`,
      transform: `translate3d(${rect.left}px, ${rect.top}px, 0) rotateY(${turn}deg) rotateZ(${angle}deg)`,
      boxShadow: `0 ${shadow}px ${shadow * 3}px rgb(30 30 25 / ${shadow ? '.16' : '0'})`,
    };
  }

  fly(source, from, to, { duration, delay, order }) {
    const mesh = this.renderer?.animate(source, from, to, { duration, delay, order });
    if (mesh) return mesh;
    const sheet = this.sheet(source);
    sheet.style.zIndex = String(order);
    return this.animate(sheet, [
      this.frame(from),
      this.frame(to),
    ], { duration, delay, easing: 'cubic-bezier(.42,0,.22,1)' });
  }

  visibleStack(rect, index) {
    const work = this.rectangle(this.dialog.querySelector('.project-work'));
    const width = Math.min(rect.width || work.width * .8, work.width * .88);
    const height = Math.min(rect.height || width * .8, innerHeight * .64);
    return {
      left: work.left + (work.width - width) / 2 + (index - 2) * 7,
      top: Math.max(40, Math.min(work.top + 90 + index * 13, innerHeight - height - 30)),
      width,
      height,
    };
  }

  async open(sources) {
    this.cancel();
    this.sources = sources;
    if (this.reducedMotion.matches || !sources.length) return;
    const sequence = this.sequence;
    this.createLayer();
    this.dialog.classList.add('is-paper-preparing');
    const targets = [...this.gallery.querySelectorAll('figure')];
    await Promise.race([
      Promise.all(targets.slice(0, 2).map((figure) => figure.querySelector('img').decode().catch(() => {}))),
      new Promise((resolve) => setTimeout(resolve, 250)),
    ]);
    if (sequence !== this.sequence || !this.dialog.open) return;
    this.dialog.classList.remove('is-paper-preparing');
    const shell = this.dialog.querySelector('.project-overlay-shell');
    const information = this.dialog.querySelector('.project-information');
    const jobs = [
      this.animate(shell, [{ opacity: 0 }, { opacity: 1 }], { duration: 650, easing: 'cubic-bezier(.4,0,.2,1)' }),
      this.animate(information, [{ opacity: 0, transform: 'translateY(32px)' }, { opacity: 1, transform: 'none' }], { duration: 700, delay: 175, easing: 'cubic-bezier(.22,1,.36,1)' }),
    ];
    sources.forEach((source, index) => {
      const figure = targets.find((target) => target.dataset.picture === source.picture);
      if (!figure) return;
      const targetImage = figure.querySelector('img');
      const destination = this.rectangle(targetImage);
      if (!destination.height) destination.height = destination.width * source.rect.height / source.rect.width;
      source.card.querySelector('.archive-card-image').classList.add('paper-source-hidden');
      jobs.push(this.fly(source, source.rect, destination, { duration: 1000 - (sources.length - 1) * 30, delay: index * 30, order: sources.length - index }));
    });
    await Promise.all(jobs);
    if (sequence === this.sequence) this.cancel();
  }

  async close() {
    const flying = this.cancel();
    if (this.reducedMotion.matches || !this.dialog.open) return;
    const sequence = this.sequence;
    const targets = [...this.gallery.querySelectorAll('figure')];
    const sources = this.sources.map((source) => ({
      ...source,
      rect: this.rectangle(source.card.querySelector('.archive-card-image')),
    })).filter((source) => source.rect.width > 0 && source.rect.height > 0);
    this.createLayer();
    this.dialog.classList.add('is-paper-closing');
    const jobs = [this.animate(this.dialog.querySelector('.project-overlay-shell'), [
      { opacity: 1 },
      { opacity: 0 },
    ], { duration: 650, delay: 100, easing: 'cubic-bezier(.4,0,.2,1)' })];
    sources.forEach((source, index) => {
      const figure = targets.find((target) => target.dataset.picture === source.picture);
      if (!figure) return;
      const target = this.rectangle(figure.querySelector('img'));
      const visible = target.top < innerHeight && target.top + target.height > 0;
      const origin = flying.get(source.picture) || (visible ? target : this.visibleStack(target, index));
      source.card.querySelector('.archive-card-image').classList.add('paper-source-hidden');
      jobs.push(this.fly(source, origin, source.rect, { duration: 1000 - (sources.length - 1) * 30, delay: (sources.length - index - 1) * 30, order: index + 1 }));
    });
    await Promise.all(jobs);
    if (sequence === this.sequence) this.cancel();
  }
}
