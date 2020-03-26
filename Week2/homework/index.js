 'use strict';

{
  window.onload = () => main(HYF_REPOS_URL);
  const HYF_REPOS_URL =
  'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';

  //creating a function with fetch() method to fetch the resource.
  function fetchJSON(url){
    return fetch (url)
    .then(response => {
      if (response.ok) {
        return response.json()
      }else {
        throw new Error(`Network error: ${response.status} - ${response.statusText}`);
      }
    })
    .catch(err => errorHandler(err));
  }
  
  const errorHandler = err => {
    const root = document.getElementById('root');
    createAndAppend('div', root, {
      text: err.message,
      class: 'alert-error',
    });
  }

  //creating a function for the elements to be created in the next step
  function createAndAppend(name, parent, options = {}) {
    const elem = document.createElement(name);
    parent.appendChild(elem);
    Object.entries(options).forEach(([key, value]) => {
      if (key === 'text') {
        elem.textContent = value;
      } else {
        elem.setAttribute(key, value);
      }
    });
    return elem;
  }

  //creating a new function for rendering Repo-Details with the help of the previous function
  function renderRepoDetails(repo, ul) {
    const li = createAndAppend('li', ul);
    const table = createAndAppend('table', li);
    const titles = ['Repository:', 'Description:', 'Forks:', 'Updated:'];
    const keys = ['name', 'description', 'forks', 'updated_at'];

    // here the detailed elements of the table are created.
    titles.forEach((title, index) =>{
      let tr = createAndAppend('tr', table);
      createAndAppend('th', tr, { text: title });
      if (index > 0) createAndAppend('td', tr, { text: repo[keys[index]] });
      else {
        const td = createAndAppend('td', tr);
        createAndAppend('a', td, {
          href: repo.html_url,
          text: repo.name,
          target: '_blank',
        });
      }
    })
  }

  //creating new variables for the html elements to use in the next function.
  const select = document.querySelector('header select');
  const repoContainer = document.querySelector('.repo-container');
  const contributorsContainer= document.querySelector('.contributors-container');
 
  function main(url) {
    fetchJSON(url)
      .then(repos => {
        repos.sort((a, b) => a.name.localeCompare(b.name));
        createSelectTab(repos);
      })
      .catch(err => errorHandler(err));
  }

  function createSelectTab(repos) {
    const ulRepo = createAndAppend('ul', repoContainer);
    const ulCont = createAndAppend('ul', contributorsContainer);
  
    repos.forEach(repo => {
      let repoName = repo.name.toLowerCase();
      //adding an option element per repository to the select element
      createAndAppend('option', select, {
      value: repo.name,
      text: repoName,
      });
    });
    
    //adding a dynamic select list,
    select.addEventListener('change', () => {
      ulRepo.innerHTML = '';
      ulCont.innerHTML = '';
      const urlApi = `https://api.github.com/repos/HackYourFuture/${select.value}/contributors`;
        fetch(urlApi)
        	.then(res => res.json())
       	 	.then(contributors => {
      			renderContributor(contributors, ulCont);
          })
          repos.forEach(repo => {
            if (repo.name === select.value) {
              renderRepoDetails(repo, ulRepo);
              }
          });
    });
  }
  
  function renderContributor(contributors, ulCont) {
    for (let i = 0; i < contributors.length; ++i) {
        const li = createAndAppend('li', ulCont);
        const table = createAndAppend('table', li);
        const tr = createAndAppend('tr', table);
        const th = createAndAppend('th', tr);
        createAndAppend('img', th, {src: contributors[i].avatar_url});
        createAndAppend('a', th, {text: contributors[i].login, href: contributors[i].html_url,target: '_blank'});
        createAndAppend('td', tr, {text: contributors[i].contributions, class: 'smallNumbers'});
    }
  }
}