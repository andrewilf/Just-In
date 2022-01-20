import React, { useState, useEffect } from 'react';
import {
  MDBBtn
} from 'mdb-react-ui-kit';
import { connect } from "react-redux"
import { useHistory } from "react-router-dom"
import { parse } from 'node-html-parser'
const mapStateToProps = (state) => {
  return {
    data: state.data,
    currentProfile: state.currentProfile,
    payload: state.payload
  };
}

function Sidebar(props) {
  const history = useHistory()
  const apiKey = JSON.parse(localStorage.getItem('justinkeys'))

  const [showNavExternal, setShowNavExternal] = useState(false);
  const [twitchStatus, setTwitchStatus] = useState(false)
  const [youtubeStatus, setYoutubeStatus] = useState(false)

  const headers = {
    "Authorization": `Bearer ${process.env.REACT_APP_TWITCH_BEARER}`,
    "Client-id": `${process.env.REACT_APP_TWITCH_CLIENT_ID}`
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
  }


  const Persons = Object.keys(props.data[props.currentProfile]).map((element) => {
    const currentPerson = props.data[props.currentProfile][element]
    const urlTwitch = `https://www.twitch.tv/${currentPerson.twitch_id}`
    const urlYoutube = `https://youtube.com/channel/${currentPerson.youtube_id}/live`
    console.log(twitchStatus[currentPerson.twitch_id])
    return (
      <>
        <div style={{ display: "flex", cursor: "pointer", marginBottom: "4px" }} onClick={() => { window.open(`https://twitter.com/${currentPerson.twitter_name}`) }}>
          <img src={currentPerson.image_url} alt={currentPerson.twitter_name} style={{ borderRadius: "50%", marginRight: "10px" }} />
          < h5 style={{marginTop: "auto"}} className='text-white h4' > {"@" + currentPerson.twitter_name}  </h5 >
        </div >
        <div style={{ width: "auto" }}>
          {(currentPerson.twitch_id ? <span className='text-muted'>Twitch: {
            (twitchStatus[currentPerson.twitch_id] ? <div>
              <a href={urlTwitch} target="_blank"> Online   </a>
              <i className="fas fa-circle fa-lg  fa-spin " style={{ color: "#4fbc15" }}></i>
            </div> : "Offline")
          }</span> : <span className='text-muted'><div></div></span>)}
        </div>
        {(currentPerson.youtube_stream ? <span style={{ display: "flex"}} className='text-muted'>  YouTube: 
          {(youtubeStatus[currentPerson.youtube_id] ? <div>
            <a href={urlYoutube} target="_blank">  Online   </a>
            <i className="fas fa-circle fa-lg  fa-spin " style={{ color: "#4fbc15" }}></i>
          </div> : "Offline")}
        </span> : <div></div>)}
        {(currentPerson.youtube_stream || currentPerson.twitch_id ? <div></div> : <div>No stream available</div>)}

      </>
    )

  })

  useEffect(async () => {
    console.log("running twitch update")
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
  }, [props.currentProfile])

  return (
    <>
      <div style={{ position: "fixed", left: "0", margin: "0px", textAlign: "center", display: "flex", flexDirection: "column", height: "100%", minWidth: "16%"}}>
        <button onClick={() => {
          setShowNavExternal(!showNavExternal)
        }}
        >Toggle stream status</button>
        <div style={{ display: (showNavExternal ? "none" : "block"), backgroundColor: "black", height: "100%", padding: "30px" }}>
          {Persons}
          <MDBBtn style={{ display: "flex", flexDirection: "row", marginTop: "20px" }} onClick={() => history.push('/newperson')}>Add/remove people</MDBBtn>
        </div>
      </div>
    </>
  );
}

export default connect(mapStateToProps)(Sidebar)