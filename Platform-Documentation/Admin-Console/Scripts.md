The Scripts tab is where you write and save your server-side scripts. DreamFactory currently supports scripts written in Javascript. Scripting in other languages like PHP, Python, and Ruby is on the product roadmap.

The Scripts tab functionality is disabled on the free hosted version of DreamFactory (this is to avoid malicious or poorly written scripts from taking the hosted system down; eventually we may build a sandbox environment for running scripts on the free hosted version). To run server-side scripts, you need to install DreamFactory on your machine, a server, your own cloud account, or PaaS. You can learn more about DreamFactory installation options [here](Usage-Options).

There are two types of scripts: 1) event scripts and 2) custom scripts. You should familiarize yourself with some scripting examples and blog posts [here](Server-Side-Scripting). Event scripts are like web hooks. You can add a script to any API call, to both pre-process and post-process information. Custom scripts enable you to implement any logic as a web service API that you can call from your application.

Common use cases for server-side scripting include:

* Workflow triggers
* Data access control rules
* Calculations 
* Field validation rules
* Custom business logic as a web service

    