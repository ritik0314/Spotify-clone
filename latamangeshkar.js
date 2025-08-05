

let songIndex = 0;
let audioElement = new Audio('dekhaekkhwaab.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let songDisplays = Array.from(document.getElementsByClassName('songdisplay'));
let audioElements = Array.from(document.getElementsByClassName('audio-player'));

let songs = [
  { songName: "Dekha Ek Khwaab", filePath: "dekhaekkhwaab.mp3", coverPath: "dekhaekkhwaab.jpeg" },
  { songName: "Lag Ja Gale", filePath: "Lag ja gale.mp3", coverPath: "lag ja  gale.jpeg" },
  { songName: "Ajeeb Daastan hai ye", filePath: "ajeeb daastan hai ye.mp3", coverPath: "ajeeb daastan hai ye.jpeg" }
];

// Update images and titles dynamically
songDisplays.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName('currsongname')[0].innerText = songs[i].songName;
});

// Play/pause control for master play button
masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.replace('fa-circle-play','fa-circle-pause');
  } else {
    audioElement.pause();
    masterPlay.classList.replace('fa-circle-pause','fa-circle-play');
  }
});

// Progress bar update
audioElement.addEventListener('timeupdate', () => {
  const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = isNaN(progress) ? 0 : progress;
});

// Seek from progress bar
myProgressBar.addEventListener('change', () => {
  audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
});


// Play selected song from list

let currentSongIndex = -1;

songDisplays.forEach((el, index) => {
  el.addEventListener('click', () => {
    if (currentSongIndex === index && !audioElement.paused) {
    audioElement.pause();
    masterPlay.classList.replace('fa-circle-pause','fa-circle-play');
   e.classList.remove('playing')

    // Highlight selected song
    el.classList.add('playing');
    currentSongIndex = -1
  }else{
    playSong(index);
      currentSongIndex = index;
  }
});
});
function playSong(index) {
  audioElement.src = songs[index].filePath;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.replace('fa-circle-play', 'fa-circle-pause');
  
  // Optional: highlight
  songDisplays.forEach(e => e.classList.remove('playing'));
  songDisplays[index].classList.add('playing');
}

// 🎯 Backward and Forward buttons
document.querySelector('.fa-backward-step').addEventListener('click', () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  playSong(songIndex);
});

document.querySelector('.fa-forward-step').addEventListener('click', () => {
  songIndex = (songIndex + 1) % songs.length;
  playSong(songIndex);
});
