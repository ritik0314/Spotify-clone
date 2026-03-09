const songCatalog = {
  dekhaEkKhwaab: {
    name: 'Dekha Ek Khwaab',
    duration: '5:20',
    cover: 'assets/dekhaekkhwaab.jpeg',
    file: 'songs/dekhaekkhwaab.mp3'
  },
  lagJaGale: {
    name: 'Lag Ja Gale',
    duration: '4:18',
    cover: 'assets/lag ja  gale.jpeg',
    file: 'songs/Lag ja gale.mp3'
  },
  ajeebDaastan: {
    name: 'Ajeeb Daastan Hai Ye',
    duration: '5:15',
    cover: 'assets/ajeeb daastan hai ye.jpeg',
    file: 'songs/ajeeb daastan hai ye.mp3'
  },
  neeleNeele: {
    name: 'Neele Neele Amber Par',
    duration: '5:20',
    cover: 'assets/neele neele amber par.jpeg',
    file: 'songs/neele neele amber par.mp3'
  },
  tereJaisa: {
    name: 'Tere Jaisa Yaar Kahan',
    duration: '4:38',
    cover: 'assets/Tere Jaisa Yaar Kahan.jpg',
    file: 'songs/Tere Jaisa Yaar Kahan.mp3'
  },
  oMereDil: {
    name: 'O Mere Dil Ke Chain',
    duration: '4:36',
    cover: 'assets/O Mere dil ke chain.jpeg',
    file: 'songs/O Mere Dil Ke Chain.mp3'
  },
  mereRashke: {
    name: 'Mere Rashke Kamar',
    duration: '3:40',
    cover: 'assets/mere rashke kamar.jpeg',
    file: 'songs/Mere Rashke Qamar-.mp3'
  },
  devaDeva: {
    name: 'Deva Deva',
    duration: '4:39',
    cover: 'assets/deva-deva.jpeg',
    file: 'songs/Deva-Deva.mp3'
  },
  dilToPagal: {
    name: 'Dil To Pagal Hai',
    duration: '5:08',
    cover: 'assets/Dil-To-Pagal-Hai-Hindi.jpg',
    file: 'songs/Dil To Pagal Hai - Kbps.mp3'
  },
  squidGame: {
    name: 'Squid Game Ringtone',
    duration: '0:45',
    cover: 'assets/Sidhu Moose wala.jpeg',
    file: 'songs/squidgameringtone.mp3'
  }
};

const artistMeta = {
  jagjit: { name: 'Jagjit Singh', image: 'assets/Jagjit Singh.jpeg' },
  lata: { name: 'Lata Mangeshkar', image: 'assets/Lata mangeshkar edited.png' },
  kishore: { name: 'Kishore Kumar', image: 'assets/kishore kumar.jpeg' },
  atif: { name: 'Atif Aslam', image: 'assets/atif aslam.jpeg' },
  arijit: { name: 'Arijit Singh', image: 'assets/arijit singh.jpeg' },
  nusrat: { name: 'Nusrat Fateh Ali Khan', image: 'assets/nusrat fateh ali khan.jpeg' },
  rehman: { name: 'A.R Rehman', image: 'assets/A.R. Rehman.jpeg' },
  siddhu: { name: 'Sidhu Moose wala', image: 'assets/Sidhu Moose wala.jpeg' },
  udit: { name: 'Udit Narayan', image: 'assets/Udit Narayan.jpeg' }
};

