'use strict';

const xhrBtn = document.getElementById('xhr');
const axiosBtn = document.getElementById('axi');

xhrBtn.addEventListener('click', imageXHR);
axiosBtn.addEventListener('click', imageAxios);

function imageXHR() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://dog.ceo/api/breeds/image/random');
    xhr.responseType = 'json';
    xhr.onload = () => {
        createImage(xhr.response.message);
    };
    xhr.send();
}

function imageAxios() {
    axios
    .get('https://dog.ceo/api/breeds/image/random')
    .then(res => {
        createImage(res.data.message);
    })
    .catch(err => console.error(err));
}

function createImage(dogImg) {

    const imgUl = document.getElementById('imgUl');
    const img = document.createElement('img');
    const li = document.createElement('li');

    img.setAttribute('src', dogImg);
    img.style = 'width:200px; height:200px';

    li.appendChild(img);
    imgUl.appendChild(li);
}