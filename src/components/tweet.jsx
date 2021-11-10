import { TwitterTweetEmbed, TwitterTimelineEmbed } from 'react-twitter-embed';
import { useRef } from 'react'

const Tweet = () => {
    const Id = useRef("1456608288032890885")
    return (
        <TwitterTweetEmbed
            // Here goes your copied ID.
            tweetId={Id.current}
        // Style options goes here:
        options={{ width: "500px" }}
        />
    )
}

export default Tweet



