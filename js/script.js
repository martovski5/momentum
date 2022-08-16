function showTime() {
  const time = document.querySelector(".time");
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
}
showTime();

function showDate() {
  const showDate = document.querySelector(".date");
  const date = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" };
  const currentDate = date.toLocaleDateString("en-US", options);
  showDate.textContent = currentDate;
}

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  let morning = "Good morning";
  let afternoon = "Good afternoon";
  let evening = "Good evening";
  if (hours >= 0 && hours < 12) {
    return morning;
  } else if (hours >= 12 && hours <= 17) {
    return afternoon;
  } else if (hours >= 18 && hours < 24) {
    return evening;
  }
  return "Hellow";
}

function showGreeting() {
  const timeOfDay = getTimeOfDay();
  const showTimeOfDay = document.querySelector(".greeting");
  showTimeOfDay.textContent = timeOfDay;
}

function setLocalStorage() {
  const name = document.querySelector(".name");
  localStorage.setItem("name", name.value);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  const name = document.querySelector(".name");
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }
}
window.addEventListener("load", getLocalStorage);

function getRandomNum(min, max) {
  let rand = min + Math.random() * (max - min);
  let rand2 = Math.round(rand);
  let rand3 = String(rand2);
  if (rand3 <= 9) {
    return rand3.padStart(2, "0");
  }
  return rand3;
}
getRandomNum(1, 20);

let randomNum = getRandomNum(1, 20);

function setBg() {
  let timeOfDay = getTimeOfDay().replace(/Good /g, "");
  let bodyImg =
    (document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomNum}.jpg')`);
}
setBg();

function getSlideNext() {
  setBg();
  let greaterNum = String(+randomNum + 1);
  if (greaterNum <= 9) {
    return (randomNum = greaterNum.padStart(2, "0"));
  } else if (randomNum == 20) {
    return (randomNum = "01");
  }
  return (randomNum = greaterNum);
}
let slideNext = document.querySelector(".slide-next");
slideNext.addEventListener("click", getSlideNext);

function getSlidePrev() {
  setBg();
  let greaterNum = String(+randomNum - 1);
  if (greaterNum <= 9) {
    return (randomNum = greaterNum.padStart(2, "0"));
  } else if (randomNum == 1) {
    return (randomNum = "20");
    // не получается сделать переход с 01 до 20
  }
  return (randomNum = greaterNum);
}
let slidePrev = document.querySelector(".slide-prev");
slidePrev.addEventListener("click", getSlidePrev);

// Создаём виджет погоды
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=07f73f486f5bb50fabdf7fa8720d451b&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  weatherIcon.className = "weather-icon owf";
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
}

const city = document.querySelector(".city");
city.addEventListener("change", () => {
  getWeather();
});

async function getQuotes() {
  const quotes = "data.json";
  const res = await fetch(quotes);
  const data = await res.json();

  let rand = Math.floor(Math.random() * data.length);
  let rValue = data[rand];

  const quote = document.querySelector(".quote");
  const author = document.querySelector(".author");
  quote.textContent = rValue.text;
  author.textContent = rValue.author;
}
getQuotes();

const changeBtn = document.querySelector(".change-quote");
changeBtn.addEventListener("click", () => {
  getQuotes();
});

//Делаем проигрыватель музыки



const button = document.querySelector(".play");

function toggleBtn() {
  button.classList.toggle("pause");
}
button.addEventListener("click", toggleBtn);

const playList = [
  {
    title: "Aqua Caelestis",
    src: "../assets/sounds/Aqua Caelestis.mp3",
    duration: "00:58",
  },
  {
    title: "River Flows In You",
    src: "../assets/sounds/River Flows In You.mp3",
    duration: "03:50",
  },
  {
    title: "Ennio Morricone",
    src: "../assets/sounds/Ennio Morricone.mp3",
    duration: "03:50",
  },
  {
    title: "Summer Wind",
    src: "../assets/sounds/Summer Wind.mp3",
    duration: "03:50",
  },
];


for (let i = 0; i < playList.length; i++) {
  const playListContainer = document.querySelector(".play-list");
  const li = document.createElement("li");
  li.classList.add('play-item');
  let addText = playListContainer.append(li);
  let textList = playList[i].title;
  const playItem = document.querySelectorAll(".play-item");
  li.textContent = textList;
}



let isPlay = false;

const audio = document.querySelector('audio');
const playBtn = document.querySelector('.play');


playBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playBtn.classList.add('pause');
    playBtn.classList.remove('play');
  } else {
    audio.pause();
    playBtn.classList.remove('pause');
    playBtn.classList.add('play');
  }
});



