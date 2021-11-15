## Contributors

Philip Lapinski, Viet Le, Steven Zhou, Jake Taylor, Themba Binns, Nathanael Hansell


## WatchIT
A camera system that you can tell what to do.

WatchIT connects camera footage with object detection/recognition to give you the power to run actions on detection. Want to send customized reminders when you get walk through the door? Want to see who's munching on your favorite snacks? Want to keep better track of your front door? Use WatchIT.

### PC Setup for CUDA OpenCV

1. Downloads 
* [Miniconda](https://docs.conda.io/en/latest/miniconda.html) Python from python.org did not work for me, missing a DLL
* latest [OpenCV](https://opencv.org/releases/) as of this update it is 4.5.4
* [OpenCV-Contrib](https://github.com/opencv/opencv_contrib/tree/4.5.4) extra modules for opencv
* [Cuda Tookit 11.4.3](https://developer.nvidia.com/cuda-11-4-3-download-archive?target_os=Windows&target_arch=x86_64&target_version=11&target_type=exe_local) 
* [CuDNN](https://developer.nvidia.com/rdp/cudnn-archive) Requires signing up for Nvidia Developer Account
* [CMake](https://cmake.org/download/) Used 3.22.0-rc3
* [Gstreamer](https://gstreamer.freedesktop.org/data/pkg/windows/1.18.5/mingw/gstreamer-1.0-devel-mingw-x86_64-1.18.5.msi) Install developer tools
* [Visual Studio](https://visualstudio.microsoft.com/downloads/)

2. CUDA and CuDNN
* Run installer for CUDA, only core files are used for this project
* Unzip CuDNN and look for bin, include, lib
* Find CUDA installation on your main drive
* Go inside CuDNN bin and copy over to CUDA bin
* Repeat for include and lib

3. CMAKE
* Create build folder, this will be the location where Visual Studio will build OpenCV
![CMAKE Location](readME/CMakeFolder.png)
* Source is location of your openCV folder and build is location of your build folder
* Install numpy to the environment where you will be installing OpenCV
* Click configure specify your version of Visual Studio as generator and Finish
* Ensure that Gstreamer is has path location to the devel files similar to what is shown
![Gstreamer](readME/Gstreamer.png)
* Check the following WITH_CUDA, OPENCV_DNN_CUDA, ENABLE_FAST_MATH
* Link OPENCV_EXTRA_MODULES_PATH to your opencv-contrib-4.5.4\modules that we downloaded

