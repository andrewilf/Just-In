import logo from './logo.svg';
import './App.css';
import Post from './components/post';
import ProfileSelector from './components/profileSelector';
import Footer from './components/footer';
import Sidebar from './components/sidebar';
import data from './sampleData';
import React, {useState} from 'react';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon
} from 'mdb-react-ui-kit';
function App() {
//localStorage.clear()
if(localStorage.getItem('justindata') === null) {
  localStorage.setItem('justindata', JSON.stringify(data))
  console.log("setting sample data")
}

const Storage = JSON.parse(localStorage.getItem('justindata'))
console.log(Storage)
const [profileData, setProfileData] = useState(Storage)
const [currentProfile, setCurrentProfile] = useState(Object.keys(Storage)[0])

console.log(profileData, currentProfile)

  return (
    <>
      <header className="fixed-top">
        <MDBNavbar expand='lg' light bgColor='white' fixed>
          <MDBContainer fluid>
            <MDBNavbarToggler
              aria-controls='navbarExample01'
              aria-expanded='false'
              aria-label='Toggle navigation'
            >
              <MDBIcon fas icon='bars' />
            </MDBNavbarToggler>
            <div className='collapse navbar-collapse' id='navbarExample01' style={{ paddingLeft: "200px" }}>
              <MDBNavbarNav right className='mb-2 mb-lg-0'>
                <MDBNavbarItem active>
                  <MDBNavbarLink aria-current='page' href='#'>
                    Home
                  </MDBNavbarLink>
                </MDBNavbarItem>
                <MDBNavbarItem>
                  <div style={{ paddingLeft: "800px", paddingRight: "0px" }}>
                    <ProfileSelector />
                  </div>
                </MDBNavbarItem>


              </MDBNavbarNav>
            </div>
          </MDBContainer>
        </MDBNavbar>
      </header>

      <div className="mainColumns">
        <Sidebar />
        <div className="mainContent">
          <Post />
        </div>

      </div>



      <Footer />
    </>

  );
}

export default App;
