const slides= document.querySelectorAll('.slide');

console.log(slides)
for (const slide of slides) {

    slide.addEventListener('click', () => {
clearActiveClasses()
slide.classList.add('active')

    })

}

function clearActiveClasses() {
    slides.forEach((slide) => {
        slide.classList.remove('active')
    }
    )
}

function loadGoogleTranslate(){
    new google.translate.TranslateElement("google_element")
}


const API_KEY = "9164f4b3-3f8c-4e49-83a2-06ab8b987852";
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

getMovies(API_URL_POPULAR);

async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();
  showMovies(respData);
}

function getClassByRate(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
}

function showMovies(data) {
  const moviesEl = document.querySelector(".movies");

  // Очищаем предыдущие фильмы
  document.querySelector(".movies").innerHTML = "";

  data.films.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <div class="movie_cover-inner">
        <img
          src="${movie.posterUrlPreview}"
          class="movie_cover"
          alt="${movie.nameRu}"
        />
        <div class="movie_cover--darkened"></div>
      </div>
      <div class="movie_info">
        <div class="movie_title">     ${movie.nameRu}</div>
        <div class="movie_category">     ${movie.genres.map(
          (genre) => ` ${genre.genre}`
        )}</div>
        ${
          movie.rating &&
          `
        <div class="movie_average movie_average--${getClassByRate(
          movie.rating
        )}">${movie.rating}</div>
        `
        }
      </div>
        `;
    moviesEl.appendChild(movieEl);
  });
}

const form = document.querySelector("form");
const search = document.querySelector(".search-poisk");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);

    search.value = "";
  }
});

let name = document.querySelector('#name');
let login = document.querySelector('#login');
let password = document.querySelector('#password');
let submit = document.querySelector('#submit');

let users = {};

function User(name, login, password){
  this.name = name;
  this.login = login;
  this.password = password;
}

function createId(users) {
  return Object.keys(users).length;
}

submit.addEventListener('click', () => {
  const nameUser = name.value;
  const loginUser = login.value;
  const passwordUser = password.value;

  const user = new User(nameUser, loginUser, passwordUser);

  const userId = 'User' + createId(users);
  users[userId] = user;

  console.log(users);

  alert(`${nameUser}, Вы успешно прошли регистрацию иуууу`);

})