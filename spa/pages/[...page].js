import { EditablePage } from '@magnolia/react-editor';
import { getPage, getPagesPaths, config } from '../lib/pages';

export async function getStaticProps(context) {
  const page = await getPage(context);

  return {
    props: page,
  };
}

export async function getStaticPaths() {
  const paths = await getPagesPaths();

  return {
    paths,
    fallback: false,
  };
}

class App extends React.PureComponent {
  render() {
    const { page, templateDefinitions } = this.props;

    return (
      <div>{page && <EditablePage content={page} config={config} templateDefinitions={templateDefinitions} />}</div>
    );
  }
}

export default App;
