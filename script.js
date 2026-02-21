// JS
const video = document.getElementById('myVideo');
const info = document.getElementById('info');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');

let videos = [];
let currentIndex = 0;

// Загрузить список видео из playlist.txt
async function loadPlaylist() {
  try {
    const response = await fetch('playlist.txt');
    const text = await response.text();
    videos = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);
    
    // Инициализация плеера после загрузки плейлиста
    if (videos.length > 0) loadVideo(0);
  } catch (error) {
    console.error('Ошибка при загрузке плейлиста:', error);
  }
}

// Загрузить плейлист при загрузке страницы
loadPlaylist();

function loadVideo(index) {
  if (index < 0 || index >= videos.length) return;
  // Очистить предыдущие <source>
  while (video.firstChild) video.removeChild(video.firstChild);

  const filename = videos[index];
  const ext = filename.split('.').pop().toLowerCase();
  const mime = ext === 'mp4' ? 'video/mp4' : ext === 'webm' ? 'video/webm' : 'video/ogg';

  const source = document.createElement('source');
  source.src = filename;
  source.type = mime;
  video.appendChild(source);

  // Перезагрузить плеер и начать воспроизведение (если нужно)
  video.load();
  video.play().catch(() => {}); // Autoplay может быть заблокирован браузером

  info.textContent = `Файл: ${index + 1}/${videos.length}`;
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
