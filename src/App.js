import logo from './logo.svg';
import './App.css';
//import Post from './components/post';
import ProfileSelector from './components/profileSelector';
import Footer from './components/footer';
import Sidebar from './components/sidebar';
import data from './sampleData';
//import twitterPayload from './APIs/twitterPayloadCall';
import React from 'react';
import { createStore } from "redux"
import { Provider, useDispatch } from "react-redux"
import justinDataReducer from './reducers/justInDataReducer';
import Feed from './components/feed';
import ModalPrompt from './components/modalPrompt';
import { HashRouter as Redirect, Link, Switch, Route } from "react-router-dom"
import NewPerson from './components/newPerson';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
} from 'mdb-react-ui-kit';
function App() {
  //localStorage.clear()
  document.title = "Just In"
  if (localStorage.getItem('justindata') === null) {
    localStorage.setItem('justindata', JSON.stringify(data))
    console.log("setting sample data")
  }

  const Storage = JSON.parse(localStorage.getItem('justindata'))
  console.log(Storage)


  const store = createStore(justinDataReducer, {
    data: Storage, currentProfile: Object.keys(Storage)[0], basicModal: false, payload: []
  })
  console.log(store.getState().payload)

  return (
    <>
     
        <Provider store={store}>
          <ModalPrompt />
          <header className="fixed-top" >
            <MDBNavbar expand='lg' light bgColor='white' >
              <MDBContainer fluid>
                <MDBNavbarToggler
                  aria-controls='navbarExample01'
                  aria-expanded='false'
                  aria-label='Toggle navigation'
                >
                  <MDBIcon fas icon='bars' />
                </MDBNavbarToggler>
                <div className='collapse navbar-collapse' id='navbarExample01' style={{ paddingLeft: "20px" }}>
                  <MDBNavbarNav right className='mb-2 mb-lg-0' style={{justifyContent: "center"}}>
                    <MDBNavbarItem active >
                      <MDBNavbarLink aria-current='page' href='#' style={{marginRight: "50px"}}>
                        Home
                      </MDBNavbarLink>
                      {/* <Link to="/#">Home</Link> */}
                    </MDBNavbarItem>
                    <MDBNavbarItem>
                      <div >
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
            <div className="mainContent" style={{justifyContent: "center", margin: "0px", padding: "0px"}}>
           <Switch>
              <Route exact path="/">
              <Feed /> 
              </Route>
              {/* <Feed /> */}
              <Route exact path="/newperson">
                <NewPerson />
              </Route>
              <Route path="/">
             <h2>bad path</h2>
              </Route>
              </Switch>
            </div>

          </div>

          <Switch>
              <Route exact path="/">
              <Footer />
              </Route>
              {/* <Feed /> */}
              <Route exact path="/newperson">
                 
              </Route>
              <Route path="/">
              
              </Route>
              </Switch>

         
        </Provider>
        
    </>

  );
}

export default App;
