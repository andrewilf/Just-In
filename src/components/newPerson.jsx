import { connect, useDispatch } from "react-redux"
import { MDBBtn } from 'mdb-react-ui-kit';
import { useReducer, useState, useEffect } from "react";
const mapStateToProps = (state) => {
    // console.log(state)
    return {
        data: state.data,
        currentProfile: state.currentProfile,
        payload: state.payload
    };
}

const NewPerson = (props) => {
    const apiKey = JSON.parse(localStorage.getItem('justinkeys'))
    const headers = {
        "Authorization": `Bearer ${apiKey.twitter_bearer}`,
    }
    const options = {
        method: "GET",
        headers: headers,
    }
    async function fetchDataTwitter(userName) {
        const URL = `https://shrill-cloud-4f83.wenjie-teo.workers.dev/2/users/by/username/${userName}?user.fields=profile_image_url&ga_proxy=api.twitter.com`

        try {
            const response = await fetch(URL, options);
            const data = await response.json();
            //console.log(data);
            const arrData = data.data//await data.data.map((element) => ((!element.text.startsWith("RT @") ? { mediaType: "Twitter", id: element.id, created_at: element.created_at } : false))).filter(Boolean)
            return arrData//.filter(element =>
            // (!timeCheck(element.created_at, checkInterval)))
        } catch (err) {
            console.log(err)
            return false
        }

    }

    const [youtubeStream, setYoutubeStream] = useState(false)
    const itemReducer = (state, action) => {
        switch (action.type) {
            case "TWITTERNAME":
                return {
                    ...state,
                    twitter_name: action.value,

                }
            case "YOUTUBEID":
                return {
                    ...state,
                    youtube_id: action.value,

                }
            case "YOUTUBESTREAM":
                return {
                    ...state,
                    youtube_stream: action.value,

                }
            case "TWITCHNAME":
                return {
                    ...state,
                    twitch_id: action.value,

                }
            case "INTERVALDAYS":
                return {
                    ...state,
                    checkInterval: action.value,

                }
            case "APIPAYLOAD":
                
                return {
                    ...state,
                    twitter_id: action.value.twitter_id,
                    image_url: action.value.image_url
                }
            case "RESET":
                setYoutubeStream(false)
                return {
                    checkInterval: 1,
                    twitter_id: false,
                    twitter_name: false,
                    youtube_id: false,
                    youtube_stream: false,
                    youtube_search: false,
                    twitch_id: false,
                    image_url: false
                }
            default:
                return state
        }
    }

    const [entry, dispatchItem] = useReducer(itemReducer, {
        checkInterval: 1,
        twitter_id: false,
        twitter_name: false,
        youtube_id: false,
        youtube_stream: false,
        youtube_search: false,
        twitch_id: false,
        image_url: false
    })

    const removeOptions = Object.keys(props.data[props.currentProfile]).map((element) => {
        return (
          <MDBBtn href = "#" className="bg-danger" style={{ margin: "6px" }} onClick={() => {
             props.dispatch({ type: "REMOVE_PERSON", value: element })
            
          }}>
            Remove {element}
          </MDBBtn>
        )
    
      })

    const handleTwitter = (event) => {
        dispatchItem({ type: "TWITTERNAME", value: event.target.value })
        console.log(event.target.value)
    }

    const handleYouTube = (event) => {
        dispatchItem({ type: "YOUTUBEID", value: event.target.value })
        console.log(event.target.value)
    }

    const handleYouTubeStream = (event) => {
        dispatchItem({ type: "YOUTUBESTREAM", value: !youtubeStream })
        setYoutubeStream(!youtubeStream)
        console.log(!youtubeStream)
    }

    const handleTwitch = (event) => {
        dispatchItem({ type: "TWITCHNAME", value: event.target.value })
        console.log(event.target.value)
    }

    const handleInterval = (event) => {
        dispatchItem({ type: "INTERVALDAYS", value: event.target.value })
        console.log(event.target.value)
    }
    // useEffect(()=>{
    //     console.log("use effect form")
    //     if(!entry.twitter_id) {
    //         props.dispatch({
    //             type: "ADD_NEW_PERSON", value: entry})
    //     }
       
    // }, [entry.twitter_id])
    return (
        <>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <form>
                    <h4>Twitter name</h4>
                    <input value={entry.twitter_name || ''} name="twitterName" type='text' onChange={handleTwitter} />
                    <h4>YouTube ID</h4>
                    <input value={entry.youtube_id || ""} name="YouTubeID" type='text' onChange={handleYouTube} />
                    <h4>YouTube stream</h4>
                    <input value={entry.youtube_stream || ""} name="YouTubeStream" type='checkbox' onChange={handleYouTubeStream} />
                    <h4>Twitch name</h4>
                    <input value={entry.twitch_id || ""} name="twitchName" type='text' onChange={handleTwitch} />
                    <h4>Interval to check (days)</h4>
                    <input value={entry.checkInterval || ""} name="interval" type='text' onChange={handleInterval} />

                </form>

            </div>
            <MDBBtn color='primary' style={{ marginTop: "20px" }} href='#' onClick={() => {
                console.log("clicked")
                console.log(entry)
                const apicall = async () => {
                    const twitterRes = await fetchDataTwitter(entry.twitter_name)
                    console.log(twitterRes.id, twitterRes.profile_image_url)
                    console.log()
                    props.dispatch({ type: "ADD_NEW_PERSON", value: 
                    {
                        ...entry,
                        twitter_id: twitterRes.id.toString(),
                        image_url: twitterRes.profile_image_url.toString()
                    } 
                })
                }
                apicall()
                //console.log(payload)
                //console.log(entry)
                //dispatchItem({ type: "RESET" })
            }}>submit</MDBBtn>
            <div>
            {removeOptions}
            </div>
            
        </>
    )
}

export default connect(mapStateToProps)(NewPerson)