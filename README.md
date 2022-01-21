# Just In
This project was made during a Software Engineering Immersive course by General Assembly. It was the second project during the course and thus is only a frontend application. Ideally a backend would also be created to handle the API calls but as such material was not covered yet, it was not designed with one. The course instructor provided a simple forwarding backend server to allow API calls to be made to avoid the CORS error so eventually it is possible the fowarding server will be removed and all API calls by this app will fail. 

The project goal was to make an app which aggregates content from various social media and streaming platforms of specific people of interest. The idea was to create an app which allows you to see in a quick snapshot what updates have been made in the last 24 hours(or more depending on the persons settings) by a certain group of people related to a project, media franchise, or the like. 

Currently, content is pulled from the services: Twitter, YouTube, and Twitch.

Try it here: http://just-in-app.herokuapp.com/  
**Note the app may initially take a while to start up on Heroku since it is hosted on a free account.**

# Table of Contents

- [Features](#Features)
- [Instructions](#Instructions)
- [npm Libraries Used](#npm-Libraries-Used)
- [Developer Notes](#Developer-Notes)
- [Areas to improve on/wish list](#Areas-to-improve-on/wish-list)
- [Cloning and running the App](#Cloning-and-running-the-App)
- [Links](#Links)
- [License](#License)

# Features
In its current inplementation, Just In has the following features:
- **Social media feed**: see Tweets or YouTube videos sorted chronologically from a profile. Retweets are filtered out to ensure you see only original content.
![feed image](https://github.com/andrewilf/Just-In/blob/main/readme_image/1.png?raw=true)  
- **Stream status**: With the sidebar, you can check if people on your currently selected profile are streaming on Twitch or YouTube. Clicking on the online status will redirect you to the stream.
![stream status image](https://github.com/andrewilf/Just-In/blob/main/readme_image/2.jpg?raw=true)  
- **Organise by your Interests**: Each profile is dedicated to a group of users with a similar theme (e.g. a particular game/TV series or music genre). Data tied to each person includes their Twitter name, ID, profile picture and optionally their Twitch ID, YouTube ID and a check if they stream on YouTube or not.

- **Switch profiles on the fly**: The currently active profile can be chosen with a dropdown menu, switch between your different interests with a click. Profiles can also be added/removed via a modal prompt.
![profile image](https://github.com/andrewilf/Just-In/blob/main/readme_image/3.png?raw=true)  
- **Remember your data**: Using the browser's LocalStorage, profile data is saved to the browser so they persist even on page refreshes.

# Instructions
On loading the app for the first time, three sample profiles will be loaded in.  

The first profile "Full Stack" is an example of how you may collect Twitter accounts related to a particular topic for updates.  

The second profile "StarCraft 2" is an example of people who also have youTube accounts on top of their Twitter accounts. YouTube Videos will appear in the feed after clicking on the "Toggle YouTube Feed" button at the top. They also once in a while stream on Twitch.  
![toggle youtube image](https://github.com/andrewilf/Just-In/blob/main/readme_image/4.jpg?raw=true)  


The last profile "Lofi beats" is a good example of the stream status feature as "LoFi Girl" streams 24/7 on YouTube. 

## Creating a new Profile
- To Create a new profile, first click on the profile dropdown button. Select the last option "create/remove profile".  

![profile image](https://github.com/andrewilf/Just-In/blob/main/readme_image/3.png?raw=true)  
- A modal will appear. In the 1 input field "Profile Name", type in the name of you new profile. When done click on the "create profile" button. The new empty profile will be loaded as the current profile. No items will be found in the feed until people are added to that profile.
![modal profile image](https://github.com/andrewilf/Just-In/blob/main/readme_image/5.png?raw=true)  
## Deleting Profiles
- To delete profiles, click on the profile dropdown button and select the last option "create/remove profile"

- On the bottom of the modal which appears, select the button corresponding to the profile you wish to remove. **Do note only profiles which are currently not selected can be deleted.**

## Adding people to a Profile
-  To add people, click on the "add/remove people" button at the bottom of the "stream status" sidebar.

- A form will appear (Note: to go back to the feed, click on the "Home" button on the top).
![person form image](https://github.com/andrewilf/Just-In/blob/main/readme_image/6.png?raw=true)  
- Fill in the "Twitter name" field with the person's Twitter handle (without the @).  

![twitter image](https://github.com/andrewilf/Just-In/blob/main/readme_image/7.jpg?raw=true)  
- If they have a YouTube account, enter their YouTube ID which you can retreive from their channel page. This ID has become increasingly difficult to get due to the ability for channels to add custom URLs for their channel page `https://www.youtube.com/channel/[user ID]` is the typical channel URL, if the URL looks like `https://www.youtube.com/c/[channel name]` then the ID cannot be acquired. Most of the time to non-custom URL of the channel can be found if you click on any video by the channel and then click on the channel's name, the redirected URL should be the non-custom one and the channel ID can be copied.

![youtube image](https://github.com/andrewilf/Just-In/blob/main/readme_image/11.jpg?raw=true)  

- If they also stream on their youTube account, check the box for the "YouTube stream?" field.

- If they have a twitch account, enter their username in the "Twitch name" field. (**Note the username should be in lowercase**)
![twitch image](https://github.com/andrewilf/Just-In/blob/main/readme_image/8.jpg?raw=true)  

- Type in how far back you want the app to check for Tweets or YouTube videos by the person. Each day is 24 hours, only enter positive integers in this field.  

![completed form image](https://github.com/andrewilf/Just-In/blob/main/readme_image/9.png?raw=true)  

- Once the form is completed, click submit and you will be redirected back to the new updated feed should the person's details be correct.  

![feed with person image](https://github.com/andrewilf/Just-In/blob/main/readme_image/10.png?raw=true)  

## Deleting people
- To delete people from the current profile, click on the "add/remove people" button at the bottom of the "stream status" sidebar.

- At the bottom of the form, click on the person you wish to remove.

## Resetting profile data from LocalStorage
- Click on the "Restart all profiles data" button at the bottom of the feed. Then refresh the page. The default profile data should now be loaded in.

# npm Libraries Used
react-youtube: https://www.npmjs.com/package/react-youtube  
Allows embeded YouTube videos in the feed.

react-twitter-embed: https://www.npmjs.com/package/react-twitter-embed  
Allows embeded tweets in the feed.

Material Design for Bootstrap 5 & React 17: https://www.npmjs.com/package/mdb-react-ui-kit  
Framework was used for some visual components. 

date-fns: https://www.npmjs.com/package/date-fns  
Used to format date and time in the ISO 8601 format. Most data retreived from APIs uses this or a similar format, so this library greatly helps to sort the feed chronologically. 

# Developer Notes
- All people on this app are assumed to at least be using Twitter. Currently you cannot add someone only using YouTube or Twitch.
- YouTube API limits: By default, Google gives 10,000 free units with their YouTube API. Each "Search" API calls use 100 units meaning only 100 search API calls can be used a day by default. YouTube API calls by default are disabled on the app but can be enabled with a toggle button on the feed. 
- A method of checking on YouTube streams statuses without API calls was developed. The check if a person is streaming on YouTube currently does not use API calls, instead the URL: `https://www.youtube.com/channel/[user ID]/live` is checked with a GET request. If the channel owner is currently streaming, the request is redirected to the video link they are currently streaming on. If they are not they are redirected to the same channel URL without "/live". This method however will also show the channel owner as "online" even when only the waiting room of a stream is available before a scheduled stream starts.
- Currently this app has no backend set up meaning all bearer tokens/API keys are held in the apps config vars. 
- Profile images may break over time since they are hard coded URLs. The user changing their Twitter profile image will not be reflected on the app and the old image URL maybe deleted by Twitter. Ideally the profile image should be retreived on the backend via the Twitter API and updated every day or so. 
- Personally would not use Material Design for Bootstrap 5 & React 17 again in the future due to most features being locked behind premium membership.

# Areas to improve on/wish list:
- Better formatting. Resized appropriately for mobile use.
- Toggle button which determines if retweets should be shown or not. They currently are filtered out.
- Better form for adding people to a profile. Currently the app will generate an error should the submit button be clicked and the Twitter name field is blank.
- Ability to edit details of existing people in a profile.
- Collated view of all current streams shown on one page.
- Implement APIs from other social media/content creator platforms such as Vimeo, Instagram, or Facebook.
- Ability to import/export profiles.
- Backend server to better handle API calls.

# Cloning and running the App
If you wish to clone and run this app on your local machine: 
- you need to configure config variables. The npm library, dotenv is included in the package.json file so you can edit the included file "dotenv"(remember to rename it .env) and write your own API details which the app will use.
- Run the following commands inside your Just_In folder: npm install, npm start.

## Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/andrewianfaulkner/)
## License

[MIT](https://choosealicense.com/licenses/mit/)
