import React, { useState } from 'react';
import {
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

function ModalPrompt(props) {
  const [input, setInput] = useState("")

  const handleInput = (event) => {
    setInput(event.target.value)
  }

  function validateInput(input) {
    const re = /^[a-zA-Z][a-zA-Z0-9-_\s]{2,32}$/
    console.log(re.test(String(input)))
    return re.test(String(input));
  }

  const removeOptions = Object.keys(props.data).filter(element => element !== props.currentProfile).map((element) => {
    return (
      <MDBBtn className="bg-danger" style={{ margin: "6px" }} onClick={() => {
        props.dispatch({ type: "REMOVE_PROFILE", value: element })
        props.dispatch({ type: "TOGGLE_MODAL" })
      }}>
        Remove {element}
      </MDBBtn>
    )

  })

  return (
    <>

      <MDBModal show={props.basicModal} getOpenState={(e) => { props.dispatch({ type: "SET_MODAL", value: e }) }} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Profiles</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={() => { props.dispatch({ type: "TOGGLE_MODAL" }) }}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <MDBInput label='Profile Name' type='text' value={input || ''} onChange={handleInput} />
              <MDBModalFooter>
              <MDBBtn color='secondary' onClick={() => {
                props.dispatch({ type: "TOGGLE_MODAL" })
                console.log(input)
              }}>
                Close
              </MDBBtn>
              <MDBBtn onClick={(e) => {
                if (validateInput(input)) {
                  props.dispatch({ type: "ADD_NEW_PROFILE", value: input })
                  props.dispatch({ type: "UPDATE_CURRENT_PROFILE", value: input })
                  props.dispatch({ type: "TOGGLE_MODAL" })
                  setInput("")
                }
                //console.log(e.getOpenState())
              }}>Create profile</MDBBtn>
            </MDBModalFooter>
              <hr></hr>
              <h4>Remove Profile</h4>
              <p>Only profiles not currently selected can be removed</p>
              <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                {removeOptions}

              </div>
              
            </MDBModalBody>

            
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

    </>
  );
}




export default connect(mapStateToProps)(ModalPrompt)
