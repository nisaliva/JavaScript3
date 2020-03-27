'use strict';

{
  const { createAndAppend } = window.Util;

  class RepoView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.selectedRepo);
      }
    }

    /**
     * Renders the repository details.
     * @param {Object} repo A repository object.
     */
    render(repo) {
      // TODO: replace this comment and the console.log with your own code
      this.container.textContent = '';
      const ul = createAndAppend('ul', this.container);
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

      console.log('RepoView', repo);
    }
  }

  window.RepoView = RepoView;
}
