var username = "pvilchez";

function renderNotification(notification) {
	'use strict';
	console.log("rendering...");
	var attn, li, a, t, s;
	attn = document.getElementById("right-sidebar-list");
	li = document.createElement("li");
	a = document.createElement("a");
	t = document.createTextNode(notification);
	s = document.createElement("div");
	t.data = notification;
	console.log(t.data);
	
	a.addEventListener("click", function () {
		attn.removeChild(li);
	}, false);
	
	a.textContent = " [x] ";
	
	li.appendChild(t);
	li.appendChild(a);
	li.appendChild(s);
	attn.appendChild(li);	
}

var xhr = new XMLHttpRequest();
xhr.open("GET", "http://www.reddit.com/api/me.json", true);
xhr.onreadystatechange = function () {
	'use strict';
	var temp, resp, difference;
	if (xhr.readyState === 4) {
		if (xhr.status === 200) {
			resp = JSON.parse(xhr.responseText);
			if (resp.data.name === username) {
				if (typeof (localStorage) === 'undefined') {
					console.log('Your browser does not support HTML5 localStorage.');
				} else {
					try {
						temp = parseInt(localStorage.getItem("reddit_link_karma"));
						
						if (resp.data.link_karma !== temp) {
							difference = resp.data.link_karma - temp;
							console.log("[reddit] Link Karma: " + difference.toString());
							renderNotification("reddit | link karma: " + difference.toString());
						} else { console.log("[reddit] link karma unchanged");}
						
						temp = parseInt(localStorage.getItem("reddit_comment_karma"));
						
						if (resp.data.comment_karma !== temp) {
							difference = resp.link_karma - temp;
							console.log("[reddit] Comment Karma: " + difference.toString());
							renderNotification("reddit | comment karma: " + difference.toString());
						} else { console.log("[reddit] comment karma unchanged");}
						
						localStorage.removeItem("reddit_link_karma");
						localStorage.removeItem("reddit_comment_karma");

						localStorage.setItem("reddit_link_karma", resp.data.link_karma);
						localStorage.setItem("reddit_comment_karma", resp.data.comment_karma);
						
						console.log("[reddit] Unread Mail: " + resp.data.has_mail);
						
						if (resp.data.has_mail) {
							renderNotification("reddit | orangered");
						}
						
					} catch (e) {
						if (e === 'QUOTA_EXCEEDED_ERR') {
							console.log('Quota exceeded!'); 
						}
					}
				}
			} else { console.log("[reddit] Error: Username does not match or you are not logged in."); }
		}
	}
};
xhr.send();


var hn_xhr = new XMLHttpRequest();
hn_xhr.open("GET", "http://api.ihackernews.com/profile/" + username, true);

hn_xhr.onreadystatechange = function () {
	'use strict';
	var resp, temp, difference;
	if (hn_xhr.readyState === 4) {
		if (hn_xhr.status === 200) {
			resp = JSON.parse(hn_xhr.responseText);
			if (resp.username === username) {
				if (typeof (localStorage) === 'undefined') {
					console.log('Your browser does not support HTML5 localStorage.');
				} else {
					try {
						temp = parseInt(localStorage.getItem("hn_karma"));
						if (resp.karma !== temp) {
							difference = resp.karma - temp;
							console.log("[HN] Karma: " + difference.toString());
							renderNotification("hn | karma: " + difference.toString());
						} else { console.log("[HN] karma unchanged."); }
						
						localStorage.removeItem("hn_karma", resp.karma);
						localStorage.setItem("hn_karma", resp.karma);
						
					} catch (e) {
						if (e === 'QUOTA_EXCEEDED_ERR') {
							console.log('Quota exceeded!'); 
						}
					}
				}
			} else { console.log("[HN] Error: Username does not match or you are not logged in."); }
		}
	}
};
hn_xhr.send();

var forrst_xhr = new XMLHttpRequest();
forrst_xhr.open("GET", "http://forrst.com/feed/poll?u=" + username, true);
forrst_xhr.onreadystatechange = function () {
	'use strict';
	var resp;
	if (forrst_xhr.readyState === 4) {
		if (forrst_xhr.status === 200) {
			resp = JSON.parse(forrst_xhr.responseText);
			if (resp === 0) {
				console.log("[forrst] zero notifications");	
			} else if (resp > 0) {
				console.log("[forrst] unread notification(s): " + resp.toString());
				renderNotification("forrst | unread notification(s): " + resp.toString());
			} else {
				console.log("wtf?");	
			}
		}

	}
};
forrst_xhr.send();