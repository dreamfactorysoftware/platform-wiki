{{DISPLAYTITLE:Create a DSP on Windows Azure}}

This guide will show you how to create a DreamFactory Services Platform&trade; (DSP) in your [http://windowsazure.com Windows Azure] account. You can either create your DSP through the management portal or via the Azure Command Line Tools. We'll cover both methods here.

If you've just created your [http://windowsazure.com Windows Azure] account or a new user for your DSP, you'll need to create and upload a management certificate. If you already have one, just skip the next section.

== Creating a Management Certificate ==

This following information was taken from [http://msdn.microsoft.com/en-us/library/windowsazure/gg551722.aspx here].

<blockquote>
A Windows Azure management certificate is an X.509 v3 certificate used to authenticate an agent, such as Visual Studio Tools for Windows Azure or a client application that uses the Service Management API, acting on behalf of the subscription owner to manage subscription resources. Windows Azure management certificates are uploaded to Windows Azure and stored at the subscription level. The management certificate store can hold up to 25 certificates. These certificates are used to authenticate your Windows Azure deployment.
<br/><br/>
Management certificates must have a key length of at least 2048 bits and should reside in thePersonal certificate store. When the certificate is installed on the client, it should contain the private key of the certificate. To upload to the certificate to the Windows Azure Management Portal, you must export it as a .cer format file that does not contain the private key.
</blockquote>

=== Mac OS ===

You're on your own here...

=== Linux ===

Creating a certificate in Linux is very straightforward. In Ubuntu, it does require the package '''mono-devel''' for the '''makecert''' utility. Other flavors of Linux you're on your own at this time.


==== Installing the mono-devel Package ====


<syntaxhighlight lang="bash">
$ sudo apt-get install mono-devel
</syntaxhighlight>

The below examples were done on an Ubuntu 12.04.2 LTS machine.

<syntaxhighlight lang="bash">
$ makecert -r -n "CN=[certificate-name]" -a sha1 "/path/to/[certificate-name].cer"
Mono MakeCert - version 2.10.8.1X.509 Certificate Builder
Copyright 2002, 2003 Motus Technologies. Copyright 2004-2008 Novell. BSD licensed.

Success
</syntaxhighlight>

Obviously, replace ```[certificate-name]``` with a name of your choosing.

=== Windows ===

To create your own self-signed management certificates, open a Visual Studio command prompt and execute the following command:

<syntaxhighlight lang="winbatch">
makecert -sky exchange -r -n "CN=<CertificateName>" -pe -a sha1 -len 2048 -ss My "<CertificateName>.cer"
</syntaxhighlight>

For more complete information on generating a certificate, see [http://msdn.microsoft.com/en-us/library/windowsazure/gg432987.aspx Create a Service Certificate for Windows Azure].

{{warning|The private key associated with certificate should be maintained in a secure location. After the .cer file is uploaded, anyone who has the private key can use the Service Management API to control the hosted service. This includes creating, deleting, and modifying services and storage accounts on your subscription that are associated with certificate.}}

== Using the Management Portal ==

You must have, or have access to, the following in order to complete this:

# a valid WindowsAzure account
# the [https://manage.windowsazure.com/ WindowsAzure management portal]
# the permissions to create a Virtual Machine

=== Preparation ===

The first step is to pull the DreamFactory Services Platform&trade; image from the VM Depot into your storage account. If you've already copied the image to your storage account you may skip this step.

# Go to the Virtual Machines section of your WindowsAzure portal
# Click on the "Images" sub-menu
# Click "Browse VM Depot"
# Search for, and choose, "DreamFactory DSP vx.x.x-azure"
# Choose a storage account, or create one, to house the image and click the check mark

[[File:azure-create-vm-1.png|center|frame|The DSP in the depot]]

This will copy the VM image from the VM Depot into your storage account.  This process can take a while to complete as all WindowsAzure VM images are 30GB in size.  It will take longer if you're copying the image to a storage account that is in a different region from the source image.

After the image has been successfully copied, you its status will change to '''Pending Registration'''. At this point you must '''Register''' the image. To do this:

# Select the image in the list
# Click the "Register Image" link from the footer menu
# Confirm values in the popup and continue

After this is complete, the image status will change to '''Available'''.

=== Create the VM ===

Now that the image has been copied to your storage account and registered, you can create any number of virtual machines from this image. The process is quick and easy.

# Click '''Virtual Machines''' on the left sidebar menu
# Click '''+ New''' on the footer menu
# Click '''From Gallery''' in the third column. This will pop up the VM selector. 
# Click '''My Images''' on the left side and you should see the image we copied in the previous step
# Select the image ('''dreamfactory-dsp_vx-x-x''') then click the arrow on the bottom to continue


==== Virtual Machine Configuration ====

[[File:azure-vm-create-2.png|framed|center|VM configuration settings panel]]

On this panel you choose a name for your new DSP and a user name.

The image is set up with a user called <nowiki>dsp_user</nowiki> already, but you still need to tell Azure about this user.

# In the '''NEW USER NAME''' field, type: <nowiki>dsp_user</nowiki>
# In the '''NEW PASSWORD''' and '''CONFIRM fields''', type: <nowiki>DSP!User</nowiki>
# Choose a size for your VM. '''Extra Small''' is perfect for a test drive.
# '''Optional''': Tick the box next to '''UPLOAD COMPATIBLE SSH KEY FOR AUTHENTICATION''' if you wish to enable SSH public key authentication
# Click the arrow on the bottom to continue.

==== Virtual Machine Mode ====

On this panel, simply leave the default '''standalone machine''' and choose a DNS name for your DSP. This will be your public web address to your DSP.  The domain for Azure VMs is '''.cloudapp.net'''. So if you choose '''scooby-doo''' as your DNS name, you can reach your DSP via http://scooby-doo.cloudapp.net.

After you've entered an acceptable value, click the arrow on the bottom to continue.

==== Virtual Machine Options ====

In this last panel of the Azure VM setup wizard, you are able to select an '''Availability Set'''. You can safely ignore this for now and click the check mark on the bottom to create your DSP VM.

=== Post Spin-Up Steps ===

There is one more thing you must do to reach your DSP once it has been created. This is to allow web traffic from the world into your VM.

To do this, you need to create, what Azure calls, and '''endpoint'''. 

# Navigate to your new VM's dashboard
# Click the '''Endpoints''' submenu, and '''Add Endpoint" from the footer menu. This will pop up the endpoint dialog.
# See the figure below for what to put in this form

[[File:azure-vm-create-3.png|framed|center|The settings to allow web traffic into your DSP]]

== Using the Azure CLI Tools ==

Coming soon!

=== Linux ===
==== Preparation ====
==== Create the VM ====



=== Mac OS ===
==== Preparation ====
==== Create the VM ====

=== Windows ===
==== Preparation ====
==== Create the VM ====

