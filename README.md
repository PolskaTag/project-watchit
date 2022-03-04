## Contributors
Philip Lapinski, Gabriella Massarow, Viet Le, Steven Zhou, Jake Taylor, Themba Binns, Nathanael Hansell

# [WatchIT](https://main.d3dxfq1h6egsaq.amplifyapp.com/)

## Description
WatchIT is user-defined action web application driven by object detection. As object detection software grows more intelligent, the potential use cases grow as well. WatchIT wants to bring object detection into everyday people's hands. All you need is a WatchIT account, a computer and a webcam. 

## High-level System Overview
WatchIT is an object detection web application designed to work with a computer, camera, and some common peripherals. The idea is to be able to pick common objects for your camera to recognize, and pick actions to trigger when those objects get detected. Users first set up an account on our web application. Then, they create a “watcher” configuration, which tells your computer what objects to detect and actions to fire. Finally, the user downloads and installs our watcher program on any computer, signs in, and selects the watcher configuration of their choosing. To get this to work, we can think of the individual components needed.
 1. A front-facing user interface
 2. Architecture to provide and process information
 3. A program to deliver object detection and execute actions

A good user interface for such a project would be a web application. A website provides an easy way for users to interact with our project. By creating an account, a user can get registered into our system and begin to input information that we can transform and relay to our child watcher program. The web app should have a landing page, account management pages, and product features such as watcher configuration and a dashboard to view configured watchers.

The architecture to provide and process information would be composed of several different technologies. We’ll use a serverless architectural approach which promotes scalability and minimizes waste. To hold information, we’ll need a database such as dynamoDB. Information will flow from system to system via APIs. More about the details of the implementation soon.

Finally we have the object detection and action system. This will materialize in the form of a program downloaded from our web site. It features a basic GUI that allows the user to sign into their WatchIT account, and manage their watcher. As long as the user’s device has a camera connected to it, the watcher can begin recording and provide object detection. This program interfaces with our APIs to transmit data.

![image](https://user-images.githubusercontent.com/41872747/156835049-48b73864-c361-4982-9a41-f1659070d9b4.png)


## General Requirements
_Some things you'll need as a user to make this work._

 1. Access to a modern web browser (such as Chrome, Firefox)
 2. Internet Connectivity
 3. Computer with a camera

## Features

#### Web Application
| Feature | Description |
| --- | --- |
| `Account Management` | Users can create and manage their account on our web application |
| `Watcher Configuration` | Setup and manage your watcher configurations which customize your object detection experience |
| `Detect Objects` | Detect objects using your SBC's camera paired with your watcher configuration |
| `User Defined Actions` | Attach and customize predefined actions to your watcher configuration to fit your use case |
| `Log Viewer` | See detailed logs about the activity of your watcher |

#### Customizable Actions (UDA)
These actions execute when the selected object is detected.
| UDA | Description | Status |
| --- | --- | -- |
| `Video` | A user action that allows your computer to record a video | ❌
| `Email` | Send a customized email to any chosen recipient | ❌
| `Sound` | Play an audio file through computers's connected audio devices | ❌
| `SmartHome` | Use your smarthome devices through object detection | ❌

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
