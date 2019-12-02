"use strict";

let searchShows = [];
let imageShow = "";
let favoritesShows = [];

const paintCardsShow = () => {
  for (let index = 0; index < searchShows.length; index++) {
    const searchShow = searchShows[index];
    const titleShow = searchShow.show.name;
    if (searchShow.show.image === null) {
      imageShow = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
    } else {
      imageShow = searchShow.show.image.medium;
    }

    const divEl = document.createElement("div");

    const liEl = document.createElement("li");
    liEl.setAttribute("id", index);

    const imgEl = document.createElement("img");
    imgEl.setAttribute("src", imageShow);
    imgEl.setAttribute("alt", "cartel de la serie");

    const titleEl = document.createElement("h3");
    const titleText = document.createTextNode(titleShow);
    titleEl.appendChild(titleText);

    if (favoritesShows.indexOf(index) !== -1) {
      liEl.classList.add("showList--favorite");
    }

    const ulEl = document.querySelector(".js-showList");
    ulEl.appendChild(divEl);
    divEl.appendChild(liEl);
    liEl.appendChild(imgEl);
    liEl.appendChild(titleEl);
  }
};

/*for (const searchShow of searchShows) {
    const titleShow = searchShow.show.name;
    if (searchShow.show.image.medium === null) {
      imageShow = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
    } else {
      imageShow = searchShow.show.image.medium;
    }
    console.log(titleShow);
    console.log(imageShow);

    const divEl = document.createElement("div");

    const liEl = document.createElement("li");

    const imgEl = document.createElement("img");
    imgEl.setAttribute("src", imageShow);
    imgEl.setAttribute("alt", "cartel de la serie");

    const titleEl = document.createElement("h3");
    const titleText = document.createTextNode(titleShow);
    titleEl.appendChild(titleText);

    const ulEl = document.querySelector(".js-showList");
    ulEl.appendChild(divEl);
    divEl.appendChild(liEl);
    liEl.appendChild(imgEl);
    liEl.appendChild(titleEl);
  }
};*/

//Handle function to select favorite shows
const selectFavoriteShow = event => {
  const selectedShow = parseInt(event.currentTarget.id);
  console.log(selectedShow);
  const selectedIndex = favoritesShows.indexOf(selectedShow);
  if (favoritesShows.indexOf(selectedShow) !== -1) {
    favoritesShows.splice(selectedIndex, 1);
  } else {
    favoritesShows.push(selectedShow);
  }
  deleteShows();
  paintCardsShow();
  listenFavoriteShow();
};

const listenFavoriteShow = () => {
  const showItems = document.querySelectorAll("li");
  for (const showItem of showItems) {
    showItem.addEventListener("click", selectFavoriteShow);
  }
};

//Delete function to avoid duplicate results
const deleteShows = () => {
  const showItems = document.querySelectorAll("li");
  for (const showItem of showItems) {
    showItem.remove();
  }
};

const getShowInformation = event => {
  event.preventDefault();
  const inputEl = document.querySelector(".js-userInput");
  const userSearch = inputEl.value;
  fetch(`http://api.tvmaze.com/search/shows?q=${userSearch}`)
    .then(response => response.json())
    .then(data => {
      searchShows = data;

      deleteShows();
      paintCardsShow();
      listenFavoriteShow();
    })
    .catch(error => console.log(`Hay un error, ${error}`));
};
const buttonEl = document.querySelector(".js-button");
buttonEl.addEventListener("click", getShowInformation);
