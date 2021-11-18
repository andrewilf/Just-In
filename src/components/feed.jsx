import { connect, useDispatch } from "react-redux"
import Post from "./post";
import React, { useEffect, useState } from "react";
import timeCheck from "../components/timeCheck";
import { MDBBtn } from 'mdb-react-ui-kit';
const mapStateToProps = (state) => {
    // console.log(state)
    return {
        data: state.data,
        currentProfile: state.currentProfile,
        payload: state.payload
    };
}

const twitterQueries = "tweets?max_results=6"


function Feed(props) {
    const [youtubeState, toggleYoutube] = useState(false)
    const apiKey = JSON.parse(localStorage.getItem('justinkeys'))
    //console.log(apiKey.twitter_bearer)

    const headers = {
        "Authorization": `Bearer ${apiKey.twitter_bearer}`,
    }
    const options = {
        method: "GET",
        headers: headers,
    }
    
    const optionsYouTube = {
        method: "GET",
        // headers: headers,
    }
    const payloadProcess = props.payload.map((element) => {
        console.log("adding post")
        return (<Post payload={element} />)
    })
    async function fetchDataTwitter(userId, checkInterval) {
        const URL = `https://shrill-cloud-4f83.wenjie-teo.workers.dev/2/users/${userId}/${twitterQueries}&ga_proxy=api.twitter.com&tweet.fields=created_at`

        try {
            const response = await fetch(URL, options);
            const data = await response.json();
            console.log(data);
            const arrData = await data.data.map((element) => ((!element.text.startsWith("RT @") ? { mediaType: "Twitter", id: element.id, created_at: element.created_at } : false))).filter(Boolean)
            return arrData.filter(element =>
                (!timeCheck(element.created_at, checkInterval)))
        } catch (err) {
            console.log(err)
            return false
        }

    }

    async function fetchDataYoutube(userId, checkInterval) {
        const URL = `https://shrill-cloud-4f83.wenjie-teo.workers.dev/youtube/v3/search?key=${apiKey.youtube_key}&channelId=${userId}&maxResults=3&part=snippet, id&order=date&ga_proxy=www.googleapis.com`
        if (!userId) {
            return false
        }
        try {
            const response = await fetch(URL, optionsYouTube);
            const data = await response.json();
            console.log(data);
            const arrData = await data.items.map((element) => ({
                mediaType: "YouTube", id: element.id.videoId, created_at: element.snippet.publishedAt, title: element.snippet.title, description: element.snippet.description
            }))
            return arrData.filter(element =>
                (!timeCheck(element.created_at, checkInterval)))
        } catch (err) {
            console.log(err)
            return false
        }

    }

    useEffect(async () => {

        console.log(Object.keys(props.data[props.currentProfile]).map((element) => props.data[props.currentProfile][element]["twitter_id"]))
        const allpayload = await Promise.all([
            Object.keys(props.data[props.currentProfile]).map((element) => props.data[props.currentProfile][element])
                .map((element) => fetchDataTwitter(element["twitter_id"], element["checkInterval"]))
            , (youtubeState ? Object.keys(props.data[props.currentProfile]).map((element) => props.data[props.currentProfile][element])
                .map((element) => fetchDataYoutube(element["youtube_id"], element["checkInterval"])) : false)
        ].flat(1))

        //fetchDataYoutube("UCZNTsLA6t6bRoj-5QRmqt_w", 0)
        const payloadFiltered = allpayload.flat(1)
        console.log(payloadFiltered)
        props.dispatch({ type: "ADD_PAYLOAD", value: payloadFiltered })
        //     const youtubetest = await fetchDataYoutube("UCZNTsLA6t6bRoj-5QRmqt_w")
        //     props.dispatch({ type: "ADD_PAYLOAD", value: youtubetest })
        //    console.log(youtubetest)
    }, [props.currentProfile, youtubeState])
    return (
        <div style={{ width: "400px" }}>
            <MDBBtn onClick={() => toggleYoutube(!youtubeState)} style={{ marginBottom: "15px" }}>Toggle YouTube feed</MDBBtn>
            {(props.payload.length === 0 ? <div className="spinner-border" role="status" >
                <span style={{ paddingTop: "90px" }} className="visually-hidden">Loading...</span>
            </div> : payloadProcess)}

        </div>
    )
}



export default connect(mapStateToProps)(Feed)