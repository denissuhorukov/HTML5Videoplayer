// JS
const video = document.getElementById('myVideo');
const info = document.getElementById('info');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

const folderPath = 'videos/'; // Путь на сервере к папке с видео
// Список файлов можно получить с сервера (fetch JSON) или задать вручную:
const videos = [
  
];

let currentIndex = 0;

function loadVideo(index) {
  if (index < 0 || index >= videos.length) return;
  // Очистить предыдущие <source>
  while (video.firstChild) video.removeChild(video.firstChild);

  const filename = videos[index];
  const ext = filename.split('.').pop().toLowerCase();
  const mime = ext === 'mp4' ? 'video/mp4' : ext === 'webm' ? 'video/webm' : 'video/ogg';

  const source = document.createElement('source');
  source.src = folderPath + filename;
  source.type = mime;
  video.appendChild(source);

  // Перезагрузить плеер и начать воспроизведение (если нужно)
  video.load();
  video.play().catch(() => {}); // Autoplay может быть заблокирован браузером

  info.textContent = `Файл: ${filename} — ${index + 1}/${videos.length}`;
  currentIndex = index;
}

function nextVideo() {
  if (currentIndex < videos.length - 1) {
    loadVideo(currentIndex + 1);
  }
}

function prevVideo() {
  if (currentIndex > 0) {
    loadVideo(currentIndex - 1);
  }
}

prevButton.addEventListener('click', prevVideo);
nextButton.addEventListener('click', nextVideo);

// Инициализация
if (videos.length > 0) loadVideo(0);
