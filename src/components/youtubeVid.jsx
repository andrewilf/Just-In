import YouTube from 'react-youtube';

const YoutubeVid = () => {
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };
    return (
        <>
            <h3>name</h3>
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
            <h3>description</h3>
        </>
    )
}

export default YoutubeVid