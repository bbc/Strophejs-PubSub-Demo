# XMPP/HTTP PubSub Demo

A simple demo of Publish/Subscribe in the browser using Strophe.js

This consists of a client.html and a publisher.html and a working XMPP setup (see below). You will be able to go to the publisher.html and send HTML and txt messages. Any number of people who have connected to client.html will recieved these messages and display them on their screen. This demo is not meant for production use, and serves to get people up and running with the technology as quickly as possible. 

## Browser Support

You need a modern browser for the [CORS](http://www.w3.org/TR/cors/) support. This code has been tested in:

* Google Chrome
* Safari 4+
* Firefox 3.5+

If you find it works in any other browsers, do let us know.

## Strophe

This demo uses the wonderful Strophe.js by [Jack Moffitt](http://metajack.im/) to do all the clever stuff.

* [strophe.js](https://github.com/metajack/strophejs) 
* [strophe.pubsub.js](https://github.com/metajack/strophejs)

minimized versions of both are included, but for the latest versions and more information, visit the links above.

## Setting up an XMPP server

You'll need a running [XMPP server](http://xmpp.org/xmpp-software/servers/) and [BOSH connection manager](http://metajack.im/2008/09/08/which-bosh-server-do-you-need/). There are many options out there, but I've choosen to help you install [Ejabberd](http://www.ejabberd.im/), a popular XMPP server and latest versions (2.1.3+) comes with BOSH (Bidirectional-streams Over Synchronous HTTP) and CORS (Cross-Origin Resource Sharing) support baked in and enabled by default.

I have added installation instructions for Ejabberd on Centos 5.5 in the /docs directory. If you have similar instructions for other setups, please send [pull requests](http://help.github.com/pull-requests/), and I'll try and feed these back.

Make sure to config Ejabberd to work with anonymous connections by modifying your ejabberd.cfg file by adding under the Authentication section this line: 
```{host_config, "vm.local", [{auth_method, [anonymous]},
                             {anonymous_protocol, both}]}. ```
(You'll then need to restart Ejabberd)

#####Note on Openfire#####
Openfire does not allow anonymous pubsub messaging.

## Setting up the client and publisher

Once you have your XMPP server installed, you need to stick all the files above into a directory you can browse to in a web browser. You'll then need to update the configuration settings to reflect you XMPP server. It's also worth noting that all the files are currently grouped together, so if you are testing this on a public server, you'd want to stick all the publisher stuff behind some authentication, so anyone can't come along and start publishing stuff.

The files you'll need to update are:

* [js/shared.js](https://github.com/bbcrd/Strophejs-PubSub-Demo/blob/master/js/shared.js)

This contains the BOSH_SERVICE and XMPP_SERVER locations. You will likely just have to change the domain. You can also change the PUBSUB_NODE. This is the common location that both publisher and clients go for messages. The dots just create a namespace. Always start the name with pubsub.

* [js/publisher.js](https://github.com/bbcrd/Strophejs-PubSub-Demo/blob/master/js/publisher.js)

At the top of this page you set the account you will be logging in as, to publish the messages to all the connected clients. You can just use the admin account you created when setting up Ejabberd.
