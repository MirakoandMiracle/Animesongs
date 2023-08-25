
const d = [
  {
    id: 1,
    path: "../assests/musiclist/flyhigh.mp3",
    name: "Fly high",
    pic: "https://i.pinimg.com/564x/35/82/94/3582948dc079b559eb826f3f63366cbc.jpg",
  },
  {
    id: 2,
    path: "../assests/musiclist/AOT1.mp3",
    name: "Shock",
    pic: "https://i.pinimg.com/564x/b8/94/32/b894328572830f574f8c61a73e4d8815.jpg",
  },
  {
    id: 3,
    path: "../assests/musiclist/Demon.mp3",
    name: "Gurenge",
    pic: "https://i.pinimg.com/564x/64/f8/1c/64f81c25174fb163068687039d77b46a.jpg",
  },
  {
    id: 4,
    path: "../assests/musiclist/Eve.mp3",
    name: "Kaikai Kitan",
    pic: "https://i.pinimg.com/564x/b9/47/10/b947100155b84e5365480906fbc3b226.jpg",
  },
  {
    id: 5,
    path: "../assests/musiclist/naruto.mp3",
    name: "Kana-Boon",
    pic: "https://i.pinimg.com/564x/fe/40/91/fe4091fab9773c526fd08c3f863df10f.jpg",
  },
  {
    id: 6,
    path: "../assests/musiclist/mhc.mp3",
    name: "No.1",
    pic: "https://i.pinimg.com/564x/63/fb/eb/63fbebab2b193d2009002d322dd657e7.jpg",
  },
  {
    id: 7,
    path: "../assests/musiclist/weare.mp3",
    name: "We are",
    pic: "https://i.pinimg.com/564x/b9/22/61/b9226151ccb6fa3e32ca10e217b35099.jpg",
  },
  {
    id: 8,
    path: "../assests/musiclist/AOTmywar.mp3",
    name: "My war",
    pic: "https://i.pinimg.com/564x/e7/87/65/e78765c1e08d7a78dfcd1d94a4050957.jpg",
  },
  {
    id: 9,
    path: "../assests/musiclist/AOTop.mp3",
    name: "Shinzou wo sasageyo",
    pic: "https://i.pinimg.com/236x/03/cc/28/03cc28a39130ef0bf01a67f51e78195a.jpg",
  },
  {
    id: 10,
    path: "../assests/musiclist/unravel.mp3",
    name: "Unravel",
    pic: "https://i.pinimg.com/564x/d3/ac/62/d3ac626a4cc1e016cdb0e39199830fdf.jpg",
  },
];


$(document).ready(function () {
  
let track_index = 0;
let isPlayed = false;
  let playpause_btn = $("#playpause");
  let next_track = $("#next");
  let prev_track = $("#prev");
  let music_cover = $("#cover");

  let title = $("#title");
  let song_range = $("#song-range");
  let current_time = $(".current-time");
  let total_duration = $(".total-duration");
  let music = $("<audio>");

  // Function to load a specific track and start playing it
  const loadAndPlayTrack = (index) => {
    track_index = index;
    loadAudio(track_index);
    playMusic();
  };

  // Add event listeners to each li element to play the corresponding track
  $("#music-list li").click(function () {
    const index = $(this).index(); // Get the index of the clicked li
    loadAndPlayTrack(index);
  });

  const loadAudio = (track_index = 0) => {
    let timer;
    clearInterval(timer);
    restSeek();
    music.attr("src", d[track_index].path);
    console.log(d[track_index].path);
    music.trigger("load");
    console.log(music_cover, d[track_index].pic);

    title.html(d[track_index].name);
    music_cover.attr("src", d[track_index].pic);

    timer = setInterval(update_seek, 1000);
    music.on("ended", () => {
      nextSong();
      console.log("end nextSong");
    });
  };

  const playMusic = () => {
    console.log("play");
    music.trigger("play");
    isPlayed = true;
    playpause_btn.html('<i class="fa fa-pause-circle text-[40px]"></i>');
  };

  const pauseMusic = () => {
    music.trigger("pause");
    isPlayed = false;
    playpause_btn.html('<i class="fa fa-play-circle text-[40px]"></i>');
  };

  const nextSong = () => {
    if (track_index < d.length - 1) {
      track_index++;
      console.log(track_index);
      loadAudio(track_index);
      playMusic();
    }
  };

  const prevSong = () => {
    if (track_index > 0) {
      track_index--;
      console.log(track_index);
      loadAudio(track_index);
      playMusic();
    }
  };

  const restSeek = () => {
    current_time.text("00:00");
    total_duration.text("00:00");
    song_range.val(0);
  };

  next_track.click(function () {
    nextSong();
  });

  prev_track.click(function () {
    prevSong();
  });

  playpause_btn.click(function () {
    if (isPlayed) {
      pauseMusic();
    } else {
      playMusic();
    }
  });

  const update_seek = () => {
    const current_min = Math.floor(music[0].currentTime / 60);
    const current_sec = Math.floor(music[0].currentTime - current_min * 60);

    const duration_minutes = Math.floor(music[0].duration / 60);
    const duration_seconds = Math.floor(
      music[0].duration - duration_minutes * 60
    );

    let seek_position;
    current_time.text(
      `${current_min.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
      })}:${current_sec.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
      })}`
    );

    total_duration.text(
      `${duration_minutes.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
      })}:${duration_seconds.toLocaleString("en-US", {
        minimumIntegerDigits: 2,
      })}`
    );
    seek_position = music[0].currentTime * (100 / music[0].duration);
    song_range.val(seek_position);
  };

  song_range.change(function (e) {
    const seek_value = music[0].duration * (e.target.value / 100);
    music[0].currentTime = seek_value;
    console.log(seek_value);
  });

  loadAudio();
});
