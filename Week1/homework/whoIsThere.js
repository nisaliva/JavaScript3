'use strict';

function usersXHR() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://www.randomuser.me/api');
    xhr.responseType = 'json';
    xhr.onload = () => {
        if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200){
            console.log(xhr.response);
        } else{
        console.error(`Error: ${xhr.status} - ${xhr.statusText}`);
        }
    };

    xhr.onerror = () => {
        console.error('Network request failed');
    };

    xhr.send();
}

function usersAxios() {
    axios
    .get('https://www.randomuser.me/api')
    .then(res => {
        console.log(res.data);
    })
    .catch(err => console.error(err));
}
usersXHR();
usersAxios();