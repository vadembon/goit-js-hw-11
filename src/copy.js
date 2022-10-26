// import axios from 'axios';
// import Notiflix from 'notiflix';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// const form = document.querySelector('.search-form');
// const gallery = document.querySelector('.gallery');
// const loadMore = document.querySelector('.load-more');

// form.addEventListener('submit', onBtnSubmitImg);
// loadMore.addEventListener('click', onLoad);

// const BASE_URL = 'https://pixabay.com/api/';
// const KEY_API = '30686791-b3479a34cf20c1ed10f00ae7f';

// let lightbox = new SimpleLightbox('.gallery__item', {
//   captions: true,
//   captionsData: 'alt',
//   captionDelay: 250,
// });

// let page = 1;
// loadMore.setAttribute('hidden', true);
// let searchQuery = '';

// async function getImgGallery() {
//   const searchParams = new URLSearchParams({
//     key: KEY_API,
//     q: searchQuery,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//     page: page,
//     per_page: 40,
//   });

//   try {
//     const response = await axios.get(`${BASE_URL}?${searchParams}`);
//     const dataImg = response.data.hits;

//     gallery.insertAdjacentHTML('beforeend', createMarkup(dataImg));
//     lightbox.refresh();

//     if (dataImg.length > 1 && page === 1) {
//       Notiflix.Notify.info(
//         `Hooray! We found ${response.data.totalHits} images.`
//       );
//     }
//     if (dataImg.length === 0) {
//       Notiflix.Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//       loadMore.setAttribute('hidden', true);
//     }
//     if (dataImg.length >= 40) {
//       loadMore.removeAttribute('hidden');
//     } else if (dataImg.length) {
//       loadMore.setAttribute('hidden', true);
//     }
//     if (searchQuery.length === 0) {
//       gallery.innerHTML = '';
//       loadMore.setAttribute('hidden', true);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// function onBtnSubmitImg(evt) {
//   evt.preventDefault();
//   searchQuery = form.elements.searchQuery.value;

//   if (searchQuery) {
//     gallery.innerHTML = '';
//     page = 1;
//   }

//   if (searchQuery === '') {
//     gallery.innerHTML = '';
//     loadMore.setAttribute('hidden', true);
//     Notiflix.Notify.failure(
//       'Sorry, there are no images matching your search query. Please try again.'
//     );
//   } else {
//     getImgGallery(searchQuery);
//   }

//   form.reset();
// }

// function onLoad() {
//   page += 1;

//   getImgGallery(searchQuery);
// }

// function createMarkup(images) {
//   return images
//     .map(
//       image =>
//         `<div class="photo-card">
//         <a class="gallery__item" href="${image.largeImageURL}">
//   <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" class="gallery__image" />
//    </a>
//   <div class="info">
//     <p class="info-item">
//       <b>Likes </b>
//       ${image.likes}
//     </p>
//     <p class="info-item">
//       <b>Views </b>
//         ${image.views}
//     </p>
//     <p class="info-item">
//       <b>Comments </b>
//         ${image.comments}
//     </p>
//     <p class="info-item">
//       <b>Downloads </b>
//           ${image.downloads}
//     </p>
//   </div>
// </div>`
//     )
//     .join('');
// }
