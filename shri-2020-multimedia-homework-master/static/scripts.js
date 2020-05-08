/* get our elements */

const players = document.querySelectorAll('.player');

for (const player of players) {
  const video = player.querySelector('.viewer');
  const progress = player.querySelector('.progress');
  const progressBar = player.querySelector('.progress__filled');
  const toggle = player.querySelector('.toggle');
  const muted = player.querySelector(".muted");
  const wrapper = player.querySelector(".player__wrapper");
  const screen = player.querySelector(".screen");
  const brigthess = player.querySelector(".brigthess");
  const contrast = player.querySelector('.contrast');
  const soundLevel = player.querySelector(".soundLevel");
  let open = false;

  function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
  };

  function updateCapture() {
    const brightnessv = brigthess.value;
    const contrastv = contrast.value;
    video.style.filter = `brightness(${brightnessv}) contrast(${contrastv})`;
  }

  function toggleSound() {
    video.muted = !video.muted;
    if (video.muted) {
      muted.style.backgroundImage = "url(./img/mute.png)";
    } else {
      muted.style.backgroundImage = "url(./img/song.png)";
    }
  }

  function updateButton() {
    const icon = this.paused ? '►' : '| |';
    toggle.textContent = icon;
  };

  function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
  };

  function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
  };

  function fullScreen() {
    if (open) return;
    open = true;
    soundLevel.style.display = "block";
    drawG();
    wrapper.style.position = "fixed";
  }

  function viewCamers() {
    open = false;
    soundLevel.style.display = "none";
    wrapper.style.position = "";
  }

  let context, source, analyser, streamData;
  function drawG() {
    if (streamData === undefined) {
      context = new (window.AudioContext || window.webkitAudioContext)();

      source = context.createMediaElementSource(video);

      analyser = context.createAnalyser();
      analyser.fftSize = 32;

      source.connect(analyser);
      analyser.connect(context.destination)

      streamData = new Uint8Array(analyser.frequencyBinCount);
    }

    function update() {
      if (!open) return;
      requestAnimationFrame(update);
      const average = streamData.reduce((acc, cur) => acc + cur, 0) / 16;

      // хардкодим ▁ ▂ ▃ ▅ ▆ █
      if (average === 0) {
        soundLevel.textContent = "";
      } else if (average < 21) {
        soundLevel.textContent = "▁ ";
      } else if (average < 41) {
        soundLevel.textContent = "▁ ▂";
      } else if (average < 61) {
        soundLevel.textContent = "▁ ▂ ▃";
      } else if (average < 81) {
        soundLevel.textContent = "▁ ▂ ▃ ▅";
      } else if (average < 101) {
        soundLevel.textContent = "▁ ▂ ▃ ▅ ▆";
      } else {
        soundLevel.textContent = "▁ ▂ ▃ ▅ ▆ █";
      }

      analyser.getByteFrequencyData(streamData);
    };
    update();
  }

  // События

  video.addEventListener('click', fullScreen);
  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);
  video.addEventListener('timeupdate', handleProgress);


  toggle.addEventListener('click', togglePlay);
  muted.addEventListener('click', toggleSound);
  screen.addEventListener('click', viewCamers);
  brigthess.addEventListener('input', updateCapture);
  contrast.addEventListener('input', updateCapture);

  let mousedown = false;
  progress.addEventListener('click', scrub);
  progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
  progress.addEventListener('mousedown', () => mousedown = true);
  progress.addEventListener('mouseup', () => mousedown = false);
}
