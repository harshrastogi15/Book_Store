const API_KEY = 'HarshrastogibookService'

export const urlauth = `/${API_KEY}/api/auth`

export const urlbook = `/${API_KEY}/api/book`; 

export const urlreviewbook = `/${API_KEY}/api/review`; 

export const urlSearch = `/${API_KEY}/api/search`;

export const urlFavourite = `/${API_KEY}/api/favourite`;

export const auth_token = `${localStorage.getItem('token')}`