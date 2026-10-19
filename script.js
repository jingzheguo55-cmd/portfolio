const projects = [
  { slug: 'education-cloud', title: '产教融合教育云平台', category: '教育数字化 / B端产品', pictures: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
  { slug: 'nonghuitong', title: '农惠通APP', category: '农业服务 / APP设计', pictures: [10, 11, 12, 13, 14, 15, 16, 17, 18] },
  { slug: 'yangshan', title: '仰膳净菜微信小程序', category: '生鲜电商 / 小程序', pictures: [19, 20, 21, 22, 23, 24, 25, 26, 27] },
  { slug: 'emerson-scheduling', title: 'Emerson排产布序系统', category: '智能制造 / B端产品', pictures: [28, 29, 30, 31, 32, 33, 34, 35, 36] },
  { slug: 'operations-visual', title: '运营视觉', category: '运营设计 / 视觉表达', pictures: [37, 38, 39, 40, 41, 42, 43, 44, 45] },
  { slug: 'brand-design', title: '品牌网页和其他设计', category: '品牌 / 网页 / 其他设计', pictures: [46, 47, 48, 49, 50, 51, 52, 53, 54] },
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

const picturePath = (picture) => typeof picture === 'string' ? picture : `assets/cube-personal/picture_${picture}.webp?v=4.8`;
const galleryPictures = (project) => project.galleryPictures || project.pictures;
const archiveCovers = [[1, 5, 8], [11, 13, 12], [25, 26, 19], [28, 30, 32], [37, 38, 44], [46, 47, 51]];
const gallery = document.querySelector('.project-gallery');
const thumbnails = document.querySelector('.project-thumbnails');
let activeGalleryProject = null;
let galleryIndex = 0;
let galleryScrollFrame = null;
let galleryDrag = null;
let lastGalleryWheel = 0;
let archiveScrollPosition = 0;

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
}

function clearHighlight() {
  isHighlighting = false;
  highlightVisibilityElapsed = 0;
  cube.classList.remove('is-highlighting');
  cube.dataset.highlightCount = '0';
  projectList.classList.remove('is-highlighting');
  cube.querySelectorAll('.is-lit').forEach((tile) => tile.classList.remove('is-lit'));
  cube.querySelectorAll('[data-preview-picture]').forEach(restoreTileImage);
  projectTrack.querySelectorAll('.is-hovered').forEach((link) => link.classList.remove('is-hovered'));
  statusText.textContent = '';
}

function previewTileImage(tile, picture) {
  tile.dataset.previewPicture = String(picture);
  tile.querySelector('img').src = picturePath(picture);
}

function restoreTileImage(tile) {
  tile.querySelector('img').src = picturePath(Number(tile.dataset.tile));
  delete tile.dataset.previewPicture;
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
  const replacements = randomTiles(candidates.filter((tile) => !tile.classList.contains('is-lit')), hiddenHighlights.length);
  replacements.forEach((tile, index) => {
    const previousTile = hiddenHighlights[index];
    previewTileImage(tile, Number(previousTile.dataset.previewPicture));
    tile.classList.add('is-lit');
    previousTile.classList.remove('is-lit');
    restoreTileImage(previousTile);
  });
}

function highlightProject(link) {
  clearHighlight();
  const project = projects.find((entry) => entry.slug === link.dataset.project);
  if (!project) return;
  const pictures = randomTiles([...project.pictures], project.pictures.length);
  const highlightedTiles = randomTiles(visibleTiles(), pictures.length);
  highlightedTiles.forEach((tile, index) => {
    previewTileImage(tile, pictures[index]);
    tile.classList.add('is-lit');
  });
  isHighlighting = true;
  cube.classList.add('is-highlighting');
  cube.dataset.highlightCount = String(highlightedTiles.length);
  projectList.classList.add('is-highlighting');
  link.classList.add('is-hovered');
  statusText.textContent = `${project.title}：随机点亮 ${highlightedTiles.length} 个可见格子，展示该分类的全部图片。`;
}

projectTrack.addEventListener('pointerover', (event) => {
  if (event.pointerType === 'touch') return;
  const link = event.target.closest('.project-item');
  if (link && !link.classList.contains('is-hovered')) highlightProject(link);
});

projectTrack.addEventListener('pointerout', (event) => {
  const link = event.target.closest('.project-item');
  if (link && !link.contains(event.relatedTarget)) clearHighlight();
});

projectList.addEventListener('pointerleave', clearHighlight);

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
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px 80px 0px', threshold: 0.05 }) : null;
  for (const [projectIndex, project] of projects.entries()) {
    const pictures = galleryPictures(project);
    const row = document.createElement('article');
    row.className = 'archive-project';
    row.dataset.project = project.slug;
    const heading = document.createElement('header');
    heading.className = 'archive-project-heading';
    const title = document.createElement('h2');
    const titleLink = document.createElement('a');
    titleLink.href = `#work/${project.slug}`;
    titleLink.textContent = project.title;
    const number = document.createElement('span');
    number.textContent = String(projectIndex + 1).padStart(2, '0');
    title.append(titleLink, number);
    const category = document.createElement('span');
    category.textContent = `${project.category} / ${String(pictures.length).padStart(2, '0')} IMAGES`;
    heading.append(title, category);
    const previews = document.createElement('div');
    previews.className = 'archive-previews';
    const covers = project.galleryPictures ? pictures.slice(0, 3) : archiveCovers[projectIndex];
    covers.forEach((picture, index) => {
      const link = document.createElement('a');
      link.className = 'archive-preview';
      const imageIndex = pictures.indexOf(picture);
      link.href = `#work/${project.slug}/${imageIndex + 1}`;
      link.setAttribute('aria-label', `查看${project.title}完整图集，预览 ${index + 1}`);
      link.append(makeImage(picture, `${project.title}，预览 ${index + 1}`, projectIndex > 1));
      const caption = document.createElement('span');
      caption.className = 'archive-preview-caption';
      const indexLabel = document.createElement('span');
      indexLabel.textContent = String(index + 1).padStart(2, '0');
      const action = document.createElement('span');
      action.textContent = '查看完整项目 ↗';
      caption.append(indexLabel, action);
      link.append(caption);
      previews.append(link);
    });
    row.append(heading, previews);
    archive.append(row);
    if (observer && !reducedMotion.matches) observer.observe(row);
    else row.classList.add('is-visible');
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
      archive.querySelectorAll('.archive-project').forEach((row) => {
        row.hidden = project.slug !== 'all' && row.dataset.project !== project.slug;
      });
    });
    filters.append(button);
  }
  document.querySelectorAll('.archive-layout button').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelector('#archive-view').dataset.layout = button.dataset.layout;
      document.querySelectorAll('.archive-layout button').forEach((entry) => entry.setAttribute('aria-pressed', String(entry === button)));
    });
  });
}

