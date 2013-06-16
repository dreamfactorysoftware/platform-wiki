<a name="top" />

[**HOME**](Home) > [**SNOWPLOW SETUP GUIDE**](Setting-up-Snowplow) > [**Step 2: setup a Tracker**](Setting-up-a-Tracker) > [**Lua tracker**](Lua-tracker-setup)

## Contents

- 1. [Overview](#overview)  
- 2. [Integration options](#integration-options)
  - 2.1 [Tracker compatibility](#compatibility)  
  - 2.2 [Dependencies](#dependencies)  
  - 2.3 [Documented environments](#documented-envs)  

<a name="overview" />
## 1. Overview

The [Snowplow Lua Tracker](https://github.com/snowplow/snowplow-lua-tracker) lets you add analytics to your [Lua] [lua]-based applications, Lua web servers/frameworks, or from the Lua scripting layer within your games or apps.

The tracker should be relatively straightforward to setup if you are familiar with Lua development.

Ready? Let's get started.

[Back to top](#top)

<a name="integration-options" />
## 2. Integration options

### 2.1 Tracker compatibility

As a lightweight, easily-embeddable scripting language, Lua is available in a huge number of different computing environments and platforms, from [World of Warcraft] [wow] through [OpenResty] [openresty] to [Adobe Photoshop Lightroom] [lightroom].

To make the Snowplow Lua Tracker work out-of-the-box with as many different Lua programs as possible, we have tried to:

1. Minimize external dependencies
2. Provide setup instructions for the most popular Lua environments

[Back to top](#top)

<a name="dependencies" />
### 2.2 Dependencies

To make the Snowplow Lua Tracker work with as many different Lua programs as possible, we have tried to keep external dependencies to a minimum. There is only one external dependency currently:

* [LuaSocket] [luasocket] - network support for the Lua language. Required to send events to the Snowplow collector

All other dependencies are bundled with the Lua Tracker itself - see the [lib] [tracker-lib] for details.

[Back to top](#top)

<a name="documented-envs" />
### 2.3 Documented environments

Below we provide setup instructions for the following popular Lua environments:

1. **LuaRocks** is a popular deployment and management system for Lua modules
2. **Ubuntu** for those developers working directly with Lua in a Linux environment
3. **iOS** TODO

[Back to top](#top)

[lua]: http://www.lua.org/

[wow]: http://www.wowwiki.com/Lua
[openresty]: http://openresty.org/
[lightroom]: http://www.adobe.com/devnet/photoshoplightroom.html

[luasocket]: http://w3.impa.br/~diego/software/luasocket/

[tracker-lib]: https://github.com/snowplow/snowplow-lua-tracker/tree/master/src/snowplow/lib