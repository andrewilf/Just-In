import { connect, useDispatch } from "react-redux"
import Post from "./post";
import React, { useEffect } from "react";
import timeCheck from "../components/timeCheck";

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        data: state.data,
        currentProfile: state.currentProfile,
        payload: state.payload
    };
}

const headers = {
    "Authorization": `Bearer AAAAAAAAAAAAAAAAAAAAAEqnVQEAAAAAzaaIxbSsv4RSdO2mJe0tOYXTC1w%3DwTxnqx1JTUqdCW9X8SuqdRSOm93I6QfNViLHvrB8QkSellNsRz`,
};

const twitterQueries = "tweets?max_results=5";


const options = {
    method: "GET",
    headers: headers,
}

const optionsYouTube = {
    method: "GET",
   // headers: headers,
}

function Feed(props) {
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
            const arrData = await data.data.map((element) => ({ mediaType: "Twitter", id: element.id, created_at: element.created_at }))
            return arrData.filter(element =>
                (!timeCheck(element.created_at, checkInterval)))
        } catch (err) {
            console.log(err)
            return false
        }

    }

    async function fetchDataYoutube(userId, checkInterval) {
        const URL = `https://shrill-cloud-4f83.wenjie-teo.workers.dev/youtube/v3/search?key=AIzaSyBLzZNtDXaCYecRjZnE8FwmgeR4jjTbHaE&channelId=${userId}&maxResults=3&part=snippet, id&order=date&ga_proxy=www.googleapis.com`
        if(!userId) {
            return false
        }
        try {
            const response = await fetch(URL, optionsYouTube);
            const data = await response.json();
            console.log(data);
            //const arrData = await data.data.map((element) => ({ mediaType: "YouTube", id: element.id, created_at: element.created_at }))
            //return data.items
            const arrData = await data.items.map((element) => ({ 
                mediaType: "YouTube", id: element.id.videoId, created_at: element.snippet.publishedAt, title: element.snippet.title, description: element.snippet.description }))
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
            // , Object.keys(props.data[props.currentProfile]).map((element) => props.data[props.currentProfile][element])
            // .map((element) => fetchDataYoutube(element["youtube_id"], element["checkInterval"]))
        ].flat(1))
       
            //fetchDataYoutube("UCZNTsLA6t6bRoj-5QRmqt_w", 0)
        const payloadFiltered = allpayload.flat(1)
        console.log(payloadFiltered)
        props.dispatch({ type: "ADD_PAYLOAD", value: payloadFiltered })
    //     const youtubetest = await fetchDataYoutube("UCZNTsLA6t6bRoj-5QRmqt_w")
    //     props.dispatch({ type: "ADD_PAYLOAD", value: youtubetest })
    //    console.log(youtubetest)
    }, [props.currentProfile])
    return (
        <div style={{ width: "400px" }}>
            {(props.payload.length === 0 ? <div className="spinner-border" role="status" >
                <span style={{ paddingTop: "90px" }} className="visually-hidden">Loading...</span>
            </div> : payloadProcess)}

        </div>
    )
}



export default connect(mapStateToProps)(Feed)