XMPP/HTTP PubSub Demo
=====================

A simple demo of Publish/Subscribe in the browser using Strophe.js

This consists of a client.html and a publisher.html and a working XMPP setup (see below). Once you have added the configuration details for your setup, you should be able to go to the publisher.html and send HTML and txt messages. Any number of people who have connected to client.html will recieved these messages and display them on their screen.

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

Setting up an XMPP server
-------------------------

You'll need a running XMPP server and BOSH connection manager. [Ejabberd](http://www.ejabberd.im/) 
is a popular XMPP server and latest versions (2.1.3+) comes with 
BOSH (Bidirectional-streams Over Synchronous HTTP) and CORS 
(Cross-Origin Resource Sharing) support baked in and enabled by default.

I have added installation instructions for Ejabberd on Centos 5.5 in 
the /docs directory. If you have similar instructions for other setups
please send [pull requests](http://help.github.com/pull-requests/), and I'll try and feed these back.

Setting up the client and publisher
-----------------------------------

Once you have your XMPP server installed, you need to stick all the files above into a directory you can browse to in a web browser. You'll then need to update the configuration settings to reflect you XMPP server. It's also worth noting that all the files are currently grouped together, so if you are testing this on a public server, you'd want to stick all the publisher stuff behind some authentication, so anyone can't come along and start publishing stuff.

The files you'll need to update are:

[js/shared.js](https://github.com/bbcrd/Strophejs-PubSub-Demo/blob/master/js/shared.js)

This contains the BOSH_SERVICE and XMPP_SERVER locations. You will likely just have to change the domain. You can also change the PUBSUB_NODE. This is the common location that both publisher and clients go for messages. The dots just create a namespace. Always start the name with pubsub.

[js/publisher.js](https://github.com/bbcrd/Strophejs-PubSub-Demo/blob/master/js/publisher.js)

At the top of this page you set the account you will be logging in as, to publish the messages to all the connected clients. The installation instruction show you how to create an account.
