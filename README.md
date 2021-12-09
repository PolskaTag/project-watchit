## Contributors
Philip Lapinski, Viet Le, Steven Zhou, Jake Taylor, Themba Binns, Nathanael Hansell

## [WatchIT](http://18.207.245.254/) :white_check_mark:

# WatchIT Overview
WatchIT is user defined action system driven by object detection and identification designed to work with Single Board Computers (SBC) and low-powered peripherals. As object detection software grows more intelligent, the potential use cases grow as well. WatchIT strives to give users the expressive power to drive meaningful actions based on the object’s they want to act upon. Our system can be broken up into a few key sub systems: the web application, API server, and SBC.

The **web application** provides the user with an interface to manage how they’d like to control their SBC. With account management, the user can create an account and begin defining their watcher’s configuration in the matter of minutes. They’re provided with an intuitive configuration interface which gives them the options to configure device, object, and action configurations. Users have the option to select from dozens of pretrained objects, giving them a wide range of flexibility when using the system. There are also user defined actions (UDA) that the user can customize and include in the action list such as video recording, pictures, notifications, logs, sounds, and more. In addition to managing their watchers, they can view the results that their watchers aggregate such as videos and logs. 
 
The **API Server** oversees managing the flow of data to and from the web applications and SBCs. This server connects to MongoDB Atlas, a fully managed cloud database, that handles vital data. For storage we’ve opted for an S3 cloud storage bucket which holds pictures, videos, and logs for our users. The API server acts as a bridge to connect to these vital services. The client and SBCs interact with the server by using URIs that are defined through the server. 
 
The **SBCs** provide the main functionality of our system. Since our system revolves around object detection and identification, the SBC needs to have a connected camera. After the setup, the device logs into the user's account and loads the watcher configuration. From there after, the device starts its video feed, and the SBC begins object detection once every 30 frames. Once the specified object is detected, the custom actions loaded from the watcher configuration get fired off.

## Features

#### Web Application
| Feature | Description |
| --- | --- |
| `Account Management` | Users can create and manage their account on our web application |
| `Watcher Configuration` | Setup and manage your watcher configurations which customize your object detection experience |
| `Detect Objects` | Detect objects using your SBC's camera paired with your watcher configuration |
| `User Defined Actions` | Attach and customize predefined actions to your watcher configuration to fit your use case |
| `Watch your videos` | Watch the videos that your watcher saves on our web application |
| `Admin Page` | Get the ultimate overview of your current system by utilizing the admin page |

#### Customizable Actions (UDA)
These actions execute when the selected object is detected.
| UDA | Description |
| --- | --- |
| `Video` | A user action that allows your SBC to record a video |
| `Email` | Send a customized email to any chosen recipient |
| `Sound` | Play an audio file through SBC's connected audio devices |
| `Log` | Record the triggers in a file so that you have history of detections |


## Bugs
| Bug | Description | Issue |
| --- | --- | --- |
| `Watcher Configuration Select` | Clicking the "x" field in the select crashes the application | [#51](#51)
| `Deleting videos` | In videoList, clicking the delete button next to videos does not delete video | #52
| `Logs` | In ProfilePage, clicking "submit" to get the logs does not retrieve logs | #53
| `Email Time/date` | The time/date stamps on the emailUDA do follow the correct local time/date | #54
| `Redirection - Watcher Config` | Users are not redirected to the login page if they are not logged in | #55
| `Deleting Watcher Config` | User should not have to refresh screen to delete watcher configuration | #56
| `Save Watcher Configuration` | Watcher Configuration should update if changes made and saved. They duplicate as of now | #57
| `Email Body field` | Email body should be reflected in the actual email | #58


### To Test
I strongly recommend that you test our product through our production site listed above. There are secret values that are not included in source control that we keep hidden. Setting up your own backend would take hours of configuration.

### Setting up Frontend
If you'd like to run a development version of our frontend, here are the steps.
1. Clone the repository
2. cd to project-watchit/client
3. npm install
4. npm start

### Setting up the Backend
If you'd like to run a development version of our backend, here's what you need to do.
1. Setup MongoDB Atlas - https://account.mongodb.com/account/register
2. Follow this tutorial to aquire your ATLAS_URI https://www.mongodb.com/languages/mern-stack-tutorial
3. `cd to project-watchit/server`
4. Create a new file at project-watcher/server named "config.env"
5. Paste in your ATLAS_URI key-value pair aquired from step 2
6. Setup an S3 bucket - follow this [link](https://www.youtube.com/watch?v=e6w9LwZJFIA)
7. In config.env, create key-value pairs for these values [AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_ACCESS_KEY, AWS_SECRET_KEY]
8. Create a programmatic access key for your S3 bucket.
9. Create key-value pairs for [AWS_DEVICE_ACCESS_KEY, AWS_DEVICE_SECRET_ACCESS_KEY]
10. Focus back to your terminal and `npm start`

### Pi Setup
1. Create conda env using the requirements.txt
2. Setup Pi Camera by entering raspi-vid go to interface options and enable camera
3. Run main.py
