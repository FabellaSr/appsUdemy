import type { GiphyRandomResponse } from "../data/giphy.response";

const API_KEY = 'AtdOW7FO9YOcsrXW3mNvRa3Zp3BVqE21';
const URL = `https://api.giphy.com/v1/gifs/random?api_key=`;
const myRequest = fetch(URL + API_KEY);

/*myRequest
.then( (response) => {
    response.json().then((data) =>{
        console.log(data);
    }); 
})
.catch((err) => {
    console.log(err);
}) */
/*
myRequest
.then( (response) => response.json())
.then((data) => console.log(data))
.catch((err) => {
    console.log(err);
})*/
/*
myRequest
.then( (response) => response.json())
.then((data) =>{
    const imageUrl = data.data.images.original.url;
    console.log(imageUrl);
    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    document.body.append(imgElement)
})
.catch((err) => {
    console.log(err);
})*/

myRequest
    .then((response) => response.json())
    .then(({ data }: GiphyRandomResponse) => {
        const imagUrl = data.images.original.url;
        const imgElement = document.createElement('img');
        imgElement.src = imagUrl;
        document.body.append(imgElement)
    })
    .catch((err) => {
        console.log(err);
    })