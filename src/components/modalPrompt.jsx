import React, { useState } from 'react';
import {
  MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBDropdownLink, MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import { connect, useDispatch } from "react-redux"

const mapStateToProps = (state) => {
  console.log(state)
  return {
    data: state.data,
    currentProfile: state.currentProfile,
    payload: state.payload,
    basicModal: state.basicModal
  };
}

function ModalPrompt(props) {
  return (
    <>
      <MDBModal show={props.basicModal} getOpenState={(e) => { props.dispatch({ type: "SET_MODAL", value: e }) }} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>new profile</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => { props.dispatch({ type: "TOGGLE_MODAL" }) }}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody><MDBInput label='Enter profile name' id='form1' type='text'  /></MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={() => { props.dispatch({ type: "TOGGLE_MODAL" }) }}>
                Close
              </MDBBtn>
              <MDBBtn onClick={() => {
                props.dispatch({ type: "ADD_NEW_PROFILE", value: "test" })
                props.dispatch({ type: "UPDATE_CURRENT_PROFILE", value: "test" })
                props.dispatch({ type: "TOGGLE_MODAL" })
              }}>Create profile</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}




export default connect(mapStateToProps)(ModalPrompt)
