import React, { useState } from 'react';
import {
  MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBDropdownLink, MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
  MDBInput
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

function ProfileSelector(props) {
  // props.dispatch({type: "ADD_NEW_PROFILE", value: "Apex Legends"})
  const dropDownItems = Object.keys(props.data).map((element) => {
    return (<MDBDropdownItem key={element}>
      <MDBDropdownLink tag='button' type='button' onClick={() => { props.dispatch({ type: "UPDATE_CURRENT_PROFILE", value: element }) }}>
        {element}
      </MDBDropdownLink>
    </MDBDropdownItem>)

  })



  return (
    <>
      <MDBDropdown toggle={false} options={{
        modifiers:[
        {
          name: 'offset',
          options: {
            offset: [10, 20],
          },
        },
        ]}}>
        <MDBDropdownToggle>{props.currentProfile}</MDBDropdownToggle>
        <MDBDropdownMenu tag="section">
          {/* <MDBDropdownItem>
            <MDBDropdownLink tag='button' type='button' onClick={() => { setCurrentProfile("StarCraft 2") }}>
              StarCraft 2
            </MDBDropdownLink>
          </MDBDropdownItem>
          <MDBDropdownItem>
            <MDBDropdownLink tag='button' type='button' onClick={() => { setCurrentProfile("Apex Legends") }}>
              Apex Legends
            </MDBDropdownLink>
          </MDBDropdownItem>
          <MDBDropdownItem>
            <MDBDropdownLink tag='button' type='button' onClick={() => { setCurrentProfile("The Grand Tour") }}>
              The Grand Tour
            </MDBDropdownLink>
          </MDBDropdownItem> */}
          {dropDownItems}
          <MDBDropdownItem >
            <div style={{display: "flex"}}>
            <MDBInput multiple style={{width: "140px"}} label='new profile' id='form1' type='text' />
            <MDBDropdownLink tag='button' type='button' onClick={() => { 
              props.dispatch({ type: "ADD_NEW_PROFILE", value: "test" })
              props.dispatch({ type: "UPDATE_CURRENT_PROFILE", value: "test" })
          }}>
              Create
            </MDBDropdownLink>
            </div>
          
          </MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
    </>
  );
}

export default connect(mapStateToProps)(ProfileSelector)
