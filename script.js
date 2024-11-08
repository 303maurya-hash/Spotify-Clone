console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Mashallah - Jack Knight", filePath: "songs/1.mp3", coverPath: "covers/1.jpg", duration: "02:50"},
    {songName: "Milenge Hum Nahi - Kunal Verma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg", duration: "03:29"},
    {songName: "Rula Diya - Jack Knight", filePath: "songs/3.mp3", coverPath: "covers/3.jpg", duration: "03:30"},
    {songName: "Saccha Wala Pyaar - Tulsi Kumar", filePath: "songs/4.mp3", coverPath: "covers/4.jpg", duration: "03:31"},
    {songName: "Tere Liye Jaanam - Astitva", filePath: "songs/5.mp3", coverPath: "covers/5.jpg", duration: "03:38"},
    {songName: "Tu Hai Meri Ratan - Rawani", filePath: "songs/2.mp3", coverPath: "covers/6.jpg", duration: "04:12"},
    {songName: "Tu Meri Rehnuma - Shahid Maliya", filePath: "songs/2.mp3", coverPath: "covers/7.jpg", duration: "04:09"},
    {songName: "Tum Yaad Aaye - Papon", filePath: "songs/2.mp3", coverPath: "covers/8.jpg", duration: "02:46"},
    {songName: "Yaaro Ke Yaar - Rajat Nagpal", filePath: "songs/2.mp3", coverPath: "covers/9.jpg", duration: "03:09"},
    {songName: "Yeh Dil Deewana - Sonu Nigam", filePath: "songs/4.mp3", coverPath: "covers/10.jpg", duration: "03:29"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
    element.getElementsByClassName("duration")[0].innerText = songs[i].duration;
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        makeAllPlays();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        if(e.target.classList.contains('fa-pause-circle')){
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
        }
        else{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        }
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})