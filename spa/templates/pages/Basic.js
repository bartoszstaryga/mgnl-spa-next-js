import React from 'react';
import { EditableArea } from '@magnolia/react-editor';

function Basic(props) {
  const { title, main, metadata } = props;

  return (
    <div>
      <h1>{title}</h1>
      {main && <EditableArea content={main} parentTemplateId={metadata['mgnl:template']} />}
    </div>
  );
}

export default Basic;
