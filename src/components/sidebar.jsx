import React, { useState } from 'react';
import {
  // MDBNavbar,
  // MDBContainer,
  // MDBNavbarBrand,
  // MDBNavbarToggler,
  // MDBNavbarItem,
  // MDBNavbarLink,
  // MDBIcon,
  // MDBCollapse,
  MDBBtn
} from 'mdb-react-ui-kit';
import { connect, useDispatch } from "react-redux"

const mapStateToProps = (state) => {
  console.log(state)
  return {
    data: state.data,
    currentProfile: state.currentProfile,
    payload: state.payload
  };
}

function Sidebar(props) {
  const [showNavExternal, setShowNavExternal] = useState(true);

  const Persons = Object.keys(props.data[props.currentProfile]).map((element) => {
    const currentPerson = props.data[props.currentProfile][element]
    return (
      <>
        <div style={{ display: "flex", cursor: "pointer" }} onClick={() => { window.open(`https://twitter.com/${currentPerson.twitter_name}`) }}>
          <img src={currentPerson.image_url} alt={currentPerson.twitter_name} style={{ borderRadius: "50%" }} />
          <h5 className='text-white h4' >{currentPerson.twitter_name}</h5>
        </div>
        <div>
          {(currentPerson.twitch_stream ? <span className='text-muted'>Twitch: Offline</span> : <span className='text-muted'>No streams available</span>)}
          {(currentPerson.youtube_stream ? <span style={{ display: "block" }} className='text-muted'>  YouTube: Offline</span> : <div></div>)}
        </div>
      </>
    )

  })

  return (
    <>

      {/* <MDBNavbar dark bgColor='dark' >
        <MDBContainer fluid  >
          <MDBNavbarToggler
            style={{ height: "100%" }}
            type='button'
            data-target='#navbarToggleExternalContent'
            aria-controls='navbarToggleExternalContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavExternal(!showNavExternal)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse show={showNavExternal}>
            <div className='bg-dark p-4' >

              {Persons}
              <MDBBtn style={{ display: "flex", flexDirection: "row" }}>Add person</MDBBtn>
            </div>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar> */}

      <div style = {{position: "fixed", zIndex: "1", top: "100px", left: "0", marginLeft: "100px", textAlign: "center", display:"flex", flexDirection: "column"}}>
        <button  onClick={() => {
          setShowNavExternal(!showNavExternal)
        }}
        >Toggle stream status</button>
        <div style={{ display: (showNavExternal ? "none" : "block"), backgroundColor: "black", height: "100%", padding: "30px" }}>
          {Persons}
          <MDBBtn style={{ display: "flex", flexDirection: "row" }}>Add person</MDBBtn>
        </div>
      </div>
    </>
  );
}

export default connect(mapStateToProps)(Sidebar)