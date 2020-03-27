'use strict';

{
  const { createAndAppend } = window.Util;

  class ContributorsView {
    constructor(container) {
      this.container = container;
    }

    update(state) {
      if (!state.error) {
        this.render(state.contributors);
      }
    }

    /**
     * Renders the list of contributors
     * @param {Object[]} contributors An array of contributor objects
     */
    render(contributors) {
      // TODO: replace this comment and the console.log with your own code
      this.container.innerHTML = '';
      for (let i = 0; i < contributors.length; ++i) {
        const ul = createAndAppend('ul', this.container);
        const li = createAndAppend('li', ul);
        const table = createAndAppend('table', li);
        const tr = createAndAppend('tr', table);
        const th = createAndAppend('th', tr);
        createAndAppend('img', th, {src: contributors[i].avatar_url});
        createAndAppend('a', th, {text: contributors[i].login, href: contributors[i].html_url,target: '_blank'});
        createAndAppend('td', tr, {text: contributors[i].contributions, class: 'smallNumbers'});
      }
      console.log('ContributorsView', contributors);
    }
  }

  window.ContributorsView = ContributorsView;
}