function updateGalleryCurrent(index) {
  if (!activeGalleryProject) return;
  const pictures = galleryPictures(activeGalleryProject);
  galleryIndex = Math.max(0, Math.min(index, pictures.length - 1));
  [...gallery.children].forEach((figure, figureIndex) => figure.classList.toggle('is-current', figureIndex === galleryIndex));
  [...thumbnails.children].forEach((button, buttonIndex) => {
    if (buttonIndex === galleryIndex) button.setAttribute('aria-current', 'true');
    else button.removeAttribute('aria-current');
  });
  document.querySelector('.gallery-count').textContent = `${String(galleryIndex + 1).padStart(2, '0')} / ${String(pictures.length).padStart(2, '0')}`;
  document.querySelector('.gallery-previous').disabled = galleryIndex === 0;
  document.querySelector('.gallery-next').disabled = galleryIndex === pictures.length - 1;
}

function selectGalleryImage(index, behavior = 'smooth') {
  if (!activeGalleryProject) return;
  updateGalleryCurrent(index);
  const figure = gallery.children[galleryIndex];
  const left = figure.offsetLeft - (gallery.clientWidth - figure.clientWidth) / 2;
  gallery.scrollTo({ left, behavior: reducedMotion.matches ? 'instant' : behavior });
}

function nearestGalleryImage() {
  const center = gallery.scrollLeft + gallery.clientWidth / 2;
  let closestIndex = 0;
  let closestDistance = Infinity;
  [...gallery.children].forEach((figure, index) => {
    const distance = Math.abs(figure.offsetLeft + figure.clientWidth / 2 - center);
    if (distance < closestDistance) {
      closestIndex = index;
      closestDistance = distance;
    }
  });
  return closestIndex;
}

