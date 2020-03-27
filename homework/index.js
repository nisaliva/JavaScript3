'use strict';

{
  async function axiosJSON(url) {
    try {
      const response = await axios.get(url);
      const data = response.data;
      return data;
    }
    catch (err) {
      return errorHandler;
    }
  }
  
  const errorHandler = err => {
    const root = document.getElementById('root');
    createAndAppend('div', root, {
      text: err.message,
      class: 'alert-error',
    });
  }

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

  function renderRepoDetails(repo, ul) {
    const li = createAndAppend('li', ul);
    const table = createAndAppend('table', li);
    const titles = ['Repository:', 'Description:', 'Forks:', 'Updated:'];
    const keys = ['name', 'description', 'forks', 'updated_at'];

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

  const select = document.querySelector('header select');
  const repoContainer = document.querySelector('.repo-container');
  const contributorsContainer= document.querySelector('.contributors-container');
 
  async function main(url) {
    const repos = await axiosJSON(url);
    repos.sort((a, b) => a.name.localeCompare(b.name));
    createSelectTab(repos);
  }

  function createSelectTab(repos) {
    repos.forEach(repo => {
      let repoName = repo.name.toLowerCase();
      createAndAppend('option', select, {
      value: repo.name,
      text: repoName,
      });
    });
  
    select.addEventListener('change', () => {
      repoSelection(select,repos);
    });
  }

  const ulRepo = createAndAppend('ul', repoContainer);
  const ulCont = createAndAppend('ul', contributorsContainer);

  async function repoSelection(select, repos) {
    try {
      const response = await axios(
        `https://api.github.com/repos/HackYourFuture/${select.value}/contributors`,
      );
      const data = response.data;
    
      ulCont.innerHTML = '';
      ulRepo.innerHTML = '';
      contributorsContainer.classList.remove('noneDisplay');
      repos
      .filter(repo => repo.name === select.value)
      .forEach(repo => renderRepoDetails(repo, ulRepo));

      renderContributor(data, ulCont);
    }
    catch (err) {
      return errorHandler;
    }
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

  const HYF_REPOS_URL =
    'https://api.github.com/orgs/HackYourFuture/repos?per_page=100';
  window.onload = () => main(HYF_REPOS_URL);
}
