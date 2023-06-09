const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = "USER";

var heading = $("header h2");
var isPlaying = false;
var isRandom = false;
var isRepeat = false;
const playing = $(".player");
const playList = $(".playlist");
var avatar = $(".cd-thumb");
const thumb = $(".song .thumb");
const audio = $("#audio");
var cd = $(".cd");
var playBtn = $(".btn-toggle-play");
const progress = $("#progress");
var btnNext = $(".btn-next");
var btnPrev = $(".btn-prev");
var btnRandom = $(".btn-random");
var btnRepeat = $(".btn-repeat");
var song = $(".song");

const app = {
  isRandom: false,
  isRepeat: false,
  isPlaying: false,
  isPressSpace: false,
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  currentIndex: 0,
  songs: [
    {
      name: "Ánh sao và bầu trời",
      singer: "T.R.I",
      path: "./asset/audio/Ánh Sao Và Bầu Trời  TRI x Cá  Official Audio.mp3",
      image: "./asset/img/Ánh sao và bầu trời.jpg",
    },
    {
      name: "Chạy ngay đi",
      singer: "Sơn Tung MTP",
      path: "./asset/audio/CHẠY NGAY ĐI  RUN NOW  SƠN TÙNG MTP  Official Music Video.mp3",
      image: "./asset/img/Chạy ngay đi.jpg",
    },
    {
      name: "Chìm sâu",
      singer: "MCK",
      path: "./asset/audio/Chìm Sâu  RPT MCK feat Trung Trần  Official Lyrics Video.mp3",
      image: "./asset/img/Chìm Sâu.jpg",
    },
    {
      name: "Cuối chiều",
      singer: "MCK",
      path: "./asset/audio/LyricsCuối Chiều  Ngơ  GUY.mp3",
      image: "./asset/img/Cuối chiều.jpg",
    },
    {
      name: "Em không hiểu",
      singer: "Changg",
      path: "./asset/audio/Changg  Em Không Hiểu  Official Video ft Minh Huy.mp3",
      image: "./asset/img/Em không hiểu.jpg",
    },
    {
      name: "Em là nhất",
      singer: "Kis x Hoàng KayLee x Yahy",
      path: "./asset/audio/Em Là Nhất Speed Up  kis x Hoàng KayLee x YahyCukak Remix  Audio Lyric.mp3",
      image: "./asset/img/Em là nhất.jpg",
    },
    {
      name: "See tình",
      singer: "Hoàng Thuỳ Linh",
      path: "./asset/audio/See Tinh  Hoang Thuy LinhCukak Remix Audio Lyrics Video.mp3",
      image: "./asset/img/See tình.jpg",
    },
    {
      name: "The Playah",
      singer: "Soobin Hoàng Sơn",
      path: "./asset/audio/SOOBIN X SLIMV  THE PLAYAH Special Performance  Official Music Video.mp3",
      image: "./asset/img/The Playah.jpg",
    },
    {
      name: "There's no one at all",
      singer: "Sơn Tùng MTP",
      path: "./asset/audio/Theres No One At All l Sơn Tùng MTP  Lyrics Stage.mp3",
      image: "./asset/img/There no one at all.jpg",
    },
    {
      name: "Yêu em qua dòng tin nhắn",
      singer: "MCK",
      path: "./asset/audio/Yêu em qua dòng tin nhắniêu iem qua dòng tin nhắn  Ngơ ft Nân Lyrics Video.mp3",
      image: "./asset/img/Yêu em qua dòng tin nhắn.jpg",
    },
    {
      name: "Anh biết",
      singer: "MCK",
      path: "./asset/audio/Anh biết  Ngơ Video Lyrics.mp3",
      image: "./asset/img/Anh biết.jpg",
    },
    {
      name: "Em đã ngủ chưa",
      singer: "MCK",
      path: "./asset/audio/Em Đã Ngủ Chưa  Ngơ  Lyrics Video.mp3",
      image: "./asset/img/Em đã ngủ chưa.jpg",
    },
    {
      name: "Ngơ",
      singer: "MCK",
      path: "./asset/audio/Ngơ  MCK  Ngày mai anh viết cho em hôm nay một bản tình ca   MCK indie.mp3",
      image: "./asset/img/Ngơ.jpg",
    },
    {
      name: "Tự sự",
      singer: "Orange",
      path: "./asset/audio/Orange  Tự Sự ft Thuận Nguyễn  Qua Bển Làm Chi OST  Phim đang chiếu tại rạp.mp3",
      image: "./asset/img/Tự sự.jpg",
    },
    {
      name: "Về bên anh",
      singer: "Jack",
      path: "./asset/audio/Về Bên AnhLofi Ver Jack x Mihle  Lyric Video.mp3",
      image: "./asset/img/Về bên anh.jpg",
    },
    {
      name: "Yêu thương ngày đó",
      singer: "Soobin Hoàng Sơn",
      path: "./asset/audio/Yêu Thương Ngày Đó  Soobin Hoàng Sơn.mp3",
      image: "./asset/img/Yêu thương ngày đó.jpg",
    },
    {
      name: "Ai đã khiến em buồn",
      singer: "Cassano",
      path: "./asset/audio/Ai đã khiến em buồn nước mắt cứ thế tuôn    Tín Hiệu Từ Trái Tim  Cassano speed up by Nm24.mp3 ",
      image: "./asset/img/Tín hiệu.jpg",
    },
    {
      name: "Anh đã ổn hơn",
      singer: "MCK",
      path: "./asset/audio/Anh Đã Ổn Hơn  RPT MCK  99 the album.mp3 ",
      image: "./asset/img/Anh đã ổn hơn.jpg",
    },
    {
      name: "Show me love",
      singer: "MCK",
      path: "./asset/audio/Show Me Love  RPT MCK   99  the album.mp3 ",
      image: "./asset/img/Show me love.jpg",
    },
    {
      name: "Tại vì sao",
      singer: "MCK",
      path: "./asset/audio/Tại Vì Sao  RPT MCK  99 the album.mp3 ",
      image: "./asset/img/Ngơ.jpg",
    },
    {
      name: "Thôi em đừng đi",
      singer: "MCK",
      path: "./asset/audio/Thôi Em Đừng Đi  RPT MCK  ft Trung Trần    99  the album.mp3 ",
      image: "./asset/img/Thôi em đừng đi.jpg",
    },
    {
      name: "Taibun",
      singer: "yasobi",
      path: "./asset/audio/YOASOBIたふんOfficial Music  Video.mp3 ",
      image: "./asset/img/Yasobi.PNG",
    },
    {
      name: "Ta còn yêu nhau",
      singer: "Đức Phúc",
      path: "./asset/audio/TA CÒN YÊU NHAU  OFFICIAL MV STORY  ĐỨC PHÚC.mp3 ",
      image: "./asset/img/Đức Phúc.jpg",
    },
    {
      name: "Ngủ sớm đi em",
      singer: "Ming",
      path: "./asset/audio/Ngủ sớm đi em  DucMinh  Prod by GC.mp3 ",
      image: "./asset/img/ngủ sớm đi em.jpg",
    },
    {
      name: "Mùa đông",
      singer: "ERIK",
      path: "./asset/audio/MÙA ĐÔNG WINTER Official Audio.mp3 ",
      image: "./asset/img/ERIK.jpeg",
    },
    {
      name: "Không yêu xin đừng nói",
      singer: "ERIK",
      path: "./asset/audio/Không Yêu Xin Đừng Nói  UMIE Prod ToneRx.mp3 ",
      image: "./asset/img/không yêu xin đừng nói.jpg",
    },
    {
      name: "Cupid",
      singer: "FIFTF",
      path: "./asset/audio/FIFTY FIFTY 피프티피프티  Cupid  Official MV.mp3 ",
      image: "./asset/img/Cupid.jpg",
    },
    {
      name: "Ta còn yêu nhau",
      singer: "Đức Phúc",
      path: "./asset/audio/TA CÒN YÊU NHAU  OFFICIAL MV STORY  ĐỨC PHÚC.mp3 ",
      image: "./asset/img/Đức Phúc.jpg",
    },
  ],

  // lưu các setting vào localStorage
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  // render list of songs
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
            <div class="song ${
              index === this.currentIndex ? "active" : ""
            }" data-index="${index}">
                <div class="thumb" style="background-image: url('${
                  song.image
                }')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `;
    });

    $(".playlist").innerHTML = htmls.join("");
  },

  // xác định các thuộc tính trong list
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },

  // xử lý các sự kiện
  handleEvents: function () {
    let cdWidth = cd.offsetWidth; //lấy chiều rộng của cd
    document.onscroll = function () {
      const scrollTop = window.screenY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;
      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    // xử lú cd quay
    const cdThumbAnimate = avatar.animate(
      [
        {
          transform: "rotate(0deg)",
        },
        {
          transform: "rotate(360deg)",
        },
      ],
      {
        duration: 10000,
        iterations: Infinity,
      }
    );

    cdThumbAnimate.pause();

    // xử lý khi click vào nút play
    playBtn.onclick = () => {
      if (app.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };

    // khi đã quay thì play nhạc, add class
    audio.onplay = () => {
      app.isPlaying = true;
      playing.classList.add("playing");
      cdThumbAnimate.play();
    };

    // khi dừng quay
    audio.onpause = () => {
      app.isPlaying = false;
      playing.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    audio.ontimeupdate = () => {
      if (audio.duration) {
        let progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };

    progress.onchange = (e) => {
      let seekTime = Math.floor((e.target.value * audio.duration) / 100);
      audio.currentTime = seekTime;
      progress.value = (seekTime / audio.duration) * 100;
    };

    // khi click vào btnNext
    btnNext.onclick = () => {
      if (app.isRandom) {
        this.randomSong();
      } else {
        app.nextSong();
      }
      audio.play();
      this.render();
      this.scrollTopActive();
    };

    // khi click và btnPrev
    btnPrev.onclick = () => {
      if (app.isRandom) {
        this.randomSong();
      } else {
        app.prevSong();
      }
      audio.play();
      this.render();
      this.scrollTopActive();
    };

    // khi click vào btnRandom
    btnRandom.onclick = (e) => {
      app.isRandom = !app.isRandom;
      app.setConfig("isRandom", app.isRandom);
      btnRandom.classList.toggle("active", app.isRandom);
    };

    // xử lý repeat/next when a song ended
    audio.onended = () => {
      if (app.isRepeat) {
        audio.play();
      } else {
        btnNext.click();
      }
    };

    // xử lý lặp lại một bài hát khi phát hết
    btnRepeat.onclick = (e) => {
      app.isRepeat = !app.isRepeat;
      app.setConfig("isRepeat", app.isRepeat);
      btnRepeat.classList.toggle("active", app.isRepeat);
    };

    // xử lý khi click vào list song
    playList.onclick = (e) => {
      let songIndex = e.target.closest(".song:not(.active)");
      if (songIndex || e.target.closest(".song .option")) {
        if (songIndex) {
          this.currentIndex = Number(songIndex.getAttribute("data-index"));
          this.loadCurrentSong();
          audio.play();
          this.render();
        }
      }

      thumb.classList.add("animation");
    };

    // xử lý khi ấN phím arrow, space
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        playBtn.click();
      }
      if (e.code === "ArrowRight") {
        btnNext.click();
      }
      if (e.code === "ArrowLeft") {
        btnPrev.click();
      }
    });
  },
  // hiển thị bài hát hiển tại
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    avatar.style.backgroundImage = `url("${this.currentSong.image}")`;
    audio.src = this.currentSong.path;
  },

  // xử lý sự kiện click chuyển sang bài mới
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },

  // xử lý sự kiện click chuyển về bài trước
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex <= 0) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },

  // xử lý random bài hát
  randomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },

  // load config
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },

  // xử lý khi khuất view
  scrollTopActive: function () {
    if (
      this.currentIndex === 0 ||
      this.currentIndex === 1 ||
      this.currentIndex === 2
    ) {
      setTimeout(() => {
        $(".song.active").scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 300);
    } else {
      setTimeout(() => {
        $(".song.active").scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 300);
    }
  },

  // Xử lý khi click vào list song

  // Hàm chạy
  start: function () {
    this.loadConfig();
    this.defineProperties();
    this.handleEvents();
    this.loadCurrentSong();
    this.render();
    btnRepeat.classList.toggle("active", this.isRepeat);
    btnRandom.classList.toggle("active", this.isRandom);
  },
};

app.start();