const artistFacts = {
  jagjit: 'Interesting fact: Jagjit Singh is widely known as the “Ghazal King” for modernizing ghazal music in India.',
  lata: 'Interesting fact: Lata Mangeshkar recorded thousands of songs across many Indian languages over her long career.',
  kishore: 'Interesting fact: Kishore Kumar was a singer, actor, and composer known for his unique yodeling style.',
  atif: 'Interesting fact: Atif Aslam started with pop-rock and became one of the most recognized playback voices in South Asia.',
  arijit: 'Interesting fact: Arijit Singh is known for versatile playback singing and has delivered many chart-topping romantic songs.',
  nusrat: 'Interesting fact: Nusrat Fateh Ali Khan introduced Qawwali music to a global audience.',
  rehman: 'Interesting fact: A.R. Rehman won Academy Awards and is famous for blending Indian classical and modern electronic sounds.',
  siddhu: 'Interesting fact: Sidhu Moose Wala became a global Punjabi music icon through his writing style and vocal presence.',
  udit: 'Interesting fact: Udit Narayan is one of the defining playback voices of 90s Bollywood music.'
};

const artistAliases = {
  jagjit: 'jagjit',
  jagjitsingh: 'jagjit',
  lata: 'lata',
  latamangeshkar: 'lata',
  kishore: 'kishore',
  kishorekumar: 'kishore',
  atif: 'atif',
  atifaslam: 'atif',
  arijit: 'arijit',
  arijitsingh: 'arijit',
  nusrat: 'nusrat',
  nusratfatehalikhan: 'nusrat',
  rehman: 'rehman',
  arrehman: 'rehman',
  arrehaman: 'rehman',
  siddhu: 'siddhu',
  sidhumoosewala: 'siddhu',
  siddhumoosewala: 'siddhu',
  sidhumoosewala: 'siddhu',
  udit: 'udit',
  uditnarayan: 'udit'
};