function showProject(project, initialIndex = 0) {
  activeGalleryProject = project;
  const pictures = galleryPictures(project);
  document.querySelector('.project-title').textContent = project.title;
  document.querySelector('.project-meta').textContent = `${project.category} / ${String(pictures.length).padStart(2, '0')} IMAGES`;
  gallery.replaceChildren();
  thumbnails.replaceChildren();
  pictures.forEach((picture, index) => {
    const figure = document.createElement('figure');
    figure.append(makeImage(picture, `${project.title} / ${index + 1}`, Math.abs(index - initialIndex) > 1));
    const caption = document.createElement('figcaption');
    const title = document.createElement('span');
    title.textContent = project.title;
    const number = document.createElement('span');
    number.textContent = String(index + 1).padStart(2, '0');
    caption.append(title, number);
    figure.append(caption);
    gallery.append(figure);
    const thumbnail = document.createElement('button');
    thumbnail.type = 'button';
    thumbnail.setAttribute('aria-label', `查看第 ${index + 1} 张图片`);
    thumbnail.append(makeImage(picture, ''));
    thumbnail.addEventListener('click', () => selectGalleryImage(index));
    thumbnails.append(thumbnail);
  });
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const nextLink = document.querySelector('.next-project');
  nextLink.textContent = '下一个项目 ↗';
  nextLink.setAttribute('aria-label', `下一个项目：${next.title}`);
  nextLink.href = `#work/${next.slug}`;
  updateGalleryCurrent(initialIndex);
  requestAnimationFrame(() => {
    if (currentView === 'project' && activeGalleryProject === project) selectGalleryImage(initialIndex, 'instant');
  });
}

function changeView() {
  const [requestedView, slug, imageNumber] = location.hash.slice(1).split('/');
  const project = projects.find((entry) => entry.slug === slug);
  const view = requestedView === 'work' && project ? 'project' : ['archive', 'about'].includes(requestedView) ? requestedView : 'home';
  const previousView = currentView;
  if (previousView === 'archive') archiveScrollPosition = window.scrollY;
  clearHighlight();
  stopDragging();
  galleryDrag = null;
  gallery.classList.remove('is-dragging');
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
  if (view === 'project') {
    const initialIndex = Math.max(0, Math.min(Math.trunc(Number(imageNumber) || 1) - 1, galleryPictures(project).length - 1));
    showProject(project, initialIndex);
    document.querySelector('.project-title').focus({ preventScroll: true });
  } else {
    activeGalleryProject = null;
  }
  document.title = view === 'project' ? `${project.title} — jingjing` : `jingjing — ${view === 'archive' ? '作品展示' : view === 'about' ? '我的简历' : '作品集'}`;
  window.scrollTo(0, view === 'archive' && previousView === 'project' ? archiveScrollPosition : 0);
}

gallery.addEventListener('scroll', () => {
  if (galleryScrollFrame !== null) return;
  galleryScrollFrame = requestAnimationFrame(() => {
    galleryScrollFrame = null;
    if (currentView === 'project') updateGalleryCurrent(nearestGalleryImage());
  });
}, { passive: true });
document.querySelector('.gallery-previous').addEventListener('click', () => selectGalleryImage(galleryIndex - 1));
document.querySelector('.gallery-next').addEventListener('click', () => selectGalleryImage(galleryIndex + 1));
gallery.addEventListener('wheel', (event) => {
  if (Math.abs(event.deltaX) >= Math.abs(event.deltaY) || event.ctrlKey) return;
  event.preventDefault();
  if (Math.abs(event.deltaY) < 3 || performance.now() - lastGalleryWheel < 450) return;
  lastGalleryWheel = performance.now();
  selectGalleryImage(galleryIndex + Math.sign(event.deltaY));
}, { passive: false });
gallery.addEventListener('pointerdown', (event) => {
  if (event.pointerType !== 'mouse' || event.button !== 0) return;
  galleryDrag = { start: event.clientX, scroll: gallery.scrollLeft };
  gallery.classList.add('is-dragging');
  gallery.setPointerCapture(event.pointerId);
});
gallery.addEventListener('pointermove', (event) => {
  if (galleryDrag) gallery.scrollLeft = galleryDrag.scroll - (event.clientX - galleryDrag.start);
});
function stopGalleryDrag() {
  if (!galleryDrag) return;
  galleryDrag = null;
  gallery.classList.remove('is-dragging');
  selectGalleryImage(nearestGalleryImage());
}
gallery.addEventListener('pointerup', stopGalleryDrag);
gallery.addEventListener('pointercancel', stopGalleryDrag);
gallery.addEventListener('lostpointercapture', stopGalleryDrag);
window.addEventListener('blur', stopGalleryDrag);
window.addEventListener('keydown', (event) => {
  if (currentView !== 'project' || event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key === 'Escape') {
    location.hash = 'archive';
  } else if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? galleryPictures(activeGalleryProject).length - 1 : galleryIndex + (event.key === 'ArrowRight' ? 1 : -1);
    selectGalleryImage(next);
  }
});

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    clearHighlight();
    if (currentView === 'project') selectGalleryImage(galleryIndex, 'instant');
  }, 100);
});
window.addEventListener('hashchange', changeView);
createArchive();
renderRotation();
changeView();
requestAnimationFrame(animateCube);
