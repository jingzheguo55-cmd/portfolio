const projects = [
  { slug: 'education-cloud', title: '产教融合教育云平台', category: '教育数字化 / B端产品', pictures: [14, 26, 30, 32, 34, 38, 42, 50, 52] },
  { slug: 'nonghuitong', title: '农惠通APP', category: '农业服务 / APP设计', pictures: [2, 11, 18, 23, 27, 36, 40, 48, 54] },
  { slug: 'yangshan', title: '仰膳净菜微信小程序', category: '生鲜电商 / 小程序', pictures: [3, 7, 9, 10, 17, 22, 24, 28, 41, 46] },
  { slug: 'emerson-scheduling', title: 'Emerson排产布序系统', category: '智能制造 / B端产品', pictures: [4, 6, 12, 16, 19, 25, 31, 35, 45] },
  { slug: 'operations-visual', title: '运营视觉', category: '运营设计 / 视觉表达', pictures: [1, 5, 13, 15, 20, 33, 37, 44, 51, 53] },
  { slug: 'brand-design', title: '品牌网页和其他设计', category: '品牌 / 网页 / 其他设计', pictures: [8, 21, 29, 39, 43, 47, 49] },
];

const cube = document.querySelector('#project-cube');
const scene = document.querySelector('.cube-scene');
const cubeEntry = document.querySelector('.cube-entry');
const projectList = document.querySelector('.project-list');
const projectTrack = document.querySelector('.project-track');
const statusText = document.querySelector('.interaction-status');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const faceDefinitions = {
  front: { start: 37, normal: [0, 0, 1] },
  right: { start: 1, normal: [1, 0, 0] },
  back: { start: 46, normal: [0, 0, -1] },
  left: { start: 10, normal: [-1, 0, 0] },
  top: { start: 19, normal: [0, -1, 0] },
  bottom: { start: 28, normal: [0, 1, 0] },
};
const rotation = { pitch: -22, yaw: -32, roll: -5 };
let dragState = null;
let isHighlighting = false;
let isSceneHovered = false;
let currentView = 'home';
let lastFrameTime = 0;
let motionTime = 0;
let motionSpeed = 1.5;
let highlightVisibilityElapsed = 0;

const picturePath = (picture) => `assets/cube/picture_${picture}.avif`;
const pictureProject = (picture) => projects.find((project) => project.pictures.includes(picture));

function makeImage(picture, alt, lazy = false) {
  const image = document.createElement('img');
  image.src = picturePath(picture);
  image.alt = alt;
  image.draggable = false;
  image.decoding = 'async';
  if (lazy) image.loading = 'lazy';
  return image;
}

for (const face of cube.querySelectorAll('.cube-face')) {
  const definition = faceDefinitions[face.dataset.face];
  for (let cellIndex = 0; cellIndex < 9; cellIndex += 1) {
    const tile = document.createElement('span');
    tile.className = 'cube-tile';
    tile.dataset.tile = String(definition.start + cellIndex);
    tile.append(makeImage(definition.start + cellIndex, ''));
    face.append(tile);
  }
}

{
  const group = document.createElement('div');
  group.className = 'project-group';
  for (const [index, project] of projects.entries()) {
    const link = document.createElement('a');
    link.className = 'project-item';
    link.href = `#work/${project.slug}`;
    link.dataset.project = project.slug;
    link.setAttribute('aria-label', project.title);
    const number = document.createElement('span');
    number.className = 'project-number';
    number.textContent = String(index + 1).padStart(2, '0');
    number.setAttribute('aria-hidden', 'true');
    const label = document.createElement('span');
    label.className = 'project-label';
    label.textContent = project.title;
    const arrow = document.createElement('i');
    arrow.className = 'project-arrow';
    arrow.textContent = '↗';
    arrow.setAttribute('aria-hidden', 'true');
    link.append(number, label, arrow);
    group.append(link);
  }
  projectTrack.append(group);
  group.children[2].classList.add('is-selected');
}

function clearHighlight() {
  isHighlighting = false;
  highlightVisibilityElapsed = 0;
  cube.classList.remove('is-highlighting');
  cube.dataset.highlightCount = '0';
  projectList.classList.remove('is-highlighting');
  cube.querySelectorAll('.is-lit').forEach((tile) => tile.classList.remove('is-lit'));
  projectTrack.querySelectorAll('.is-hovered').forEach((link) => link.classList.remove('is-hovered'));
  statusText.textContent = '';
}

