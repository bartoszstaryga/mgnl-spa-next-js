import { EditablePage } from '@magnolia/react-editor';
import { getPage, config } from '../lib/pages';

export async function getServerSideProps(context) {
  const page = await getPage(context);

  return {
    props: page,
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
