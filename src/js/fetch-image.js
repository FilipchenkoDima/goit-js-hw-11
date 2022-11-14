const axios = require('axios').default;
import cardMarkup from './photo-card-markup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const loadMoreBtn = document.querySelector('.load-more');


const BASE_URL = 'https://pixabay.com/api/';
const BASE_KEY = '31282131-4e4d9489159d462cf4c23243b';

export default class imgApiService {
    constructor() {
        this.searchQuery = '';  
        this.page = 1;
    };
    
    fetchSearchImg() {
        const options = {
            key: BASE_KEY,
            q: this.searchQuery,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: this.page,
            per_page: 40,
        };

        const response = axios.get(BASE_URL, {
            params: options,
        }).then(response => {
            const totalHits = response.data.totalHits;
            if (totalHits === 0) {
                Notify.failure("Sorry, there are no images matching your search query. Please try again.");
                return;
            };
            loadMoreBtn.style.display = 'block';
            if (totalHits <= 40) {
                loadMoreBtn.style.display = 'none';
            };
            cardMarkup(response.data);
            
            if (this.page <= 2) {
                Notify.success(`Hooray! We found ${totalHits} images.`);
            };
        }).catch(error => {
            Notify.failure("We're sorry, but you've reached the end of search results.");
        });
        this.incrementPage();
        return response;
    };

    set query(newQuery) {
        this.searchQuery = newQuery;
    };

    incrementPage() {
        this.page += 1;
    };

    resetPage() {
        this.page = 1;
    }
};




