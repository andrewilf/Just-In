import YouTube from 'react-youtube';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';
import {format, parseISO} from "date-fns"
const YoutubeVid = (payload) => {
    const opts = {
        height: '290',
        width: '440',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    }
    //console.log(payload.payload["description"])
    return (
        <>
            {/* <h3>name</h3>
            <YouTube
                videoId="pHmjEEvqOic" opts={opts} //onReady={this._onReady}
            // videoId={string}                  // defaults -> null
            // id={"string"}                       // defaults -> null
            // className={string}                // defaults -> null
            // containerClassName={string}       // defaults -> ''
            // opts={obj}                        // defaults -> {}
            // onReady={func}                    // defaults -> noop
            // onPlay={func}                     // defaults -> noop
            // onPause={func}                    // defaults -> noop
            // onEnd={func}                      // defaults -> noop
            // onError={func}                    // defaults -> noop
            // onStateChange={func}              // defaults -> noop
            // onPlaybackRateChange={func}       // defaults -> noop
            // onPlaybackQualityChange={func}    // defaults -> noop

            />
            <h3>description</h3> */}
            <MDBCard style={{ maxWidth: '45rem'}} >
            <YouTube
                videoId={payload.payload["id"]} opts={opts} //onReady={this._onReady}

            />
                <MDBCardBody >
                    <MDBCardTitle className="text-start">{payload.payload["title"]}</MDBCardTitle>
                    
                    <MDBCardText className="text-start">
                    {payload.payload["description"]}
                    </MDBCardText>
                    <MDBCardText className=" text-start text-muted"> 
                    {format(parseISO(payload.payload["created_at"]), 'h:mm a, do MMM, y')}
                    </MDBCardText>
                    <MDBBtn onClick={() => { window.open(`https://www.youtube.com/watch?v=${payload.payload["id"]}`) }} >Open on YouTube</MDBBtn>
                    
                </MDBCardBody>
            </MDBCard>
        </>
    )
}

export default YoutubeVid