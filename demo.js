/* The presentation's original HEVC/AAC streams are copied into MP4 segments.
   No video or audio re-encoding is used. */
(() => {
  const video = document.getElementById('project-video');
  if (!video) return;
  const controls = document.getElementById('demo-controls');
  const chapter = document.getElementById('demo-chapter');
  const progress = document.getElementById('demo-progress');
  const error = document.getElementById('video-error');
  const download = document.getElementById('video-download');
  let segments = [];
  let current = 0;
  let pendingPlay = false;
  let playbackRate = 1;
  const clock = seconds => {
    const t = Math.max(0, Math.floor(seconds));
    return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`;
  };
  const showError = () => { error.hidden = false; };
  const loadSegment = (index, play) => {
    current = index;
    chapter.value = String(index);
    error.hidden = true;
    download.href = segments[index].src;
    pendingPlay = play;
    video.src = segments[index].src;
    video.load();
  };
  video.addEventListener('loadedmetadata', () => {
    video.playbackRate = playbackRate;
    if (pendingPlay) {
      pendingPlay = false;
      video.play().catch(() => {
        // Native controls remain available if the browser requires another gesture.
      });
    }
  });
  video.addEventListener('ratechange', () => { playbackRate = video.playbackRate; });
  video.addEventListener('error', showError);
  video.querySelector('source')?.addEventListener('error', showError);
  video.addEventListener('ended', () => {
    if (current + 1 < segments.length) loadSegment(current + 1, true);
  });
  chapter.addEventListener('change', () => {
    const index = Number(chapter.value);
    if (Number.isInteger(index) && index >= 0 && index < segments.length) {
      loadSegment(index, !video.paused);
    }
  });
  fetch('assets/video/manifest.json')
    .then(response => {
      if (!response.ok) throw new Error('Demo manifest unavailable');
      return response.json();
    })
    .then(manifest => {
      if (!Array.isArray(manifest.segments) || !manifest.segments.length) return;
      segments = manifest.segments;
      segments.forEach((segment, index) => {
        const option = document.createElement('option');
        option.value = String(index);
        option.textContent = clock(segment.start);
        chapter.append(option);
      });
      controls.hidden = false;
      const updateProgress = () => {
        progress.textContent = `${clock(segments[current].start + video.currentTime)} / ${clock(manifest.duration)}`;
      };
      video.addEventListener('timeupdate', updateProgress);
      updateProgress();
      if (video.error) showError();
    })
    .catch(() => {
      // A direct link to the first segment still works if the manifest fails.
    });
})();
