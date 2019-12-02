'use strict';

let searchShows = [];
let favoritesShows = [];

//Function to paint the result of a search
const paintCardsShow = () => {
  for (let index = 0; index < searchShows.length; index++) {
    const searchShow = searchShows[index];
    const titleShow = searchShow.show.name;
    let imageShow = '';
    if (searchShow.show.image === null) {
      imageShow = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    } else {
      imageShow = searchShow.show.image.medium;
    }

    const liEl = document.createElement('li');
    liEl.classList.add('li__card');
    liEl.setAttribute('id', searchShow.show.id);

    const imgEl = document.createElement('img');
    imgEl.setAttribute('src', imageShow);
    imgEl.setAttribute('alt', 'cartel de la serie');

    const titleEl = document.createElement('h2');
    const titleText = document.createTextNode(titleShow);
    titleEl.appendChild(titleText);

    favoritesShows.find(element => {
      if (element.show.id === searchShow.show.id) {
        liEl.classList.add('showList--favorite');
      }
    });

    const ulEl = document.querySelector('.js-showList');
    ulEl.appendChild(liEl);
    liEl.appendChild(imgEl);
    liEl.appendChild(titleEl);
  }
};

//Handle function to select favorite shows by user
const selectFavoriteShow = event => {
  event.preventDefault();
  const selectedShow = parseInt(event.currentTarget.id);
  let elementExistsInFav = false;
  for (const favoriteShow of favoritesShows) {
    if (favoriteShow.show.id === selectedShow) {
      elementExistsInFav = true;
    }
  }
  for (const element of searchShows) {
    if (element.show.id === selectedShow) {
      if (elementExistsInFav === false) {
        favoritesShows.push(element);
      }
    }
  }

  localStorage.setItem('resultFav', JSON.stringify(favoritesShows));
  deleteShows();
  paintCardsShow();
  listenFavoriteShow();

  //Call function to paint elements in a favorite list section
  paintListOfFavorites();
};

//Function to listen when the user click the button search
const listenFavoriteShow = () => {
  const showItems = document.querySelectorAll('li');
  for (const showItem of showItems) {
    showItem.addEventListener('click', selectFavoriteShow);
  }
};

//Function to delete, it is useful to avoid duplicate results
const deleteShows = () => {
  const showItems = document.querySelectorAll('li');
  for (const showItem of showItems) {
    showItem.remove();
  }
};

//Function to paint the list of favorites in a section
const paintListOfFavorites = () => {
  for (const favoriteShow of favoritesShows) {
    let favImg = '';
    if (favoriteShow.show.image === null) {
      favImg = 'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';
    } else {
      favImg = favoriteShow.show.image.medium;
    }
    const favName = favoriteShow.show.name;

    const liFavElement = document.createElement('li');

    const imgFavElement = document.createElement('img');
    imgFavElement.setAttribute('src', favImg);
    imgFavElement.setAttribute('alt', 'Imagen de la serie');

    const titleFavElement = document.createElement('h3');
    const titleFavText = document.createTextNode(favName);
    titleFavElement.appendChild(titleFavText);

    liFavElement.appendChild(imgFavElement);
    liFavElement.appendChild(titleFavElement);
    const ulFavoriteElement = document.querySelector('.js-showListFavorties');
    ulFavoriteElement.appendChild(liFavElement);
  }
};

//Function to get information from server
const getShowInformation = event => {
  event.preventDefault();
  const inputEl = document.querySelector('.js-userInput');
  const userSearch = inputEl.value;
  fetch(`http://api.tvmaze.com/search/shows?q=${userSearch}`)
    .then(response => response.json())
    .then(data => {
      searchShows = data;

      deleteShows();
      paintCardsShow();
      listenFavoriteShow();
      paintListOfFavorites();
    })
    .catch(error => console.log(`Hay un error, ${error}`));
};
const buttonEl = document.querySelector('.js-button');
buttonEl.addEventListener('click', getShowInformation);

//Function to start the web
const getDataFromLS = () => {
  let favoritesShowsFromLS = JSON.parse(localStorage.getItem('resultFav'));
  if (favoritesShowsFromLS !== null) {
    favoritesShows = favoritesShowsFromLS;
    deleteShows();
    paintCardsShow();
    listenFavoriteShow();
    paintListOfFavorites();
  }
};
getDataFromLS();
