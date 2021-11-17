import YouTube from 'react-youtube';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardImage, MDBBtn } from 'mdb-react-ui-kit';

const YoutubeVid = (payload) => {
    console.log(payload.payload)
    console.log(payload.payload["id"])
    const opts = {
        height: '290',
        width: '440',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };
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
                    <MDBCardTitle>{payload.payload["title"]}</MDBCardTitle>
                    <MDBCardText>
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                        uploaded: {payload.payload["created_at"]}
                    </MDBCardText>
                    <MDBBtn href='#'>Button</MDBBtn>
                </MDBCardBody>
            </MDBCard>
        </>
    )
}

export default YoutubeVid