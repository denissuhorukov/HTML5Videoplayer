@echo off
rem Папка со скриптом
set "scriptDir=%~dp0"
rem Папка videos рядом со скриптом
set "videosDir=%scriptDir%videos"

rem Проверка существования папки videos
if not exist "%videosDir%\" (
  echo Folder "%videosDir%" does not exist.
  pause
  exit /b 1
)

rem Удалить старый playlist.txt (если есть)
if exist "%scriptDir%playlist.txt" del /q "%scriptDir%playlist.txt"

rem Перебираем файлы в папке videos и добавляем строки videos/имя в playlist.txt
for /f "delims=" %%F in ('dir /b /a:-d "%videosDir%"') do (
  echo videos/%%F>> "%scriptDir%playlist.txt"
)

echo All set! Playlist saved in "%scriptDir%playlist.txt"
echo Press Enter to continue...
pause >nul