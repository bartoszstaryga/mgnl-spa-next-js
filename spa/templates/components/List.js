import React from 'react';
import { EditableArea } from '@magnolia/react-editor';

function List(props) {
  const { list, metadata } = props;

  return <ul>{list && <EditableArea content={list} parentTemplateId={metadata['mgnl:template']} />}</ul>;
}

export default List;
