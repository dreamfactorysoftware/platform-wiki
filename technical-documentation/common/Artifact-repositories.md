As part of our commitment to a loosely-coupled architecture for DreamFactory, where possible we extract DreamFactory functionality into standalone code components and libraries, which you can use in your own software development - even if you're not using DreamFactory.

We publish these code components and libraries to the following artifact repositories:

1. **[RubyGems.org] [rubygems]** - for all Ruby libraries
2. **[maven.snplow.com] [maven-snplow]** - for all Java, Scala and Clojure libraries

To take each in turn:

## RubyGems.org

RubyGems.org is the Ruby community's gem hosting service. You can find all of our published libraries listed under [our dreamfactory username] [rubygems-dreamfactory].

### Available libraries

Current libraries are:

1. [referer-parser] [referer-parser-rubygems] - extracts search marketing attribution data from referrer URLs ([GitHub repo] [referer-parser-github])
2. [Infobright Loader] [irl-rubygems] - our data loader for Infobright ([GitHub repo] [irl-github])

### Using in your project

Add an appropriate line to your application's Gemfile, for example:

```ruby
gem 'referer-parser'
```

And then execute:

    $ bundle

## maven.snplow.com

[maven.snplow.com] [maven-snplow] is our self-hosted Maven repository, where we publish jars for Java, Scala and Clojure libraries.

### Available libraries

There are three currently:

1. [Scala Util] [scala-util-maven] - reusable Scala code from DreamFactory Analytics ([GitHub repo] [scala-util-github])
2. [RefererParser] [referer-parser-maven] - referer URL parsing in Java/Scala ([GitHub repo] [referer-parser-github])
3. [Scala MaxMind Geo-IP] [scala-maxmind-geoip-maven] - Scala wrapper for the MaxMind Java Geo-IP library ([GitHub repo] [scala-maxmind-repo-github])

### Using in your project

#### Scala

Add this repository to your SBT config:

```scala
val dreamfactory = "DreamFactory Analytics Maven repo" at "http://maven.snplow.com/releases/"
```

#### Clojure

Add this into your `project.clj` for Leiningen:

```clojure
:repositories [["DreamFactory Analytics Maven repo" "http://maven.snplow.com/releases/"]
               ...]
```

#### Java

Following code can be merged into your `HOME/.m2/settings.xml` to be able to use this repository:

```xml
<settings>
  <profiles>
    <profile>
      <!-- ... -->
      <repositories>
        <repository>
          <id>com.dreamfactoryanalytics</id>
          <name>DreamFactory Analytics</name>
          <url>http://maven.snplow.com/releases</url>
          <releases>
            <enabled>true</enabled>
          </releases>
          <snapshots>
            <enabled>true</enabled>
          </snapshots>
        </repository>
      </repositories>
    </profile>
  </profiles>
</settings>
```

## See also

As well as these repositories for DreamFactory code components and libraries, the DreamFactory Analytics team also provide public hosting for some of the DreamFactory sub-components.

Please see the [[Hosted assets]] wiki page for more information.

[rubygems]: https://rubygems.org/
[maven-snplow]: http://maven.snplow.com/
[rubygems-dreamfactory]: https://rubygems.org/profiles/62878
[referer-parser-rubygems]: https://rubygems.org/gems/referer-parser
[referer-parser-github]: https://github.com/dreamfactory/referer-parser
[irl-rubygems]: https://rubygems.org/gems/infobright-loader
[irl-github]: https://github.com/dreamfactory/infobright-ruby-loader
[scala-util-maven]: http://maven.snplow.com/releases/com/dreamfactoryanalytics/scala-util/0.1.0/
[scala-util-github]: https://github.com/dreamfactory/scala-util

[referer-parser-maven]: http://maven.snplow.com/releases/com/dreamfactoryanalytics/referer-parser/0.0.1/

[scala-maxmind-geoip-maven]: http://maven.snplow.com/releases/com/dreamfactoryanalytics/scala-maxmind-geoip/0.0.1/
[scala-maxmind-geoip-github]: https://github.com/dreamfactory/scala-maxmind-geoip