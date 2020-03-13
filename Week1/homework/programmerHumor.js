'use strict';

function apiWithXhr(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
        callback(null, {
           response: xhr.response,
           status: xhr.status,
           readyState: xhr.readyState,
        });
    } 
    xhr.onerror = () => callback('Error!');
    xhr.send();
}

const url = 'https://xkcd.now.sh/?comic=614';

apiWithXhr(url, (err, data) => {
    if (err) {    
        console.error(err);
        return;
    }else if (data.status == 200 && data.readyState == 4) {
        renderImg(data.response, 'Images with XHR');
    }else {
        console.error('Error(load: ', data.response, 'Status: ', data.status);
    }
});
    
axios
.get('https://xkcd.now.sh/?comic=614')
.then(res => {
    renderImg(res.data, 'Images with AXIOS');
})
.catch(err => console.error(err));

function renderImg(data, text) {

    console.log(data);
    const h1 = document.createElement('h1');
    h1.textContent = text;
    const img = document.createElement('img');
    img.setAttribute('src', data.img);
    document.body.appendChild(h1);
    document.body.appendChild(img);
}