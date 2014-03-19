## Overview

In order to provider server-side scripting in Javascript, DreamFactory has leveraged Google's [V8 Javascript engine](https://code.google.com/p/v8/). PECL provides encapsulated access to V8 via the **v8js** PHP extension.

Unfortunately, [**v8js**] [v8js] is considered an **alpha** extension and is not always completely available from your normal source of system packages. For that reason, we have chosen to build the extension from scratch using a prior, stable version (3.14.5). As of March 2014, the current V8JS extension does not compile when installed via [**pecl**](http://pecl.php.net/). Please see the installing from source section for instructions on getting **V8** and **v8js** running on your box.


## 2. API
[Overview](overview-api)

## 3. Apps
[Overview](overview-apps)

## 4. Storage
[Overview](overview-storage)

## 5. Event System
[[Overview|The-Platform-Event-System]]

[technical-architecture]: /dreamfactorysoftware/dsp-core/wiki/technical-documentation/images/dsp-architecture.png
[v8js]: http://pecl.php.net/package/v8js
