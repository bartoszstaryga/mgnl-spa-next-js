import { getPage } from '../lib/pages';
import App from './[...page]';

export async function getStaticProps(context) {
  const page = await getPage(context);

  return {
    props: page,
  };
}

export default App;
