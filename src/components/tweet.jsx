import { TwitterTweetEmbed } from 'react-twitter-embed';
import { useRef, useState, useEffect } from 'react'

const Tweet = (props) => {

    return (
        <TwitterTweetEmbed
            // Here goes your copied ID.
            key = {props.payload["id"]}
            tweetId={props.payload["id"]}
            // Style options goes here:
            options={{ align: "center", width: "500px"}}
        />
    )
}

export default Tweet



