function keyPress(e) {
	'use strict';
	if (window.event) { e = window.event; }
	if (e.keyCode === 13) {document.getElementById('submit').click(); }
}

var app = {};
app.indexedDB = {};

app.indexedDB.db = null;

app.indexedDB.open = function () {
	'use strict';
	var request = webkitIndexedDB.open("list", "db description.");
	
	request.onsuccess = function (e) {
		var v, db, setVrequest;
		v = "1.0";
		app.indexedDB.db = e.target.result;
		db = app.indexedDB.db;
		
		if (v !== db.version) {
			setVrequest = db.setVersion(v);
			
			setVrequest.onfailure = app.indexedDB.onerror;
			setVrequest.onsuccess = function (e) {
				var store = db.createObjectStore("todo", {keyPath: "timeStamp"});
				
				app.indexedDB.getAllTodoItems();
			};
		}
		app.indexedDB.getAllTodoItems();
	};
	request.onfailure = app.indexedDB.onerror;
};

app.indexedDB.addTodo = function (todoText) {
	'use strict';
	var db, trans, store, request;
	db = app.indexedDB.db;
	trans = db.transaction(["todo"], webkitIDBTransaction.READ_WRITE, 0);
	store = trans.objectStore("todo");
	request = store.put({
		"text": todoText,
		"timeStamp" : new Date().getTime()
	});
	
	request.onsuccess = function (e) {
		app.indexedDB.getAllTodoItems();
	};
	
	request.onerror = function (e) {
		console.log("Add Error: ", e.value);
	};
};

function renderTodo(row) {
	'use strict';
	var todos, li, a, t;
	todos = document.getElementById("todoItems");
	li = document.createElement("li");
	a = document.createElement("a");
	t = document.createTextNode(row.text);
	t.data = row.text;
	
	a.addEventListener("click", function () {
		app.indexedDB.deleteTodo(row.timeStamp);
	}, false);
	
	a.textContent = "[x] ";
	
	li.appendChild(a);
	li.appendChild(t);
	todos.appendChild(li);
}

app.indexedDB.getAllTodoItems = function () {
	'use strict';
	var todos, db, trans, store, keyRange, cursorRequest;
	todos = document.getElementById("todoItems");
	todos.innerHTML = "";
	
	db = app.indexedDB.db;
	trans = db.transaction(["todo"], webkitIDBTransaction.READ_WRITE, 0);
	store = trans.objectStore("todo");
	
	keyRange = webkitIDBKeyRange.lowerBound(0);
	cursorRequest = store.openCursor(keyRange);
	
	cursorRequest.onsuccess = function (e) {
		var result = e.target.result;
		if (!!result === false) {
			return;
		}
		renderTodo(result.value);
		result.continue();
	};
	
	cursorRequest.onerror = app.indexedDB.onerror;
};

app.indexedDB.deleteTodo = function (id) {
	'use strict';
	var db, trans, store, request;
	db = app.indexedDB.db;
	trans = db.transaction(["todo"], webkitIDBTransaction.READ_WRITE, 0);
	store = trans.objectStore("todo");
	
	request = store.delete(id);
	
	request.onsuccess = function (e) {
		app.indexedDB.getAllTodoItems();	/*Refresh the screen*/
	};

	request.onerror = function (e) {
		console.log("Delete Error: ", e);
	};
};

function addTodo() {
	'use strict';
	var todo = document.getElementById('todo');
	app.indexedDB.addTodo(todo.value);
	todo.value = '';
}

function init() {
	'use strict';
	app.indexedDB.open();
}

window.addEventListener("DOMContentLoaded", init(), false);