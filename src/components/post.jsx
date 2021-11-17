import Tweet from "./tweet";
import YoutubeVid from "./youtubeVid";

const Post = (props) => {
    //console.log(props.payload)
    if (props.payload.mediaType === "Twitter") {
        return (<Tweet payload = {props.payload}/>)
    }
    else if (props.payload.mediaType === "YouTube") {
        return (
            <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                <YoutubeVid payload = {props.payload}/>
            </div>)
    }
    else {
        console.log("unrecognised media type")
        return false
    }
}

export default Post