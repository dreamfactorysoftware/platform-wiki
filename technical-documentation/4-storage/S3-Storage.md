[**HOME**](Home) > [**SNOWPLOW TECHNICAL DOCUMENTATION**](Snowplow technical documentation) > [**Storage**](storage documentation) > Storage in S3

As standard, the [Enrichment Process](The Enrichment Process) outputs Snowplow data to Snowplow event files in S3. These are tab-delimited files that are:

1. Suitable for uploading data directly into Amazon Redshift or PostgreSQL
2. Suitable for querying directly using big data tools on EMR

## An example: querying the data in Apache Hive

The easiest way to understand the structure of data in S3 is to run some sample queries using something like Apache Hive on EMR. The table definition for the Snowplow event files is given [in the repo][hive-table-def], it is reprinted below for convenience:


```sql
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
os_timezone string,
event_vendor string, -- New in 0.0.6
page_urlscheme string,
page_urlhost string,
page_urlport int,
page_urlpath string,
page_urlquery string,
page_urlfragment string,
br_viewwidth int,
br_viewheight int,
doc_charset string,
doc_width int,
doc_height int,
pp_xoffset_min int,
pp_xoffset_max int,
pp_yoffset_min int,
pp_yoffset_max int -- End of new in 0.0.6
)
PARTITIONED BY (dt STRING)
LOCATION '${EVENTS_TABLE}' ;
```

Going forwards, we plan to move from a flat-file structure to storing Snowplow data using [Apache Avro][avro]

[hive-table-def]: https://github.com/snowplow/snowplow/blob/master/4-storage/hive-storage/hive-format-table-def.q
[avro]: http://avro.apache.org/