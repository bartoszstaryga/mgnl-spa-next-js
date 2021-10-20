import { EditablePage } from '@magnolia/react-editor';
import Home from '../templates/pages/Home';
import Basic from '../templates/pages/Basic';
import Text from '../templates/components/Text';
import List from '../templates/components/List';
import Item from '../templates/components/Item';

const nodeName = '/spa-home';
const config = {
  componentMappings: {
    'spa-lm:pages/Home': Home,
    'spa-lm:pages/Basic': Basic,
    'spa-lm:components/Text': Text,
    'spa-lm:components/List': List,
    'spa-lm:components/Item': Item,
  },
};

const pagesApi = 'http://localhost:8080/magnoliaAuthor/.rest/delivery/pages';
const templateAnnotationsApi = 'http://localhost:8080/magnoliaAuthor/.rest/template-annotations/v1';

export async function getServerSideProps(context) {
  let props = {};

  const pagePath = nodeName + context.resolvedUrl.replace(new RegExp('(.*' + nodeName + '|.html)', 'g'), '');
  const pagesRes = await fetch(pagesApi + pagePath);

  props.page = await pagesRes.json();

  // Fetch template annotations only inside Magnolia WYSIWYG
  if (context.query.mgnlPreview) {
    const templateAnnotationsRes = await fetch(templateAnnotationsApi + pagePath);

    props.templateAnnotations = await templateAnnotationsRes.json();
  }

  return {
    props,
  };
}

export default function Pathname(props) {
  const { page, templateAnnotations } = props;

  return <div>{page && <EditablePage content={page} config={config} templateAnnotations={templateAnnotations} />}</div>;
}
