import { TwitterTweetEmbed, TwitterTimelineEmbed } from 'react-twitter-embed';
import { useRef, useState, useEffect } from 'react'
import FetchData from './twitterAPI';

const Tweet = () => {
    const [payload, setPayload] = useState([])

    console.log(payload)
    FetchData(534697987, setPayload)

    const tweets = payload.map((element) => {
        console.log(element["id"])
        return (<TwitterTweetEmbed
            // Here goes your copied ID.

            tweetId={element["id"]}
            // Style options goes here:
            options={{ align: "center" }}
        />)
    })

    // const loading = () => {
    //     return (<span class="fas fa-cog fa-8x fa-spin"></span>)
    // }


    return (
        <>
            {(payload.length !== 0) ? (tweets) : (
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>)}


        </>
    )
}

export default Tweet



