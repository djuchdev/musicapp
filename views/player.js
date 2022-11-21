console.log("Welcome to 9TS");

let songIndex = 0;
let audioElement = new Audio('songs/80s.mp3')
let masterPlay = document.getElementById('masterPlay')

let songs = [
    {songName: "9TS - 80's Electro Mix", filePath: "songs/80s.mp3", coverPath: "covers/dj-avery.png"},
    {songName: "9TS - Dance Mix", filePath: "songs/dance-1.mp3", coverPath: "covers/girl-dj.png"},
    {songName: "9TS - Love Dance", filePath: "songs/dance-2.mp3", coverPath: "covers/island-dj.png"},
    {songName: "9TS - Big Room Vocals", filePath: "songs/dance-3.mp3", coverPath: "listening.png"},
]

masterPlay.addEventListener('click', () =>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
    }
})

myProgressBar.addEventListener('timeupdate', () =>{
    console.log('timeupdate')
})
