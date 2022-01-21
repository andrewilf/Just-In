# Just-In
This project was made during a Software Engineering Immersive course by General Assembly. This was the second project during the course and thus is a fully frontend application. Ideally it would have a backend created to handle the API calls but as such material was not covered yet, it was not designed with one. The course instructor provided a simple forwarding backend server to allow API calls to be made to avoid the CORS error so eventually it is possible this server will be removed and all API calls by this app will fail. 

Try it here: http://just-in-app.herokuapp.com/ 
**Note the app may initially take a while to start up on Heroku since it on a free account.**

The project goal was to make an app which aggregates content from various social media and streaming platforms of specific people of interest. The idea was to create an app which allows you to see in a quick snapshot what updates have been made in the last 24 hours(or more depending on the persons settings) by a certain group of people related to a project, media franchise, or the like. 

Currently, content is pulled from the following services: Twitter, YouTube, and Twitch. (It should however be noted that as of writing, the Twitch API token has expired). 

## Features
In its current inplementation, Just-In has the following features:
- Social media feed: see Tweets or YouTube videos sorted chronologically from a profile. Retweets are filtered out to ensure you see only original content
- Stream status: With the sidebar, you can check if people on your currently selected profile are streaming on Twitch or YouTube. Clicking on the online status will redirect you to the stream.
- Customisable profiles: A profile is dedicated to groups of users with a similar theme (e.g. a particular game/TV series or music genre). Data tied to each person includes their Twitter name, ID, profile picture and optionally their Twitch ID, YouTube ID and a check if they stream on YouTube or not.
- Switch profiles on the fly: Profiles can be chosen with a dropdown menu and added/removed via a modal prompt.
- Profiles saved with browser localStorage: Allows data in profiles to be saved to the browser so they persist even if the page refreshes.

# Instructions
On loading

## Creating a new Profile

## Adding people to a Profile

## Deleting people

## Deleting Profiles


# npm libraries used
react-youtube: https://www.npmjs.com/package/react-youtube 
Allows embeded YouTube videos in the feed.

react-twitter-embed: https://www.npmjs.com/package/react-twitter-embed 
Allows embeded tweets in the feed.

Material Design for Bootstrap 5 & React 17: https://www.npmjs.com/package/mdb-react-ui-kit 
Framework was used for some visual components. 

date-fns: https://www.npmjs.com/package/date-fns
Used to format date and time in the ISO 8601 format. Most data retreived from APIs uses this or a similar format, so this library greatly helps to sort the feed chronologically. 

# Learning points/points of interest
- YouTube API limits: By default, Google gives 10,000 free units with their YouTube API. Search API calls use 100 units meaning only 100 search API calls can be used a day. YouTube API calls by default are disabled on the app but can be enabled with a toggle button on the feed. 
- Checking on YouTube streams without API calls: The check if a person is streaming on YouTube currently does not use API calls, instead the URL: https://www.youtube.com/channel/<user ID>/live is checked with a GET request. If the channel owner is currently streaming, the request is redirected to the video link they are currently streaming on. If they are not they are redirected to the same channel URL without /live. This method however will also show the channel owner as "online" even when only the waiting room before a scheduled stream starts.
- Currently this app has no backend set up meaning all bearer tokens/API keys are held in the app. To avoid compromising keys, the keys are pulled and kept on browser localStorage from a js file which is not included on the git repo.
- Profile images may break over time since they are hard coded URLs. Ideally the profile image should be retreived on the backend via the Twitter API and updated every day or so. 
- Personally would not use Material Design for Bootstrap 5 & React 17 again in the future due to most features being locked behind premium membership.

# Areas to improve on/wish list:
- Cleaner formatting. Resized appropriately for mobile use
- Toggle button which determines if retweets should be shown or not. Currently are filtered out
- Better form for adding people to a profile
- Ability to edit details of existing people in a profile
- Collated view of all current streams shown on one page
- Implement APIs from other social media/content creator platforms such as Vimeo, Instagram, or Facebook
- Ability to import/export profiles
- Backend server to better handle API calls
- Dropdown menu to choose and delete people from Profiles or Profiles as opposed to the current buttons generated for each option

# Cloning and running the App
If for some reason you wish to clone and run this app:

## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/andrewianfaulkner/)
## License

[MIT](https://choosealicense.com/licenses/mit/)
