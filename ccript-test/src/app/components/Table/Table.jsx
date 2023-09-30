'use client';

import React from 'react';
import Navbar from './Navbar/Navbar';
import TableContent from './TableContent/TableContent';

const Table = ({ token }) => {
  return (
    <>
      <Navbar />
      <TableContent token={token} />
    </>
  );
};

export default Table;
