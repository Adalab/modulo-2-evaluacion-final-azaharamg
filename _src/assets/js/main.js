"use strict";

let searchShows = [];
let imageShow = "";

const paintCardsShow = () => {
  for (const searchShow of searchShows) {
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
};

const getShowInformation = event => {
  event.preventDefault();
  const inputEl = document.querySelector(".js-userInput");
  const userSearch = inputEl.value;
  fetch(`http://api.tvmaze.com/search/shows?q=${userSearch}`)
    .then(response => response.json())
    .then(data => {
      searchShows = data;

      paintCardsShow();
    });
};
const buttonEl = document.querySelector(".js-button");
buttonEl.addEventListener("click", getShowInformation);
