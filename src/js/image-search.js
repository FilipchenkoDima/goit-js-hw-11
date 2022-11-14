import ImgApiService from './fetch-image'
import cardMarkup from './photo-card-markup';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const imgApiService = new ImgApiService();
const searchFormBtn = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');
const galleryEl = document.querySelector('.gallery');

searchFormBtn.addEventListener('submit', onSubmitForm);
loadMoreBtn.addEventListener('click', onLoadMore);

function onSubmitForm(evt) {
    evt.preventDefault();
    const inputQuery = evt.target.searchQuery.value;

    imgApiService.resetPage();
    galleryEl.innerHTML = '';
    loadMoreBtn.style.display = 'none';
    evt.target.searchQuery.value = '';
    imgApiService.query = inputQuery;
    imgApiService.fetchSearchImg();
};

function onLoadMore() {
    loadMoreBtn.style.display = 'none';
    imgApiService.fetchSearchImg();
};


// console.log(imgApiService);
new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionsDelay: 250,
});