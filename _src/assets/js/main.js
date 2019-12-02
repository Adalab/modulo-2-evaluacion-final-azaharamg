"use strict";

let searchShows = [];
let imageShow = "";
let favoritesShows = [];

/*const paintFavorites = () => {
  let favId = "";
  let showID = " ";

  for (let index = 0; index < searchShows.length; index++) {
    const element = searchShows[index];
    showID = element.show.id;
  }
  for (const item of favoritesShows) {
    favId = item;
  }
  if (favId === showID) {
    console.log("YEP");
  } else {
    console.log("WHATT");
  }
};*/

const paintCardsShow = () => {
  for (let index = 0; index < searchShows.length; index++) {
    const searchShow = searchShows[index];
    const titleShow = searchShow.show.name;
    if (searchShow.show.image === null) {
      imageShow = "https://via.placeholder.com/210x295/ffffff/666666/?text=TV";
    } else {
      imageShow = searchShow.show.image.medium;
    }

    const liEl = document.createElement("li");
    liEl.setAttribute("id", searchShow.show.id);

    const imgEl = document.createElement("img");
    imgEl.setAttribute("src", imageShow);
    imgEl.setAttribute("alt", "cartel de la serie");

    const titleEl = document.createElement("h2");
    const titleText = document.createTextNode(titleShow);
    titleEl.appendChild(titleText);

    if (favoritesShows.indexOf(searchShow.show.id) !== -1) {
      liEl.classList.add("showList--favorite");
    }

    const ulEl = document.querySelector(".js-showList");
    ulEl.appendChild(liEl);
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
  const selectedIndex = favoritesShows.indexOf(selectedShow);
  if (favoritesShows.indexOf(selectedShow) !== -1) {
    favoritesShows.splice(selectedIndex, 1);
  } else {
    favoritesShows.push(selectedShow);
  }
  console.log(favoritesShows);
  deleteShows();
  paintCardsShow();
  listenFavoriteShow();
  //paintFavorites();
  /*Paint in favorite list shows
  PaintListOfFavorites();*/
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

/*List favorites shows in another list
const PaintListOfFavorites = () => {
  for (const favoriteShow of favoritesShows) {
    console.log(favoriteShow); //139
Almacenar datos en un objeto, y solo tengo el id???????????????????
    const favName = searchShows[favoriteShow].show.name;
    const favImg = searchShows[favoriteShow].show.image.medium;

    const liFavElement = document.createElement("li");

    const imgFavElement = document.createElement("img");
    imgFavElement.setAttribute("src", favImg);
    imgFavElement.setAttribute("alt", "Imagen de la serie");

    const titleFavElement = document.createElement("h3");
    const titleFavText = document.createTextNode(favName);
    titleFavElement.appendChild(titleFavText);

    liFavElement.appendChild(imgFavElement);
    liFavElement.appendChild(titleFavElement);
    const ulFavoriteElement = document.querySelector(".js-showListFavorties");
    ulFavoriteElement.appendChild(liFavElement);
  }
};*/

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
      //LocalStorage
      localStorage.setItem("resultShows", JSON.stringify(searchShows));
    })
    .catch(error => console.log(`Hay un error, ${error}`));
};
const buttonEl = document.querySelector(".js-button");
buttonEl.addEventListener("click", getShowInformation);

//When the web start
let valueFromServer = JSON.parse(localStorage.getItem("resultShows"));
if (valueFromServer !== null) {
  searchShows = valueFromServer;
  paintCardsShow();
  listenFavoriteShow();
}
