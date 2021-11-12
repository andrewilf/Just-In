import { TwitterTweetEmbed, TwitterTimelineEmbed } from 'react-twitter-embed';
import React, { useRef, useState, useEffect } from 'react'
import FetchData from '../APIs/twitterAPI';
import { connect, useDispatch } from "react-redux"

// const mapStateToProps = (state) => {
//     console.log(state)
//     return {
//       data: state.data,
//       currentProfile: state.currentProfile,
//       payload: state.payload
//     };
//   }

const TwitterPayload = (store, twitterID) => {
    //const [payload, setPayload] = useState([])
    //console.log(FetchData(twitterID))
    const [apiData, setApiData] = useState([])
    console.log(store)
    const APICall = FetchData(twitterID, setApiData)["data"]
    useEffect(() => {
        console.log(apiData)
        if (apiData.length === 5) {
            console.log("ready")
            const newArray = APICall.map((element) => {
                return { mediaType: "Twitter", id: element.id }
            })
            store.dispatch({ type: "ADD_PAYLOAD", value: newArray })
        }
        else {
            console.log("not ready")

        }
    }, [apiData])

    return true
}

export default TwitterPayload



