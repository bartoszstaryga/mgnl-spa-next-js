import React from 'react';
import { EditableArea } from '@magnolia/react-editor';

function Basic(props) {
  const { title, main } = props;

  return (
    <div>
      <h1>{title}</h1>
      {main && <EditableArea content={main} />}
    </div>
  );
}

export default Basic;
