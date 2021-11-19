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
import { useHistory } from "react-router-dom"
import { parse } from 'node-html-parser'
//import fetch from 'node-fetch'
const mapStateToProps = (state) => {
  //console.log(state)
  return {
    data: state.data,
    currentProfile: state.currentProfile,
    payload: state.payload
  };
}

function Sidebar(props) {
  const history = useHistory()
  const apiKey = JSON.parse(localStorage.getItem('justinkeys'))
  //console.log(apiKey)

  const [showNavExternal, setShowNavExternal] = useState(true);
  const [twitchStatus, setTwitchStatus] = useState(false)
  const [youtubeStatus, setYoutubeStatus] = useState(false)

  const headers = {
    "Authorization": `Bearer ${apiKey.twitch_bearer}`,
    "Client-id": `${apiKey.twitch_clientid}`
  };

  const options = {
    method: "GET",
    headers: headers,
  }

  async function fetchDataTwitch(userId) {
    const URL = `https://shrill-cloud-4f83.wenjie-teo.workers.dev/helix/search/channels?query=${userId}&first=3&ga_proxy=api.twitch.tv`
    //console.log(headers)
    try {
      const response = await fetch(URL, options);
      const data = await response.json();
      console.log(data);
      //return data
      const arrData = await data.data.map((element) => {
        //console.log(element)
        if (element.broadcaster_login === userId) {
          return { streamer: userId, status: element.is_live }
        }
        return false
      }).filter(Boolean)
      console.log(arrData[0])
      return arrData[0]
    } catch (err) {
      console.log(err)
      return false
    }

  }
  //https://youtube.com/channel/UCSJ4gkVC6NrvII8umztf0Ow/live
  async function fetchYouTubeStream(userId) {
    try {
      const url = `https://shrill-cloud-4f83.wenjie-teo.workers.dev/channel/${userId}/live?ga_proxy=www.youtube.com`
      const response = await fetch(url, { method: "GET" })
      const text = await response.text()
      const html = parse(text)
      const canonicalURLTag = html.querySelector('link[rel=canonical]')
      const canonicalURL = canonicalURLTag.getAttribute('href')
      const isStreaming = canonicalURL.includes('/watch?v=')
      return { streamer: userId, status: isStreaming }
    } catch (err) {
      console.log(err)
      return false
    }
    // console.log(canonicalURLTag)
    // console.log(canonicalURL)
    // console.log(isStreaming)

  }


  const Persons = Object.keys(props.data[props.currentProfile]).map((element) => {
    const currentPerson = props.data[props.currentProfile][element]
    const urlTwitch = `https://www.twitch.tv/${currentPerson.twitch_id}`
    const urlYoutube = `https://youtube.com/channel/${currentPerson.youtube_id}/live`
    console.log(twitchStatus[currentPerson.twitch_id])
    return (
      <>
        <div style={{ display: "flex", cursor: "pointer" }} onClick={() => { window.open(`https://twitter.com/${currentPerson.twitter_name}`) }}>
          <img src={currentPerson.image_url} alt={currentPerson.twitter_name} style={{ borderRadius: "50%" }} />
          < h5 className='text-white h4' > {"@" + currentPerson.twitter_name}</h5 >
        </div >
        <div style={{ width: "70px" }}>
          {(currentPerson.twitch_id ? <span className='text-muted'>Twitch: {
            (twitchStatus[currentPerson.twitch_id] ? <div>
              <a href={urlTwitch} target="_blank"> Online   </a>
              <i className="fas fa-redo fa-lg  fa-spin " style={{ color: "#4fbc15" }}></i>
            </div> : "Offline")
          }</span> : <span className='text-muted'><div></div></span>)}
        </div>
        {(currentPerson.youtube_stream ? <span style={{ display: "block" }} className='text-muted'>  YouTube:
          {(youtubeStatus[currentPerson.youtube_id] ? <div>
            <a href={urlYoutube} target="_blank"> Online   </a>
            <i className="fas fa-redo fa-lg  fa-spin " style={{ color: "#4fbc15" }}></i>
          </div> : "Offline")}
        </span> : <div></div>)}
        {(currentPerson.youtube_stream || currentPerson.twitch_id ? <div></div> : <div>No stream available</div>)}

      </>
    )

  })

  useEffect(async () => {
    console.log("running twitch update")
    //fetchDataTwitch("serral")
    const twitchdata = await Promise.all(
      Object.keys(props.data[props.currentProfile]).map((element) => props.data[props.currentProfile][element])
        .map((element) => (element["twitch_id"] ? fetchDataTwitch(element["twitch_id"]) : false)).flat(1)
    )
    setTwitchStatus(twitchdata.reduce((a, v) => ({ ...a, [v.streamer]: v.status }), {}))
    console.log(twitchdata.reduce((a, v) => ({ ...a, [v.streamer]: v.status }), {}))
    const youtubedata = await Promise.all(
      Object.keys(props.data[props.currentProfile]).map((element) => props.data[props.currentProfile][element])
        .map((element) => (element["youtube_id"] ? fetchYouTubeStream(element["youtube_id"]) : false)).flat(1)
    )
    setYoutubeStatus(youtubedata.filter(Boolean).reduce((a, v) => ({ ...a, [v.streamer]: v.status }), {}))
    //setTwitchStatus(twitchdata.reduce((a, v) => ({ ...a, [v.streamer]: v.status }), {}))
    //console.log(twitchdata.reduce((a, v) => ({ ...a, [v.streamer]: v.status }), {}))
    //console.log(await fetchYouTubeStream("UCSJ4gkVC6NrvII8umztf0Ow"))
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
          <MDBBtn style={{ display: "flex", flexDirection: "row" }} onClick={() => history.push('/newperson')}>Add/remove people</MDBBtn>
        </div>
      </div>
    </>
  );
}

export default connect(mapStateToProps)(Sidebar)