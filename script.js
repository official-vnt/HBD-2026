// script.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Count-Up Timer (from 29-March-2023)
    const startDate = new Date('2023-03-29T00:00:00').getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCounter() {
        const now = new Date().getTime();
        const difference = now - startDate;

        // Time calculations
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Update DOM
        daysEl.innerText = days;
        hoursEl.innerText = hours.toString().padStart(2, '0');
        minutesEl.innerText = minutes.toString().padStart(2, '0');
        secondsEl.innerText = seconds.toString().padStart(2, '0');
    }

    // Initial call and interval
    updateCounter();
    setInterval(updateCounter, 1000);

    // 2. Audio Player Logic
    const audio = document.getElementById('bg-audio');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const vinylRecord = document.getElementById('vinyl-record');
    const progressFill = document.getElementById('progress-fill');
    const currentTimeEl = document.querySelector('.time.current');
    const durationEl = document.querySelector('.time.duration');
    const progressBar = document.querySelector('.bar');

    let isPlaying = false;

    // Toggle Play/Pause
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            vinylRecord.classList.remove('playing');
        } else {
            // Attempt to play (might be blocked by browser policy without interaction, but this is an explicit click)
            audio.play().then(() => {
                playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
                vinylRecord.classList.add('playing');
            }).catch(e => {
                console.error("Playback failed:", e);
                alert("Please add a valid 'our_song.mp3' in the assets folder!");
            });
        }
        isPlaying = !isPlaying;
    });

    // Update Progress Bar
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            progressFill.style.width = `${progressPercent}%`;

            // Format current time
            currentTimeEl.innerText = formatTime(audio.currentTime);
        }
    });

    // Set Duration once metadata is loaded
    audio.addEventListener('loadedmetadata', () => {
        durationEl.innerText = formatTime(audio.duration);
    });

    // Click on progress bar to seek
    progressBar.addEventListener('click', (e) => {
        const width = progressBar.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;

        if (duration) {
            audio.currentTime = (clickX / width) * duration;
        }
    });

    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec.toString().padStart(2, '0')}`;
    }

    // 3. Envelope Interactions
    const envelopes = document.querySelectorAll('.envelope');
    envelopes.forEach(env => {
        env.addEventListener('click', () => {
            // Simple bounce animation
            env.style.transform = 'translateY(-15px)';
            setTimeout(() => {
                env.style.transform = 'translateY(0)';
                // Here you could add logic to open a modal with a message
                alert(`Hey love ❤️

I know there will be moments when you’ll miss me a little extra, so read this whenever that happens.

Even if I’m away, I’m still with you in all the small things — in your smile, your late-night thoughts, your favorite songs, and the moments you randomly think about us.

And honestly? I miss you too.
More than I usually say.

But distance is just a temporary glitch in our story. One day, all these calls, texts, and countdowns will turn into real hugs, real mornings, and real memories together.

Until then,
please remember this:

You are deeply loved.
Always.
By your cutesa boyfriend ❤️`);
            }, 300);
        });
    });
});
