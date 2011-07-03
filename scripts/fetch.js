var username = "pvilchez";

var xhr = new XMLHttpRequest();
xhr.open("GET", "http://www.reddit.com/api/me.json", true);
xhr.onreadystatechange = function () {
	'use strict';
	if (xhr.readyState === 4) {
		if (xhr.status == 200) {
			var resp = JSON.parse(xhr.responseText);
			if(resp.data.name === username){
				if (typeof(localStorage) === 'undefined') {
					console.log('Your browser does not support HTML5 localStorage.');
				} else {
					try {
						var temp = localStorage.getItem("reddit_link_karma");
						if (resp.data.link_karma != temp){
							var difference = resp.link_karma - temp;
							console.log("[reddit] Link Karma: " + difference);
						}
						temp = localStorage.getItem("reddit_comment_karma");
						if (resp.data.comment_karma != temp){
							var difference = resp.link_karma - temp;
							console.log("[reddit] Comment Karma: " + difference);
						}
						localStorage.setItem("reddit_link_karma", resp.data.link_karma);
						localStorage.setItem("reddit_comment_karma", resp.data.comment_karma);
						console.log("[reddit] Unread Mail: " + resp.data.has_mail);
					} catch (e) {
						if (e == QUOTA_EXCEEDED_ERR) {
							console.log('Quota exceeded!'); 
						}
					}
				}
			} else {
				console.log("[reddit] Error: Username does not match.");
			}
		}
	}
};
xhr.send();


var hn_xhr = new XMLHttpRequest();
hn_xhr.open("GET", "http://api.ihackernews.com/profile/"+username, true);
hn_xhr.onreadystatechange = function () {
	'use strict';
	if (hn_xhr.readyState === 4) {
		if (hn_xhr.status == 200) {
			var resp = JSON.parse(hn_xhr.responseText);
			if (resp.username === username){
				if (typeof(localStorage) === 'undefined') {
					console.log('Your browser does not support HTML5 localStorage.');
				} else {
					try {
						var temp = localStorage.getItem("hn_karma");
						if (resp.karma != temp){
							var difference = resp.karma - temp;
							console.log("[HN] Karma: " + difference);
						}
						localStorage.setItem("hn_karma", resp.karma);
					} catch (e) {
						if (e == QUOTA_EXCEEDED_ERR) {
							console.log('Quota exceeded!'); 
						}
					}
				}
			}

		}
	}
};
hn_xhr.send();

var forrst_xhr = new XMLHttpRequest();
forrst_xhr.open("GET", "http:/forrst.com/feed/poll?u="+username, true);
forrst_xhr.onreadystatechange = function () {
	'use strict';
	if (forrst_xhr.readyState === 4) {
		if (forrst_xhr.status == 200) {
			var resp = JSON.parse(forrst_xhr.responseText);
			if (resp === 0){
				console.log("[forrst] zero notifications");	
			} else if (resp > 0){
				console.log("[forrst] unread notification(s): " + resp);	
			} else {
				console.log("wtf?");	
			}
		}

	}
};
forrst_xhr.send();