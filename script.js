const projects = [
  {
    slug: 'education-cloud',
    title: '产教融合教育云平台',
    detailTitle: '产教融合教育云平台1.0 & 2.0',
    keywords: ['产教融合', '用户研究', '信息架构', '组件系统', '设计评审', '多端体验'],
    period: '2021.04–2024.01',
    description: '产教融合教育云平台有PC端和welink小程序端，是以满足社会数字人才需求为宗旨，以促进学生就业和技能提升为目的，面向高校提供教、学、练、测、评、管全流程服务，是OBE教学理念与信息技术手段有机融合。',
    responsibilities: '我负责平台的UI和UX设计，从0到1协助产品经理和用户代表完成市场调查、用户研究、用户使用场景分析等，根据目标人群及特征，深挖用户痛点需求；与前端开发参与竞品分析和重构架构调整，搭建变体组件库；日常组织各级各岗位同事参与设计评审，收集一线用户实际使用体验，通过创新方法解决设计问题。',
    category: '教育数字化 / B端产品',
    pictures: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    galleryPictures: Array.from({ length: 21 }, (unused, index) => `assets/projects/education/${String(index + 4).padStart(2, '0')}.webp`),
    previewPictures: ['04', '05', '10', '16', '24'].map((number) => `assets/projects/education/${number}.webp`),
    gallerySizes: [2404, 2056, 4006, 2424, 3619, 2291, 2458, 1493, 1080, 1698, 1493, 1200, 1200, 1200, 1200, 1200, 2246, 1200, 1428, 1200, 1080].map((height, index) => [index < 9 ? 1928 : index < 20 ? 1924 : 1920, height]),
  },
  {
    slug: 'nonghuitong',
    title: '农惠通APP',
    detailTitle: '农惠通移动端',
    keywords: ['农民新农具', '助农服务', 'UI/UX设计', '品牌标识', '客户共创', '研发协同'],
    period: '2023.05–2023.09',
    description: '农惠通是阳江市重点建设的农民“新农具”，平台围绕“助农、为农、富农”为总目标进行规划和设计。',
    responsibilities: '我负责农惠通移动端UIUX设计、logo、后端操作系统设计。前期和产品经理、项目经理赶赴广州和阳江的客户现场，和客户代表多次沟通了解需求，出多版设计Demo和客户方相关人员讨论，直至产品主视觉风格确定，核心页面的交互和视觉稿。在研发阶段需求出现变动，及时跟进解决各种设计问题。',
    category: '农业服务 / APP设计',
    pictures: [10, 11, 12, 13, 14, 15, 16, 17, 18],
    galleryPictures: ['33', '34', '35', '36', '37', '38', '40', '41', '42', '43', '44'].map((number) => `assets/projects/nonghuitong/${number}.webp`),
    previewPictures: ['34', '35', '33', '40', '42'].map((number) => `assets/projects/nonghuitong/${number}.webp`),
    gallerySizes: [1080, 2056, 1080, 1080, 1780, 1080, 3248, 1080, 1200, 1080, 2738].map((height) => [1920, height]),
  },
  {
    slug: 'yangshan',
    title: '仰膳净菜微信小程序',
    detailTitle: '仰膳净菜小程序',
    keywords: ['健康饮食', '个性化净菜', '小程序设计', '交互原型', '设计规范', '品牌运营'],
    period: '2025.05–2026.05',
    description: '面向家庭健康饮食场景，为不同成员提供个性化净菜购买与膳食建议服务。',
    responsibilities: '我负责仰膳净菜微信小程序设计和部分模块原型设计工作；和产品分析构思产品设计，优化交互流程。制定产品的整体视觉风格，并随着项目沉淀输出UI设计规范；负责品牌运营设计、logo设计等。',
    category: '生鲜电商 / 小程序',
    pictures: [19, 20, 21, 22, 23, 24, 25, 26, 27],
    galleryPictures: Array.from({ length: 28 }, (unused, index) => `assets/projects/yangshan/${String(index + 4).padStart(2, '0')}.webp`),
    previewPictures: ['04', '09', '12', '18', '11'].map((number) => `assets/projects/yangshan/${number}.webp`),
    gallerySizes: [2599, 1638, 2031, 1080, 2002, 1298, 1080, 1200, 1407, 1200, 2480, 1080, 1080, 2200, 1200, 1080, 3312, 1407, 1080, 2082, 1080, 1080, 1080, 3301, 1200, 1407, 1080, 2062].map((height) => [1920, height]),
  },
  {
    slug: 'emerson-scheduling',
    title: 'Emerson排产布序系统',
    detailTitle: '艾默生调度系统',
    keywords: ['生产管理', '资源优化', '任务调度', '系统UI设计', '组件库搭建', '高效交付'],
    period: '2023.11–2024.01',
    description: '艾默生调度系统是面向生产资源优化配置与任务调度的乙方项目，旨在提升生产管理效率。',
    responsibilities: '在项目中担任UI设计师，负责整体UI设计及组件库搭建工作。在紧张的项目周期内，高效完成90余页面的设计任务，设计方案获得客户高度认可，有效保障了项目进度与交付质量。',
    category: '智能制造 / B端产品',
    pictures: [28, 29, 30, 31, 32, 33, 34, 35, 36],
    galleryPictures: Array.from({ length: 10 }, (unused, index) => `assets/projects/emerson/${index + 46}.webp`),
    previewPictures: ['46', '48', '50', '51'].map((number) => `assets/projects/emerson/${number}.webp`),
    gallerySizes: [4024, 3390, 2144, 2529, 2749, 3668, 4302, 2354, 2394, 3433].map((height) => [1920, height]),
  },
  {
    slug: 'operations-visual',
    title: '运营视觉',
    keywords: ['运营设计', '主题视觉', '色彩构图', '图形语言', '视觉识别'],
    category: '运营设计 / 视觉表达',
    pictures: [37, 38, 39, 40, 41, 42, 43, 44, 45],
    galleryPictures: Array.from({ length: 7 }, (unused, index) => `assets/projects/operations/${index + 59}.webp`),
    previewPictures: ['59', '62', '63', '65'].map((number) => `assets/projects/operations/${number}.webp`),
    gallerySizes: [1407, 1080, 3086, 1080, 1407, 1080, 1080].map((height) => [1920, height]),
  },
  {
    slug: 'brand-design',
    title: '品牌网页和其他设计',
    keywords: ['品牌设计', '网页设计', '平面编排', '数字界面', '多媒介表达'],
    category: '品牌 / 网页 / 其他设计',
    pictures: [46, 47, 48, 49, 50, 51, 52, 53, 54],
    galleryPictures: ['05', '57', '58', '66', '67', '68', '69', '70', '71', '72', '73'].map((number) => `assets/projects/other/${number}.webp`),
    previewPictures: ['58', '05', '73'].map((number) => `assets/projects/other/${number}.webp`),
    gallerySizes: [1638, 1080, 4436, 1550, 2094, 1816, 1080, 2634, 1741, 1080, 1174].map((height) => [1920, height]),
  },
];

