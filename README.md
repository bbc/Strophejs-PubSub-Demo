XMPP/HTTP PubSub Demo
=====================

A simple demo of Publish/Subscribe in the browser using Strophe.js

This consists of a client.html and a publisher.html and a working
XMPP setup (see below). Once you have added the configuration 
details for your setup, you should be able to go to the 
publisher.html and send HTML and txt messages. Any number of 
people who have connected to client.html will recieved these 
messages and display them on their screen.

Browser Support
---------------

You need a modern browser for the [CORS](http://www.w3.org/TR/cors/) support.
This code has been tested in:

* Google Chrome
* Safari 4+
* Firefox 3.5+

If you find it works in any other browsers, do let us know.

Strophe
-------

This demo uses the wonderful Strophe.js to do all the clever stuff.

* [strophe.js](https://github.com/metajack/strophejs) 
* [strophe.pubsub.js](https://github.com/metajack/strophejs)

minimized versions of both are included, but for the latest versions 
and more information, visit the links above.

Setup
-----

You also need a running XMPP server and BOSH connection manager. [Ejabberd](http://www.ejabberd.im/) 
is a popular XMPP server and latest versions (2.1.3+) comes with BOSH and 
CORS support baked in and enabled by default.

I have added installation instructions for Ejabberd on Centos 5.5 in 
the /docs directory. If you have similar instructions for other setups
please send pull requests, and I'll try and feed these back.

Once you have installed Ejabberd, you will need to update the setting
in the [js/shared.js(https://github.com/bbcrd/Strophejs-PubSub-Demo/blob/master/js/shared.js) file.

