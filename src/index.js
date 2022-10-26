import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');

form.addEventListener('submit', onBtnSubmitImg);
loadMore.addEventListener('click', onLoad);

const BASE_URL = 'https://pixabay.com/api/';
const KEY_API = '30686791-b3479a34cf20c1ed10f00ae7f';

let lightbox = new SimpleLightbox('.gallery__item', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});
let currentPage = 1;
let currentHits = 0;
let searchQuery = '';
loadMore.setAttribute('hidden', true);

async function getImgGallery(searchQuery, page) {
  const searchParams = new URLSearchParams({
    key: KEY_API,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: page,
    per_page: 40,
  });
  return await axios
    .get(`${BASE_URL}?${searchParams}`)
    .then(response => response.data);
}

async function onBtnSubmitImg(evt) {
  evt.preventDefault();
  searchQuery = form.elements.searchQuery.value.trim();
  currentPage = 1;
  if (searchQuery === '') {
    return (
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      ),
      scrrolUp()
    );
  }

  const response = await getImgGallery(searchQuery, currentPage);

  if (response.totalHits > 40) {
    loadMore.removeAttribute('hidden');
  } else {
    loadMore.setAttribute('hidden', true);
  }
  try {
    if (response.hits.length > 0) {
      Notiflix.Notify.info(`Hooray! We found ${response.totalHits} images.`);
      gallery.innerHTML = createMarkup(response.hits);
      lightbox.refresh();
      scrrolUp();
    }

    if (response.totalHits === 0) {
      gallery.innerHTML = '';
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    form.reset();
  } catch (error) {
    console.log(error);
  }
}

async function onLoad() {
  currentPage += 1;

  const response = await getImgGallery(searchQuery, currentPage);
  gallery.insertAdjacentHTML('beforeend', createMarkup(response.hits));
  lightbox.refresh();
  currentHits = 40 * currentPage;

  if (currentHits >= response.totalHits) {
    loadMore.setAttribute('hidden', true);
  }
}

function createMarkup(images) {
  return images
    .map(
      image =>
        `<div class="photo-card">
        <a class="gallery__item" href="${image.largeImageURL}">
  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" class="gallery-image" />
   </a>
  <div class="info">
    <p class="info-item">
      <b>Likes </b>
      ${image.likes}
    </p>
    <p class="info-item">
      <b>Views </b>
        ${image.views}
    </p>
    <p class="info-item">
      <b>Comments </b>
        ${image.comments}
    </p>
    <p class="info-item">
      <b>Downloads </b>
          ${image.downloads}
    </p>
  </div>
</div>`
    )
    .join('');
}

///..scroll up..///

// const btnScrrol = document.querySelector('.up-btn');
// btnScrrol.addEventListener('click', onScrrolUp);
// function onScrrolUp(evt) {
//   scrrolUp();
// }
function scrrolUp() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * -1000,
    behavior: 'smooth',
  });
}
