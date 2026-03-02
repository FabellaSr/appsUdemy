import type { GiphyRandomResponse } from "../data/giphy.response";

const API_KEY = 'AtdOW7FO9YOcsrXW3mNvRa3Zp3BVqE21';
const URL = `https://api.giphy.com/v1/gifs/random?api_key=`;


const createImageInsideDOM = (url : string) => {
        const imgElement = document.createElement('img');
        imgElement.src = url;
        document.body.append(imgElement)
}

const getRandomGifUrl = async (): Promise<string> => {
    const response = await fetch(URL + API_KEY);

    const {data}: GiphyRandomResponse = await response.json();
    return data.images.original.url;
}

/*getRandomGifUrl()
    .then((url) => {
        createImageInsideDOM(url);
    });*/
    getRandomGifUrl().then(createImageInsideDOM);