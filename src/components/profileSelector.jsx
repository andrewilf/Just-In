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

function ProfileSelector(props) {
  // props.dispatch({type: "ADD_NEW_PROFILE", value: "Apex Legends"})
  

  const dropDownItems = Object.keys(props.data).map((element) => {
    return (<MDBDropdownItem key={element}>
      <MDBDropdownLink className={(element === props.currentProfile ? "active" : "active")} tag='button' type='button'
        onClick={() => { props.dispatch({ type: "UPDATE_CURRENT_PROFILE", value: element }) }}>
        {element}
      </MDBDropdownLink>
    </MDBDropdownItem>)

  })



  return (
    <>
      <MDBDropdown options={{
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [10, 20],
            },
          },
        ]
      }}>
        <MDBDropdownToggle>{props.currentProfile}</MDBDropdownToggle>
        <MDBDropdownMenu tag="section">
          {dropDownItems}
          <MDBDropdownItem >

            {/* <MDBDropdownLink tag='button' type='button' onClick={toggleShow}
            onClick={() => {
              props.dispatch({ type: "ADD_NEW_PROFILE", value: "test" })
              props.dispatch({ type: "UPDATE_CURRENT_PROFILE", value: "test" })
            }}
            >
              Create new profile
            </MDBDropdownLink> */}
            <MDBBtn onClick={()=>{props.dispatch({ type: "TOGGLE_MODAL"})}}>Create new profile</MDBBtn>
            


          </MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
      
    </>
  );
}




export default connect(mapStateToProps)(ProfileSelector)
