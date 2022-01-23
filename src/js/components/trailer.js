import MovieApiService from '../api/fetch-api.js';

const movieApiService = new MovieApiService();

export async function getTrailer(id) {
  const response = await movieApiService.fetchTrailer(id);
  const videoId = response.results[0].key;
  const player = createPlayer(videoId);
  return videoId;
}

function createPlayer(id) {
  const playerContainer = document.getElementById('player');
  let player;
  onYouTubeIframeAPIReady(id);
  player;

  function onYouTubeIframeAPIReady(id) {
    player = new YT.Player(playerContainer, {
      height: '200',
      width: '100%',
      videoId: id,
      host: 'http://www.youtube.com',
      playerVars: {
        enablejsapi: 1,
        autoplay: 0,
        frameborder: 0,
        origin: 'http://example.com',
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  }

  function onPlayerReady(event) {
    player.loadVideoById(id);
    stopVideo();
    // event.target.playVideo();
  }

  // let done = false;

  function onPlayerStateChange(event) {
    // if (event.data == YT.PlayerState.PLAYING && !done) {
    //   setTimeout(stopVideo, 6000);
    //   done = true;
    // }
  }

  function stopVideo() {
    player.stopVideo();
  }
}
