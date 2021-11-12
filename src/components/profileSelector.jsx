import React, { useState } from 'react';
import {
  MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBDropdownLink, MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon
} from 'mdb-react-ui-kit';
import { connect, useDispatch } from "react-redux"

const mapStateToProps = (state) => {
  console.log(state)
  return {
    data: state.data,
    currentProfile: state.currentProfile
  };
}

function ProfileSelector(props) {
  //const [CurrentProfile, setCurrentProfile] = useState("StarCraft 2")
  const dropDownItems = Object.keys(props.data).map((element) => {
    return (<MDBDropdownItem>
      <MDBDropdownLink tag='button' type='button' onClick={() => { props.dispatch({type: "UPDATE_CURRENT_PROFILE", value: element}) }}>
        {element}
      </MDBDropdownLink>
    </MDBDropdownItem>)

  })
  return (
    <>
      <MDBDropdown>
        <MDBDropdownToggle>{props.currentProfile}</MDBDropdownToggle>
        <MDBDropdownMenu>
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
        </MDBDropdownMenu>
      </MDBDropdown>
    </>
  );
}

export default connect(mapStateToProps)(ProfileSelector)
