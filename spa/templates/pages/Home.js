import React from 'react';
import { EditableArea } from '@magnolia/react-editor';

function Home(props) {
  const { title, main } = props;

  return (
    <div>
      <h1>{title}</h1>
      {main && <EditableArea content={main} />}
    </div>
  );
}

export default Home;
