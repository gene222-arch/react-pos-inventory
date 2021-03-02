const SEARCH_PARAMS = new URLSearchParams(window.location.search);

export const get = (key) => SEARCH_PARAMS.get(key);