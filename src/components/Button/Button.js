
import React from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';

export default function Button({text, onClick, toggle}) {
  return (
    <MDBBtn onClick={onClick} toggle={toggle}>{text}</MDBBtn>
  );
}