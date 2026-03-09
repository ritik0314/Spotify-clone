const homeRightPanel = document.getElementById('homeRightPanel');
const artistRightPanel = document.getElementById('artistRightPanel');
const artistFrame = document.getElementById('artistFrame');
const backToHomeBtn = document.getElementById('backToHomeBtn');

function resolveAppUrl(path) {
    const currentDirectory = window.location.pathname.endsWith('/')
        ? window.location.pathname
        : window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
    return new URL(path, `${window.location.origin}${currentDirectory}`).toString();
}

async function openInRightPanel(url) {
    homeRightPanel.style.display = 'none';
    artistRightPanel.style.display = 'flex';
    artistFrame.src = resolveAppUrl(url);
}

function openArtistInSamePage(artist) {
    openInRightPanel(`artist.html?artist=${artist}`);
}

function showHomePanel() {
    artistRightPanel.style.display = 'none';
    homeRightPanel.style.display = 'block';
    artistFrame.src = '';
}

const progressBar = document.getElementById('myProgressBar');
const nowPlayingText = document.getElementById('nowPlayingText');
const backwardBtn = document.querySelector('.icons .fa-backward-step');
const playPauseBtn = document.querySelector('.icons .fa-circle-play');
const forwardBtn = document.querySelector('.icons .fa-forward-step');
const songCards = Array.from(document.querySelectorAll('.song-card'));
const homeAudio = new Audio();
let currentSongIndex = -1;

function updatePlayPauseIcon(isPlaying) {
    if (!playPauseBtn) {
        return;
    }

    if (isPlaying) {
        playPauseBtn.classList.remove('fa-circle-play', 'fa-regular');
        playPauseBtn.classList.add('fa-circle-pause', 'fa-solid');
    } else {
        playPauseBtn.classList.remove('fa-circle-pause', 'fa-solid');
        playPauseBtn.classList.add('fa-circle-play', 'fa-regular');
    }
}

function setActiveSongCard(index) {
    songCards.forEach((card, cardIndex) => {
        card.classList.toggle('playing-card', cardIndex === index);
    });
}

function playSongByIndex(index) {
    const songCard = songCards[index];
    if (!songCard) {
        return;
    }

    const songPath = songCard.getAttribute('data-song');
    if (!songPath) {
        return;
    }

    currentSongIndex = index;
    homeAudio.src = encodeURI(songPath);
    const songLabel = songCard.querySelector('.caption')?.innerText || songCard.querySelector('img')?.alt || 'Unknown track';
    if (nowPlayingText) {
        nowPlayingText.innerText = `Now playing: ${songLabel}`;
    }
    homeAudio.play().catch(() => {
        if (nowPlayingText) {
            nowPlayingText.innerText = 'Now playing: Unable to play this track';
        }
        updatePlayPauseIcon(false);
    });
    setActiveSongCard(index);
}

homeAudio.addEventListener('timeupdate', () => {
    if (!progressBar || !homeAudio.duration) {
        return;
    }
    progressBar.value = Math.floor((homeAudio.currentTime / homeAudio.duration) * 100);
});

homeAudio.addEventListener('play', () => updatePlayPauseIcon(true));
homeAudio.addEventListener('pause', () => updatePlayPauseIcon(false));
homeAudio.addEventListener('ended', () => {
    if (songCards.length === 0) {
        return;
    }
    const nextIndex = currentSongIndex >= songCards.length - 1 ? 0 : currentSongIndex + 1;
    playSongByIndex(nextIndex);
});

songCards.forEach((songCard, index) => {
    songCard.addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        playSongByIndex(index);
    });
});

if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => {
        if (!homeAudio.src && songCards.length > 0) {
            playSongByIndex(0);
            return;
        }

        if (homeAudio.paused) {
            homeAudio.play();
        } else {
            homeAudio.pause();
        }
    });
}

if (backwardBtn) {
    backwardBtn.addEventListener('click', () => {
        if (songCards.length === 0) {
            return;
        }
        const previousIndex = currentSongIndex <= 0 ? songCards.length - 1 : currentSongIndex - 1;
        playSongByIndex(previousIndex);
    });
}

if (forwardBtn) {
    forwardBtn.addEventListener('click', () => {
        if (songCards.length === 0) {
            return;
        }
        const nextIndex = currentSongIndex >= songCards.length - 1 ? 0 : currentSongIndex + 1;
        playSongByIndex(nextIndex);
    });
}

if (progressBar) {
    progressBar.addEventListener('input', (event) => {
        if (!homeAudio.duration) {
            return;
        }
        const percent = Number(event.target.value);
        homeAudio.currentTime = (percent / 100) * homeAudio.duration;
    });
}

document.querySelectorAll('.image-wrapper').forEach(el => {
    el.addEventListener('click', () => {
        if (el.closest('.song-card')) {
            return;
        }
        const artist = el.getAttribute('data-artist');
        if (artist) {
            openArtistInSamePage(artist);
        }
    });
});

document.querySelectorAll('.artist-card').forEach(el=>{
    el.addEventListener('click',()=>{
        const artist=el.getAttribute('data-artist');
        if(artist){
            openArtistInSamePage(artist);
        }
        else{
            alert(`No page found for: ${artist}`);
        }
    });
});

