## Overview

Setting up permissions in IAM for the user(s) installing Snowplow is an 3 step process:

1. [Create an IAM group (incl. creating a user and setting permissions)] (#create-group)
2. [Enable users to log into AWS] (#enable-login)
3. [Once Snowplow has been setup, delete the user from the IAM group] (#delete-user)


**Disclaimer: Snowplow Analytics Ltd will not be liable for any problems caused by the full or partial implementation of these instructions on your Amazon Web Services account. If in doubt, please consult an independent AWS security expert.**

_Warning: these permissions are still more permissive than they need to be. We will be putting in time to narrow them down further over the coming weeks._

<a name="create-group" />
## 1. Setup the IAM group

### Initial group configuration

First click on the IAM icon on the AWS dashboard:

[[/setup-guide/images/iam/console-iam.png]]

Now click on the _Create a New Group of Users_ button:

[[/setup-guide/images/iam/new-iam-group.png]]

### Group Name

Enter a _Group Name_ of `Snowplow Data Pipeline`:

[[/setup-guide/images/iam/operating-snowplow-permissions/group-name-snowplow-data-pipeline.png]]

Then click continue.

### Permissions

Now choose the *Custom Policy* option and click *Select*:




