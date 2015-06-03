Installing DreamFactory on OpenShift:

1. Get OpenShift [account](https://www.openshift.com)

2. Install the [OpenShift client tools](https://developers.openshift.com/en/getting-started-client-tools.html)

3. Use the cartridge to create a new application (see README file): 

[OpenShift DreamFactory Cartridge](https://github.com/dreamfactorysoftware/openshift-dreamfactory-cartridge)

or install as a QuickStart

```rhc app create dreamfactory php-5.4 mysql-5.5 --from-code https://github.com/dreamfactorysoftware/dsp-core.git```