document.querySelectorAll('.artist-card img').forEach((image) => {
    image.addEventListener('click', (event) => {
        const artistCard = event.currentTarget.closest('.artist-card');
        const artist = artistCard?.getAttribute('data-artist');
        if (artist) {
            openArtistInSamePage(artist);
        }
    });
});

document.querySelectorAll('.artistalbums img').forEach((image) => {
    image.addEventListener('click', (event) => {
        if (event.currentTarget.closest('.song-card')) {
            return;
        }
        const wrapper = event.currentTarget.closest('.image-wrapper');
        const artist = wrapper?.getAttribute('data-artist');
        if (artist) {
            openArtistInSamePage(artist);
        }
    });
});

if (backToHomeBtn) {
    backToHomeBtn.addEventListener('click', showHomePanel);
}

document.querySelectorAll('.row-section').forEach((section) => {
    const toggleButton = section.querySelector('.toggle-row-btn');
    const grid = section.querySelector('.collapsible-grid');

    if (!toggleButton || !grid) {
        return;
    }

    toggleButton.addEventListener('click', () => {
        grid.classList.toggle('collapsed');
        const isCollapsed = grid.classList.contains('collapsed');
        toggleButton.innerText = isCollapsed ? 'Show more' : 'Show less';
    });
});

const searchInput = document.getElementById('globalSearchInput') || document.querySelector('.search-container input');
const searchIcon = document.querySelector('.search-icon');
const sidebarCards = Array.from(document.querySelectorAll('.artist-card'));
const albumCards = Array.from(document.querySelectorAll('.artistalbums'));
const rowSections = Array.from(document.querySelectorAll('.row-section'));
const collapsibleGrids = Array.from(document.querySelectorAll('.collapsible-grid'));
const sidebarNoResults = document.getElementById('sidebarNoResults');
const homeNoResults = document.getElementById('homeNoResults');

function normalizeText(value) {
    return (value || '').toLowerCase().trim();
}

function syncToggleLabels() {
    rowSections.forEach((section) => {
        const toggleButton = section.querySelector('.toggle-row-btn');
        const grid = section.querySelector('.collapsible-grid');
        if (!toggleButton || !grid) {
            return;
        }
        toggleButton.innerText = grid.classList.contains('collapsed') ? 'Show more' : 'Show less';
    });
}

function setGridSearchMode(isSearchMode) {
    collapsibleGrids.forEach((grid) => {
        if (isSearchMode) {
            if (!grid.dataset.wasCollapsed) {
                grid.dataset.wasCollapsed = grid.classList.contains('collapsed') ? '1' : '0';
            }
            grid.classList.remove('collapsed');
        } else if (grid.dataset.wasCollapsed) {
            if (grid.dataset.wasCollapsed === '1') {
                grid.classList.add('collapsed');
            } else {
                grid.classList.remove('collapsed');
            }
            delete grid.dataset.wasCollapsed;
        }
    });

    syncToggleLabels();
}

function applySearchFilter(query) {
    const term = normalizeText(query);
    const isSearching = term.length > 0;

    if (isSearching && artistRightPanel.style.display === 'flex') {
        showHomePanel();
    }

    setGridSearchMode(isSearching);

    let visibleSidebarCount = 0;
    let visibleAlbumCount = 0;

    sidebarCards.forEach((card) => {
        const text = normalizeText(`${card.dataset.artist} ${card.innerText}`);
        const match = !isSearching || text.includes(term);
        card.style.display = match ? 'flex' : 'none';
        card.classList.toggle('search-hit', isSearching && match);
        if (match) {
            visibleSidebarCount += 1;
        }
    });

    albumCards.forEach((card) => {
        const wrapper = card.querySelector('.image-wrapper');
        const image = card.querySelector('img');
        const caption = card.querySelector('.caption');
        const text = normalizeText(`${wrapper?.dataset.artist} ${image?.alt} ${caption?.innerText}`);
        const match = !isSearching || text.includes(term);
        card.style.display = match ? 'block' : 'none';
        card.classList.toggle('search-hit', isSearching && match);
        if (match) {
            visibleAlbumCount += 1;
        }
    });

    rowSections.forEach((section) => {
        const visibleCards = Array.from(section.querySelectorAll('.artistalbums')).filter((card) => {
            return window.getComputedStyle(card).display !== 'none';
        }).length;
        section.style.display = visibleCards > 0 ? 'block' : 'none';
    });

    if (sidebarNoResults) {
        sidebarNoResults.style.display = isSearching && visibleSidebarCount === 0 ? 'block' : 'none';
    }

    if (homeNoResults) {
        homeNoResults.style.display = isSearching && visibleAlbumCount === 0 ? 'block' : 'none';
    }
}

if (searchInput) {
    searchInput.addEventListener('input', (event) => {
        applySearchFilter(event.target.value);
    });
    searchInput.addEventListener('change', (event) => {
        applySearchFilter(event.target.value);
    });
    searchInput.addEventListener('search', (event) => {
        applySearchFilter(event.target.value);
    });
    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            applySearchFilter(event.target.value);
        } else if (event.key === 'Escape') {
            event.target.value = '';
            applySearchFilter('');
        }
    });
}

if (searchIcon && searchInput) {
    searchIcon.style.cursor = 'pointer';
    searchIcon.addEventListener('click', () => {
        searchInput.focus();
        applySearchFilter(searchInput.value);
    });
}


