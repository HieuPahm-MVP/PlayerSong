const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const Player_storage = "Hieu_Pham";

const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const playBtn = $(".btn-toggle-play");
const audio = $("#audio");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");

const app = {
  curIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,

  songs: [
    {
      name: "Opening Too Many Loosing Heroines",
      singer: "Yanami Anna",
      path: "https://www.youtube.com/watch?v=yw1o5CC70MY&ab_channel=frogcoatrecords",
      image: "./img/anna.jpg",
    },
    {
      name: "Opening 薬 屋 の ひ と り ご と",
      singer: "MaoMao",
      path: "https://www.youtube.com/watch?v=o5iZ4UunCKg&ab_channel=Jamong",
      image: "./img/kusuriya.jpg",
    },
    {
      name: "BunGo Strays Dog OST",
      singer: "KaTa",
      path: "https://www.youtube.com/watch?v=J5iNgWwo5SA&list=RDGMEMhCgTQvcskbGUxqI4Sn2QYw&index=3&ab_channel=GRIMM",
      image: "./img/straydog.jpg",
    },
    {
      name: "Ending Cafe Familia Terrace",
      singer: "Yanami Anna",
      path: "https://www.youtube.com/watch?v=8m6slOc0Nz8&list=RDGMEMhCgTQvcskbGUxqI4Sn2QYw&start_radio=1&rv=o5iZ4UunCKg&ab_channel=GAccelKun",
      image: "./img/cafe.jpg",
    },
    {
      name: "That Time I Got Reincarnated as a Slime",
      singer: "Yanami Anna",
      path: "https://www.youtube.com/watch?v=bTJxNHbGT34&list=WL&index=7&ab_channel=Jamong",
      image: "./img/slime.webp",
    },
    {
      name: "Boruto Naruto Next Generations - Ending 23",
      singer: "Yanami Anna",
      path: "https://www.youtube.com/watch?v=Uy3GIGuz7_Y&list=WL&index=8&ab_channel=Saahi%27sAMVs",
      image: "./img/boruto.jpg",
    },
    {
      name: "Wanna Go Home-Konosuba ",
      singer: "Yanami Anna",
      path: "https://www.youtube.com/watch?v=MQZV4SnshYs&list=WL&index=10&ab_channel=AniMusic",
      image: "./img/konosuba.jpg",
    },
    {
      name: "たからもの」Music Video",
      singer: "Yanami Anna",
      path: "https://www.youtube.com/watch?v=PF_jsc1jByE&list=WL&index=35&ab_channel=%E3%81%BD%E3%81%AB%E3%81%8D%E3%82%83%E3%82%93-AnimePONYCANYON",
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
    const cd = $(".cd");
    const cdWidth = cd.offsetWidth;
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newWidth = cdWidth - scrollTop;
      cd.style.width = newWidth > 0 ? newWidth + "px" : 0;
      cd.style.opacity = newWidth / cdWidth;
    };
  },
  start: function () {
    this.handleEvents();
    this.render();
  },
};
app.start();
