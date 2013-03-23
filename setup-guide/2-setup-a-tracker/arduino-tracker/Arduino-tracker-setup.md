[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-SnowPlow) > [**Step 2: setup a Tracker**](Setting-up-a-Tracker) > [**Arduino tracker**](Arduino-tracker-setup)

## Contents

- 1. [Overview](#overview)  

<a name="overview" />
## 1. Overview

The [SnowPlow Arduino tracker](https://github.com/snowplow/snowplow-arduino-tracker) allows you to track SnowPlow events from an IP-connected [Arduino] [arduino] board.

The tracker should be relatively straightforward to setup if you are familiar with Arduino development and integrating third-party libraries into your Arduino sketches.

Ready? Let's get started.

## 2. Before you start

### 2.1 Tracker compatibility

Please note that the SnowPlow Arduino Tracker requires the new Ethernet library API (with DHCP and DNS), which is in Arduino 1.0.

Almost all recent Arduinos (Arduino Uno, Arduino Due et al) should work fine with SnowPlow.

### 2.2 Dependencies

If you haven't done so already, download and install the Arduino toolchain and development environment from the [Arduino Software] [arduino-software] page.

## 3. Initial setup

### 3.1 Installation

**1)** Browse to the SnowPlow Arduino Tracker's GitHub site and download the zip file:

[[/setup-guide/images/arduino/download-tracker-zip.png]]

**2)** Open your Arduino software and click **File > Preferences** to check your Sketchbook location:

[[/setup-guide/images/arduino/sketchbook-location.png]]

**3)** If it does not already exist, create a sub-folder within your Sketchbook location called "libraries"

**4)** Now unzip your SnowPlow zip file into the "libraries" sub-folder, renaming its top-level folder from "snowplow-arduino-tracker-master" to "SnowPlowTracker":

[[/setup-guide/images/arduino/libraries-folder.png]]

**5)** Within your Arduino software, click **File > Examples > SnowPlowTracker > basicPing**

**6)** If you have not already done so, connect your Arduino board to your computer, and to the Internet via the RJ-45 ethernet jack on your Ethernet shield, or via your Wi-Fi shield:

[[/setup-guide/images/arduino/plug-in-arduino.jpg]]

**7)** In the Arduino software, click **File > Upload**. This should compile the sketch without any errors and upload it to your Arduino board:

[[/setup-guide/images/arduino/XXX.png]]


[arduino]: http://arduino.cc/
[arduino-software]: http://www.arduino.cc/en/Main/software