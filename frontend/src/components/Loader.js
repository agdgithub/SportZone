import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const Loader = () => {
  return (
    <ProgressBar animated now={100} />
  );
}

export default Loader;
