import React, {useState} from 'react';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem, MDBDropdownLink, MDBNavbar,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBContainer,
    MDBIcon} from 'mdb-react-ui-kit';

export default function ProfileSelector() {
    const [CurrentProfile, setCurrentProfile] = useState("StarCraft 2")
  return (
    <>
      <MDBDropdown>
        <MDBDropdownToggle>{CurrentProfile}</MDBDropdownToggle>
        <MDBDropdownMenu>
          <MDBDropdownItem>
            <MDBDropdownLink tag='button' type='button' onClick={()=>{setCurrentProfile("StarCraft 2")}}>
            StarCraft 2
            </MDBDropdownLink>
          </MDBDropdownItem>
          <MDBDropdownItem>
            <MDBDropdownLink tag='button' type='button' onClick={()=>{setCurrentProfile("Apex Legends")}}>
              Apex Legends
            </MDBDropdownLink>
          </MDBDropdownItem>
          <MDBDropdownItem>
            <MDBDropdownLink tag='button' type='button' onClick={()=>{setCurrentProfile("The Grand Tour")}}>
              The Grand Tour
            </MDBDropdownLink>
          </MDBDropdownItem>
        </MDBDropdownMenu>
      </MDBDropdown>
    </>
  );
}


