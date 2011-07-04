Chrome Newtab Extension Readme

about:			
	A custom page design to override chrome://newtab.

author:			
	Paul Vilchez (@pvilchez)

last updated:		
	July 3 '11

tested on:		
	Chrome 12.0.742.112; Mac OS X Leopard

unpacked files:		

			index.html

			img/[logo].png x 6

			manifest.json

			scripts/app.js

			scripts/fetch.js

			style/style.css

version:		
	1.0				

== Description ==

A custom newtab page for Google Chrome. Inspiration was drawn from the experimental page (found at chrome://flags), 
and some of the CSS was drawn from that source. As such, here is the Google BSD License:

Copyright (c) 2009, Google Inc.
All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of Google Inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.


== Goals ==

I had these in mind when I started:

*   Keep the page as local as possible. Chrome doesn't like Cross-Origin requests interacting with the filesystem, so I made it an extension.
	*   Motivation behind this included page-load speed, and I also want it to work without an internet connection.
*   No jQuery. I wanted to exercise my vanilla javascript skills.
*	Make use of neat HTML5 tricks. For example, the page has a basic todo/notetaker which uses webkitIndexedDB (woo, offline access).
	* note: Double-Tab to refocus from the omnibox to the textbox. Tab order follows the DOM afterwards.
*	If a connection is present, query some APIs for notifications. At the moment, there are hackish notifications for Reddit, HN and Forrst.
	* note: Uses localStorage. Woo, gratuitous html5.
*	I really really want to use Chrome's 'Recently closed' functionality.
*   Look pretty.

== To Do ==

*	Make XMLHTTPRequests asynchronous - I thought I did, but sometimes it hangs.
*	Set timeouts for the requests. (Lookin' at you, reddit api).
*	Add notifications from other services (facebook, twitter, etc.).
*	Chrome's 'Recently closed' functionality. (unlikely. *sadface*).
*	Maybe make the sidebar auto-generated, using favicons, rather than hardcoding in li's?
*	Actually package this as a .crx file.
