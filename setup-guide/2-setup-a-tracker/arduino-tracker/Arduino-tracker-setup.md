<a name="top" />

[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [**Step 2: setup a Tracker**](Setting-up-a-Tracker) > [**Arduino tracker**](Arduino-tracker-setup)

## Contents

- 1. [Overview](#overview)  
- 2. [Before you start](#before-start)
  - 2.1 [Tracker compatibility](#compatibility)  
  - 2.2 [Dependencies](#dependencies)  
- 3. [Setup](#setup)
  - 3.1 [Installation](#installation)  
  - 3.2 [Testing](#testing)  
- 4. [Integrating into your sketch](#integration)

<a name="overview" />
## 1. Overview

The [Snowplow Arduino tracker](https://github.com/snowplow/snowplow-arduino-tracker) allows you to track Snowplow events from an IP-connected [Arduino] [arduino] board.

The tracker should be relatively straightforward to setup if you are familiar with Arduino development and integrating third-party libraries into your Arduino sketches.

Ready? Let's get started.

[Back to top](#top)

<a name="before-start" />
## 2. Before you start

<a name="compatibility" />
### 2.1 Tracker compatibility

Please note that the Snowplow Arduino Tracker requires the new Ethernet library API (with DHCP and DNS), which is in Arduino 1.0.

Almost all recent Arduinos (Arduino Uno, Arduino Due et al) should work fine with the Snowplow Tracker.

[Back to top](#top)

<a name="dependencies" />
### 2.2 Dependencies

If you haven't done so already, download and install the Arduino toolchain and development environment from the [Arduino Software] [arduino-software] page.

[Back to top](#top)

<a name="setup" />
## 3. Setup

<a name="installation" />
### 3.1 Installation

Follow these steps to install the Snowplow Arduino Tracker on your computer:

**1)** Browse to the Snowplow Arduino Tracker's GitHub site and download the zip file:

[[/setup-guide/images/arduino-tracker-setup-guide/download-tracker-zip.png]]

**2)** Open your Arduino software and click **File > Preferences** to check your Sketchbook location:

[[/setup-guide/images/arduino-tracker-setup-guide/sketchbook-location.png]]

**3)** Create a sub-folder within your Sketchbook location called "libraries" if it doesn't already exist

**4)** Now unzip your Snowplow zip file into the "libraries" sub-folder, renaming its top-level folder from "snowplow-arduino-tracker-master" to "SnowplowTracker":

[[/setup-guide/images/arduino-tracker-setup-guide/libraries-folder.png]]

That's it for installation! Now let's test the setup.

[Back to top](#top)

<a name="testing" />
### 3.2 Testing

Follow these steps to test the Snowplow Arduino Tracker with your Arduino board:

**1)** If you have not already done so, connect your Arduino board to your computer, and to the Internet via the RJ-45 ethernet jack on your Ethernet shield, or via your Wi-Fi shield:

[[/setup-guide/images/arduino-tracker-setup-guide/plug-in-arduino.jpg]]

**2)** Within your Arduino software, click **File > Examples > SnowplowTracker > basicPing** to load a sample sketch which comes with the Snowplow Arduino Tracker

Note that it is not necessary to make any edits to this sketch before running it (it is fine for example to leave the MAC address as specified).

**3)** Next click **File > Upload**. This should compile the sketch without any errors and upload it to your Arduino board:

[[/setup-guide/images/arduino-tracker-setup-guide/uploading-okay.png]]

**4)** Now click **Tools > Serial Monitor** and you should see events being successfully pinged to Snowplow:

[[/setup-guide/images/arduino-tracker-setup-guide/snowplow-working.png]]

That's it for testing - although if you are interested, you can try out the three other sample sketches in under **File > Examples > SnowplowTracker**.

[Back to top](#top)

<a name="integration" />
## 4. Integrating into your sketch

You are now ready to integrate the Snowplow Arduino Tracker into your own sketch. This should be relatively straightforward - we recommend the following steps:

**1)** Look at the source code of the example sketches that come with the Snowplow Arduino Tracker. You can find them on GitHub in [snowplow-arduino-tracker/examples] [snowplow-examples]

**2)** Read through the [Technical Documentation](Arduino-Tracker) for the Snowplow Arduino Tracker on this wiki. This will tell you exactly what tracking capabilities Snowplow can provide for your Arduino sketch

For a standalone Arduino project which incorporates Snowplow tracking, please see [arduino-temp-tracker] [arduino-temp-tracker] on GitHub.

[Back to top](#top)

[arduino]: http://arduino.cc/
[arduino-software]: http://www.arduino.cc/en/Main/software
[snowplow-examples]: https://github.com/snowplow/snowplow-arduino-tracker/tree/master/examples
[arduino-temp-tracker]: https://github.com/alexanderdean/arduino-temp-tracker