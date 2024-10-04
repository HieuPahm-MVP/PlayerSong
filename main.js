const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const Player_storage = "Hieu_Pham";
const player = $(".player");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const playBtn = $(".btn-toggle-play");
const audio = $("#audio");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");
const progress = $("#progress");
const app = {
  curIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,

  songs: [
    {
      name: "Opening Too Many Loosing Heroines",
      singer: "Yanami Anna",
      path: "./music/makein.mp3",
      image: "./img/anna.jpg",
    },
    {
      name: "Opening 薬 屋 の ひ と り ご と",
      singer: "MaoMao",
      path: "./music/duocsu.mp3",
      image: "./img/kusuriya.jpg",
    },
    {
      name: "BunGo Strays Dog OST",
      singer: "KaTa",
      path: "./music/dog.mp3",
      image: "./img/straydog.jpg",
    },
    {
      name: "Ending Cafe Familia Terrace",
      singer: "Yanami Anna",
      path: "./music/cafe.mp3",
      image: "./img/cafe.jpg",
    },
    {
      name: "That Time I Got Reincarnated as a Slime",
      singer: "Hieu Anna",
      path: "./music/slime.mp3",
      image: "./img/slime.webp",
    },
    {
      name: "Boruto Naruto Next Generations - Ending 23",
      singer: "Pham Trung Hieu",
      path: "./music/bo.mp3",
      image: "./img/boruto.jpg",
    },
    {
      name: "Wanna Go Home-Konosuba ",
      singer: "Yanami Anna",
      path: "./music/ko.mp3",
      image: "./img/konosuba.jpg",
    },
    {
      name: "たからもの」Music Video",
      singer: "Yanami Anna",
      path: "./music/go.mp3",
      image: "./img/gottoubun.jpg",
    },
  ],
  render: function () {
    const htmls = this.songs.map((song) => {
      return `<div class="song">
          <div class="thumb" style="background-image: url('${song.image}')"></div>
          <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
          </div>
          <div class="option">
            <i class="fas fa-ellipsis-h"></i>
          </div>
        </div>`;
    });
    $(".playlist").innerHTML = htmls.join("");
  },
  handleEvents: function () {
    const _this = this;
    const cd = $(".cd");
    const cdWidth = cd.offsetWidth;
    //xu ly phong to thu nho
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newWidth = cdWidth - scrollTop;
      cd.style.width = newWidth > 0 ? newWidth + "px" : 0;
      cd.style.opacity = newWidth / cdWidth;
    };
    //xu ly dia cd quay
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 10000, // 10s
      iterations: Infinity,
    });
    cdThumbAnimate.pause();
    //xu ly khi click
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };
    //khi tien do bai hat thay doi
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };
    //xu ly khi tua
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };
    nextBtn.onclick = function () {
      _this.nextSong();
      audio.play();
    };
    prevBtn.onclick = function () {
      _this.prevSong();
      audio.play();
    };
    // RANDOM bai hat nao do && ON/OFF
    randomBtn.onclick = function () {};
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.curIndex];
      },
    });
  },
  //tai bai hat
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
  },
  //chon bai tiep/truoc
  nextSong: function () {
    this.curIndex++;
    if (this.curIndex >= this.songs.length) {
      this.curIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.curIndex--;
    if (this.curIndex < 0) this.curIndex = this.songs.length - 1;
    this.loadCurrentSong();
  },
  //Ham Random
  playRandomSong: function () {
    let newIndex;
    const arrCheck = [this.songs.length];
    arrCheck.fill(0);
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
      arrCheck[newIndex] = 1;
    } while (newIndex === this.curIndex);
    this.curIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    //định nghĩa các thuộc tính cho object
    this.defineProperties();
    //lắng nghe và xử lý các sự kiện
    this.handleEvents();
    //tải lên thông tin bài hát đầu tiên vào UI
    this.loadCurrentSong();
    //render các danh sách bài hát
    this.render();
    this.nextSong();
    this.prevSong();
  },
};
app.start();
