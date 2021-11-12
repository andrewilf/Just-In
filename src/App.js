import logo from './logo.svg';
import './App.css';
import Post from './components/post';
import ProfileSelector from './components/profileSelector';
import Footer from './components/footer';
import Sidebar from './components/sidebar';
import data from './sampleData';
import twitterPayload from './APIs/twitterPayloadCall';
import React, { useState, useEffect } from 'react';
import { createStore } from "redux"
import { Provider, useDispatch } from "react-redux"
import justinDataReducer from './reducers/justInDataReducer';
import Feed from './components/feed';
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
  if (localStorage.getItem('justindata') === null) {
    localStorage.setItem('justindata', JSON.stringify(data))
    console.log("setting sample data")
  }

  const Storage = JSON.parse(localStorage.getItem('justindata'))
  console.log(Storage)

  const store = createStore(justinDataReducer, {
    data: Storage, currentProfile: Object.keys(Storage)[0], payload: [
      // { mediaType: 'Twitter', id: '1459068407186440208' },
      // { mediaType: 'Twitter', id: '1459066819701051393' }
      // , { mediaType: 'Twitter', id: '1458872418127302665' }
      // , { mediaType: 'Twitter', id: '1458781681238908929' }
      // , { mediaType: 'Twitter', id: '1458750189968240644' }
    ]
  })
  console.log(store.getState().payload)
  //twitterPayload(store, "534697987")
  twitterPayload(store, "252588599")
  // useEffect(() => {
  //   twitterPayload("534697987")
  // }, [])

  return (
    <>
      <Provider store={store}>

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
            <Feed />
            {/* <Post payload = {{mediaType: 'Twitter', id: '1459068407186440208'}}/>
          <Post payload = {{mediaType: 'YouTube', id: "1458781681238908929"}}/> */}
          </div>

        </div>



        <Footer />
      </Provider>
    </>

  );
}

export default App;
