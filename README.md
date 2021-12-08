## Contributors

Philip Lapinski, Viet Le, Steven Zhou, Jake Taylor, Themba Binns, Nathanael Hansell


## WatchIT Overview
WatchIT is a system that allows users to connect a video feed with object detection to run user defined actions. By using an online control interface and embedded devices, Users can set up a device, select which objects to detect and then assign actions to be taken, after the object is detected. Users are also able to have multiple configurations of objects and actions, allowing them to watch over multiple scenarios. Want to know who has been stealing your stuff from the pantry? Setup a device, pick what was stolen as the object and pick an action to be run when the camera sees it.

### LIVE
The current production link is 18.207.245.254

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
3. cd to project-watchit/server
4. Create a new file at the root of server named "config.env"
5. Paste in your ATLAS_URI key-value pair

### Pi Setup
1. Create conda env using the requirements.txt
2. Setup Pi Camera by entering raspi-vid go to interface options and enable camera
3. Run main.py