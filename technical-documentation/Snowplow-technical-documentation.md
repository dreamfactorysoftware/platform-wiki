[**HOME**](Home) > [**SNOWPLOW TECHNICAL DOCUMENTATION**](Snowplow-technical-documentation)

The technical documentation reflects the Snowplow architecture, with five loosely-coupled sub-systems connected by four standardised data protocols/formats:

![architecture] [technical-architecture]

## 1. Trackers

[Trackers overview](trackers)  
[JavaScript Tracker](javascript-tracker)  
[No-JS Tracker](no-js-tracker)  
[Lua Tracker](Lua-Tracker)  
[Arduino Tracker](Arduino-Tracker)  

### A. [Snowplow tracker protocol](snowplow-tracker-protocol)  

## 2. Collectors

[Collectors overview](collectors)  
[Cloudfront collector](cloudfront)  
[Clojure collector (Elastic Beanstalk)](Clojure-collector)  
[Scala Stream collector](Scala-stream-collector)  
[SnowCannon (node.js)](snowcannon)  

### B. [[Collector logging formats]]

## 3. Enrichment

[Overview](Enrichment)   
[EmrEtlRunner](EmrEtlRunner)   
[Scalding-based Enrichment Process](The-Enrichment-Process)   

### C. [Canonical Snowplow event model](canonical-event-model)

## 4. Storage

[Storage Overview](Storage-documentation)  
[Storage in S3](S3 storage)  
[Storage in Redshift](amazon-redshift-storage)  
[Storage in PostgreSQL](postgresql-storage)   
[Storage in Infobright](infobright-storage) (deprecated)  
[The StorageLoader](The-Storage-Loader)  

### D. Snowplow storage formats (to write)

## 5. Analytics

[Analytics overview](analytics documentation)


[technical-architecture]: https://d3i6fms1cm1j0i.cloudfront.net/github-wiki/images/technical-architecture.png
