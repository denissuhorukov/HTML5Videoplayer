// JS
const video = document.getElementById('myVideo');
const info = document.getElementById('info');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const folderInput = document.getElementById('folderInput');
const setupPanel = document.getElementById('setup-panel');
const playerPanel = document.getElementById('player-panel');

let videos = [];
let currentIndex = 0;
const videoExtensions = ['mp4', 'webm', 'ogg', 'mov', 'avi', 'mkv', 'flv', 'm4v', 'wmv'];

// Обработчик выбора папки
folderInput.addEventListener('change', handleFolderSelect);

function handleFolderSelect(event) {
  const files = Array.from(event.target.files);
  
  // Фильтруем видеофайлы
  videos = files
    .filter(file => {
      const ext = file.name.split('.').pop().toLowerCase();
      return videoExtensions.includes(ext);
    })
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(file => ({
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type || getMimeType(file.name)
    }));
  
  if (videos.length === 0) {
    alert('В выбранной папке не найдено видеофайлов');
    return;
  }
  
  // Скрыть панель выбора и показать плеер
  setupPanel.style.display = 'none';
  playerPanel.style.display = 'block';
  
  // Загрузить первое видео
  loadVideo(0);
}

function getMimeType(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  const mimeTypes = {
    'mp4': 'video/mp4',
    'webm': 'video/webm',
    'ogg': 'video/ogg',
    'mov': 'video/quicktime',
    'avi': 'video/x-msvideo',
    'mkv': 'video/x-matroska',
    'flv': 'video/x-flv',
    'm4v': 'video/x-m4v',
    'wmv': 'video/x-ms-wmv'
  };
  return mimeTypes[ext] || 'video/mp4';
}

function loadVideo(index) {
  if (index < 0 || index >= videos.length) return;
  
  // Очистить предыдущие <source>
  while (video.firstChild) video.removeChild(video.firstChild);

  const videoFile = videos[index];
  
  const source = document.createElement('source');
  source.src = videoFile.url;
  source.type = videoFile.type;
  video.appendChild(source);

  // Перезагрузить плеер и начать воспроизведение
  video.load();
  video.play().catch(() => {}); // Autoplay может быть заблокирован браузером

  info.textContent = `${videoFile.name} — ${index + 1}/${videos.length}`;
  currentIndex = index;
}

function nextVideo() {
  const nextIndex = (currentIndex + 1) % videos.length;
  loadVideo(nextIndex);
}

function prevVideo() {
  const prevIndex = (currentIndex - 1 + videos.length) % videos.length;
  loadVideo(prevIndex);
}

prevButton.addEventListener('click', prevVideo);
nextButton.addEventListener('click', nextVideo);

// Автовоспроизведение следующего видео при окончании текущего
video.addEventListener('ended', nextVideo);
