[**HOME**](Home) > [**SNOWPLOW TECHNICAL DOCUMENTATION**](SnowPlow technical documentation) > [**Storage**](storage documentation)

## Contents

1. [Current table definition](#table-def)
2. [The roadmap for storing SnowPlow data in S3 / Hive](#roadmap)

<a name="table-def" />
## 1. Current table definition

The standard S3 / Hive implementation of SnowPlow storage uses Apache Hive on EMR to store SnowPlow data in a table partitioned by date. The current table definition is given in the [repo] [hive-table-def]. We have pasted a copy below:

	CREATE EXTERNAL TABLE IF NOT EXISTS `events` (
		tm string,
		txn_id string,
		user_id string,
		user_ipaddress string,
		visit_id int,
		page_url string,
		page_title string,
		page_referrer string,
		mkt_source string,
		mkt_medium string,
		mkt_term string,
		mkt_content string,
		mkt_campaign string,
		ev_category string,
		ev_action string,
		ev_label string,
		ev_property string,
		ev_value string,
		tr_orderid string,
		tr_affiliation string,
		tr_total string,
		tr_tax string,
		tr_shipping string,
		tr_city string,
		tr_state string,
		tr_country string,
		ti_orderid string,
		ti_sku string,
		ti_name string,
		ti_category string,
		ti_price string,
		ti_quantity string,
		br_name string,
		br_family string,
		br_version string,
		br_type string,
		br_renderengine string,
		br_lang string,
		br_features array<string>,
		br_cookies boolean,
		os_name string,
		os_family string,
		os_manufacturer string,
		dvce_type string,
		dvce_ismobile boolean,
		dvce_screenwidth int,
		dvce_screenheight int,
		app_id string,
		platform string,
		event string,
		v_tracker string,
		v_collector string,
		v_etl string,
		event_id string,
		user_fingerprint string,
		useragent string,
		br_colordepth string,
		os_timezone string
	)
	PARTITIONED BY (dt STRING)
	LOCATION '${EVENTS_TABLE}' ;

<a name="roadmap" />
## 2. Roadmap 

There are a number of changes we intend to make the table:

1. Increase the number of fields, as we build out support for more events as "first class citizens". In the table definition above, a number of events are recognised as "first class citizens" with specific fields that only apply to those events: a good example is transaction events. (The accounts for all 13 fields beginning `tr_` and `ti_`.) For details about the events we intend to support, see the [SnowPlow Canonical Event Model](canonical-event-model).
2. We plan to move the format of data from the text based, ctrl-a delimited, flatfiles currently used to [Avro] [avro]. This will enable us to add more event-specific fields without incurring performance penalties (see above), make it easier to evolve the table definition without needing to reprocess older data and group fields together. (E.g. all the fields that relate to transactions in a single grouping.)


[hive-table-def]: https://github.com/snowplow/snowplow/blob/master/4-storage/hive-storage/hive-format-table-def.q
[avro]: http://avro.apache.org/