import React, { useState } from 'react';
  import {
    MDBNavbar,
    MDBContainer,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBIcon,
    MDBCollapse
  } from 'mdb-react-ui-kit';

export default function App() {
  const [showNavExternal, setShowNavExternal] = useState(false);

  return (
    <>
      
      <MDBNavbar dark bgColor='dark' >
        <MDBContainer fluid style = {{height: "100%"}} >
          <MDBNavbarToggler
          style = {{height: "100%"}}
            type='button'
            data-target='#navbarToggleExternalContent'
            aria-controls='navbarToggleExternalContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavExternal(!showNavExternal)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse show={showNavExternal} >
        <div className='bg-dark p-4' >
          <h5 className='text-white h4' >Collapsed content</h5>
          <span className='text-muted'>Toggleable via the navbar brand.</span>
        </div>
      </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}