const cube = document.querySelector('#project-cube');
const scene = document.querySelector('.cube-scene');
const cubeEntry = document.querySelector('.cube-entry');
const projectList = document.querySelector('.project-list');
const projectTrack = document.querySelector('.project-track');
const statusText = document.querySelector('.interaction-status');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const archiveWelcome = new window.ArchiveWelcome(document.querySelector('.archive-welcome'), reducedMotion);
const resumeView = document.querySelector('#about-view');
const resumeRevealTargets = [...resumeView.querySelectorAll('.resume-toolbar, .resume-name, .resume-introduction, .resume-profile, .resume-section-label, .resume-capability-list article, .resume-job, .resume-education-list article, .resume-footer')];
let resumeRevealObserver = null;
let resumeRevealFrame = 0;
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

const picturePath = (picture) => typeof picture === 'string' ? picture : `assets/cube-personal/picture_${picture}.webp?v=8.0`;
const pictureSizes = [
  [960, 780], [811, 960], [857, 960], [960, 899], [960, 712], [912, 960], [960, 820], [960, 745], [338, 290],
  [485, 580], [876, 905], [960, 841], [960, 625], [360, 351], [359, 385], [355, 336], [260, 235], [385, 440],
  [641, 649], [370, 344], [351, 433], [349, 341], [679, 795], [383, 360], [960, 741], [960, 648], [374, 244],
  [960, 890], [380, 441], [960, 788], [551, 358], [960, 547], [561, 541], [395, 396], [371, 325], [369, 320],
  [363, 375], [381, 380], [705, 786], [374, 450], [375, 355], [371, 359], [360, 345], [370, 419], [393, 465],
  [376, 391], [960, 572], [364, 229], [370, 423], [374, 299], [303, 306], [374, 338], [361, 400], [200, 185],
];
const galleryPictures = (project) => project.galleryPictures || project.pictures;
const gallerySizes = new Map(projects.flatMap((project) => project.galleryPictures?.map((picture, index) => [picture, project.gallerySizes?.[index]]) || []));
const archiveCovers = [[1, 5, 6, 7, 8], [11, 12, 13, 14, 17], [19, 23, 25, 26], [28, 29, 30, 32, 33, 36], [37, 38, 41, 44], [46, 47, 48, 49, 51, 54]];
const archiveProjects = ['yangshan', 'nonghuitong', 'emerson-scheduling', 'education-cloud', 'operations-visual', 'brand-design'].map((slug) => projects.find((project) => project.slug === slug));
const projectNotes = [
  { description: '围绕课程、教学与学习任务，探索产教融合场景下的数字化体验。通过清晰的信息层级、统一的组件与视觉语言，连接平台中的不同使用场景。', services: '产品体验 / 界面设计 / 设计规范', platform: '教育数字化 · Web / 移动端' },
  { description: '面向农业服务场景，串联农事信息、农科课堂与个人服务。以轻量清晰的界面组织内容，让信息获取和日常使用更加直观。', services: '用户体验 / APP 设计 / 视觉规范', platform: '农业服务 · 移动应用' },
  { description: '围绕新鲜食材与日常饮食，探索微信小程序中的产品体验。将自然的色彩、亲和的视觉形象与清晰的信息组织融入界面设计。', services: '小程序设计 / 视觉表达 / 品牌延展', platform: '生鲜电商 · 微信小程序' },
  { description: '围绕制造业务中的计划、产能与物料信息，组织复杂的业务界面。通过明确的层级与一致的视觉规则，呈现排产布序系统的多种工作场景。', services: 'B 端体验 / 系统界面 / 数据可视化', platform: '智能制造 · Web 系统' },
  { description: '以不同的主题与传播场景为线索，探索色彩、构图和图形语言。让视觉内容在表达信息的同时，形成鲜明而连贯的识别。', services: '运营设计 / 主题视觉 / 创意表达', platform: '运营活动 · 视觉设计' },
  { description: '关于品牌、网页与更多视觉形式的设计探索。从平面编排到数字界面，寻找适合内容与品牌气质的表达方式。', services: '品牌视觉 / 网页设计 / 平面设计', platform: '品牌传播 · 多媒介设计' },
];
const gallery = document.querySelector('.project-gallery');
const projectDialog = document.querySelector('#project-view');
const paperTransition = new ProjectPaperTransition(projectDialog, gallery, reducedMotion);
let activeGalleryProject = null;
let archiveScrollPosition = 0;
let viewTransitionId = 0;
let projectTrigger = null;