function visibleTiles() {
  const matrix = new DOMMatrixReadOnly(getComputedStyle(cubeEntry).transform).multiply(new DOMMatrixReadOnly(getComputedStyle(cube).transform));
  const visibleFaces = [...cube.querySelectorAll('.cube-face')].filter((face) => {
    const normal = faceDefinitions[face.dataset.face].normal;
    const facingCamera = normal[0] * matrix.m13 + normal[1] * matrix.m23 + normal[2] * matrix.m33;
    return facingCamera > 0.2;
  });
  return visibleFaces.flatMap((face) => [...face.querySelectorAll('.cube-tile')]);
}

function randomTiles(candidates, count) {
  for (let remaining = candidates.length - 1; remaining > 0; remaining -= 1) {
    const randomIndex = Math.floor(Math.random() * (remaining + 1));
    [candidates[remaining], candidates[randomIndex]] = [candidates[randomIndex], candidates[remaining]];
  }
  return candidates.slice(0, count);
}

function keepHighlightsVisible() {
  const candidates = visibleTiles();
  const visible = new Set(candidates);
  const hiddenHighlights = [...cube.querySelectorAll('.is-lit')].filter((tile) => !visible.has(tile));
  if (!hiddenHighlights.length) return;
  hiddenHighlights.forEach((tile) => tile.classList.remove('is-lit'));
  const replacements = randomTiles(candidates.filter((tile) => !tile.classList.contains('is-lit')), hiddenHighlights.length);
  replacements.forEach((tile) => tile.classList.add('is-lit'));
}

function highlightProject(link) {
  clearHighlight();
  const highlightedTiles = randomTiles(visibleTiles(), 7);
  highlightedTiles.forEach((tile) => tile.classList.add('is-lit'));
  isHighlighting = true;
  cube.classList.add('is-highlighting');
  cube.dataset.highlightCount = String(highlightedTiles.length);
  projectList.classList.add('is-highlighting');
  projectTrack.querySelectorAll('.project-item').forEach((entry) => entry.classList.toggle('is-selected', entry === link));
  link.classList.add('is-hovered');
  statusText.textContent = `${link.getAttribute('aria-label')}：随机点亮 ${highlightedTiles.length} 个可见格子。`;
}

projectTrack.addEventListener('pointerover', (event) => {
  if (event.pointerType === 'touch') return;
  const link = event.target.closest('.project-item');
  if (link && !link.classList.contains('is-hovered')) highlightProject(link);
});

projectList.addEventListener('pointerleave', () => {
  const focusedLink = projectTrack.querySelector('.project-item:focus');
  if (focusedLink) highlightProject(focusedLink);
  else clearHighlight();
});

projectTrack.addEventListener('focusin', (event) => {
  const link = event.target.closest('.project-item');
  if (link) {
    highlightProject(link);
  }
});

projectTrack.addEventListener('focusout', (event) => {
  if (!projectTrack.contains(event.relatedTarget)) clearHighlight();
});

function renderRotation() {
  cube.style.transform = `rotateX(${rotation.pitch}deg) rotateY(${rotation.yaw}deg) rotateZ(${rotation.roll}deg)`;
}

function animateCube(timestamp) {
  const elapsed = lastFrameTime ? Math.min((timestamp - lastFrameTime) / 1000, 0.05) : 0;
  lastFrameTime = timestamp;
  if (currentView === 'home' && !document.hidden && !dragState && !reducedMotion.matches) {
    const targetSpeed = isHighlighting || isSceneHovered ? 0.26 : 1.5;
    motionSpeed += (targetSpeed - motionSpeed) * (1 - Math.exp(-elapsed * 5));
    const motionElapsed = elapsed * motionSpeed;
    motionTime += motionElapsed;
    rotation.pitch = (rotation.pitch + motionElapsed * (4 + Math.sin(motionTime * 0.24) * 7)) % 360;
    rotation.yaw = (rotation.yaw + motionElapsed * (11 + Math.sin(motionTime * 0.18 + 0.5) * 4)) % 360;
    rotation.roll = (rotation.roll + motionElapsed * Math.cos(motionTime * 0.28 + 0.9) * 2.5) % 360;
    renderRotation();
    if (isHighlighting) {
      highlightVisibilityElapsed += elapsed;
      if (highlightVisibilityElapsed >= 0.1) {
        keepHighlightsVisible();
        highlightVisibilityElapsed = 0;
      }
    }
  }
  requestAnimationFrame(animateCube);
}

