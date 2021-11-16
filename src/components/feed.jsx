import { connect, useDispatch } from "react-redux"
import Post from "./post";
import React, { useEffect } from "react";

const mapStateToProps = (state) => {
    console.log(state)
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
    async function FetchData(userId) {
        const URL = `https://shrill-cloud-4f83.wenjie-teo.workers.dev/2/users/${userId}/${twitterQueries}&ga_proxy=api.twitter.com`
        
            try {
                const response = await fetch(URL, options);
                const data = await response.json();
                console.log(data.data);
                const arrData = await data.data.map((element) => ({ mediaType: "Twitter", id: element.id }))
                return arrData
            } catch (err) {
                console.log(err)
            }
    
    };

    useEffect( async () => {
        
        console.log(Object.keys(props.data[props.currentProfile]).map((element) => props.data[props.currentProfile][element]["twitter_id"]))
        //const allpayload = await Promise.all([FetchData("252588599"), FetchData("252588599")])
        const allpayload = await Promise.all(Object.keys(props.data[props.currentProfile]).map((element) => props.data[props.currentProfile][element]["twitter_id"])
        .map((element)=> FetchData(element)))
        console.log(allpayload.flat(1))
        props.dispatch({ type: "ADD_PAYLOAD", value: allpayload.flat(1) })
           
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