function makeImage(picture, alt, lazy = false, source = picturePath(picture)) {
  const image = document.createElement('img');
  image.loading = lazy ? 'lazy' : 'eager';
  image.fetchPriority = lazy ? 'low' : 'auto';
  image.src = source;
  image.alt = alt;
  image.draggable = false;
  image.decoding = 'async';
  const dimensions = typeof picture === 'number' ? pictureSizes[picture - 1] : gallerySizes.get(picture);
  if (dimensions) {
    [image.width, image.height] = dimensions;
  }
  return image;
}

function createCube() {
  if (cube.dataset.ready) return;
  cube.dataset.ready = 'true';
  for (const face of cube.querySelectorAll('.cube-face')) {
    const definition = faceDefinitions[face.dataset.face];
    for (let cellIndex = 0; cellIndex < 9; cellIndex += 1) {
      const tile = document.createElement('span');
      tile.className = 'cube-tile';
      tile.dataset.tile = String(definition.start + cellIndex);
      const image = makeImage(definition.start + cellIndex, '');
      image.fetchPriority = ['front', 'right', 'top'].includes(face.dataset.face) ? 'high' : 'low';
      tile.append(image);
      face.append(tile);
    }
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
    rotation.pitch += motionElapsed * (4 + Math.sin(motionTime * 0.24) * 7);
    rotation.yaw += motionElapsed * (11 + Math.sin(motionTime * 0.18 + 0.5) * 4);
    rotation.roll += motionElapsed * Math.cos(motionTime * 0.28 + 0.9) * 2.5;
    renderRotation();
    if (isHighlighting) {
      highlightVisibilityElapsed += elapsed;
      if (highlightVisibilityElapsed >= 0.1) {
        keepHighlightsVisible();
        highlightVisibilityElapsed = 0;
      }
    }
  }
  archiveWelcome.tick(timestamp, currentView === 'archive' && !document.hidden);
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
window.addEventListener('focus', () => { lastFrameTime = 0; });
document.addEventListener('visibilitychange', () => {
  lastFrameTime = 0;
  if (document.hidden) {
    stopDragging();
    isSceneHovered = false;
  }
});

function setArchiveHighlight(slug) {
  const archive = document.querySelector('.archive-grid');
  archive.classList.toggle('is-highlighting', Boolean(slug));
  archive.querySelectorAll('.archive-card').forEach((card) => {
    card.classList.toggle('is-group-active', card.dataset.project === slug);
  });
}

function createArchive() {
  const archive = document.querySelector('.archive-grid');
  if (archive.childElementCount) return;
  let tileIndex = 0;
  archiveProjects.forEach((project) => {
    const projectIndex = projects.indexOf(project);
    const pictures = galleryPictures(project);
    const covers = project.previewPictures || (project.galleryPictures ? pictures.slice(0, 5) : archiveCovers[projectIndex]);
    covers.forEach((picture, index) => {
      const card = document.createElement('a');
      card.className = 'archive-card';
      card.dataset.project = project.slug;
      card.dataset.picture = String(picture);
      card.href = `#work/${project.slug}`;
      card.style.setProperty('--tile-index', String(tileIndex++));
      card.setAttribute('aria-label', `查看${project.title}，预览 ${index + 1}，共 ${covers.length} 张`);
      const heading = document.createElement('h2');
      heading.className = 'archive-card-heading';
      const title = document.createElement('span');
      title.className = 'archive-card-title';
      title.textContent = index === 0 ? project.title : '';
      if (index === 0) title.title = project.title;
      const number = document.createElement('span');
      number.className = 'archive-card-number';
      number.textContent = String(index + 1).padStart(2, '0');
      heading.append(title, number);
      const image = document.createElement('span');
      image.className = 'archive-card-image';
      const preview = typeof picture === 'string' ? `assets/previews/${project.slug}/${picture.split('/').pop()}` : picturePath(picture);
      image.append(makeImage(picture, `${project.title}，预览 ${index + 1}`, tileIndex > 7, preview));
      card.append(heading, image);
      archive.append(card);
    });
  });
  archive.addEventListener('pointerover', (event) => {
    if (event.pointerType === 'touch') return;
    const card = event.target.closest('.archive-card');
    if (card) setArchiveHighlight(card.dataset.project);
  });
  archive.addEventListener('click', (event) => {
    const card = event.target.closest('.archive-card');
    if (card && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) projectTrigger = card;
  });
  archive.addEventListener('pointerout', (event) => {
    const next = event.relatedTarget?.closest?.('.archive-card');
    setArchiveHighlight(next && archive.contains(next) ? next.dataset.project : null);
  });
  archive.addEventListener('pointerleave', () => setArchiveHighlight(null));
  archive.addEventListener('focusin', (event) => {
    const card = event.target.closest('.archive-card');
    if (card) setArchiveHighlight(card.dataset.project);
  });
  archive.addEventListener('focusout', (event) => {
    if (!archive.contains(event.relatedTarget)) setArchiveHighlight(null);
  });
}

function showProject(project) {
  activeGalleryProject = project;
  const pictures = galleryPictures(project);
  const projectIndex = projects.indexOf(project);
  const notes = projectNotes[projectIndex];
  document.querySelector('.project-title').textContent = project.detailTitle || project.title;
  const keywords = document.querySelector('.project-keywords');
  keywords.replaceChildren();
  keywords.hidden = !project.keywords?.length;
  project.keywords?.forEach((keyword) => {
    const item = document.createElement('li');
    item.textContent = keyword;
    keywords.append(item);
  });
  const description = document.querySelector('.project-description');
  description.replaceChildren();
  if (project.period) {
    const period = document.createElement('p');
    period.className = 'project-period';
    period.textContent = project.period;
    description.append(period);
  }
  const sections = project.responsibilities
    ? [['项目概述', project.description], ['我的职责', project.responsibilities]]
    : [[null, project.description || notes.description]];
  sections.forEach(([label, content]) => {
    const section = document.createElement('section');
    if (label) {
      const heading = document.createElement('h3');
      heading.textContent = label;
      section.append(heading);
    }
    const paragraph = document.createElement('p');
    paragraph.textContent = content;
    section.append(paragraph);
    description.append(section);
  });
  gallery.replaceChildren();
  pictures.forEach((picture, index) => {
    const figure = document.createElement('figure');
    figure.dataset.picture = String(picture);
    figure.append(makeImage(picture, `${project.title} / ${index + 1}`, index > 0));
    gallery.append(figure);
  });
  const next = archiveProjects[(archiveProjects.indexOf(project) + 1) % archiveProjects.length];
  const nextLink = document.querySelector('.next-project');
  nextLink.setAttribute('aria-label', `下一个项目：${next.title}`);
  nextLink.href = `#work/${next.slug}`;
  if (!projectDialog.open) projectDialog.showModal();
  gallery.focus({ preventScroll: true });
  gallery.scrollTop = 0;
  document.querySelector('.project-overlay-shell').scrollTop = 0;
  document.querySelector('.project-information').scrollTop = 0;
}

function updateResumeMotion(view) {
  resumeRevealObserver?.disconnect();
  cancelAnimationFrame(resumeRevealFrame);
  resumeRevealObserver = null;
  resumeRevealFrame = 0;
  resumeView.classList.remove('is-motion-ready');
  resumeRevealTargets.forEach((target) => {
    target.classList.add('resume-reveal');
    target.classList.remove('is-revealed');
  });
  if (view !== 'about' || reducedMotion.matches || !('IntersectionObserver' in window)) return;
  resumeView.classList.add('is-motion-ready');
  resumeRevealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0, rootMargin: '0px 0px -32px 0px' });
  resumeRevealFrame = requestAnimationFrame(() => {
    resumeRevealFrame = 0;
    resumeRevealTargets.forEach((target) => resumeRevealObserver.observe(target));
  });
}