scene.addEventListener('pointerenter', (event) => {
  if (event.pointerType !== 'touch') isSceneHovered = true;
});
scene.addEventListener('pointerleave', () => { isSceneHovered = false; });

scene.addEventListener('pointerdown', (event) => {
  if (event.pointerType === 'mouse' && event.button !== 0) return;
  clearHighlight();
  dragState = { x: event.clientX, y: event.clientY, pitch: rotation.pitch, yaw: rotation.yaw };
  scene.setPointerCapture(event.pointerId);
});

scene.addEventListener('pointermove', (event) => {
  if (!dragState) return;
  rotation.pitch = dragState.pitch - (event.clientY - dragState.y) * 0.4;
  rotation.yaw = dragState.yaw + (event.clientX - dragState.x) * 0.4;
  renderRotation();
});

const stopDragging = () => { dragState = null; };
scene.addEventListener('pointerup', stopDragging);
scene.addEventListener('pointercancel', stopDragging);
scene.addEventListener('lostpointercapture', stopDragging);
window.addEventListener('blur', stopDragging);

function createArchive() {
  const archive = document.querySelector('.archive-grid');
  for (let picture = 1; picture <= 54; picture += 1) {
    const project = pictureProject(picture);
    const card = document.createElement('a');
    card.className = 'archive-card';
    card.dataset.project = project.slug;
    card.href = `#work/${project.slug}`;
    card.append(makeImage(picture, `${project.title}，图像 ${picture}`, true));
    const caption = document.createElement('span');
    const title = document.createElement('span');
    const index = document.createElement('span');
    title.textContent = project.title;
    index.textContent = String(picture).padStart(2, '0');
    caption.append(title, index);
    card.append(caption);
    archive.append(card);
  }
  const filters = document.querySelector('.archive-filters');
  for (const project of [{ slug: 'all', title: '全部项目' }, ...projects]) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = project.title;
    button.classList.toggle('is-active', project.slug === 'all');
    button.setAttribute('aria-pressed', String(project.slug === 'all'));
    button.addEventListener('click', () => {
      filters.querySelectorAll('button').forEach((filter) => {
        filter.classList.toggle('is-active', filter === button);
        filter.setAttribute('aria-pressed', String(filter === button));
      });
      archive.querySelectorAll('.archive-card').forEach((card) => {
        card.hidden = project.slug !== 'all' && card.dataset.project !== project.slug;
      });
    });
    filters.append(button);
  }
}

function showProject(project) {
  document.querySelector('.project-title').textContent = project.title;
  document.querySelector('.project-meta').textContent = `${project.category} / ${String(project.pictures.length).padStart(2, '0')} IMAGES`;
  const gallery = document.querySelector('.project-gallery');
  gallery.replaceChildren();
  project.pictures.forEach((picture, index) => {
    const figure = document.createElement('figure');
    figure.append(makeImage(picture, `${project.title} / ${index + 1}`, index > 0));
    const caption = document.createElement('figcaption');
    caption.textContent = `${String(index + 1).padStart(2, '0')} / ${project.title.toUpperCase()}`;
    figure.append(caption);
    gallery.append(figure);
  });
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const nextLink = document.querySelector('.next-project');
  nextLink.textContent = `${next.title} ↗`;
  nextLink.href = `#work/${next.slug}`;
}

function changeView() {
  const [requestedView, slug] = location.hash.slice(1).split('/');
  const project = projects.find((entry) => entry.slug === slug);
  const view = requestedView === 'work' && project ? 'project' : ['archive', 'about'].includes(requestedView) ? requestedView : 'home';
  clearHighlight();
  stopDragging();
  isSceneHovered = false;
  currentView = view;
  document.body.dataset.view = view;
  for (const name of ['home', 'archive', 'about', 'project']) document.querySelector(`#${name}-view`).hidden = name !== view;
  document.querySelectorAll('.nav-link').forEach((link) => {
    const active = link.dataset.view === (view === 'project' ? 'archive' : view);
    link.classList.toggle('is-current', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  if (view === 'project') showProject(project);
  document.title = view === 'project' ? `${project.title} — jingjing` : `jingjing — ${view === 'archive' ? '作品展示' : view === 'about' ? '我的简历' : '作品集'}`;
  window.scrollTo(0, 0);
}

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    clearHighlight();
  }, 100);
});
window.addEventListener('hashchange', changeView);
createArchive();
renderRotation();
changeView();
requestAnimationFrame(animateCube);
