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

  const pagesRes = await fetch(
    'http://localhost:8080/magnoliaAuthor/.rest/delivery/pages/' +
      nodeName +
      context.resolvedUrl.replace(new RegExp('(.*' + nodeName + '|.html)', 'g'), '')
  );
  const page = await pagesRes.json();

  if (context.query.mgnlPreview === 'false') {
    const templateDefinitionsRes = await fetch(
      'http://localhost:8080/magnoliaAuthor/.rest/templateDefinition/v1/' + page['mgnl:template']
    );

    templateDefinitions = await templateDefinitionsRes.json();
  }

  return { page, templateDefinitions };
}