async function changeView() {
  const transitionId = ++viewTransitionId;
  const scrollbarSpace = innerWidth - document.documentElement.clientWidth;
  const [requestedView, slug] = location.hash.slice(1).split('/');
  const project = projects.find((entry) => entry.slug === slug);
  const view = requestedView === 'work' && project ? 'project' : ['archive', 'about'].includes(requestedView) ? requestedView : 'home';
  const previousView = currentView;
  if (previousView === 'archive') archiveScrollPosition = window.scrollY;
  if (view !== 'project' && projectDialog.open) {
    await paperTransition.close();
    if (transitionId !== viewTransitionId) return;
    projectDialog.close();
  } else {
    paperTransition.cancel();
  }
  if (view === 'home') createCube();
  if (view === 'archive' || view === 'project') createArchive();
  const sources = view === 'project' ? paperTransition.capture(project.slug) : [];
  clearHighlight();
  setArchiveHighlight(null);
  stopDragging();
  isSceneHovered = false;
  lastFrameTime = 0;
  currentView = view;
  if (view === 'project' && previousView !== 'project') document.body.style.paddingRight = `${scrollbarSpace}px`;
  document.body.dataset.view = view;
  document.querySelector('meta[name="theme-color"]').setAttribute('content', view === 'about' ? '#ebebeb' : '#0A0A0A');
  for (const name of ['home', 'archive', 'about']) {
    document.querySelector(`#${name}-view`).hidden = name !== (view === 'project' ? 'archive' : view);
  }
  document.querySelectorAll('.nav-link').forEach((link) => {
    const active = link.dataset.view === (view === 'project' ? 'archive' : view);
    link.classList.toggle('is-current', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  if (view === 'project') {
    showProject(project);
    await paperTransition.open(sources.length ? sources : paperTransition.capture(project.slug));
    if (transitionId !== viewTransitionId) return;
  } else {
    document.body.style.paddingRight = '';
    activeGalleryProject = null;
    window.scrollTo(0, view === 'archive' && previousView === 'project' ? archiveScrollPosition : 0);
    if (view === 'archive' && previousView === 'project' && projectTrigger?.isConnected) projectTrigger.focus({ preventScroll: true });
  }
  document.title = view === 'project' ? `${project.title} — jingjing` : `jingjing — ${view === 'archive' ? '作品展示' : view === 'about' ? '我的简历' : '作品集'}`;
  updateResumeMotion(view);
  if (view === 'archive') archiveWelcome.resize();
}

function closeProject() {
  location.hash = 'archive';
}

document.querySelectorAll('.project-dismiss, .project-mobile-close').forEach((button) => button.addEventListener('click', closeProject));
projectDialog.addEventListener('cancel', (event) => {
  event.preventDefault();
  closeProject();
});
projectDialog.addEventListener('click', (event) => {
  if (event.target === projectDialog) closeProject();
});

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(clearHighlight, 100);
  paperTransition.cancel();
});
window.addEventListener('hashchange', changeView);
reducedMotion.addEventListener('change', () => {
  paperTransition.cancel();
  updateResumeMotion(currentView);
  archiveWelcome.resize();
});
renderRotation();
changeView();
requestAnimationFrame(animateCube);
