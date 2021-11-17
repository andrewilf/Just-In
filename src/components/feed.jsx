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
};



function Feed(props) {
    const payloadProcess = props.payload.map((element) => {
        console.log("adding post")
        return (<Post payload={element} />)
    })
    async function fetchDataTwitter(userId) {
        const URL = `https://shrill-cloud-4f83.wenjie-teo.workers.dev/2/users/${userId}/${twitterQueries}&ga_proxy=api.twitter.com&tweet.fields=created_at`

        try {
            const response = await fetch(URL, options);
            const data = await response.json();
            console.log(data);
            const arrData = await data.data.map((element) => ({ mediaType: "Twitter", id: element.id, created_at: element.created_at }))
            return arrData
        } catch (err) {
            console.log(err)
        }

    }

    async function fetchDataYoutube(userId) {
        const URL = `https://shrill-cloud-4f83.wenjie-teo.workers.dev/2/users/${userId}/${twitterQueries}&ga_proxy=api.twitter.com&tweet.fields=created_at`

        try {
            const response = await fetch(URL, options);
            const data = await response.json();
            console.log(data);
            const arrData = await data.data.map((element) => ({ mediaType: "YouTube", id: element.id, created_at: element.created_at }))
            return arrData
        } catch (err) {
            console.log(err)
        }

    }

    useEffect(async () => {

        console.log(Object.keys(props.data[props.currentProfile]).map((element) => props.data[props.currentProfile][element]["twitter_id"]))
        // const allpayload = await Promise.all([Object.keys(props.data[props.currentProfile]).map((element) => props.data[props.currentProfile][element]["twitter_id"])
        //     .map((element) => fetchDataTwitter(element)), fetchDataTwitter("252588599")].flat(1))
        const allpayload = await Promise.all([Object.keys(props.data[props.currentProfile]).map((element) => props.data[props.currentProfile][element]["twitter_id"])
            .map((element) => fetchDataTwitter(element)), fetchDataTwitter("252588599")].flat(1))
        //console.log(allpayload.flat(1))
        const payloadFiltered = allpayload.flat(1).filter(element =>
            (!timeCheck(element.created_at))
            //)console.log(element.created_at)
        )
        //console.log(payloadFiltered)
        props.dispatch({ type: "ADD_PAYLOAD", value: payloadFiltered })
        // console.log(props.payload)
        // props.dispatch({ type: "SHUFFLE_PAYLOAD"})
        // console.log(props.payload)
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