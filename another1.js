console.log("Welcome to 9TS");

// VARIABLES //

let songIndex = 0;
let artIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let artwork = document.querySelector('artwork');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));


// SONGS //

let songs = [
    {songName: "9TS - 80's Electro Mix", filePath: "songs/80s.mp3", coverPath: "dj-avery.png"},
    {songName: "9TS - Dance Mix", filePath: "songs/dance-1.mp3", coverPath: "girl-dj.png"},
    {songName: "9TS - Love Dance", filePath: "songs/dance-2.mp3", coverPath: "island-dj.png"},
    {songName: "9TS - Big Room Vocals", filePath: "songs/dance-3.mp3", coverPath: "listening.png"},
]

let art = [
    
    {img: "images/1.png"}, 
    {img: "images/2.png"}, 
    {img: "images/3.png"}, 
    {img: "images/4.png"},
]


//ARTWORK CHANGE

// artwork.addEventListener("click", () =>{


// })

// AUDIO CLOCK - COUNTDOWN
audioElement.addEventListener("timeupdate", function() {
    var timeleft = document.getElementById('timeleft'),
        duration = parseInt( audioElement.duration ),
        currentTime = parseInt( audioElement.currentTime ),
        timeLeft = duration - currentTime,
        s, m;
    
    s = timeLeft % 60;
    m = Math.floor( timeLeft / 60 ) % 60;
    
    s = s < 10 ? "0"+s : s;
    m = m < 10 ? "0"+m : m;
    
    timeleft.innerHTML = m+":"+s;
    
}, false);


// AUDIO CLOCK - COUNTUP
audioElement.addEventListener("timeupdate", function() {
    var timeline = document.getElementById('duration');
    var s = parseInt(audioElement.currentTime % 60);
    var m = parseInt((audioElement.currentTime / 60) % 60);
    if (s < 10) {
        timeline.innerHTML = m + ':0' + s;
    }
    else {
        timeline.innerHTML = m + ':' + s;
    }
}, false);



// PLAY AND PAUSE BUTTON //

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        // gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        // gif.style.opacity = 0;
    }

    // artwork.style.backgroundImage = "url(" + art[artIndex].img + ")";
})


// *** PROGRESS BAR *** // 

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})



//*****NEXT BUTTON****//

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        console.log("song < ")
        songIndex = 0
    }
    else{
        console.log("song > ")
        songIndex += 1;
    }

    // if (artIndex <=0){
    //     artIndex = 0
    // }

    // else{
    //     artIndex += 1;
    // }

    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    // function changeArtUp (){

    //     artwork.src = art[artIndex].artSource;
    // }

    // changeArtUp()
 

})


//*****PREVIOUS BUTTON****//

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }

    // if (artIndex <=0){
    //     artIndex = 0
    // }

    // else{
    //     artIndex -= 1;
    // }

    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

    // function changeArtDown (){


    //     artwork.src = art[artIndex].artSource;
    // }

    // changeArtDown()

})








// function changeArtwork(){

//    var imageSrc = artwork.getAttribute('src');
//    var currentImageNumber = imageSrc.substring(imageSrc.lastIndexOf("/") + 1, imageSrc.lastIndexOf('/') + 2);
//    var newImage = "/Images" + (Number(currentImageNumber) + 1) + ".png";
//    artwork.setAttribute('src', newImage)

// }



// function changeImageUp(){

//     artwork.setAttribute(artSource, art[artIndex]);
//     artIndex++;
// }

// function changeImageDown(){

//     artwork.setAttribute(artSource, art[artIndex]);
//     artIndex--;
// }



// // SONGS //

// let songs = [
//     {songName: "9TS - 80's Electro Mix", filePath: "songs/80s.mp3", coverPath: "dj-avery.png"},
//     {songName: "9TS - Dance Mix", filePath: "songs/dance-1.mp3", coverPath: "girl-dj.png"},
//     {songName: "9TS - Love Dance", filePath: "songs/dance-2.mp3", coverPath: "island-dj.png"},
//     {songName: "9TS - Big Room Vocals", filePath: "songs/dance-3.mp3", coverPath: "listening.png"},
// ]




// INDIVIDUAL SONG ITEMS //

// const makeAllPlays = ()=>{
//     Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
//         element.classList.remove('fa-pause-circle');
//         element.classList.add('fa-play-circle');
//     })
// }

// Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
//     element.addEventListener('click', (e)=>{ 
//         makeAllPlays();
//         songIndex = parseInt(e.target.id);
//         e.target.classList.remove('fa-play-circle');
//         e.target.classList.add('fa-pause-circle');
//         audioElement.src = `songs/${songIndex+1}.mp3`;
//         masterSongName.innerText = songs[songIndex].songName;
//         audioElement.currentTime = 0;
//         audioElement.play();
//         gif.style.opacity = 1;
//         masterPlay.classList.remove('fa-play-circle');
//         masterPlay.classList.add('fa-pause-circle');
//     })
// })