function normalizeArtistKey(rawArtistKey) {
  const normalized = (rawArtistKey || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

  if (!normalized) {
    return 'lata';
  }

  return artistAliases[normalized] || (artistMeta[normalized] ? normalized : 'lata');
}

function parseDurationToSeconds(durationText) {
  const [minutes, seconds] = durationText.split(':').map((value) => parseInt(value, 10));
  const safeMinutes = Number.isNaN(minutes) ? 0 : minutes;
  const safeSeconds = Number.isNaN(seconds) ? 0 : seconds;
  return (safeMinutes * 60) + safeSeconds;
}

function formatDuration(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes} min ${seconds} sec`;
}

const artistTrackKeys = {
  lata: ['dekhaEkKhwaab', 'lagJaGale', 'ajeebDaastan'],
  kishore: ['neeleNeele', 'tereJaisa', 'oMereDil'],
  nusrat: ['mereRashke', 'lagJaGale', 'ajeebDaastan'],
  arijit: ['devaDeva', 'dilToPagal', 'tereJaisa'],
  jagjit: ['dilToPagal', 'dekhaEkKhwaab', 'lagJaGale'],
  atif: ['devaDeva', 'neeleNeele', 'tereJaisa'],
  rehman: ['devaDeva', 'mereRashke', 'dilToPagal'],
  siddhu: ['squidGame', 'neeleNeele', 'dilToPagal'],
  udit: ['tereJaisa', 'lagJaGale', 'oMereDil']
};

function buildArtistContent(artistKey) {
  const info = artistMeta[artistKey] || artistMeta.lata;
  const trackKeys = artistTrackKeys[artistKey] || artistTrackKeys.lata;
  const songs = trackKeys
    .map((trackKey) => {
      const track = songCatalog[trackKey];
      if (!track) {
        return null;
      }
      return {
        name: track.name,
        artist: info.name,
        duration: track.duration,
        cover: track.cover,
        file: track.file
      };
    })
    .filter(Boolean);

  return {
    title: 'Release Radar',
    subtitle: '',
    introImage: info.image,
    songs
  };
}

const artistContent = Object.keys(artistMeta).reduce((allArtists, key) => {
  allArtists[key] = buildArtistContent(key);
  return allArtists;
}, {});

const rawArtistKey = new URLSearchParams(window.location.search).get('artist') || document.body.dataset.artist || 'lata';
const artistKey = normalizeArtistKey(rawArtistKey);
const fallbackSongs = artistContent.lata.songs;
const artistInfo = artistMeta[artistKey] || { name: 'Featured Artist', image: 'assets/lata mangeshkar.jpeg' };
const pageData = artistContent[artistKey] || {
  title: 'Release Radar',
  subtitle: `Top songs by ${artistInfo.name}.`,
  introImage: artistInfo.image,
  songs: fallbackSongs
};

if (pageData) {
  document.title = `${artistInfo.name} Playlist`;
  document.getElementById('introImage').src = pageData.introImage;
  document.getElementById('playlistTitle').innerText = pageData.title;
  const subtitleElement = document.getElementById('playlistSubtitle');
  subtitleElement.innerText = pageData.subtitle;
  subtitleElement.style.display = pageData.subtitle ? 'block' : 'none';
  const totalDurationInSeconds = pageData.songs.reduce((sum, song) => {
    return sum + parseDurationToSeconds(song.duration);
  }, 0);
  document.getElementById('playlistMeta').innerText = `${pageData.songs.length} songs • ${formatDuration(totalDurationInSeconds)}`;
  document.getElementById('artistFact').innerText = artistFacts[artistKey] || 'Interesting fact: This artist has a unique musical journey and fan following.';

  const songsContainer = document.getElementById('songsContainer');
  songsContainer.innerHTML = pageData.songs
    .map((song, index) => {
      return `
        <div class="songdisplay" data-index="${index}">
          <h3>${index + 1}</h3>
          <img src="${song.cover}" alt="Album Art">
          <div class="songtitle">
            <div class="currsongname">${song.name}</div>
            <div class="currsongartist">${song.artist}</div>
          </div>
          <div class="songduration">${song.duration}</div>
        </div>
      `;
    })
    .join('');

  let songIndex = 0;
  let currentSongIndex = -1;
  const audioElement = new Audio(pageData.songs[0].file);
  const masterPlay = document.getElementById('masterPlay');
  const myProgressBar = document.getElementById('myProgressBar');
  const songDisplays = Array.from(document.getElementsByClassName('songdisplay'));
  const backwardButton = document.getElementById('backwardStep');
  const forwardButton = document.getElementById('forwardStep');

  function updatePlayingState(index) {
    songDisplays.forEach((item) => item.classList.remove('playing'));
    if (index >= 0) {
      songDisplays[index].classList.add('playing');
    }
  }

  function playSong(index) {
    songIndex = index;
    currentSongIndex = index;
    audioElement.src = pageData.songs[index].file;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.replace('fa-circle-play', 'fa-circle-pause');
    updatePlayingState(index);
  }

  masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
      if (currentSongIndex === -1) {
        playSong(songIndex);
      } else {
        audioElement.play();
        masterPlay.classList.replace('fa-circle-play', 'fa-circle-pause');
      }
    } else {
      audioElement.pause();
      masterPlay.classList.replace('fa-circle-pause', 'fa-circle-play');
    }
  });

  audioElement.addEventListener('timeupdate', () => {
    const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = isNaN(progress) ? 0 : progress;
  });

  myProgressBar.addEventListener('input', () => {
    if (audioElement.duration) {
      audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
    }
  });

  songDisplays.forEach((item, index) => {
    item.addEventListener('click', () => {
      if (currentSongIndex === index && !audioElement.paused) {
        audioElement.pause();
        masterPlay.classList.replace('fa-circle-pause', 'fa-circle-play');
        currentSongIndex = -1;
        updatePlayingState(-1);
      } else {
        playSong(index);
      }
    });
  });

  backwardButton.addEventListener('click', () => {
    const previousIndex = (songIndex - 1 + pageData.songs.length) % pageData.songs.length;
    playSong(previousIndex);
  });

  forwardButton.addEventListener('click', () => {
    const nextIndex = (songIndex + 1) % pageData.songs.length;
    playSong(nextIndex);
  });

  audioElement.addEventListener('ended', () => {
    const nextIndex = (songIndex + 1) % pageData.songs.length;
    playSong(nextIndex);
  });
}