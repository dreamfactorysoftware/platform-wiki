[**HOME**](Home) > [**SNOWPLOW TECHNICAL DOCUMENTATION**](SnowPlow technical documentation) > [**Storage**](storage documentation) > Amazon Redshift Storage
[**HOME**](Home) > [**SNOWPLOW TECHNICAL DOCUMENTATION**](SnowPlow technical documentation) > [**Storage**](storage documentation)

## Contents

1. [Current table definition](#table-def)
2. [The roadmap for storing SnowPlow data in S3 / Hive](#roadmap)

<a name="table-def" />
## 1. Current table definition

The standard S3 / Hive implementation of SnowPlow storage uses Apache Hive on EMR to store SnowPlow data in a table partitioned by date. The current table definition is given in the [repo] [redshift-table-def]. We have pasted a copy below:

	CREATE TABLE events (
		-- App
		app_id varchar(255) encode text255, 
		platform varchar(255) encode text255, 
		-- Date/time
		collector_tstamp timestamp not null,
		dvce_tstamp timestamp,
		-- Event
		event varchar(128) encode text255,
		event_vendor varchar(128) encode text32k not null,
		event_id varchar(38) not null unique,
		txn_id int,
		-- Versioning
		v_tracker varchar(100) encode text255, 
		v_collector varchar(100) encode text255 not null,
		v_etl varchar(100) encode text255 not null, 
		-- User and visit
		user_id varchar(255) encode runlength, 
		user_ipaddress varchar(19) encode runlength,
		user_fingerprint varchar(50) encode runlength,
		domain_userid varchar(16),
		domain_sessionidx smallint,
		network_userid varchar(38),
		-- Page
		page_title varchar(2000),
		page_referrer varchar(3000),
		-- Page URL components
		page_urlscheme varchar(16) encode text255,    
		page_urlhost varchar(255) encode text255,     
		page_urlport smallint,        
		page_urlpath varchar(1000) encode text32k,
		page_urlquery varchar(3000),
		page_urlfragment varchar(255),
		-- Marketing
		mkt_source varchar(255) encode text255,
		mkt_medium varchar(255) encode text255,
		mkt_term varchar(255) encode raw,
		mkt_content varchar(500) encode raw,
		mkt_campaign varchar(255) encode text32k,
		-- Custom Event
		ev_category varchar(255) encode text255,
		ev_action varchar(255) encode text255,
		ev_label varchar(255) encode text32k,
		ev_property varchar(255) encode text32k,
		ev_value float,
		-- Ecommerce
		tr_orderid varchar(255) encode raw,
		tr_affiliation varchar(255) encode text255,
		tr_total dec(18,2),
		tr_tax dec(18,2),
		tr_shipping dec(18,2),
		tr_city varchar(255) encode text32k,
		tr_state varchar(255) encode text32k,
		tr_country varchar(255) encode text32k,
		ti_orderid varchar(255) encode raw,
		ti_sku varchar(255) encode text32k,
		ti_name varchar(255) encode text32k,
		ti_category varchar(255) encode text255,
		ti_price dec(18,2),
		ti_quantity int,
		-- Page ping
		pp_xoffset_min integer,
		pp_xoffset_max integer,
		pp_yoffset_min integer,
		pp_yoffset_max integer,
		-- User Agent
		useragent varchar(1000) encode text32k,
		-- Browser
		br_name varchar(50) encode text255,
		br_family varchar(50) encode text255,
		br_version varchar(50) encode text255,
		br_type varchar(50) encode text255,
		br_renderengine varchar(50) encode text255,
		br_lang varchar(255) encode text255,
		br_features_pdf boolean,
		br_features_flash boolean,
		br_features_java boolean,
		br_features_director boolean,
		br_features_quicktime boolean,
		br_features_realplayer boolean,
		br_features_windowsmedia boolean,
		br_features_gears boolean ,
		br_features_silverlight boolean,
		br_cookies boolean,
		br_colordepth varchar(12) encode text255,
		br_viewwidth integer, 
		br_viewheight integer,
		-- Operating System
		os_name varchar(50) encode text255,
		os_family varchar(50)  encode text255,
		os_manufacturer varchar(50)  encode text255,
		os_timezone varchar(255)  encode text255,
		-- Device/Hardware
		dvce_type varchar(50)  encode text255,
		dvce_ismobile boolean,
		dvce_screenwidth integer,
		dvce_screenheight integer,
		-- Document
		doc_charset varchar(128) encode text255,
		doc_width integer,
		doc_height integer,
		CONSTRAINT event_id_pk PRIMARY KEY(event_id)
	)
	DISTSTYLE KEY
	DISTKEY (domain_userid)
	SORTKEY (collector_tstamp);

<a name="roadmap" />
## 2. Roadmap 

There are a number of changes we intend to make the table:

1. Increase the number of fields, as we build out support for more events as "first class citizens". In the table definition above, a number of events are recognised as "first class citizens" with specific fields that only apply to those events: a good example is transaction events. (The accounts for all 13 fields beginning `tr_` and `ti_`.) For details about the events we intend to support, see the [SnowPlow Canonical Event Model](canonical-event-model).
2. We plan to move the format of data from a single events table into storing fields for particular event types in specific tables, which are joined to the primary SnowPlow event table. This will be necessary to accommodate the new events we want to support as "first class citizens". 


[redshift-table-def]: https://github.com/snowplow/snowplow/blob/master/4-storage/hive-storage/hive-format-table-def.q
[avro]: http://avro.apache.org/