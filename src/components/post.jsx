import Tweet from "./tweet";
import YoutubeVid from "./youtubeVid";

const Post = () => {

    return (
        <>
            <Tweet />
            <div style = {{display: "flex" , alignItems: "center", flexDirection: "column"}}>
            <YoutubeVid />
            </div>
            
        </>
    )
}

export default Post