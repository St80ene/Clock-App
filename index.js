// Selecting elements from DOM
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const region = document.getElementById('region');
const regionName = document.getElementById('regionName');
const timeZone = document.getElementById('timezone');
const yearDay = document.getElementById('day-of-the-year');
const weekDay = document.getElementById('day-of-the-week');
const weekNumber = document.getElementById('week-number');
const currentGreeting = document.getElementById('greeting-meridian');
const container = document.getElementById('container');
const overlay = document.getElementById('overlay');
const icon = document.getElementById('icons');
const meridianTime = document.getElementById('meridian-time');
const timeNow = document.getElementById('time-now');
const refresh = document.getElementById('refresh');
const expand = document.getElementById('expand');
const description = document.getElementById('descr');
const moreDetails = document.getElementById('main');
const introWrapper = document.getElementById('intro');

window.onload = function () {
  document.querySelector('body').style.visibility = 'hidden';
  document.querySelector('#loader').style.visibility = 'visible';
  moreDetails.style.display = 'none';
  getData();
  getTime();
  getLocation();
};

async function getData() {
  try {
    const worldTime = await (
      await fetch('https://worldtimeapi.org/api/ip')
    ).json();

    const quotes = await (await fetch('https://api.quotable.io/random')).json();

    displayQuote(quotes);
    displayClock(worldTime);
  } catch {
    overlay.innerHTML = `<div class="error">
    <h2>Ooops!! Not available, please reload the page</h2>
    </div>`;
  } finally {
    document.querySelector('#loader').style.display = 'none';
    document.querySelector('body').style.visibility = 'visible';
  }
}

async function displayQuote(quote) {
  quoteText.textContent = await quote.content;
  if (quote.author === null) {
    quoteAuthor.textContent = 'Unknown Author';
  } else {
    quoteAuthor.textContent = await quote.author;
  }
}

async function displayClock(clock) {
  const {
    abbreviation,
    timezone,
    day_of_year,
    day_of_week,
    week_number,
  } = clock;
  region.textContent = await abbreviation;
  timeZone.textContent = await timezone;
  yearDay.textContent = await day_of_year;
  weekDay.textContent = await day_of_week;
  weekNumber.textContent = await week_number;
}

function getTime() {
  let currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();

  //Time of the day
  let greeting = '';
  if (hours >= 5 && hours <= 11) {
    greeting = 'Morning';
  } else if (hours >= 12 && hours <= 17) {
    greeting = 'Afternoon';
  } else {
    greeting = 'Evening';
  }
  currentGreeting.textContent = `GOOD ${greeting}, IT'S CURRENTLY`;

  //Background Image and greeting icon
  if (hours >= 5 && hours <= 17) {
    container.style.backgroundImage =
      'url(/img/jeremy-bishop-dvACrXUExLs-unsplash.jpg)';

    icon.innerHTML = `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M11.78 19.417c.594 0 1.083.449 1.146 1.026l.006.125v1.842a1.152 1.152 0 01-2.296.125l-.007-.125v-1.842c0-.636.516-1.151 1.152-1.151zM6.382 17.18a1.15 1.15 0 01.09 1.527l-.09.1-1.302 1.303a1.152 1.152 0 01-1.718-1.528l.09-.1 1.302-1.302a1.15 1.15 0 011.628 0zm12.427 0l1.303 1.303a1.15 1.15 0 11-1.628 1.627L17.18 18.81a1.15 1.15 0 111.628-1.628zM11.781 5.879a5.908 5.908 0 015.901 5.902 5.908 5.908 0 01-5.901 5.902 5.908 5.908 0 01-5.902-5.902 5.908 5.908 0 015.902-5.902zm10.63 4.75a1.151 1.151 0 110 2.303h-1.843a1.151 1.151 0 110-2.303h1.842zm-19.418 0a1.151 1.151 0 01.126 2.296l-.125.007H1.15a1.151 1.151 0 01-.125-2.296l.125-.007h1.842zm1.985-7.268l.1.09 1.303 1.302a1.151 1.151 0 01-1.528 1.718l-.1-.09L3.45 5.08A1.15 1.15 0 014.978 3.36zm15.133.09c.45.449.45 1.178 0 1.628L18.808 6.38a1.151 1.151 0 11-1.628-1.628l1.303-1.303c.449-.449 1.178-.449 1.628 0zM11.781 0c.636 0 1.151.515 1.151 1.151v1.843a1.152 1.152 0 01-2.303 0V1.15C10.63.515 11.145 0 11.781 0z" fill="#FFF" fill-rule="nonzero"/></svg>`;
  } else {
    container.style.backgroundImage =
      'url(/img/ryan-hutton-Jztmx9yqjBw-unsplash.jpg)';

    icon.innerHTML =
      '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M22.157 17.366a.802.802 0 00-.891-.248 8.463 8.463 0 01-2.866.482c-4.853 0-8.8-3.949-8.8-8.8a8.773 8.773 0 013.856-7.274.801.801 0 00-.334-1.454A7.766 7.766 0 0012 0C5.382 0 0 5.382 0 12s5.382 12 12 12c4.2 0 8.02-2.134 10.218-5.709a.805.805 0 00-.061-.925z" fill="#FFF" fill-rule="nonzero"/></svg>';
  }

  //Getting the time of the day
  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  if (hours === 0) {
    hours = 12;
    meridianTime.textContent = 'AM';
  } else if (hours === 12) {
    meridianTime.textContent = 'Noon';
  } else if (hours > 12) {
    hours -= 12;
    meridianTime.textContent = 'PM';
  } else {
    meridianTime.textContent = 'AM';
  }
  timeNow.textContent = `${hours}:${minutes}`;

  //update Time
  let interval = (60 - new Date().getSeconds()) * 1000 + 5;
  setTimeout(getTime, interval);
}

//Getting location
async function getLocation() {
  const res = await (await fetch('https://freegeoip.app/json/')).json();

  const { region_name, country_code } = res;
  regionName.textContent = `In ${region_name}, ${country_code}`;
}

function expandDetails() {
  if (description.textContent === 'More') {
    expand.classList.add('less');
    description.textContent = 'Less';
    moreDetails.style.display = 'block';
    introWrapper.style.height = '60%';
    moreDetails.style.height = '40%';
    document.querySelector('.greeting-wrapper').style.marginTop = '0';
    document.querySelector('.quote-container').style.marginTop = '0';
  } else {
    description.textContent = 'More';
    expand.classList.remove('less');
    moreDetails.style.display = 'none';
    introWrapper.style.height = '100%';
    document.querySelector('.greeting-wrapper').style.marginTop = '11rem';
    document.querySelector('.quote-container').style.marginTop = '1rem';
  }
}

expand.addEventListener('click', expandDetails);

refresh.addEventListener('click', displayQuote);
