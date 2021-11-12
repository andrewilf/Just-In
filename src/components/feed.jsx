import { connect, useDispatch } from "react-redux"
import Post from "./post";
import React from "react";

const mapStateToProps = (state) => {
    console.log(state)
    return {
        data: state.data,
        currentProfile: state.currentProfile,
        payload: state.payload
    };
}

function Feed(props) {
    const payloadProcess = props.payload.map((element) => {
        console.log("adding post")
        return (<Post payload={element} />)
    })
    return (
        <div style={{ width: "400px" }}>
            {(props.payload.length === 0 ? <div class="spinner-border" role="status" >
                <span style = {{paddingTop: "90px"}} class="visually-hidden">Loading...</span>
            </div> : payloadProcess)}

        </div>
    )
}

export default connect(mapStateToProps)(Feed)