[**HOME**](Home) > [**SNOWPLOW TECHNICAL DOCUMENTATION**](DreamFactory technical documentation) > [**Storage**](storage documentation) > Storage in Infobright

Please note: DreamFactory dropped support for loading data into Infobright with version 0.8.0. We plan to add back Infobright support at a later date, however, this is low priority.

The most recent version of the DreamFactory table in Infobright is:

```sql
CREATE TABLE IF NOT EXISTS events_009 (
	-- App
	`app_id` varchar(255) comment 'lookup', -- 'lookup' is a varchar optimisation for Infobright
	`platform` varchar(50) comment 'lookup',
	-- Date/time
	`collector_dt` date,
	`collector_tm` time,
	`dvce_dt` date,
	`dvce_tm` time,
	`dvce_epoch` bigint,
	-- Event
	`event` varchar(128) comment 'lookup',
	`event_vendor` varchar(128) comment 'lookup',
	`event_id` varchar(38),
	`txn_id` int,
	-- Versioning
	`v_tracker` varchar(100) comment 'lookup',
	`v_collector` varchar(100) comment 'lookup',
	`v_etl` varchar(100) comment 'lookup',
	-- User and visit
	`user_id` varchar(255),
	`user_ipaddress` varchar(19),
	`user_fingerprint` varchar(50),
	`domain_userid` varchar(16),
	`domain_sessionidx` smallint,
	`network_userid` varchar(38),
	-- Page
	`page_url` varchar(3000),
	`page_title` varchar(2000),
	`page_referrer` varchar(3000),
	-- Page URL components
	`page_urlscheme` varchar(16),
	`page_urlhost` varchar(255),
	`page_urlport` mediumint,             -- Size increased in 0.0.9
	`page_urlpath` varchar(1000),
	`page_urlquery` varchar(3000),
	`page_urlfragment` varchar(255),
	-- Marketing
	`mkt_source` varchar(255),
	`mkt_medium` varchar(255),
	`mkt_term` varchar(255),
	`mkt_content` varchar(500),
	`mkt_campaign` varchar(255),
	-- Custom Event
	`ev_category` varchar(255),
	`ev_action` varchar(255),
	`ev_label` varchar(255),
	`ev_property` varchar(255),
	`ev_value` double,                    -- Size increased in 0.0.9
	-- Ecommerce
	`tr_orderid` varchar(255),
	`tr_affiliation` varchar(255),
	`tr_total` dec(18,2),
	`tr_tax` dec(18,2),
	`tr_shipping` dec(18,2),
	`tr_city` varchar(255),
	`tr_state` varchar(255),
	`tr_country` varchar(255),
	`ti_orderid` varchar(255),
	`ti_sku` varchar(255),
	`ti_name` varchar(255),
	`ti_category` varchar(255),
	`ti_price` dec(18,2),
	`ti_quantity` int,
	-- Page ping
	`pp_xoffset_min` mediumint,
	`pp_xoffset_max` mediumint,
	`pp_yoffset_min` mediumint,
	`pp_yoffset_max` mediumint,
	-- User Agent
	`useragent` varchar(1000),
	-- Browser
	`br_name` varchar(50) comment 'lookup',
	`br_family` varchar(50) comment 'lookup',
	`br_version` varchar(50) comment 'lookup',
	`br_type` varchar(50) comment 'lookup',
	`br_renderengine` varchar(50) comment 'lookup',
	`br_lang` varchar(255) comment 'lookup',
	`br_features_pdf` tinyint(1),
	`br_features_flash` tinyint(1),
	`br_features_java` tinyint(1),
	`br_features_director` tinyint(1),
	`br_features_quicktime` tinyint(1),
	`br_features_realplayer` tinyint(1),
	`br_features_windowsmedia` tinyint(1),
	`br_features_gears` tinyint(1) ,
	`br_features_silverlight` tinyint(1),
	`br_cookies` tinyint(1),
	`br_colordepth` varchar(12) comment 'lookup',
	`br_viewwidth` mediumint,
	`br_viewheight` mediumint,
	-- Operating System
	`os_name` varchar(50) comment 'lookup',
	`os_family` varchar(50) comment 'lookup',
	`os_manufacturer` varchar(50) comment 'lookup',
	`os_timezone` varchar(255) comment 'lookup',
	-- Device/Hardware
	`dvce_type` varchar(50) comment 'lookup',
	`dvce_ismobile` tinyint(1),
	`dvce_screenwidth` mediumint,
	`dvce_screenheight` mediumint,
	-- Document
	`doc_charset` varchar(128),
	`doc_width` mediumint,
	`doc_height` mediumint
) ENGINE=BRIGHTHOUSE DEFAULT CHARSET=utf8 ;
```
