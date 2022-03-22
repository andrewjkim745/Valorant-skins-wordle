
import React from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';

export default function Button({text, onClick, toggle}) {
  return (
    <MDBBtn className='mb-4' onClick={onClick} toggle={toggle}>{text}</MDBBtn>
  );
}