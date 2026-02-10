#!/usr/bin/env bash

# Directory of this script
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Directory "videos" next to the script
videos_dir="${script_dir}/videos"

# Check that the videos folder exists
if [[ ! -d "$videos_dir" ]]; then
    echo "Folder \"$videos_dir\" does not exist."
    read -rp "Press Enter to continue..."
    exit 1
fi

# Remove old playlist.txt if it exists
playlist_file="${script_dir}/playlist.txt"
[[ -f "$playlist_file" ]] && rm -f "$playlist_file"

# Iterate over files in the videos folder and add lines "videos/filename" to playlist.txt
while IFS= read -r -d '' file; do
    echo "videos/$(basename "$file")" >> "$playlist_file"
done < <(find "$videos_dir" -maxdepth 1 -type f -print0)

echo "All set! Playlist saved in \"$playlist_file\""
read -rp "Press Enter to continue..."
