import Home from '../templates/pages/Home';
import Basic from '../templates/pages/Basic';
import Text from '../templates/components/Text';
import List from '../templates/components/List';
import Item from '../templates/components/Item';

const nodeName = 'spa-home';

export const config = {
  componentMappings: {
    'spa-lm:pages/Home': Home,
    'spa-lm:pages/Basic': Basic,
    'spa-lm:components/Text': Text,
    'spa-lm:components/List': List,
    'spa-lm:components/Item': Item,
  },
};

export async function getPage(context) {
  let templateDefinitions = {};

  const pathname = '/' + (context.params ? context.params.page.join('/') : '');
  const pagesRes = await fetch('http://localhost:8080/magnoliaAuthor/.rest/delivery/pages/' + nodeName + pathname);
  const page = await pagesRes.json();

  // Author instance needs real time rendering
  // Static site generation can exist only on public instance
  // No need for author specific code
  // if (context.query.mgnlPreview === 'false') {
  //   const templateDefinitionsRes = await fetch(
  //     'http://localhost:8080/magnoliaAuthor/.rest/template-definitions/v1/' + page['mgnl:template']
  //   );

  //   templateDefinitions = await templateDefinitionsRes.json();
  // }

  return { page, templateDefinitions };
}

function addPagesPaths(nodes, pagesPaths) {
  nodes.forEach((node) => {
    let page = node['@path'];

    page = page.replace(new RegExp('(.*' + nodeName + '/)', 'g'), '');
    page = page.split('/');

    pagesPaths.push({ params: { page } });
    addPagesPaths(
      node['@nodes'].map((nodeName) => node[nodeName]),
      pagesPaths
    );
  });
}

export async function getPagesPaths() {
  let pagesPaths = [];
  const pagesPathsRes = await fetch('http://localhost:8080/magnoliaAuthor/.rest/delivery/pagesPaths/' + nodeName);
  const pagesPathsJson = await pagesPathsRes.json();

  addPagesPaths(
    pagesPathsJson['@nodes'].map((nodeName) => pagesPathsJson[nodeName]),
    pagesPaths
  );

  return pagesPaths;
}
