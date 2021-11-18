import React, { useState, useEffect } from 'react';
import {
  // MDBNavbar,
  // MDBContainer,
  // MDBNavbarBrand,
  // MDBNavbarToggler,
  // MDBNavbarItem,
  // MDBNavbarLink,
  // MDBIcon,
  // MDBCollapse,
  MDBBtn
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

function Sidebar(props) {
  const apiKey = JSON.parse(localStorage.getItem('justinkeys'))
  console.log(apiKey)
  const [showNavExternal, setShowNavExternal] = useState(true);

  const headers = {
    "Authorization": `Bearer ${apiKey.twitch_bearer}`,
    "Client-id": `${apiKey.twitch_clientid}`
  };

  const options = {
    method: "GET",
    headers: headers,
  }

  async function fetchDataTwitch(userId) {
    const URL = `https://shrill-cloud-4f83.wenjie-teo.workers.dev/helix/search/channels?query=${userId}&ga_proxy=api.twitch.tv`
    console.log(headers)
    try {
      const response = await fetch(URL, options);
      const data = await response.json();
      console.log(data);
      return data
      //const arrData = await data.data.map((element) => ({ mediaType: "Twitch", id: element.id, created_at: element.created_at }))
      //return arrData.filter(element =>
      //  (!(element.created_at)))
    } catch (err) {
      console.log(err)
      return false
    }

  }


  const Persons = Object.keys(props.data[props.currentProfile]).map((element) => {
    const currentPerson = props.data[props.currentProfile][element]
    return (
      <>
        <div style={{ display: "flex", cursor: "pointer" }} onClick={() => { window.open(`https://twitter.com/${currentPerson.twitter_name}`) }}>
          <img src={currentPerson.image_url} alt={currentPerson.twitter_name} style={{ borderRadius: "50%" }} />
          <h5 className='text-white h4' >{currentPerson.twitter_name}</h5>
        </div>
        <div>
          {(currentPerson.twitch_stream ? <span className='text-muted'>Twitch: Offline</span> : <span className='text-muted'>No streams available</span>)}
          {(currentPerson.youtube_stream ? <span style={{ display: "block" }} className='text-muted'>  YouTube: Offline</span> : <div></div>)}
        </div>
      </>
    )

  })

  useEffect(async () => {
    console.log("running twitch update")
    const twitchdata = await fetchDataTwitch("serral")
  }, [props.currentProfile])

  return (
    <>
      <div style={{ position: "fixed", zIndex: "1", top: "100px", left: "0", marginLeft: "100px", textAlign: "center", display: "flex", flexDirection: "column" }}>
        <button onClick={() => {
          setShowNavExternal(!showNavExternal)
        }}
        >Toggle stream status</button>
        <div style={{ display: (showNavExternal ? "none" : "block"), backgroundColor: "black", height: "100%", padding: "30px" }}>
          {Persons}
          <MDBBtn style={{ display: "flex", flexDirection: "row" }}>Add person</MDBBtn>
        </div>
      </div>
    </>
  );
}

export default connect(mapStateToProps)(Sidebar)