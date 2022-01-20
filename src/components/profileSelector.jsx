import React from 'react';
import {
  MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBDropdownLink, 
  MDBBtn,
} from 'mdb-react-ui-kit';
import { connect } from "react-redux"

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
            <MDBBtn onClick={()=>{props.dispatch({ type: "TOGGLE_MODAL"})}}>Create/remove profile</MDBBtn>
          </MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
      
    </>
  );
}




export default connect(mapStateToProps)(ProfileSelector)
