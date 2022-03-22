
import React from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';

export default function Button({text, color, onClick, toggle}) {
  return (
    <MDBBtn color={color} className='mb-4' onClick={onClick} toggle={toggle}>{text}</MDBBtn>
  );
}