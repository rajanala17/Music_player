
      document.addEventListener("DOMContentLoaded", function () {
        const songs = [
          {
            title: "I am Scared",
            duration: "1:49",
            thumbnail: "./data/preview-img-1.jpg",
            src: "./data/[iSongs.info] 09 - Im Scared.mp3",
            artist: "Anirudh",
            year: 2023,
            isVerfied: true,
            followers: 1371245,
            monthlyListner: 12346313,
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          },
          {
            title: "Titanium",
            duration: "1:46",
            thumbnail: "./data/preview-img-2.jpg",
            src: "./data/track2.mp3",
            artist: "AlisiaBeats",
            year: 2023,
            isVerfied: true,
            followers: 50,
            monthlyListner: 20,
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          },
          {
            title: "Science Documentory",
            duration: "2:07",
            thumbnail: "./data/preview-img-3.jpg",
            src: "./data/track3.mp3",
            artist: "Lexin_Music",
            year: 2023,
            isVerfied: false,
            followers: 80,
            monthlyListner: 10,
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          },
          {
            title: "Once In Paris",
            duration: "2:12",
            thumbnail: "./data/preview-img-4.jpg",
            src: "./data/track4.mp3",
            artist: "Pumpupthemind",
            year: 2023,
            isVerfied: false,
            followers: 12,
            monthlyListner: 45,
            description:
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          },
        ];
        const songList = document.getElementById("song-list");
        const thumbnailContainer = document.getElementById(
          "thumbnail-container"
        );
        const thumbnail = document.getElementById("thumbnail");
        const playPauseBtn = document.getElementById("play-pause");
        const restartBtn = document.getElementById("restart");
        const PrevBtn = document.getElementById("prev");
        const nextBtn = document.getElementById("next");
        const progress = document.getElementById("progress");
        const currTime = document.getElementById("current-time");
        const volumeControl = document.getElementById("volume");
        const leftTime = document.getElementById("time-left");
        const trackTitle = document.getElementById("player-title");
        const trackDescription = document.getElementById("player-description");
        const shuffleBtn = document.getElementById("shuffle");
        const repeatBtn = document.getElementById("repeat");
        const customDropdown = document.getElementById("custom-dropdown");
        const dropdownItems = document.querySelectorAll(
          ".custom-dropdown-item"
        );
        const shuffleImg = document.getElementById("shuffle-img");
        const loopImg = document.getElementById("loop-img");

        // To store index of track being played
        let currentSongIndex = 0;

        let isShuffleMode = true;
        let isRepeatMode = false;

        // Audio constructor
        let audio = new Audio();

        loadSong(currentSongIndex);

        function updatePlayPauseButton(paused) {
          playPauseBtn.innerHTML = paused
            ? '<img src="./assets/icons/play-button.svg" />'
            : '<img src="./assets/icons/pause-button.svg" />';
        }
        // To play pause the track
        function playPause() {
          if (audio.paused) {
            audio.play();
            updatePlayPauseButton(true);
          } else {
            audio.pause();
            updatePlayPauseButton(false);
          }
        }

        // To highlight currently playing track in the list
        function updateCurrentSongHighlight() {
          // Remove highlight from all titles
          const titleElements = document.querySelectorAll(".track-title");
          titleElements.forEach((element) => {
            element.classList.remove("current-song");
          });

          const currentSongTitleElement = document.querySelector(
            `.item-container[data-index="${currentSongIndex}"] .track-title`
          );

          if (currentSongTitleElement) {
            currentSongTitleElement.classList.add("current-song");
          }
        }

        // To play a track using Audio
        function loadSong(index) {
          const currentSong = songs[index];
          audio.src = currentSong.src;
          thumbnail.src = currentSong.thumbnail;
          trackTitle.innerText = currentSong.title;
          trackDescription.innerText = currentSong.artist;
          leftTime.textContent = "00:00";
          audio.addEventListener("loadedmetadata", function () {
            progress.max = audio.duration;
          });
          updateCurrentSongHighlight(index);
        }

        // previous song
        function prevSong() {
          currentSongIndex =
            (currentSongIndex - 1 + songs.length) % songs.length;
          loadSong(currentSongIndex);
          playPause();
        }

        function getRandomIndex() {
          let randomIndex = Math.floor(Math.random() * songs.length);
          return randomIndex;
        }

        //next button
        function nextSong(isBtnSelected) {
          if (isShuffleMode) {
            //random song selection
            const randomIndex = getRandomIndex();
            currentSongIndex = randomIndex;
            loadSong(currentSongIndex);
            playPause();
          } else if (isBtnSelected) {
            currentSongIndex = currentSongIndex + 1;
            if (currentSongIndex >= 0 && currentSongIndex <= songs.length - 1) {
              loadSong(currentSongIndex);
              playPause();
            } else {
              currentSongIndex = 0;
              loadSong(currentSongIndex);
              playPause();
            }
          } else {
            audio.currentTime = 0;
            progress.value = 0;
            playPause();
          }
        }

        // turn on shuffle mode

        function toggleShuffleMode() {
          isShuffleMode = true;
          isRepeatMode = false;
          shuffleImg.src = "./assets/icons/shuffle-highlighted.svg";
          loopImg.src = "./assets/icons/loop.svg";
        }

        //turn on repeat mode

        function toggleRepeatMode() {
          isShuffleMode = false;
          isRepeatMode = true;
          shuffleImg.src = "./assets/icons/shuffle.svg";
          loopImg.src = "./assets/icons/loop-highlighted.svg";
        }

        function padZero(number) {
          return (number < 10 ? "0" : "") + number;
        }

        function formatTime(time) {
          const minutes = Math.floor(time / 60);
          const seconds = Math.floor(time % 60);
          return `${padZero(minutes)}:${padZero(seconds)}`;
        }

        // Called periodically to update the progress on track
        function updateProgress() {
          const currentTime = audio.currentTime;
          const duration = audio.duration;
          // Calculate remaining time
          const remainingTime = duration - currentTime;
          progress.value = currentTime;
          currTime.textContent = `${formatTime(currentTime)}`;
          leftTime.textContent = `${
            "-" + (remainingTime >= 0 ? formatTime(remainingTime) : "00:00")
          }`;

          throttledUpdateProgress = null;
        }

        // function updateVolume() {
        //   audio.volume = volumeControl.value;
        // }

        function toggleDropdown() {
          if (
            document.getElementById("dropdown-list-items").style.display ===
            "block"
          ) {
            document.getElementById("dropdown-list-items").style.display =
              "none";
            document
              .getElementById("dropdown-arrow")
              .classList.remove("rotate-270");
          } else {
            document.getElementById("dropdown-list-items").style.display =
              "block";
            document
              .getElementById("dropdown-arrow")
              .classList.add("rotate-270");
          }
        }

        // Add selected playback to audio
        dropdownItems.forEach(function (item) {
          item.addEventListener("click", function () {
            audio.playbackRate = parseFloat(this.dataset.value);
            dropdownItems.forEach(function (item) {
              item.classList.remove("selected-speed");
            });
            // Add selected speed class
            this.classList.add("selected-speed");
          });
        });

        // To render list of songs in left menu from given array
        function renderSongList() {
          // Clear existing list
          songList.innerHTML = "";

          // Render songs dynamically
          songs.forEach((song, index) => {
            // Create elements for each song
            const itemContainer = document.createElement("div");
            const itemImg = document.createElement("div");
            const imgElement = document.createElement("img");
            const thumbnailImg = document.createElement("img");
            const trackDataContainer = document.createElement("div");
            const trackTitle = document.createElement("p");
            const trackArtist = document.createElement("p");
            const trackDurationContainer = document.createElement("div");
            const trackDuration = document.createElement("p");
            const trackYear = document.createElement("p");

            itemContainer.classList.add("item-container");
            thumbnailImg.classList.add("list-thumbnail");
            itemContainer.setAttribute("data-index", index);
            itemImg.classList.add("item-img");
            trackDataContainer.classList.add("track-data-container");
            trackTitle.classList.add("track-title");
            trackArtist.classList.add("track-artist");
            trackDurationContainer.classList.add("track-duration-container");
            trackDuration.classList.add("track-duration");
            trackYear.classList.add("track-year");

            // Set attributes and content
            itemContainer.addEventListener("click", () => {
              currentSongIndex = index;
              loadSong(currentSongIndex);
              audio.play();
              updatePlayPauseButton(true);
            });

            imgElement.src = "./assets/icons/outline.svg";
            thumbnailImg.src = song.thumbnail;

            trackTitle.textContent = song.title;
            trackArtist.textContent = song.artist;
            trackDuration.textContent = song.duration;
            trackYear.textContent = song.year;

            // Append elements to the container
            itemImg.appendChild(imgElement);
            itemImg.appendChild(thumbnailImg);
            trackDataContainer.appendChild(trackTitle);
            trackDataContainer.appendChild(trackArtist);
            trackDurationContainer.appendChild(trackDuration);
            trackDurationContainer.appendChild(trackYear);

            itemContainer.appendChild(itemImg);
            itemContainer.appendChild(trackDataContainer);
            itemContainer.appendChild(trackDurationContainer);

            songList.appendChild(itemContainer);
            updateCurrentSongHighlight(currentSongIndex);
          });
        }

        renderSongList();

        // MODAL JAVASCRIPT

        const previewModal = document.getElementById("preview-modal");
        const closeModal = document.getElementById("close-modal");
        const previewImage = document.getElementById("preview-image");
        const previewDescription = document.getElementById(
          "preview-description"
        );
        const previewArtist = document.getElementById("preview-artist");
        const followCount = document.getElementById("follow-count");
        const listnerCount = document.getElementById("listner-count");

        // function to open modal window

        function openModalWindow() {
          const current = songs[currentSongIndex];
          previewModal.style.display = "flex";
          previewImage.src = current.thumbnail;
          previewArtist.innerText = current.artist;
          followCount.innerText = current.followers;
          listnerCount.innerText = current.monthlyListner;
          previewDescription.innerText = current.description;
          if (!current.isVerfied) {
            document.getElementById("verified").style.display = "none";
          } else {
            document.getElementById("verified").style.display = "flex";
          }
        }
        function closePreviewModal() {
          previewModal.style.display = "none";
        }
        closeModal.addEventListener("click", closePreviewModal);

        window.addEventListener("click", function (event) {
          if (event.target === previewModal) {
            closePreviewModal();
          }
        });

        // Attached event listners to DOM elements
        playPauseBtn.addEventListener("click", playPause);
        PrevBtn.addEventListener("click", prevSong);
        progress.addEventListener("input", function () {
          audio.currentTime = progress.value;
        });
        nextBtn.addEventListener("click", () => {
          nextSong(true);
        });

        audio.addEventListener("ended", () => nextSong(false));
        audio.addEventListener("timeupdate", updateProgress);

        volumeControl.addEventListener("input", () => {
          audio.volume = volumeControl.value;
        });

        shuffleBtn.addEventListener("click", toggleShuffleMode);
        repeatBtn.addEventListener("click", toggleRepeatMode);
        customDropdown.addEventListener("click", toggleDropdown);
        thumbnailContainer.addEventListener("click", openModalWindow);

        window.addEventListener("click", function (event) {
          if (!event.target.matches(".custom-dropdown-selected")) {
            const itemsContainer = customDropdown.querySelector(
              ".custom-dropdown-items"
            );
            itemsContainer.style.display = "none";
            document
              .getElementById("dropdown-arrow")
              .classList.remove("rotate-270");
          }
        });
      });
  