# Just-In

This project goal was to make an app which aggregates content from various social media and streaming platforms of specific people of interest.

Currently, content is pulled from the following services: Twitter, YouTube, and Twitch.


## Features

In its current inplementation, Just-In has the following features:
- Customisable profiles: A profile is dedicated to groups of users with a similar theme (e.g. a particular game/TV series or music genre). Data tied to each person includes their Twitter name, ID, profile picture and optionally their Twitch ID, YouTube ID and a check if they stream on YouTube or not.
- Switch profiles on the fly: Profiles can be chosen with a dropdown menu and added/removed though a prompt.
- Profiles saved with browser localStorage: Allows data in profiles to be saved across browser refreshes and sessions.
- Chronological feed with content only they post: According to their settings (1 day by default), content is pulled from services associated with the person of interest and old content by the person is filtered out. It is then sorted chronologically(with a bubble sort algorithm) and fed into the apps feed. Retweets are also filtered out to ensure only content posted by the person appears.
- Stream status: With the sidebar, you can check if people on your currently selected profile are streaming on Twitch or YouTube. Clicking on the online status will redirect you to the stream.

## npm libraries used

react-youtube: https://www.npmjs.com/package/react-youtube
Allows embeded YouTube videos in the feed.

react-twitter-embed: https://www.npmjs.com/package/react-twitter-embed
Allows embeded tweets in the feed.

Material Design for Bootstrap 5 & React 17: https://www.npmjs.com/package/mdb-react-ui-kit
Framework was used for some visual components but it may be replaced to just use Material-UI in the future 

date-fns: https://www.npmjs.com/package/date-fns
Used to format date and time in the ISO 8601 format. Most data retreived from APIs uses this or a similar format, so this library greatly helps to sort the feed chronologically 

## Learning points/points of interest

- YouTube API limits: By default, Google gives 10,000 free units with their YouTube API. Search API calls use 100 units meaning only 100 search API calls can be used a day. YouTube API calls by default are disabled on the app but can be enabled with a toggle button. 
- Checking on YouTube streams without API calls: The check if a person is streaming on YouTube currently does not use API calls, instead the URL: https://www.youtube.com/channel/<user ID>/live is checked with a GET request. If the channel owner is currently streaming, the request is redirected to the video link they are currently streaming on. If they are not they are redirected to the same channel URL without /live. This method however will also show the channel owner as "online" even when only the waiting room before a scheduled stream starts.
- Currently this app has no backend set up meaning all bearer tokens/API keys are held in the app. To avoid compromising keys, the keys are pulled and kept on browser localStorage from a js file which is not included on the git repo.

## to do

- Cleaner formatting. Resized appropriately for mobile use
- Easy way to input API keys/bearer tokens for the app to use
- Toggle if retweets should be shown or not. They currently are filtered out
- Smarter "add people" form
- Collated view of all current streams shown on one page
- Implement alternative method of checking youtube videos from tweets
- Implement APIs from other social media/content creator platforms
- Ability to import/export profiles
- change proxy server used for API requests
